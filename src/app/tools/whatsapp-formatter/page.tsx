"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Bold, Italic, Strikethrough, Code } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/toast";

export default function WhatsAppFormatterPage() {
  const [text, setText] = useState("");
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  const [formattedPreview, setFormattedPreview] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    // Update preview with formatted HTML
    updatePreview(text);
  }, [text]);

  const updatePreview = (inputText: string) => {
    let preview = inputText;
    
    // Convert WhatsApp formatting to HTML
    // Bold: *text* -> <strong>text</strong>
    preview = preview.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
    
    // Italic: _text_ -> <em>text</em>
    preview = preview.replace(/_([^_]+)_/g, '<em>$1</em>');
    
    // Strikethrough: ~text~ -> <del>text</del>
    preview = preview.replace(/~([^~]+)~/g, '<del>$1</del>');
    
    // Monospace: ```text``` -> <code>text</code>
    preview = preview.replace(/```([^`]+)```/g, '<code>$1</code>');
    
    setFormattedPreview(preview || '&nbsp;');
  };

  const handleTextSelection = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setSelectionStart(target.selectionStart);
    setSelectionEnd(target.selectionEnd);
  };

  const applyFormat = (formatType: 'bold' | 'italic' | 'strikethrough' | 'monospace') => {
    if (selectionStart === selectionEnd) {
      return; // No text selected
    }

    const before = text.substring(0, selectionStart);
    const selected = text.substring(selectionStart, selectionEnd);
    const after = text.substring(selectionEnd);

    let formatted = '';
    switch (formatType) {
      case 'bold':
        formatted = `${before}*${selected}*${after}`;
        break;
      case 'italic':
        formatted = `${before}_${selected}_${after}`;
        break;
      case 'strikethrough':
        formatted = `${before}~${selected}~${after}`;
        break;
      case 'monospace':
        formatted = `${before}\`\`\`${selected}\`\`\`${after}`;
        break;
    }

    setText(formatted);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      showToast('WhatsApp text copied!');
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
          <h1 className="text-4xl font-bold text-gray-900">WhatsApp Text Formatter</h1>
          <p className="text-gray-600 mt-2">
            Create formatted WhatsApp messages with ease to paste in WhatsApp Web
          </p>
        </div>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <p className="text-sm text-gray-700">
              A tool for power WhatsApp users, especially those using{" "}
              <a
                href="https://web.whatsapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 font-semibold hover:underline"
              >
                WhatsApp Web
              </a>
              . Create formatted WhatsApp messages with ease to paste in WhatsApp Web.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Formatted Preview</CardTitle>
            <CardDescription>See how your message will look in WhatsApp</CardDescription>
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
                <CardTitle>WhatsApp Text</CardTitle>
                <CardDescription>Type your message and apply formatting</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  title="Copy WhatsApp Text"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => applyFormat('bold')}
                  disabled={!hasSelection}
                  variant="outline"
                  size="sm"
                  title="Bold (*text*)"
                  className="font-bold"
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => applyFormat('italic')}
                  disabled={!hasSelection}
                  variant="outline"
                  size="sm"
                  title="Italic (_text_)"
                  className="italic"
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => applyFormat('strikethrough')}
                  disabled={!hasSelection}
                  variant="outline"
                  size="sm"
                  title="Strikethrough (~text~)"
                >
                  <Strikethrough className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => applyFormat('monospace')}
                  disabled={!hasSelection}
                  variant="outline"
                  size="sm"
                  title="Monospace (```text```)"
                >
                  <Code className="h-4 w-4" />
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
              placeholder="WhatsApp Message Text"
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
                    <p className="font-semibold">Bold</p>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">*text*</code>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Italic className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-semibold">Italic</p>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">_text_</code>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Strikethrough className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-semibold">Strikethrough</p>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">~text~</code>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Code className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-semibold">Monospace</p>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">```text```</code>
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
              <li>Type or paste your message in the WhatsApp Text box</li>
              <li>Select the text you want to format</li>
              <li>Click the appropriate formatting button (Bold, Italic, etc.)</li>
              <li>Preview your formatted message in the Formatted Preview section</li>
              <li>Click the Copy button to copy the formatted text</li>
              <li>Paste it into WhatsApp Web and send!</li>
            </ol>
          </CardContent>
        </Card>

       
      </div>
    </>
  );
}
