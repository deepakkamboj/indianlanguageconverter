"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface EmojiCardProps {
  emoji: string;
  name: string;
}

export const EmojiCard = ({ emoji, name }: EmojiCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emoji);
      alert(`Copied: ${emoji} ${name}`);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative flex flex-col items-center justify-center",
        "bg-card rounded-lg p-4 transition-all duration-200",
        "hover:shadow-lg hover:scale-105 hover:bg-accent/5",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "active:scale-95"
      )}
      title={`Click to copy ${name}`}
    >
      <span className="text-4xl mb-2 transition-transform duration-200 group-hover:scale-110">
        {emoji}
      </span>
      {isHovered && (
        <span className="absolute bottom-1 text-xs text-muted-foreground whitespace-nowrap">
          {name}
        </span>
      )}
    </button>
  );
};
