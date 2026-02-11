"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface Logo {
  name: string;
  shortname: string;
  url: string;
  files: string[];
}

export default function LogoDownloaderPage() {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  // Get base path for GitHub Pages
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  // Load logos from JSON
  useEffect(() => {
    fetch(`${basePath}/logos.json`)
      .then((res) => res.json())
      .then((data) => {
        setLogos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load logos:", err);
        setLoading(false);
      });
  }, [basePath]);

  // Filter logos based on search query
  const filteredLogos = useMemo(() => {
    if (!searchQuery.trim()) return logos;

    const query = searchQuery.toLowerCase();
    return logos.filter(
      (logo) =>
        logo.name.toLowerCase().includes(query) ||
        logo.shortname.toLowerCase().includes(query)
    );
  }, [logos, searchQuery]);

  // Download SVG file
  const handleDownload = async (filename: string) => {
    try {
      const response = await fetch(`${basePath}/logos/${filename}`);
      const svgContent = await response.text();
      const blob = new Blob([svgContent], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToast(`Downloaded ${filename}`);
    } catch (err) {
      console.error("Download failed:", err);
      showToast("Failed to download logo");
    }
  };

  // Copy SVG code to clipboard
  const handleCopySVG = async (filename: string) => {
    try {
      const response = await fetch(`${basePath}/logos/${filename}`);
      const svgContent = await response.text();
      await navigator.clipboard.writeText(svgContent);
      showToast("SVG code copied to clipboard!");
    } catch (err) {
      console.error("Copy failed:", err);
      showToast("Failed to copy SVG code");
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Logo Downloader</CardTitle>
          <p className="text-gray-600 mt-2">
            Browse and download high-quality SVG logos for your projects
          </p>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search logos (e.g., Adobe, React, Google)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-lg py-6"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {filteredLogos.length} logo{filteredLogos.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading logos...</p>
            </div>
          )}

          {/* No Results */}
          {!loading && filteredLogos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No logos found matching &quot;{searchQuery}&quot;</p>
            </div>
          )}

          {/* Logo Grid */}
          {!loading && filteredLogos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredLogos.map((logo, index) => (
                <div
                  key={`${logo.shortname}-${index}`}
                  className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white"
                >
                  {/* Logo Preview */}
                  <div className="flex items-center justify-center h-24 mb-3 bg-gray-50 rounded">
                    <img
                      src={`${basePath}/logos/${logo.files[0]}`}
                      alt={logo.name}
                      className="max-w-full max-h-full object-contain p-2"
                      loading="lazy"
                    />
                  </div>

                  {/* Logo Name */}
                  <h3 className="font-semibold text-sm mb-2 text-center truncate" title={logo.name}>
                    {logo.name}
                  </h3>

                  {/* Actions */}
                  <div className="space-y-2">
                    {logo.files.map((file) => (
                      <div key={file} className="flex gap-2">
                        <Button
                          onClick={() => handleDownload(file)}
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          {logo.files.length > 1 ? (file.includes("icon") ? "Icon" : "Full") : "Download"}
                        </Button>
                        <Button
                          onClick={() => handleCopySVG(file)}
                          variant="outline"
                          size="sm"
                          className="px-2"
                          title="Copy SVG code"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}

                    {/* Website Link */}
                    {logo.url && (
                      <a
                        href={logo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 text-xs text-blue-600 hover:text-blue-800 py-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Website
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
