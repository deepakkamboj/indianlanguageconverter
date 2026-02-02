"use client";

import { FormEvent, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { isValidLinkedInUrl } from "@/lib/linkedin";

// Taplio's reCAPTCHA site key - required for their API to validate tokens
const TAPLIO_RECAPTCHA_SITE_KEY = "6LcVl14sAAAAACixKPX3_DtQ9mvfj_BTMk1MTiPQ";

function LinkedInVideoDownloaderForm() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const { showToast } = useToast();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setVideoUrl(null);

    if (!url.trim()) {
      setError("Please paste a LinkedIn video URL.");
      return;
    }

    if (!executeRecaptcha) {
      setError("reCAPTCHA not ready. Please refresh the page.");
      return;
    }

    // Validate LinkedIn URL
    if (!url.includes(".mp4") && !isValidLinkedInUrl(url)) {
      setError("Invalid LinkedIn URL. Please provide a valid LinkedIn post URL.");
      return;
    }

    setLoading(true);
    try {
      // Get reCAPTCHA token
      const captchaToken = await executeRecaptcha("linkedin_download");

      // Call Taplio's API directly (works on static hosting like GitHub Pages)
      const apiUrl = `https://lempire-mini-tools-main-ac9546d.d2.zuplo.dev/taplio/linkedIn-video-downloader?post_url=${encodeURIComponent(url)}&captcha_token=${captchaToken}`;

      const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      });

      if (!res.ok) {
        let errorMessage = "Failed to extract video. The post might not contain a video or may be private.";

        if (res.status === 429) {
          errorMessage = "Too many requests. Please wait a few minutes and try again.";
          showToast("⏱️ Rate limit reached. Please wait a few minutes and try again.");
        } else {
          try {
            const data = await res.json();
            errorMessage = data.error || data.message || data.title || errorMessage;
          } catch (e) {
            // If JSON parsing fails, use default message
          }
          showToast(errorMessage);
        }

        setError(errorMessage);
        return;
      }

      const data = await res.json();

      // The API returns videoUrl
      const extractedVideoUrl = data.videoUrl || data.video_url || data.url;

      if (extractedVideoUrl) {
        setVideoUrl(extractedVideoUrl);
        setSuccess(true);
        showToast("Video URL extracted successfully!");
      } else {
        setError("No video found in the response.");
        showToast("No video found in the response.");
      }
    } catch (err) {
      console.error(err);
      setError("Unexpected error while downloading.");
      showToast("Unexpected error while downloading.");
    } finally {
      setLoading(false);
    }
  };

  const handleDirectDownload = async () => {
    if (!videoUrl) return;

    try {
      const res = await fetch(videoUrl);
      const blob = await res.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `linkedin-video-${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(downloadUrl);
      showToast("Video downloaded successfully!");
    } catch (err) {
      console.error(err);
      showToast("Failed to download video. Try right-clicking the video and selecting 'Save video as...'");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">LinkedIn Video Downloader</h1>
        <p className="text-gray-600 mt-2">
          Download videos from LinkedIn posts quickly and easily
        </p>
      </div>

      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardContent className="p-6 text-center">
          <p className="text-base text-gray-700">
            Paste any LinkedIn post URL and download the video instantly
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                id="url"
                type="url"
                placeholder="https://www.linkedin.com/posts/... (Paste LinkedIn post URL)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="text-base h-12 text-center"
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">Error</p>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            )}

            {success && !videoUrl && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-md flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-sm text-green-800">Video downloaded successfully!</p>
              </div>
            )}

            {videoUrl && (
              <div className="space-y-4">
                <div className="p-3 bg-green-50 border border-green-200 rounded-md flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="text-sm text-green-800">Video found! Preview below or download directly.</p>
                </div>

                <div className="bg-black rounded-lg overflow-hidden">
                  <video
                    src={videoUrl}
                    controls
                    className="w-full max-h-[500px]"
                    controlsList="nodownload"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="flex gap-3 justify-center">
                  <Button
                    type="button"
                    onClick={handleDirectDownload}
                    className="px-8 py-3 text-base bg-blue-600 hover:bg-blue-700"
                  >
                    Download Video
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setUrl("");
                      setVideoUrl(null);
                      setSuccess(false);
                    }}
                    variant="outline"
                    className="px-8 py-3 text-base"
                  >
                    Download Another
                  </Button>
                </div>
              </div>
            )}

            {!videoUrl && (
              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={loading || !url.trim()}
                  className="px-8 py-6 text-base bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Get Video"
                  )}
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>📹 How to Use</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
            <ol className="space-y-4 text-gray-700">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <div>
                  <p className="font-medium">Find the LinkedIn post with the video you want to download</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <div>
                  <p className="font-medium">Copy the post URL from your browser&apos;s address bar</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <div>
                  <p className="font-medium">Paste the URL in the input field above</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <div>
                  <p className="font-medium">Click &quot;Get Video&quot; and wait for the video to load</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                <div>
                  <p className="font-medium">Preview the video and click &quot;Download Video&quot; to save it</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded-md">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> This tool uses Taplio&apos;s public API to extract videos from LinkedIn posts. reCAPTCHA v3 runs automatically in the background to prevent abuse.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Supported URLs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 mb-3">
            The following LinkedIn URL formats are supported:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>linkedin.com/posts/username-post-id</li>
            <li>linkedin.com/feed/update/urn:li:activity:...</li>
            <li>Any LinkedIn post URL containing video content</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LinkedInVideoDownloaderPage() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={TAPLIO_RECAPTCHA_SITE_KEY}>
      <LinkedInVideoDownloaderForm />
    </GoogleReCaptchaProvider>
  );
}
