import { Language } from './types';
import { hindiConfig } from './hindi';
import { bengaliConfig } from './bengali';
import { tamilConfig } from './tamil';
import { gujaratiConfig } from './gujarati';
import { kannadaConfig } from './kannada';
import { malayalamConfig } from './malayalam';
import { oriyaConfig } from './oriya';
import { punjabiConfig } from './punjabi';
import { teluguConfig } from './telugu';

export const languages: Language[] = [
  { id: 'hindi', name: 'Hindi', nativeName: 'हिन्दी', config: hindiConfig },
  { id: 'bengali', name: 'Bengali', nativeName: 'বাংলা', config: bengaliConfig },
  { id: 'tamil', name: 'Tamil', nativeName: 'தமிழ்', config: tamilConfig },
  { id: 'gujarati', name: 'Gujarati', nativeName: 'ગુજરાતી', config: gujaratiConfig },
  { id: 'kannada', name: 'Kannada', nativeName: 'ಕನ್ನಡ', config: kannadaConfig },
  { id: 'malayalam', name: 'Malayalam', nativeName: 'മലയാളം', config: malayalamConfig },
  { id: 'oriya', name: 'Oriya', nativeName: 'ଓଡ଼ିଆ', config: oriyaConfig },
  { id: 'punjabi', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', config: punjabiConfig },
  { id: 'telugu', name: 'Telugu', nativeName: 'తెలుగు', config: teluguConfig },
];

export * from './types';
export * from './converter';
