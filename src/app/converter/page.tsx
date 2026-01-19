"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { languages, LanguageConverter, LanguageType } from "@/lib/converters";
import { Copy, Check, RotateCcw } from "lucide-react";

function ConverterContent() {
  const searchParams = useSearchParams();
  const langParam = searchParams.get("lang") as LanguageType | null;
  
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>(
    langParam && languages.find(l => l.id === langParam) ? langParam : "hindi"
  );
  
  // Language-specific placeholder examples
  const getPlaceholder = (lang: LanguageType) => {
    const placeholders: Record<LanguageType, string> = {
      hindi: "namaste bhaarath",
      bengali: "namaste bangla",
      tamil: "vanakkam tamil",
      telugu: "namaskaram telugu",
      gujarati: "namaste gujarath",
      kannada: "namaskara kannada",
      malayalam: "namaskaram malayalam",
      oriya: "namaste oriya",
      punjabi: "sat sri akaal punjabi",
    };
    return placeholders[lang] || "Type here...";
  };
  
  const [inputText, setInputText] = useState(getPlaceholder(selectedLanguage));
  const [outputText, setOutputText] = useState("");
  const [htmlText, setHtmlText] = useState("");
  const [copied, setCopied] = useState(false);

  // Handle lang parameter from URL
  useEffect(() => {
    if (langParam && languages.find(l => l.id === langParam)) {
      setSelectedLanguage(langParam);
      setInputText(getPlaceholder(langParam));
    }
  }, [langParam]);

  useEffect(() => {
    const language = languages.find((lang) => lang.id === selectedLanguage);
    if (language) {
      const converter = new LanguageConverter(language.config);
      const converted = converter.convert(inputText);
      setOutputText(converted);
      
      // Generate HTML entity representation
      let html = "";
      for (let i = 0; i < converted.length; i++) {
        const code = converted.charCodeAt(i);
        if (code > 127) {
          html += `&#${code};`;
        } else {
          html += converted.charAt(i);
        }
      }
      setHtmlText(html);
    }
  }, [inputText, selectedLanguage]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInputText("");
    setOutputText("");
    setHtmlText("");
  };

  const selectedLang = languages.find((lang) => lang.id === selectedLanguage);

  // Generate vowel examples from the selected language
  const getVowelExamples = () => {
    if (!selectedLang) return [];
    const config = selectedLang.config;
    
    return [
      { input: 'a', output: config.letterCodes['~a'] || '' },
      { input: 'A, aa', output: config.letterCodes['~A'] || config.letterCodes['~aa'] || '' },
      { input: 'i', output: config.letterCodes['~i'] || '' },
      { input: 'I, ee', output: config.letterCodes['~I'] || config.letterCodes['~ee'] || '' },
      { input: 'u', output: config.letterCodes['~u'] || '' },
      { input: 'U, oo', output: config.letterCodes['~U'] || config.letterCodes['~oo'] || '' },
      { input: 'tR', output: config.letterCodes['~tR'] || '' },
      { input: 'e', output: config.letterCodes['~e'] || '' },
      { input: 'ai', output: config.letterCodes['~ai'] || '' },
      { input: 'o', output: config.letterCodes['~o'] || '' },
      { input: 'au', output: config.letterCodes['~au'] || '' },
      { input: 'AOM', output: config.letterCodes['~AOM'] || '' },
      { input: 'M', output: config.letterCodes['~M'] || '' },
      { input: 'H, :', output: config.letterCodes['~H'] || config.letterCodes['~:'] || '' },
      { input: '|', output: config.letterCodes['~|'] || '' },
    ].filter(item => item.output);
  };

  // Generate consonant examples from the selected language
  const getConsonantExamples = () => {
    if (!selectedLang) return [];
    const config = selectedLang.config;
    const converter = new LanguageConverter(config);
    
    const consonants = [
      'k', 'kh', 'g', 'gh', 'G',
      'ch', 'Ch', 'j', 'jh', 'nY',
      't', 'T', 'd', 'D', 'N',
      'th', 'Th', 'dh', 'Dh', 'n',
      'p', 'ph', 'b', 'bh', 'm',
      'y', 'r', 'l', 'v',
      'sh', 'Sh', 's', 'h',
      'q', 'qh', 'gG', 'z', 'DdD',
      'RrR', 'f', 'Y', 'NnN', 'R', 'LlL', 'L'
    ];
    
    return consonants.map(cons => {
      const output = converter.convert(cons + 'a').replace(config.letterCodes['a'] || '', '');
      return { input: cons, output };
    }).filter(item => item.output && item.output !== item.input);
  };

  const vowelExamples = getVowelExamples();
  const consonantExamples = getConsonantExamples();

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Transliterate to {selectedLang?.name}</h1>
          <p className="text-muted-foreground mt-2">
            Type in English and see instant conversion to {selectedLang?.nativeName}
          </p>
        </div>

        {/* Classic Converter Layout */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Input */}
          <div>
            <h3 className="font-semibold mb-2 text-center bg-blue-100 py-2 rounded-t border border-b-0">
              Type your text here
            </h3>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[200px] font-mono text-base rounded-t-none border-blue-200"
              placeholder="Type here..."
            />
          </div>

          {/* Output */}
          <div>
            <h3 className="font-semibold mb-2 text-center bg-purple-100 py-2 rounded-t border border-b-0 flex items-center justify-between px-4">
              <span>See your results here</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                disabled={!outputText}
                className="gap-1 h-7"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3" />
                    <span className="text-xs">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span className="text-xs">Copy</span>
                  </>
                )}
              </Button>
            </h3>
            <Textarea
              value={outputText}
              readOnly
              className="min-h-[200px] text-xl leading-relaxed rounded-t-none border-purple-200"
              style={{ fontFamily: "system-ui" }}
            />
          </div>
        </div>

        {/* HTML Text Output */}
        <div>
          <h3 className="font-semibold mb-2 text-center bg-green-100 py-2 rounded-t border border-b-0">
            Equivalent HTML text
          </h3>
          <Textarea
            value={htmlText}
            readOnly
            className="min-h-[100px] font-mono text-sm rounded-t-none border-green-200"
          />
        </div>

        {/* Reference Tables */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Vowels Table */}
          <Card>
            <CardHeader className="text-center bg-blue-50">
              <CardTitle>The Vowels</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <table className="w-full border-collapse">
                <tbody>
                  {vowelExamples.reduce((rows: any[], item, index) => {
                    if (index % 3 === 0) rows.push([]);
                    rows[rows.length - 1].push(item);
                    return rows;
                  }, []).map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b">
                      {row.map((item: any, colIndex: number) => (
                        <React.Fragment key={colIndex}>
                          <td className="py-2 px-3 border-r font-mono text-sm">{item.input}</td>
                          <td className="py-2 px-3 text-2xl">{item.output}</td>
                        </React.Fragment>
                      ))}
                      {/* Fill empty cells if row has less than 3 items */}
                      {row.length < 3 && Array(3 - row.length).fill(null).map((_, i) => (
                        <React.Fragment key={`empty-${i}`}>
                          <td className="py-2 px-3 border-r"></td>
                          <td className="py-2 px-3"></td>
                        </React.Fragment>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Consonants Table */}
          <Card>
            <CardHeader className="text-center bg-orange-50">
              <CardTitle>The Consonants</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <table className="w-full border-collapse text-sm">
                <tbody>
                  {consonantExamples.reduce((rows: any[], item, index) => {
                    if (index % 3 === 0) rows.push([]);
                    rows[rows.length - 1].push(item);
                    return rows;
                  }, []).map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b">
                      {row.map((item: any, colIndex: number) => (
                        <React.Fragment key={colIndex}>
                          <td className="py-1.5 px-2 border-r font-mono">{item.input}</td>
                          <td className="py-1.5 px-2 text-xl bg-orange-50">{item.output}</td>
                        </React.Fragment>
                      ))}
                      {/* Fill empty cells if row has less than 3 items */}
                      {row.length < 3 && Array(3 - row.length).fill(null).map((_, i) => (
                        <React.Fragment key={`empty-${i}`}>
                          <td className="py-1.5 px-2 border-r"></td>
                          <td className="py-1.5 px-2"></td>
                        </React.Fragment>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default function ConverterPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]">Loading...</div>}>
      <ConverterContent />
    </Suspense>
  );
}
