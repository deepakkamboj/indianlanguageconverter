"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Copy } from "lucide-react";
import { useState } from "react";
import { krutidevToUnicode, unicodeToKrutidev } from "@/lib/krutidev-converter";
import { chanakyaToUnicode, unicodeToChanakya } from "@/lib/chanakya-converter";
import { useToast } from "@/components/ui/toast";

const sampleTexts = {
  krutiDev: "fgUnh Hkk\"kk esa VkbZi djus ds fy, ;g ,d VwYl gSA",
  unicode: "हिंदी भाषा में टाइप करने के लिए यह एक टूल है।",
  chanakya: "çãUÎè ÖæÚæ ×ð´ Åæ§Â ·¤ÚÙð ·Ô¤ çÜ°, Øã °·¤ ÅêÜ ãñÐ",
};

export default function KrutiDevConverterPage() {
  const [krutiDevText, setKrutiDevText] = useState("");
  const [unicodeText, setUnicodeText] = useState("");
  const [chanakyaText, setChanakyaText] = useState("");
  const { showToast } = useToast();

  const handleKrutiToOthers = () => {
    // Convert Kruti Dev to Unicode
    const convertedUnicode = krutidevToUnicode(krutiDevText);
    setUnicodeText(convertedUnicode);
    
    // Convert Unicode to Chanakya
    const convertedChanakya = unicodeToChanakya(convertedUnicode);
    setChanakyaText(convertedChanakya);
  };

  const handleUnicodeToOthers = () => {
    // Convert Unicode to Kruti Dev
    const convertedKruti = unicodeToKrutidev(unicodeText);
    setKrutiDevText(convertedKruti);
    
    // Convert Unicode to Chanakya
    const convertedChanakya = unicodeToChanakya(unicodeText);
    setChanakyaText(convertedChanakya);
  };

  const handleChanakyaToOthers = () => {
    // Convert Chanakya to Unicode
    const convertedUnicode = chanakyaToUnicode(chanakyaText);
    setUnicodeText(convertedUnicode);
    
    // Convert Unicode to Kruti Dev
    const convertedKruti = unicodeToKrutidev(convertedUnicode);
    setKrutiDevText(convertedKruti);
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${label} copied!`);
    } catch (err) {
      console.error("Failed to copy:", err);
      showToast('Failed to copy');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          Kruti Dev ⇔ Unicode ⇔ Chanakya Converter
        </h1>
        <p className="text-gray-600 mt-2">
          Convert Hindi text between Kruti Dev, Unicode (Mangal, Arial Unicode), and Chanakya fonts
        </p>
      </div>

      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <p className="text-sm text-gray-700">
            <strong>कितना भी बड़ा Text हो एक साथ पेस्ट कर दें।</strong> यह पहला परिवर्तक है जो कृतिदेव को यूनिकोड व चाणक्य में एक साथ बदलेगा, 
            यूनिकोड को चाणक्य व कृतिदेव में एक साथ बदलेगा, चाणक्य को यूनिकोड व कृतिदेव में एक साथ बदलेगा।
          </p>
          <p className="text-sm text-gray-700 mt-2">
            This is the first converter that converts Kruti Dev to Unicode + Chanakya, Unicode to Chanakya + Kruti Dev, 
            Chanakya to Unicode + Kruti Dev in separate boxes with one click.
          </p>
        </CardContent>
      </Card>

      {/* Sample Texts Section */}
      <Card className="border-indigo-200 bg-indigo-50">
        <CardHeader>
          <CardTitle className="text-lg">Sample Texts - Copy to Test</CardTitle>
          <CardDescription>Click to copy sample text in different fonts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-white rounded border">
              <div>
                <p className="text-xs text-gray-500 mb-1">Kruti Dev Sample:</p>
                <p className="font-mono text-sm" style={{ fontFamily: "'Kruti Dev 010', monospace" }}>
                  {sampleTexts.krutiDev}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(sampleTexts.krutiDev, "Kruti Dev sample")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded border">
              <div>
                <p className="text-xs text-gray-500 mb-1">Unicode Sample:</p>
                <p className="text-sm">
                  {sampleTexts.unicode}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(sampleTexts.unicode, "Unicode sample")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded border">
              <div>
                <p className="text-xs text-gray-500 mb-1">Chanakya Sample:</p>
                <p className="font-mono text-sm">
                  {sampleTexts.chanakya}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(sampleTexts.chanakya, "Chanakya sample")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kruti Dev Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Kruti Dev or Devlys</CardTitle>
          <CardDescription>यहां बॉक्स में टाईप या पेस्ट करें (Paste Here)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={krutiDevText}
            onChange={(e) => setKrutiDevText(e.target.value)}
            placeholder="Kruti Dev text here..."
            className="min-h-[150px] font-mono"
            style={{ fontFamily: "'Kruti Dev 010', monospace" }}
          />
          <div className="flex gap-2">
            <Button
              onClick={handleKrutiToOthers}
              className="bg-red-600 hover:bg-red-700"
            >
              Kruti Dev to Unicode + Chanakya
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => copyToClipboard(krutiDevText, "Kruti Dev text")}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Unicode Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-600">Unicode (ArialUni, Mangal, Lohit, Raghu etc.)</CardTitle>
          <CardDescription>यहां बॉक्स में टाईप या पेस्ट करें (Paste Here)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={unicodeText}
            onChange={(e) => setUnicodeText(e.target.value)}
            placeholder="Unicode text here..."
            className="min-h-[150px]"
          />
          <div className="flex gap-2">
            <Button
              onClick={handleUnicodeToOthers}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Unicode to Kruti Dev + Chanakya
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => copyToClipboard(unicodeText, "Unicode text")}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Chanakya Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-600">Chanakya</CardTitle>
          <CardDescription>यहां बॉक्स में टाईप या पेस्ट करें (Paste Here)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={chanakyaText}
            onChange={(e) => setChanakyaText(e.target.value)}
            placeholder="Chanakya text here..."
            className="min-h-[150px] font-mono"
          />
          <div className="flex gap-2">
            <Button
              onClick={handleChanakyaToOthers}
              className="bg-green-600 hover:bg-green-700"
            >
              Chanakya to Unicode + Kruti Dev
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => copyToClipboard(chanakyaText, "Chanakya text")}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle>Implementation Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 mb-2">
            <strong>✅ Kruti Dev to Unicode:</strong> Fully working! Kruti Dev text is properly converted to Unicode.
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <strong>✅ Chanakya Conversion:</strong> Fully working! All Chanakya conversions are now implemented.
          </p>
          <p className="text-sm text-gray-700">
            <strong>✅ Unicode to Kruti Dev:</strong> Fully working! Reverse conversions are now implemented.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
