// Nepali Font Converters
// Ported from various Nepali font conversion libraries

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Preeti to Unicode converter
export function preetiToUnicode(text: string): string {
  if (!text) return "";

  const array_one = [
    "!", "=", "#", "$", "%", "^", "&", "*", ")", "_", "+",
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}",
    "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\"",
    "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?",
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
    "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'",
    "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",
    "`", "~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-"
  ];

  const array_two = [
    "१", "ज्ञ", "घ", "ध", "भ", "छ", "ट", "ठ", "ड", "ढ", "ण",
    "त्त", "द्ध", "द्द", "र्‍", "ज्ञ्", "त्र", "ठ्ठ", "ड्ड", "ठ्ठ", "ड्ढ", "ङ्क", "ङ्ग",
    "ा", "ी", "ु", "ू", "े", "ै", "ो", "ौ", "ं", ":", "\"",
    "श्र", "क्ष", "त्र्", "ृ", "द्य", "ट्ट", "ड्ड", "र्‍", "॥", "?",
    "त्र", "ध्र", "घ्र", "थ्र", "द्र", "प्र", "ग्र", "रु", "रू", "फ", "ॐ", "र्‍",
    "क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ", "ट",
    "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न", "प", "फ",
    "ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स", "ह",
    "क्ष", "त्र", "ज्ञ", "०", "१", "२", "३", "४", "५", "६", "७", "८", "९", "्"
  ];

  let modified_substring = text;

  // Replace array_one elements with array_two elements
  for (let i = 0; i < array_one.length; i++) {
    const pattern = new RegExp(escapeRegExp(array_one[i]), 'g');
    modified_substring = modified_substring.replace(pattern, array_two[i]);
  }

  return modified_substring;
}

// Unicode to Preeti converter
export function unicodeToPreeti(text: string): string {
  if (!text) return "";

  const array_one = [
    "१", "ज्ञ", "घ", "ध", "भ", "छ", "ट", "ठ", "ड", "ढ", "ण",
    "त्त", "द्ध", "द्द", "र्‍", "ज्ञ्", "त्र", "ठ्ठ", "ड्ड", "ङ्क", "ङ्ग",
    "ा", "ी", "ु", "ू", "े", "ै", "ो", "ौ", "ं", ":",
    "श्र", "क्ष", "त्र्", "ृ", "द्य", "ट्ट", "ड्ड", "॥",
    "ध्र", "घ्र", "थ्र", "द्र", "प्र", "ग्र", "रु", "रू", "फ", "ॐ",
    "क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ",
    "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न", "प",
    "ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स", "ह",
    "०", "२", "३", "४", "५", "६", "७", "८", "९", "्"
  ];

  const array_two = [
    "!", "=", "#", "$", "%", "^", "&", "*", ")", "_", "+",
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{",
    "A", "S", "D", "F", "G", "H", "J", "K", "L", ":",
    "Z", "X", "C", "V", "B", "N", "M", ">",
    "w", "e", "r", "t", "y", "g", "i", "o", "p", "[",
    "a", "s", "d", "f", "h", "j", "k", "l", ";",
    "*", ")", "(", "%", "^", "&", "!", "b", "n", "m", "u",
    "z", "x", "c", "v", ",", ".", "/",
    "0", "2", "3", "4", "5", "6", "7", "8", "9", "-"
  ];

  let modified_substring = text;

  // Replace array_one elements with array_two elements
  for (let i = 0; i < array_one.length; i++) {
    const pattern = new RegExp(escapeRegExp(array_one[i]), 'g');
    modified_substring = modified_substring.replace(pattern, array_two[i]);
  }

  return modified_substring;
}

// Generic converter function that routes to specific converters
export function convertNepaliFont(
  text: string,
  fromFont: string,
  toFont: string
): string {
  if (!text) return "";

  // If converting from Unicode
  if (fromFont === "unicode") {
    switch (toFont) {
      case "preeti":
        return unicodeToPreeti(text);
      case "cv-nepali-fancy":
      case "anuradha":
      case "bahun":
      default:
        // For now, only Preeti is fully implemented
        // Other fonts would need their specific conversion tables
        return `[${toFont} conversion not yet implemented]\n${text}`;
    }
  }

  // If converting to Unicode
  if (toFont === "unicode") {
    switch (fromFont) {
      case "preeti":
        return preetiToUnicode(text);
      case "cv-nepali-fancy":
      case "anuradha":
      case "bahun":
      default:
        // For now, only Preeti is fully implemented
        return `[${fromFont} conversion not yet implemented]\n${text}`;
    }
  }

  // If converting between two non-Unicode fonts, convert via Unicode
  const unicodeText = convertNepaliFont(text, fromFont, "unicode");
  return convertNepaliFont(unicodeText, "unicode", toFont);
}
