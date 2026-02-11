"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Languages,
  BookOpen,
  Info,
  PanelLeftClose,
  PanelLeft,
  Wrench,

  Smile,
  LinkedinIcon,
  BoldIcon,
  MessageSquare,
  FileText,
  Code,
  Video,
  Image,
  Type
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isCollapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const menuItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Documentation",
    href: "/docs",
    icon: BookOpen,
  },
  {
    title: "About",
    href: "/about",
    icon: Info,
  },
];

const languageItems = [
  { title: "Hindi", href: "/converter?lang=hindi", native: "हिन्दी" },
  { title: "Bengali", href: "/converter?lang=bengali", native: "বাংলা" },
  { title: "Tamil", href: "/converter?lang=tamil", native: "தமிழ்" },
  { title: "Telugu", href: "/converter?lang=telugu", native: "తెలుగు" },
  { title: "Gujarati", href: "/converter?lang=gujarati", native: "ગુજરાતી" },
  { title: "Kannada", href: "/converter?lang=kannada", native: "ಕನ್ನಡ" },
  { title: "Malayalam", href: "/converter?lang=malayalam", native: "മലയാളം" },
  { title: "Oriya", href: "/converter?lang=oriya", native: "ଓଡ଼ିଆ" },
  { title: "Punjabi", href: "/converter?lang=punjabi", native: "ਪੰਜਾਬੀ" },
];

const toolsItems = [
  {
    title: "Emoji Assistant",
    href: "/tools/emoji-assistant",
    icon: Smile,
  },
  {
    title: "Kruti Dev Converter",
    href: "/tools/kruti-dev-converter",
    icon: FileText,
  },
  {
    title: "Nepali Converter",
    href: "/tools/nepali-converter",
    icon: Languages,
  },
  {
    title: "WhatsApp Formatter",
    href: "/tools/whatsapp-formatter",
    icon: MessageSquare,
  },
  {
    title: "Bold Text Generator",
    href: "/tools/bold-text-generator",
    icon: BoldIcon,
  },
  {
    title: "LinkedIn Formatter",
    href: "/tools/linkedin-formatter",
    icon: LinkedinIcon,
  },
  {
    title: "LinkedIn Video Downloader",
    href: "/tools/linkedin-video-downloader",
    icon: Video,
  },
  {
    title: "JSON Viewer",
    href: "/tools/json-viewer",
    icon: Code,
  },
  {
    title: "Logo Downloader",
    href: "/tools/logo-downloader",
    icon: Image,
  },
  {
    title: "Fonts",
    href: "/tools/fonts",
    icon: Type,
  },
];

export function Sidebar({ isCollapsed, onCollapse }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden md:block fixed left-0 top-16 bg-white border-r transition-all duration-300",
        "h-[calc(100vh-4rem-3.5rem)]",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Collapse Toggle */}
        <div className="flex items-center justify-end p-2 border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onCollapse(!isCollapsed)}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100",
                    isCollapsed && "justify-center px-2"
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              );
            })}
          </div>

          {/* Languages Section */}
          {!isCollapsed && (
            <div className="pt-4">
              <div className="px-3 mb-2">
                <span className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2">
                  <Languages className="h-3 w-3" />
                  Languages
                </span>
              </div>
              <div className="space-y-1">
                {languageItems.map((item) => {
                  const isActive = pathname.includes(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                        isActive
                          ? "bg-indigo-50 text-indigo-700 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <span>{item.title}</span>
                      <span className="text-xs opacity-70">{item.native}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tools Section */}
          {!isCollapsed && (
            <div className="pt-4">
              <div className="px-3 mb-2">
                <span className="text-xs font-semibold text-gray-500 uppercase">Tools</span>
              </div>
              <div className="space-y-1">
                {toolsItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tools as icons when collapsed */}
          {isCollapsed && (
            <div className="space-y-1 pt-4 border-t">
              {toolsItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-center px-2 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    title={item.title}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                  </Link>
                );
              })}
            </div>
          )}
        </nav>
      </div>
    </aside>
  );
}
