"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Code, AlertCircle, CheckCircle, ChevronDown, ChevronRight, FileJson, Braces, Hash, Type, ToggleLeft } from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface TreeNodeProps {
  nodeKey: string;
  value: any;
  depth: number;
  onSelect: (path: string, value: any, type: string) => void;
  path: string;
}

function TreeNode({ nodeKey, value, depth, onSelect, path }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(depth < 2);
  const indent = depth * 20;

  const getValueType = (val: any): string => {
    if (val === null) return "null";
    if (Array.isArray(val)) return "array";
    return typeof val;
  };

  const getValuePreview = (val: any): string => {
    if (val === null) return "null";
    if (typeof val === "string") return `"${val.length > 50 ? val.substring(0, 50) + "..." : val}"`;
    if (typeof val === "number" || typeof val === "boolean") return String(val);
    if (Array.isArray(val)) return `Array[${val.length}]`;
    if (typeof val === "object") return `Object{${Object.keys(val).length}}`;
    return String(val);
  };

  const getIcon = (val: any) => {
    if (val === null) return <Hash className="h-4 w-4 text-purple-500" />;
    if (typeof val === "string") return <Type className="h-4 w-4 text-green-500" />;
    if (typeof val === "number") return <Hash className="h-4 w-4 text-orange-500" />;
    if (typeof val === "boolean") return <ToggleLeft className="h-4 w-4 text-blue-500" />;
    if (Array.isArray(val)) return <Braces className="h-4 w-4 text-yellow-600" />;
    if (typeof val === "object") return <FileJson className="h-4 w-4 text-indigo-500" />;
    return <Code className="h-4 w-4 text-gray-500" />;
  };

  const isExpandable = typeof value === "object" && value !== null;
  const valueType = getValueType(value);
  const currentPath = path ? `${path}.${nodeKey}` : nodeKey;

  const handleClick = () => {
    onSelect(currentPath, value, valueType);
    if (isExpandable) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div>
      <div
        className="flex items-center gap-2 py-1 px-2 hover:bg-gray-100 rounded cursor-pointer group"
        style={{ marginLeft: `${indent}px` }}
        onClick={handleClick}
      >
        {isExpandable ? (
          isExpanded ? (
            <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-500 flex-shrink-0" />
          )
        ) : (
          <span className="w-4 flex-shrink-0" />
        )}
        {getIcon(value)}
        <span className="font-medium text-sm text-gray-700">{nodeKey}:</span>
        <span className="text-sm text-gray-500 truncate">{getValuePreview(value)}</span>
      </div>

      {isExpandable && isExpanded && (
        <div>
          {Array.isArray(value)
            ? value.map((item, index) => (
                <TreeNode
                  key={index}
                  nodeKey={`[${index}]`}
                  value={item}
                  depth={depth + 1}
                  onSelect={onSelect}
                  path={currentPath}
                />
              ))
            : Object.entries(value).map(([key, val]) => (
                <TreeNode
                  key={key}
                  nodeKey={key}
                  value={val}
                  depth={depth + 1}
                  onSelect={onSelect}
                  path={currentPath}
                />
              ))}
        </div>
      )}
    </div>
  );
}

