"use client";

import { Languages } from "lucide-react";

export function Header() {
  return (
    <header className="w-full border-b bg-white z-50">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center gap-2 flex-1">
          <Languages className="h-6 w-6 text-indigo-600" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ILC
          </h1>
        </div>

        <nav className="flex items-center gap-4">
          <a
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Dashboard
          </a>
          <a
            href="/converter"
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
          >
            Converter
          </a>
          <a
            href="https://github.com/deepakkamboj/indianlanguageconverter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
