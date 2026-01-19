import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Deepak Kamboj. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for Indian Languages
          </p>
        </div>
      </div>
    </footer>
  );
}
