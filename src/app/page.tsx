"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Languages, 
  Zap, 
  Globe, 
  BookOpen,
  ArrowRight,
  Sparkles,
  Users,
  TrendingUp
} from "lucide-react";

export default function Home() {
  const languages = [
    { id: "hindi", name: "Hindi", native: "हिन्दी", users: "529M", gradient: "from-orange-400 to-red-500" },
    { id: "bengali", name: "Bengali", native: "বাংলা", users: "265M", gradient: "from-green-400 to-emerald-500" },
    { id: "tamil", name: "Tamil", native: "தமிழ்", users: "75M", gradient: "from-red-400 to-pink-500" },
    { id: "telugu", name: "Telugu", native: "తెలుగు", users: "82M", gradient: "from-yellow-400 to-orange-500" },
    { id: "gujarati", name: "Gujarati", native: "ગુજરાતી", users: "56M", gradient: "from-blue-400 to-indigo-500" },
    { id: "kannada", name: "Kannada", native: "ಕನ್ನಡ", users: "44M", gradient: "from-purple-400 to-violet-500" },
    { id: "malayalam", name: "Malayalam", native: "മലയാളം", users: "38M", gradient: "from-teal-400 to-cyan-500" },
    { id: "oriya", name: "Oriya", native: "ଓଡ଼ିଆ", users: "35M", gradient: "from-pink-400 to-rose-500" },
    { id: "punjabi", name: "Punjabi", native: "ਪੰਜਾਬੀ", users: "125M", gradient: "from-amber-400 to-yellow-500" },
  ];

  const features = [
    {
      icon: Zap,
      title: "Real-time Conversion",
      description: "Convert text instantly as you type with no delays",
    },
    {
      icon: Globe,
      title: "9 Languages Supported",
      description: "Support for all major Indian languages with Unicode",
    },
    {
      icon: BookOpen,
      title: "Easy to Use",
      description: "Simple phonetic typing - no special keyboard needed",
    },
    {
      icon: Sparkles,
      title: "Free & Open Source",
      description: "Completely free to use with open source code",
    },
  ];

  const stats = [
    { label: "Languages", value: "9", icon: Languages },
    { label: "Native Speakers", value: "1.2B+", icon: Users },
    { label: "Daily Users", value: "10K+", icon: TrendingUp },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
        <div className="text-center space-y-4 py-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Indian Language Converter
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transliterate from English to Indian languages with ease. 
            Support for 9 major languages with real-time conversion.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link href="/converter">
              <Button size="lg" className="gap-2 border-2 border-indigo-600 bg-indigo-600 hover:bg-indigo-700 hover:border-indigo-700">
                Start Converting
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="gap-2 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                <BookOpen className="h-4 w-4" />
                Documentation
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="border-2">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-100 rounded-lg">
                      <Icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="border-2 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg w-fit">
                      <Icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Languages Grid */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Supported Languages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {languages.map((lang) => (
              <Link key={lang.id} href={`/converter?lang=${lang.id}`}>
                <Card className="border-2 hover:border-indigo-300 hover:shadow-xl transition-all cursor-pointer group overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${lang.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                  <CardHeader className="relative">
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">{lang.name}</span>
                      <span className="text-2xl">{lang.native}</span>
                    </CardTitle>
                    <CardDescription className="flex items-center justify-between">
                      <span className="text-sm">
                        <Users className="h-3 w-3 inline mr-1" />
                        {lang.users} speakers
                      </span>
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Start converting your text to any Indian language in seconds. 
              No registration required, completely free to use.
            </p>
            <Link href="/converter">
              <Button size="lg" className="gap-2 border-2 border-indigo-600 bg-indigo-600 hover:bg-indigo-700 hover:border-indigo-700">
                Launch Converter
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
    </div>
  );
}
