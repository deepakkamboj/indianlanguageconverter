import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Github, Heart, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about the Indian Language Converter project",
};

export default function AboutPage() {
  return (
    <>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">About the Project</h1>
          <p className="text-xl text-muted-foreground">
            A Modern Indian Language Converter
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>About This Project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Indian Language Converter is a modern web application built from scratch 
              by Deepak Kamboj to make typing in Indian languages accessible to everyone.
            </p>
            <p>
              Using phonetic transliteration, anyone who can type in English can easily 
              write in 9 major Indian languages. No special keyboard or software installation needed.
            </p>
            <p>
              This tool supports Hindi, Bengali, Tamil, Telugu, Gujarati, Kannada, Malayalam, 
              Oriya, and Punjabi - making it accessible to over a billion native speakers worldwide.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Creator</CardTitle>
            <CardDescription>
              Built with passion for Indian languages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-6 border rounded-lg bg-accent/5">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl">Deepak Kamboj</h3>
                  <p className="text-sm text-primary font-medium mb-2">Full Stack Developer</p>
                  <p className="text-muted-foreground mb-3">
                    Passionate about making Indian languages accessible in the digital world. 
                    This project combines modern web technologies with cultural preservation.
                  </p>
                  <div className="flex gap-3">
                    <a 
                      href="mailto:deepakkamboj@gmail.com"
                      className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      deepakkamboj@gmail.com
                    </a>
                    <a 
                      href="https://github.com/deepakkamboj"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
            <CardDescription>Built with modern web technologies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg text-center">
                <p className="font-semibold">Next.js 16</p>
                <p className="text-sm text-gray-600">React Framework</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="font-semibold">TypeScript</p>
                <p className="text-sm text-gray-600">Type Safety</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="font-semibold">Tailwind CSS</p>
                <p className="text-sm text-gray-600">Styling</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="font-semibold">shadcn/ui</p>
                <p className="text-sm text-gray-600">UI Components</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="font-semibold">Unicode</p>
                <p className="text-sm text-gray-600">Character Support</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="font-semibold">Vercel</p>
                <p className="text-sm text-gray-600">Deployment</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Open Source</CardTitle>
            <CardDescription>Free for everyone to use and contribute</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              This project is released under the GNU General Public License, making it free and
              open source. We believe that language tools should be accessible to everyone,
              without barriers or restrictions.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Github className="h-5 w-5" />
                View on GitHub
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-indigo-100 bg-gradient-to-br from-indigo-50 to-purple-50">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <Heart className="h-12 w-12 text-red-500 fill-red-500" />
              <h3 className="text-2xl font-bold">Get in Touch</h3>
              <p className="text-gray-700 max-w-md">
                Have feedback, suggestions, or want to contribute? We&apos;d love to hear from you!
              </p>
              <a
                href="mailto:liyer.vijay@gmail.com"
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Mail className="h-5 w-5" />
                Contact Us
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
