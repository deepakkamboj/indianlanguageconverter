"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Bold, Italic, Heading, List, Link as LinkIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/toast";

export default function LinkedInFormatterPage() {
  const [text, setText] = useState("");
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  const [formattedPreview, setFormattedPreview] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    updatePreview(text);
  }, [text]);

  const updatePreview = (inputText: string) => {
    let preview = inputText;
    
    // Bullet points with ➥
    preview = preview.replace(/^➥ (.+)$/gm, '<li class="ml-4">➥ $1</li>');
    
    // Line breaks (double line break = paragraph)
    preview = preview.replace(/\n\n/g, '<br/><br/>');
    preview = preview.replace(/\n/g, '<br/>');
    
    setFormattedPreview(preview || '&nbsp;');
  };

  const convertToBold = (text: string): string => {
    // Convert to Unicode Mathematical Sans-Serif Bold
    return text.split('').map(char => {
      const code = char.charCodeAt(0);
      if (char >= 'A' && char <= 'Z') {
        return String.fromCodePoint(0x1D5D4 + (code - 65)); // Sans-Serif Bold Uppercase
      } else if (char >= 'a' && char <= 'z') {
        return String.fromCodePoint(0x1D5EE + (code - 97)); // Sans-Serif Bold Lowercase
      } else if (char >= '0' && char <= '9') {
        return String.fromCodePoint(0x1D7EC + (code - 48)); // Sans-Serif Bold Digits
      }
      return char;
    }).join('');
  };

  const convertToItalic = (text: string): string => {
    // Convert to Unicode Mathematical Italic
    return text.split('').map(char => {
      const code = char.charCodeAt(0);
      if (char >= 'A' && char <= 'Z') {
        return String.fromCodePoint(0x1D434 + (code - 65));
      } else if (char >= 'a' && char <= 'z') {
        return String.fromCodePoint(0x1D44E + (code - 97));
      }
      return char;
    }).join('');
  };

  const convertToHeading = (text: string): string => {
    // Convert to Unicode Mathematical Sans-Serif Bold for headings
    return text.split('').map(char => {
      const code = char.charCodeAt(0);
      if (char >= 'A' && char <= 'Z') {
        return String.fromCodePoint(0x1D5D4 + (code - 65));
      } else if (char >= 'a' && char <= 'z') {
        return String.fromCodePoint(0x1D5EE + (code - 97));
      } else if (char >= '0' && char <= '9') {
        return String.fromCodePoint(0x1D7EC + (code - 48));
      }
      return char;
    }).join('');
  };

  const handleTextSelection = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setSelectionStart(target.selectionStart);
    setSelectionEnd(target.selectionEnd);
  };

  const applyFormat = (formatType: 'bold' | 'italic' | 'header' | 'bullet') => {
    if (formatType === 'bullet') {
      // Add ➥ bullet point at the beginning of current line
      const lines = text.split('\n');
      const cursorPos = selectionStart;
      let currentLine = 0;
      let charCount = 0;
      
      for (let i = 0; i < lines.length; i++) {
        if (charCount + lines[i].length >= cursorPos) {
          currentLine = i;
          break;
        }
        charCount += lines[i].length + 1;
      }
      
      if (!lines[currentLine].startsWith('➥ ')) {
        lines[currentLine] = '➥ ' + lines[currentLine];
      }
      
      setText(lines.join('\n'));
      return;
    }

    if (formatType === 'header') {
      // Convert current line or selection to heading (Math Sans Bold)
      const lines = text.split('\n');
      const cursorPos = selectionStart;
      let currentLine = 0;
      let charCount = 0;
      
      for (let i = 0; i < lines.length; i++) {
        if (charCount + lines[i].length >= cursorPos) {
          currentLine = i;
          break;
        }
        charCount += lines[i].length + 1;
      }
      
      lines[currentLine] = convertToHeading(lines[currentLine]);
      setText(lines.join('\n'));
      return;
    }

    if (selectionStart === selectionEnd) {
      return;
    }

    const before = text.substring(0, selectionStart);
    const selected = text.substring(selectionStart, selectionEnd);
    const after = text.substring(selectionEnd);

    let formatted = '';
    switch (formatType) {
      case 'bold':
        formatted = `${before}${convertToBold(selected)}${after}`;
        break;
      case 'italic':
        formatted = `${before}${convertToItalic(selected)}${after}`;
        break;
    }

    setText(formatted);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      showToast('LinkedIn post copied!');
    } catch (err) {
      console.error('Failed to copy:', err);
      showToast('Failed to copy');
    }
  };

  const hasSelection = selectionStart !== selectionEnd;

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">LinkedIn Text Formatter</h1>
          <p className="text-gray-600 mt-2">
            Create professionally formatted LinkedIn posts with bold, italic, and more
          </p>
        </div>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <p className="text-sm text-gray-700">
              Format your LinkedIn posts like a pro! Use Unicode sans-serif bold headings, bold/italic text, and ➥ bullets that work natively on LinkedIn.
              Perfect for making your posts stand out in the feed.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Formatted Preview</CardTitle>
            <CardDescription>See how your post will look on LinkedIn</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="min-h-[100px] p-4 bg-gray-50 rounded-md border border-gray-200"
              dangerouslySetInnerHTML={{ __html: formattedPreview }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>LinkedIn Post</CardTitle>
                <CardDescription>Type your post and apply formatting</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  title="Copy LinkedIn Post"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => applyFormat('bold')}
                  disabled={!hasSelection}
                  variant="outline"
                  size="sm"
                  title="Bold (Sans-Serif)"
                  className="font-bold"
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => applyFormat('italic')}
                  disabled={!hasSelection}
                  variant="outline"
                  size="sm"
                  title="Italic"
                  className="italic"
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => applyFormat('header')}
                  variant="outline"
                  size="sm"
                  title="Heading (Sans-Serif Bold)"
                >
                  <Heading className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => applyFormat('bullet')}
                  variant="outline"
                  size="sm"
                  title="Bullet Point (➥)"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onSelect={handleTextSelection}
              onKeyUp={handleTextSelection}
              onMouseUp={handleTextSelection}
              placeholder="LinkedIn Post Text"
              className="min-h-[200px]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Formatting Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Bold className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-semibold">Bold Text</p>
                    <p className="text-sm text-gray-600">Select text and click Bold button</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Italic className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-semibold">Italic Text</p>
                    <p className="text-sm text-gray-600">Select text and click Italic button</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Heading className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-semibold">Heading (𝗦𝗮𝗻𝘀 𝗕𝗼𝗹𝗱)</p>
                    <p className="text-sm text-gray-600">Click Heading on a line</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <List className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-semibold">Bullet Point</p>
                    <p className="text-sm text-gray-600">Adds ➥ at line start</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Type or paste your LinkedIn post in the text box</li>
              <li>Select text and click formatting buttons (𝗕𝗼𝗹𝗱, 𝘐𝘵𝘢𝘭𝘪𝘤, 𝗛𝗲𝗮𝗱𝗶𝗻𝗴, ➥)</li>
              <li>Text is instantly converted to Unicode formatting</li>
              <li>Click the Copy button to copy the formatted text</li>
              <li>Paste it into LinkedIn and publish!</li>
            </ol>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-gray-700">
                <strong>Pro Tip:</strong> All formatting uses Unicode characters (𝗦𝗮𝗻𝘀-𝗦𝗲𝗿𝗶𝗳 𝗕𝗼𝗹𝗱, 𝘐𝘵𝘢𝘭𝘪𝘤, ➥) that LinkedIn recognizes natively.
                This means your formatting will work perfectly on all devices without any conversion!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
