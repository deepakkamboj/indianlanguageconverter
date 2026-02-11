"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Info, X } from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface Font {
  name: string;
  filename: string;
  path: string;
  category: string;
  format: string;
  size: number;
}

export default function FontsPage() {
  const [fonts, setFonts] = useState<Font[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set());
  const { showToast } = useToast();

  // Get base path for GitHub Pages
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  // Load fonts from JSON
  useEffect(() => {
    fetch(`${basePath}/fonts.json`)
      .then((res) => res.json())
      .then((data: Font[]) => {
        setFonts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load fonts:", err);
        setLoading(false);
      });
  }, [basePath]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ["All", ...new Set(fonts.map((f) => f.category))];
    return cats.sort();
  }, [fonts]);

  // Filter fonts based on search query and category
  const filteredFonts = useMemo(() => {
    let result = fonts;

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter((font) => font.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (font) =>
          font.name.toLowerCase().includes(query) ||
          font.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [fonts, searchQuery, selectedCategory]);

  // Load font for preview
  const loadFontForPreview = (font: Font) => {
    if (loadedFonts.has(font.filename)) return;

    // Encode the font path to handle spaces and special characters
    const encodedPath = encodeURIComponent(font.path).replace(/%2F/g, '/');

    const fontFace = new FontFace(
      font.name,
      `url("${basePath}/fonts/${encodedPath}")`,
      { style: 'normal', weight: 'normal' }
    );

    fontFace.load().then((loadedFace) => {
      document.fonts.add(loadedFace);
      setLoadedFonts((prev) => new Set(prev).add(font.filename));
    }).catch((err) => {
      // Silently fail for fonts that can't be loaded
      console.debug(`Could not load font ${font.name} for preview`);
    });
  };

  // Download font file
  const handleDownload = async (font: Font) => {
    try {
      // Encode the font path to handle spaces and special characters
      const encodedPath = encodeURIComponent(font.path).replace(/%2F/g, '/');

      const response = await fetch(`${basePath}/fonts/${encodedPath}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch font: ${response.status}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = font.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToast(`Downloaded ${font.filename}`);
    } catch (err) {
      console.error("Download failed:", err);
      showToast("Failed to download font");
    }
  };

  // Format file size
  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Get sample text based on category
  const getSampleText = (category: string): string => {
    const samples: Record<string, string> = {
      Hindi: "हिन्दी फॉन्ट - Hindi Font Preview",
      Punjabi: "ਪੰਜਾਬੀ ਫ਼ਾਂਟ - Punjabi Font Preview",
      Devanagari: "देवनागरी - Devanagari Preview",
      Mandala: "Mandala Font Preview - Decorative",
      Color: "Colorful Font Preview ABC",
      Vintage: "Vintage Font Preview 1234",
      Handwritten: "Handwritten Font Preview",
      English: "The Quick Brown Fox Jumps Over",
    };
    return samples[category] || "Font Preview - AaBbCc 123";
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Font Collection</CardTitle>
              <p className="text-gray-600 mt-2">
                Browse, preview, and download {fonts.length} fonts for Hindi, Punjabi, English, and more
              </p>
            </div>
            <Button
              onClick={() => setShowInstructions(true)}
              variant="outline"
              size="sm"
            >
              <Info className="w-4 h-4 mr-2" />
              How to Install
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search fonts by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-6"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                >
                  {category}
                  {category !== "All" && (
                    <span className="ml-2 text-xs opacity-70">
                      ({fonts.filter((f) => f.category === category).length})
                    </span>
                  )}
                </Button>
              ))}
            </div>

            <p className="text-sm text-gray-500">
              {filteredFonts.length} font{filteredFonts.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading fonts...</p>
            </div>
          )}

          {/* No Results */}
          {!loading && filteredFonts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No fonts found matching &quot;{searchQuery}&quot;
              </p>
            </div>
          )}

          {/* Fonts List */}
          {!loading && filteredFonts.length > 0 && (
            <div className="space-y-3">
              {filteredFonts.map((font, index) => {
                // Load font for preview when it comes into view
                if (!loadedFonts.has(font.filename)) {
                  loadFontForPreview(font);
                }

                return (
                  <div
                    key={`${font.filename}-${index}`}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      {/* Font Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg truncate">
                            {font.name}
                          </h3>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full whitespace-nowrap">
                            {font.category}
                          </span>
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {font.format} • {formatSize(font.size)}
                          </span>
                        </div>

                        {/* Font Preview */}
                        <div
                          className="text-2xl py-3 px-4 bg-gray-50 rounded border overflow-x-auto"
                          style={{
                            fontFamily: loadedFonts.has(font.filename)
                              ? `"${font.name}", sans-serif`
                              : "sans-serif",
                          }}
                        >
                          {getSampleText(font.category)}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 md:w-32">
                        <Button
                          onClick={() => handleDownload(font)}
                          size="sm"
                          className="w-full"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Installation Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>How to Install Fonts</CardTitle>
                <Button
                  onClick={() => setShowInstructions(false)}
                  variant="ghost"
                  size="sm"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Windows */}
              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <span className="text-2xl">🪟</span> Windows
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Download the font file (.ttf or .otf)</li>
                  <li>Right-click on the downloaded font file</li>
                  <li>Click <strong>&quot;Install&quot;</strong> or <strong>&quot;Install for all users&quot;</strong></li>
                  <li>The font will be installed and available in all applications</li>
                </ol>
                <p className="text-xs text-gray-600 mt-2">
                  Alternative: Copy font files to <code className="bg-gray-100 px-1 rounded">C:\Windows\Fonts</code>
                </p>
              </div>

              {/* macOS */}
              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <span className="text-2xl">🍎</span> macOS
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Download the font file (.ttf or .otf)</li>
                  <li>Double-click the font file to open Font Book</li>
                  <li>Click <strong>&quot;Install Font&quot;</strong></li>
                  <li>The font is now available system-wide</li>
                </ol>
                <p className="text-xs text-gray-600 mt-2">
                  Alternative: Drag font files to Font Book or <code className="bg-gray-100 px-1 rounded">~/Library/Fonts</code>
                </p>
              </div>

              {/* Linux */}
              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <span className="text-2xl">🐧</span> Linux
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Download the font file (.ttf or .otf)</li>
                  <li>Create fonts directory: <code className="bg-gray-100 px-1 rounded">mkdir -p ~/.local/share/fonts</code></li>
                  <li>Copy font files to: <code className="bg-gray-100 px-1 rounded">~/.local/share/fonts</code></li>
                  <li>Update font cache: <code className="bg-gray-100 px-1 rounded">fc-cache -f -v</code></li>
                </ol>
              </div>

              {/* Mobile */}
              <div>
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <span className="text-2xl">📱</span> Mobile (Android/iOS)
                </h3>
                <p className="text-sm text-gray-700">
                  Custom font installation on mobile requires specific apps:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm mt-2">
                  <li><strong>Android:</strong> Use apps like iFont, FontFix, or theme managers</li>
                  <li><strong>iOS:</strong> Use apps like AnyFont or configuration profiles</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2">
                  Note: Some devices may require root/jailbreak access
                </p>
              </div>

              {/* Web Projects */}
              <div className="border-t pt-4">
                <h3 className="font-bold text-lg mb-3">💻 For Web Projects</h3>
                <p className="text-sm text-gray-700 mb-2">
                  To use these fonts in your website or application:
                </p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto">
{`@font-face {
  font-family: 'YourFontName';
  src: url('path/to/font.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.your-element {
  font-family: 'YourFontName', sans-serif;
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
