"use client";

import { useState, useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { EmojiCard } from "@/components/EmojiCard";
import { emojiDatabase, categories } from "@/data/emojis";
import { Sparkles } from "lucide-react";

export default function EmojiAssistantPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredEmojis = useMemo(() => {
    let filtered = emojiDatabase;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((emoji) => emoji.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (emoji) =>
          emoji.name.toLowerCase().includes(query) ||
          emoji.keywords.some((keyword) => keyword.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  return (
    <>
      <div className="min-h-screen">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col items-center gap-6">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-2xl shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Emoji Assistant</h1>
                <p className="text-sm text-gray-600">
                  Professional emojis for your posts & articles
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            {/* Category Filter */}
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
        </div>

        {/* Main Content */}
        <main>
          {filteredEmojis.length > 0 ? (
            <>
              <div className="text-center mb-6">
                <p className="text-gray-600">
                  {filteredEmojis.length} emoji{filteredEmojis.length !== 1 ? "s" : ""} found
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Click any emoji to copy it to clipboard
                </p>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
                {filteredEmojis.map((emoji, index) => (
                  <EmojiCard
                    key={`${emoji.emoji}-${index}`}
                    emoji={emoji.emoji}
                    name={emoji.name}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-600 mb-2">No emojis found</p>
              <p className="text-gray-500">
                Try a different search term or category
              </p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 mt-16 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>
              Made for professionals • Click to copy • Safe for LinkedIn, Facebook & more
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
