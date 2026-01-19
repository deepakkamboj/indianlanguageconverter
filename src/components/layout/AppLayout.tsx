"use client";

import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Full Width */}
      <Header />
      
      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isCollapsed={isCollapsed} onCollapse={setIsCollapsed} />
        
        {/* Main Content */}
        <main 
          className={`flex-1 bg-gray-50 overflow-y-auto transition-all duration-300 ${
            isCollapsed ? 'md:ml-16' : 'md:ml-64'
          }`}
        >
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </div>
      
      {/* Footer - Full Width */}
      <Footer />
    </div>
  );
}
