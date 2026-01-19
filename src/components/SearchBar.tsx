"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-2xl">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search emojis... (e.g., happy, arrow, business)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 pr-4 h-14 text-lg rounded-full bg-card shadow-md border-border focus-visible:ring-ring"
      />
    </div>
  );
};
