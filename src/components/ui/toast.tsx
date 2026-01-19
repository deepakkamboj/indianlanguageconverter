"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  message: string;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
      <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[200px]">
        <span className="flex-1">{message}</span>
        <button
          onClick={onClose}
          className="text-gray-300 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

interface ToastContextValue {
  showToast: (message: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = React.useState<string | null>(null);

  const showToast = React.useCallback((message: string) => {
    setToast(message);
  }, []);

  const hideToast = React.useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast} onClose={hideToast} />}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.use(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
