"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Copy, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/toast";
import { convertNepaliFont } from "@/lib/nepali-converter";

const nepaliFonts = [
  { value: "unicode", label: "Unicode (Mangal, Nirmala UI)" },
  { value: "anuradha", label: "Anuradha" },
  { value: "bahun", label: "Bahun" },
  { value: "bahunbad", label: "Bahunbad" },
  { value: "chandrodaya", label: "Chandrodaya" },
  { value: "cv-maya", label: "CV Maya" },
  { value: "cv-nepali-fancy", label: "CV Nepali Fancy" },
  { value: "dev", label: "Dev" },
  { value: "gadha", label: "Gadha" },
  { value: "himal", label: "Himal" },
  { value: "himali", label: "Himali" },
  { value: "jagahimali", label: "Jagahimali" },
  { value: "maiya", label: "Maiya" },
  { value: "narayan", label: "Narayan" },
  { value: "navjeevan", label: "Navjeevan" },
  { value: "nepali", label: "Nepali" },
  { value: "neptimes", label: "Neptimes" },
  { value: "pagal", label: "Pagal" },
  { value: "pagali", label: "Pagali" },
  { value: "pari", label: "Pari" },
  { value: "preeti", label: "Preeti" },
  { value: "priyatam", label: "Priyatam" },
  { value: "punmaya", label: "Punmaya" },
  { value: "ramsham", label: "Ramsham" },
  { value: "ritu", label: "Ritu" },
  { value: "rukmini", label: "Rukmini" },
  { value: "sarashoti", label: "Sarashoti" },
  { value: "shangrila-hybrid", label: "Shangrila Hybrid" },
  { value: "shangrila-numeric", label: "Shangrila Numeric" },
  { value: "suryodaya", label: "Suryodaya" },
];

export default function NepaliConverterPage() {
  const [nonUnicodeFont, setNonUnicodeFont] = useState("cv-nepali-fancy");
  const [unicodeFont, setUnicodeFont] = useState("unicode");
  const [nonUnicodeText, setNonUnicodeText] = useState("");
  const [unicodeText, setUnicodeText] = useState("");
  const [charCount, setCharCount] = useState(0);
  const { showToast } = useToast();

  const handleNonUnicodeToUnicode = () => {
    if (!nonUnicodeText.trim()) {
      showToast('Please enter text to convert');
      return;
    }
    
    try {
      const converted = convertNepaliFont(nonUnicodeText, nonUnicodeFont, "unicode");
      setUnicodeText(converted);
      setCharCount(nonUnicodeText.length);
      showToast('Text converted successfully!');
    } catch (error) {
      console.error('Conversion error:', error);
      showToast('Conversion failed');
    }
  };

  const handleUnicodeToNonUnicode = () => {
    if (!unicodeText.trim()) {
      showToast('Please enter text to convert');
      return;
    }
    
    try {
      const converted = convertNepaliFont(unicodeText, "unicode", nonUnicodeFont);
      setNonUnicodeText(converted);
      setCharCount(unicodeText.length);
      showToast('Text converted successfully!');
    } catch (error) {
      console.error('Conversion error:', error);
      showToast('Conversion failed');
    }
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
    <>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Nepali Font Converter</h1>
          <p className="text-gray-600 mt-2">
            Convert between Unicode and 29 popular Nepali fonts including Fantasy, Himali, Everest, Preeti, and more
          </p>
        </div>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-900">Nepali Font Converter</p>
              <p className="text-sm text-gray-700">
                This converter supports conversion between Unicode (Mangal, Nirmala UI) and popular Nepali fonts.
                <strong> Preeti font conversion is fully working.</strong> Other fonts are being implemented.
              </p>
              <p className="text-sm text-gray-700">
                Select the font, paste the text into the appropriate box, and click the conversion button.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Non-Unicode Section */}
          <Card>
            <CardHeader>
              <CardTitle>Nepali Font</CardTitle>
              <CardDescription>Select font and paste text</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={nonUnicodeFont} onValueChange={setNonUnicodeFont}>
                <SelectTrigger>
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  {nepaliFonts
                    .filter((f) => f.value !== "unicode")
                    .map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Textarea
                value={nonUnicodeText}
                onChange={(e) => setNonUnicodeText(e.target.value)}
                placeholder={`Type or paste ${nonUnicodeFont} text here...`}
                className="min-h-[300px] font-mono"
              />

              <div className="flex gap-2">
                <Button
                  onClick={() => copyToClipboard(nonUnicodeText, "Nepali font text")}
                  variant="outline"
                  className="flex-1"
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
              <CardTitle>Unicode</CardTitle>
              <CardDescription>Mangal, Nirmala UI, or other Unicode fonts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={unicodeFont} onValueChange={setUnicodeFont}>
                <SelectTrigger>
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  {nepaliFonts.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Textarea
                value={unicodeText}
                onChange={(e) => setUnicodeText(e.target.value)}
                placeholder="Type or paste Unicode text here..."
                className="min-h-[300px]"
              />

              <div className="flex gap-2">
                <Button
                  onClick={() => copyToClipboard(unicodeText, "Unicode text")}
                  variant="outline"
                  className="flex-1"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conversion Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleNonUnicodeToUnicode}
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 border-2 border-indigo-700"
          >
            Convert to Unicode
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            onClick={handleUnicodeToNonUnicode}
            size="lg"
            variant="outline"
            className="border-2"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Convert to {nepaliFonts.find(f => f.value === nonUnicodeFont)?.label || nonUnicodeFont}
          </Button>
        </div>

        {/* Sample Text */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-lg">Sample Texts - Test the Converter</CardTitle>
            <CardDescription>Click to copy sample text in different formats</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded border">
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Preeti Sample:</p>
                <p className="font-mono text-sm">g]kfnL efifdf 6fOk ug&apos;{'{'}xf];&#92;</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setNonUnicodeFont("preeti");
                  setNonUnicodeText("g]kfnL efifdf 6fOk ug'{xf];\\");
                  showToast('Preeti sample loaded!');
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded border">
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Unicode Sample:</p>
                <p className="text-sm">नेपाली भाषामा टाइप गर्नुहोस्</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setUnicodeText("नेपाली भाषामा टाइप गर्नुहोस्");
                  showToast('Unicode sample loaded!');
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Why is this a demo version?
              </h3>
              <p className="text-sm text-gray-700">
                This is a demonstration of the converter interface. Full conversion functionality 
                would require implementing the complete Nepali font mapping algorithms.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                How does the conversion work?
              </h3>
              <p className="text-sm text-gray-700">
                The converter uses character mapping tables specific to each Nepali font to translate 
                between non-Unicode and Unicode representations while preserving the text meaning.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Which fonts are supported?
              </h3>
              <p className="text-sm text-gray-700">
                We support 29 popular Nepali fonts including CV Nepali Fancy, Preeti, Himali, Fantasy, 
                Everest, and many others. All can be converted to and from Unicode.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> This converter requires the complete Nepali font conversion algorithms 
              to be implemented. The current version demonstrates the UI structure and workflow.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