export default function JsonViewerPage() {
  const [textInput, setTextInput] = useState("");
  const [activeTab, setActiveTab] = useState<"text" | "viewer">("text");
  const [parsedJson, setParsedJson] = useState<any>(null);
  const [jsonError, setJsonError] = useState<string>("");
  const [selectedNode, setSelectedNode] = useState<{
    path: string;
    value: any;
    type: string;
  } | null>(null);
  const { showToast } = useToast();

  const handleTextChange = (value: string) => {
    setTextInput(value);
    setJsonError("");

    if (value.trim()) {
      try {
        const parsed = JSON.parse(value);
        setParsedJson(parsed);
      } catch (err: any) {
        setJsonError(err.message);
        setParsedJson(null);
      }
    } else {
      setParsedJson(null);
      setJsonError("");
    }
  };

  const handleFormatJson = () => {
    if (parsedJson !== null) {
      const formatted = JSON.stringify(parsedJson, null, 2);
      setTextInput(formatted);
      showToast("JSON formatted successfully!");
    }
  };

  const handleMinifyJson = () => {
    if (parsedJson !== null) {
      const minified = JSON.stringify(parsedJson);
      setTextInput(minified);
      showToast("JSON minified successfully!");
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard!");
    } catch (err) {
      console.error('Failed to copy:', err);
      showToast('Failed to copy');
    }
  };

  const handleNodeSelect = (path: string, value: any, type: string) => {
    setSelectedNode({ path, value, type });
  };

  const renderPropertyValue = (value: any): string => {
    if (value === null) return "null";
    if (typeof value === "string") return value;
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    if (Array.isArray(value)) return JSON.stringify(value, null, 2);
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    return String(value);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">JSON Viewer</h1>
        <p className="text-gray-600 mt-2">
          Paste JSON string content and view it in a formatted, readable structure
        </p>
      </div>

      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <p className="text-sm text-gray-700">
            <Code className="inline h-4 w-4 mr-1" />
            Paste your JSON string to view it in a formatted structure. Works with nested objects and arrays!
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>JSON Input</CardTitle>
              <CardDescription>Paste your JSON string content here</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleFormatJson}
                variant="outline"
                size="sm"
                disabled={!parsedJson}
              >
                Format
              </Button>
              <Button
                onClick={handleMinifyJson}
                variant="outline"
                size="sm"
                disabled={!parsedJson}
              >
                Minify
              </Button>
              <Button
                onClick={() => copyToClipboard(textInput)}
                variant="outline"
                size="sm"
                disabled={!textInput}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            {/* Tab Headers */}
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab("text")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === "text"
                    ? "bg-white text-indigo-700 border-b-2 border-indigo-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Text
              </button>
              <button
                onClick={() => setActiveTab("viewer")}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === "viewer"
                    ? "bg-white text-indigo-700 border-b-2 border-indigo-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Viewer
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-4">
              {activeTab === "text" && (
                <div>
                  <Textarea
                    value={textInput}
                    onChange={(e) => handleTextChange(e.target.value)}
                    placeholder='Paste your JSON here... e.g. {"name": "John", "age": 30}'
                    className="min-h-[400px] font-mono text-sm"
                  />
                  {jsonError && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-800">Invalid JSON</p>
                        <p className="text-sm text-red-700 mt-1">{jsonError}</p>
                      </div>
                    </div>
                  )}
                  {!jsonError && textInput && parsedJson !== null && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <p className="text-sm text-green-800">Valid JSON</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "viewer" && (
                <div className="min-h-[400px] flex gap-4">
                  {/* Tree Structure Panel */}
                  <div className="flex-1 p-4 bg-gray-50 rounded-md overflow-auto">
                    {parsedJson !== null ? (
                      <div className="font-mono text-sm">
                        {Array.isArray(parsedJson) ? (
                          parsedJson.map((item, index) => (
                            <TreeNode
                              key={index}
                              nodeKey={`[${index}]`}
                              value={item}
                              depth={0}
                              onSelect={handleNodeSelect}
                              path=""
                            />
                          ))
                        ) : typeof parsedJson === "object" ? (
                          Object.entries(parsedJson).map(([key, val]) => (
                            <TreeNode
                              key={key}
                              nodeKey={key}
                              value={val}
                              depth={0}
                              onSelect={handleNodeSelect}
                              path=""
                            />
                          ))
                        ) : (
                          <div className="p-4">
                            <span className="text-sm text-gray-700">
                              Primitive value: {JSON.stringify(parsedJson)}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                        <Code className="h-16 w-16 mb-4" />
                        <p className="text-lg">No valid JSON to display</p>
                        <p className="text-sm mt-2">
                          {jsonError ? "Please fix the JSON errors in the Text tab" : "Paste JSON content in the Text tab"}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Properties Panel */}
                  <div className="w-80 p-4 bg-white border border-gray-200 rounded-md overflow-auto">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <FileJson className="h-4 w-4" />
                      Properties
                    </h3>
                    {selectedNode ? (
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-medium text-gray-500 uppercase">Path</label>
                          <p className="text-sm text-gray-900 font-mono mt-1 break-all">
                            {selectedNode.path || "root"}
                          </p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-500 uppercase">Type</label>
                          <p className="text-sm text-gray-900 mt-1">
                            <span className="inline-flex items-center px-2 py-1 rounded-md bg-indigo-100 text-indigo-700 font-medium">
                              {selectedNode.type}
                            </span>
                          </p>
                        </div>
                        {selectedNode.type === "array" && (
                          <div>
                            <label className="text-xs font-medium text-gray-500 uppercase">Length</label>
                            <p className="text-sm text-gray-900 mt-1">{selectedNode.value.length}</p>
                          </div>
                        )}
                        {selectedNode.type === "object" && (
                          <div>
                            <label className="text-xs font-medium text-gray-500 uppercase">Keys</label>
                            <p className="text-sm text-gray-900 mt-1">{Object.keys(selectedNode.value).length}</p>
                          </div>
                        )}
                        {selectedNode.type === "string" && (
                          <div>
                            <label className="text-xs font-medium text-gray-500 uppercase">Length</label>
                            <p className="text-sm text-gray-900 mt-1">{selectedNode.value.length} characters</p>
                          </div>
                        )}
                        <div>
                          <label className="text-xs font-medium text-gray-500 uppercase">Value</label>
                          <div className="mt-1 p-2 bg-gray-50 rounded border border-gray-200">
                            <pre className="text-xs text-gray-900 whitespace-pre-wrap break-all font-mono">
                              {renderPropertyValue(selectedNode.value)}
                            </pre>
                          </div>
                        </div>
                        <Button
                          onClick={() => copyToClipboard(renderPropertyValue(selectedNode.value))}
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Value
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <FileJson className="h-12 w-12 mb-2" />
                        <p className="text-sm text-center">
                          Click on any node in the tree to view its properties
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
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
            <li>Paste your JSON string in the Text tab</li>
            <li>The viewer will automatically validate your JSON</li>
            <li>Switch to the Viewer tab to see the tree structure</li>
            <li>Click on any node to expand/collapse and view its properties</li>
            <li>View detailed information in the Properties panel</li>
            <li>Use Format button to prettify your JSON</li>
            <li>Use Minify button to compress your JSON</li>
            <li>Copy values from the Properties panel or the entire JSON</li>
          </ol>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-gray-700">
              <strong>Features:</strong> Real-time validation, expandable tree structure, properties inspector,
              type indicators with icons, format/minify options, and support for deeply nested objects and arrays.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
