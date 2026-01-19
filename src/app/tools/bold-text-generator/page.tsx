"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Type } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/toast";

export default function BoldTextGeneratorPage() {
  const [inputText, setInputText] = useState("");
  const { showToast } = useToast();

  // Unicode character mappings for different bold/stylized fonts
  const textStyles = [
    {
      name: "Bold (serif)",
      transform: (text: string) => convertToUnicode(text, 0x1D400, 0x1D41A, 0x1D7CE),
    },
    {
      name: "Bold (sans)",
      transform: (text: string) => convertToUnicode(text, 0x1D5D4, 0x1D5EE, 0x1D7EC),
    },
    {
      name: "Italic",
      transform: (text: string) => convertToUnicode(text, 0x1D434, 0x1D44E, null),
    },
    {
      name: "Italic Bold (serif)",
      transform: (text: string) => convertToUnicode(text, 0x1D468, 0x1D482, null),
    },
    {
      name: "Italic Bold (sans)",
      transform: (text: string) => convertToUnicode(text, 0x1D608, 0x1D622, null),
    },
    {
      name: "Medieval Bold",
      transform: (text: string) => convertToUnicode(text, 0x1D56C, 0x1D586, null),
    },
    {
      name: "Double-Struck",
      transform: (text: string) => convertToUnicode(text, 0x1D538, 0x1D552, 0x1D7D8),
    },
    {
      name: "Monospace",
      transform: (text: string) => convertToUnicode(text, 0x1D670, 0x1D68A, 0x1D7F6),
    },
    {
      name: "Script",
      transform: (text: string) => convertToUnicode(text, 0x1D49C, 0x1D4B6, null),
    },
    {
      name: "Script Bold",
      transform: (text: string) => convertToUnicode(text, 0x1D4D0, 0x1D4EA, null),
    },
    {
      name: "Fraktur",
      transform: (text: string) => convertToUnicode(text, 0x1D504, 0x1D51E, null),
    },
    {
      name: "Fraktur Bold",
      transform: (text: string) => convertToUnicode(text, 0x1D56C, 0x1D586, null),
    },
    {
      name: "Small Caps",
      transform: (text: string) => text.toUpperCase().split('').map(char => {
        if (char >= 'A' && char <= 'Z') {
          return String.fromCodePoint(0x1D00 + (char.charCodeAt(0) - 65));
        }
        return char;
      }).join(''),
    },
    {
      name: "Circled",
      transform: (text: string) => text.split('').map(char => {
        if (char >= 'A' && char <= 'Z') {
          return String.fromCodePoint(0x24B6 + (char.charCodeAt(0) - 65));
        } else if (char >= 'a' && char <= 'z') {
          return String.fromCodePoint(0x24D0 + (char.charCodeAt(0) - 97));
        } else if (char >= '0' && char <= '9') {
          return String.fromCodePoint(0x2460 + (char.charCodeAt(0) - 49));
        }
        return char;
      }).join(''),
    },
    {
      name: "Circled (negative)",
      transform: (text: string) => text.split('').map(char => {
        if (char >= 'A' && char <= 'Z') {
          return String.fromCodePoint(0x1F150 + (char.charCodeAt(0) - 65));
        }
        return char;
      }).join(''),
    },
    {
      name: "Squared",
      transform: (text: string) => text.split('').map(char => {
        if (char >= 'A' && char <= 'Z') {
          return String.fromCodePoint(0x1F130 + (char.charCodeAt(0) - 65));
        }
        return char;
      }).join(''),
    },
    {
      name: "Squared (negative)",
      transform: (text: string) => text.split('').map(char => {
        if (char >= 'A' && char <= 'Z') {
          return String.fromCodePoint(0x1F170 + (char.charCodeAt(0) - 65));
        }
        return char;
      }).join(''),
    },
    {
      name: "Fullwidth",
      transform: (text: string) => text.split('').map(char => {
        const code = char.charCodeAt(0);
        if (code >= 33 && code <= 126) {
          return String.fromCodePoint(0xFF00 + (code - 32));
        }
        return char;
      }).join(''),
    },
    {
      name: "Subscript",
      transform: (text: string) => {
        const subscriptMap: { [key: string]: string } = {
          '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
          'a': 'ₐ', 'e': 'ₑ', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ', 'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ',
          'o': 'ₒ', 'p': 'ₚ', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ', 'v': 'ᵥ', 'x': 'ₓ'
        };
        return text.split('').map(char => subscriptMap[char.toLowerCase()] || char).join('');
      },
    },
    {
      name: "Superscript",
      transform: (text: string) => {
        const superscriptMap: { [key: string]: string } = {
          '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
          'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ',
          'j': 'ʲ', 'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ', 'p': 'ᵖ', 'r': 'ʳ', 's': 'ˢ',
          't': 'ᵗ', 'u': 'ᵘ', 'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ'
        };
        return text.split('').map(char => superscriptMap[char.toLowerCase()] || char).join('');
      },
    },
    {
      name: "Strikethrough",
      transform: (text: string) => text.split('').map(char => char + '\u0336').join(''),
    },
    {
      name: "Underline",
      transform: (text: string) => text.split('').map(char => char + '\u0332').join(''),
    },
    {
      name: "Double Underline",
      transform: (text: string) => text.split('').map(char => char + '\u0333').join(''),
    },
    {
      name: "Overline",
      transform: (text: string) => text.split('').map(char => char + '\u0305').join(''),
    },
  ];

  function convertToUnicode(
    text: string,
    upperStart: number,
    lowerStart: number,
    digitStart: number | null
  ): string {
    return text.split('').map(char => {
      const code = char.charCodeAt(0);
      if (char >= 'A' && char <= 'Z') {
        return String.fromCodePoint(upperStart + (code - 65));
      } else if (char >= 'a' && char <= 'z') {
        return String.fromCodePoint(lowerStart + (code - 97));
      } else if (digitStart && char >= '0' && char <= '9') {
        return String.fromCodePoint(digitStart + (code - 48));
      }
      return char;
    }).join('');
  }

  const copyToClipboard = async (text: string, styleName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${styleName} copied!`);
    } catch (err) {
      console.error('Failed to copy:', err);
      showToast('Failed to copy');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Bold Text Generator</h1>
        <p className="text-gray-600 mt-2">
          Generate bold, italic, and stylized Unicode text for social media posts
        </p>
      </div>

      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <p className="text-sm text-gray-700">
            <Type className="inline h-4 w-4 mr-1" />
            Convert your text into various Unicode styles. Perfect for Facebook, Twitter, Instagram, and more!
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Enter Your Text</CardTitle>
          <CardDescription>Type the text you want to convert</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your text here..."
            className="text-lg"
          />
        </CardContent>
      </Card>

      {inputText && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Styles</CardTitle>
            <CardDescription>Click the copy button to copy any style</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {textStyles.map((style, index) => {
                const transformedText = style.transform(inputText);
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 mb-1">{style.name}</p>
                      <p className="text-lg font-mono truncate">{transformedText}</p>
                    </div>
                    <Button
                      onClick={() => copyToClipboard(transformedText, style.name)}
                      variant="outline"
                      size="sm"
                      className="ml-4 flex-shrink-0"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Type or paste your text in the input box above</li>
            <li>Browse through the generated styles below</li>
            <li>Click the copy button next to your favorite style</li>
            <li>Paste the formatted text into your social media post, bio, or message</li>
          </ol>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> These Unicode characters may not display correctly on all platforms or devices.
              Most modern systems support them, but some older systems may show boxes or question marks instead.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
