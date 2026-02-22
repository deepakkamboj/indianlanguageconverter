"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink, X } from "lucide-react";
import aiTools from "@/data/ai-tools.json";

interface AITool {
  id: number;
  name: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
  pricing: "free" | "freemium" | "paid";
}

const tools = aiTools as AITool[];

const ALL_CATEGORIES = ["All", ...Array.from(new Set(tools.map((t) => t.category))).sort()];

const PRICING_OPTIONS = ["all", "free", "freemium", "paid"] as const;
type PricingOption = typeof PRICING_OPTIONS[number];

const PRICING_LABELS: Record<PricingOption, string> = {
  all: "All",
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

const PRICING_COLORS: Record<PricingOption, string> = {
  all: "bg-gray-800 text-white border-gray-800",
  free: "bg-green-100 text-green-700 border-green-200",
  freemium: "bg-blue-100 text-blue-700 border-blue-200",
  paid: "bg-amber-100 text-amber-700 border-amber-200",
};

const CATEGORY_COLORS: Record<string, string> = {
  "Chatbots": "from-violet-500 to-purple-600",
  "LLM Models": "from-indigo-500 to-blue-600",
  "Image Generation": "from-pink-500 to-rose-600",
  "Image Editing": "from-orange-500 to-red-500",
  "Image Recognition": "from-yellow-500 to-orange-500",
  "Video Generation": "from-red-500 to-pink-600",
  "Voice & Audio": "from-cyan-500 to-teal-600",
  "Music Generation": "from-emerald-500 to-green-600",
  "Code Assistants": "from-slate-500 to-gray-700",
  "Writing Assistants": "from-blue-500 to-indigo-600",
  "Productivity": "from-teal-500 to-cyan-600",
  "Presentation Tools": "from-purple-500 to-violet-600",
  "Search Engines": "from-sky-500 to-blue-600",
  "AI Agents": "from-fuchsia-500 to-purple-600",
  "Developer Tools": "from-gray-600 to-slate-700",
  "Education": "from-lime-500 to-green-600",
  "Summarizers": "from-amber-500 to-yellow-600",
  "AI Detection": "from-rose-500 to-red-600",
  "Data & Analytics": "from-blue-600 to-indigo-700",
  "Marketing": "from-orange-400 to-pink-500",
  "Phone Call AI": "from-green-500 to-emerald-600",
  "Prompt Tools": "from-violet-400 to-fuchsia-500",
  "Website & Design": "from-pink-400 to-violet-500",
  "Entertainment": "from-yellow-400 to-orange-500",
  "Finance": "from-emerald-600 to-teal-700",
  "AI Directories": "from-slate-400 to-gray-600",
  "AI Tools": "from-indigo-400 to-blue-500",
};

function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || "from-indigo-500 to-purple-600";
}

export default function AICatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPricing, setSelectedPricing] = useState<PricingOption>("all");

  const filteredTools = useMemo(() => {
    let result = tools;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((t) => t.category === selectedCategory);
    }

    if (selectedPricing !== "all") {
      result = result.filter((t) => t.pricing === selectedPricing);
    }

    return result;
  }, [searchQuery, selectedCategory, selectedPricing]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: tools.length };
    tools.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return counts;
  }, []);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedPricing("all");
  };

  const hasActiveFilters =
    searchQuery.trim() || selectedCategory !== "All" || selectedPricing !== "all";

  return (
    <div className="container mx-auto p-4 max-w-7xl space-y-6">
      {/* Header */}
      <Card className="border-2 border-indigo-100 bg-gradient-to-br from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            AI Tools Catalog
          </CardTitle>
          <p className="text-gray-600 mt-1">
            Discover {tools.length}+ curated AI tools, models, and platforms across{" "}
            {ALL_CATEGORIES.length - 1} categories
          </p>
        </CardHeader>
      </Card>

      {/* Search & Filters */}
      <Card className="border-2">
        <CardContent className="pt-5 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search tools, categories, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-5 text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-gray-500 flex-shrink-0">Category:</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-200">
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-sm border font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
                  }`}
                >
                  {cat}
                  {cat === "All" ? (
                    <span className="ml-1 text-xs opacity-75">({tools.length})</span>
                  ) : (
                    <span className="ml-1 text-xs opacity-75">({categoryCounts[cat] || 0})</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Filter */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-gray-500">Pricing:</span>
            {PRICING_OPTIONS.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPricing(p)}
                className={`px-3 py-1 rounded-full text-sm border font-medium transition-all ${
                  selectedPricing === p
                    ? PRICING_COLORS[p]
                    : "border-gray-200 text-gray-600 hover:border-gray-400"
                }`}
              >
                {PRICING_LABELS[p]}
              </button>
            ))}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-auto px-3 py-1 text-sm text-gray-500 hover:text-red-500 flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear filters
              </button>
            )}
          </div>

          {/* Result count */}
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-800">{filteredTools.length}</span>{" "}
            tools
            {selectedCategory !== "All" && (
              <span>
                {" "}in <span className="font-medium text-indigo-600">{selectedCategory}</span>
              </span>
            )}
          </p>
        </CardContent>
      </Card>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl font-medium">No tools found</p>
          <p className="text-sm mt-2">Try adjusting your search or filters</p>
          <Button onClick={clearFilters} variant="outline" className="mt-4">
            Clear all filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTools.map((tool) => (
            <a
              key={tool.id}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="border-2 rounded-xl p-4 h-full bg-white hover:shadow-lg hover:border-indigo-200 transition-all duration-200 flex flex-col">
                {/* Top row: gradient icon + name + external icon */}
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getCategoryColor(
                      tool.category
                    )} flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="text-white font-bold text-lg">
                      {tool.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <h3 className="font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                        {tool.name}
                      </h3>
                      <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-indigo-500 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-xs text-gray-500">{tool.category}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 flex-1 leading-relaxed line-clamp-3">
                  {tool.description}
                </p>

                {/* Footer: tags + pricing */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div className="flex flex-wrap gap-1 flex-1 min-w-0">
                    {tool.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {tool.tags.length > 2 && (
                      <span className="text-xs text-gray-400">+{tool.tags.length - 2}</span>
                    )}
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border font-medium flex-shrink-0 ml-2 ${
                      PRICING_COLORS[tool.pricing]
                    }`}
                  >
                    {PRICING_LABELS[tool.pricing]}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
