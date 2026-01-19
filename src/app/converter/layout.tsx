import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Language Converter",
  description: "Convert English text to Indian languages in real-time with Unicode support",
};

export default function ConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
