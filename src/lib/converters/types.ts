export interface LanguageConfig {
  vowels: string;
  consonants: string;
  letterCodes: Record<string, string>;
}

export type LanguageType = 'hindi' | 'bengali' | 'tamil' | 'gujarati' | 'kannada' | 'malayalam' | 'oriya' | 'punjabi' | 'telugu';

export interface Language {
  id: LanguageType;
  name: string;
  nativeName: string;
  config: LanguageConfig;
}
