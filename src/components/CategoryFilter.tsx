"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectCategory(category)}
          className={cn(
            "rounded-full transition-all duration-200",
            selectedCategory === category
              ? "shadow-md"
              : "hover:bg-accent/10"
          )}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};
