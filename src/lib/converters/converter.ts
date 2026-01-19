import { LanguageConfig } from './types';

export class LanguageConverter {
  private config: LanguageConfig;

  constructor(config: LanguageConfig) {
    this.config = config;
  }

  private splitWord(word: string): string[] {
    const syllables: string[] = [];
    let vowelStart = true;

    while (word.length) {
      const vowelRe = new RegExp(this.config.vowels);
      const vowelIndex = word.search(vowelRe);

      if (vowelIndex === 0) {
        const matched = vowelRe.exec(word)?.[0] || '';
        if (vowelStart) {
          syllables.push('~' + matched);
        } else {
          syllables.push(matched);
        }
        vowelStart = true;
        word = word.substring(matched.length);
      } else {
        const consonantRe = new RegExp(this.config.consonants);
        const consonantIndex = word.search(consonantRe);

        if (consonantIndex === 0) {
          const matched = consonantRe.exec(word)?.[0] || '';
          syllables.push(matched);
          vowelStart = false;
          word = word.substring(matched.length);

          const next = word.search(vowelRe);
          if (next !== 0 || word.length === 0) {
            syllables.push('*');
          }
        } else {
          syllables.push(word.charAt(0));
          word = word.substring(1);
        }
      }
    }

    return syllables;
  }

  private matchCode(syllable: string): string {
    const matched = this.config.letterCodes[syllable];
    return matched !== undefined ? matched : syllable;
  }

  private oneWord(word: string): string {
    if (!word) return '';
    const syllables = this.splitWord(word);
    const letters = syllables.map(syllable => this.matchCode(syllable));
    return letters.join('');
  }

  public convert(sentence: string): string {
    const regex = `((${this.config.vowels})|(${this.config.consonants}))+`;
    const words: string[] = [];
    let remaining = sentence;

    while (remaining.length >= 1) {
      let re = new RegExp(`^\\u0060\\u0060${regex}`);
      let match = re.exec(remaining);

      if (match !== null) {
        const matchedText = match[0];
        words.push('`');
        words.push(this.oneWord(matchedText.substring(2)));
        remaining = remaining.substring(matchedText.length);
      } else {
        re = new RegExp(`^\u0060${regex}`);
        match = re.exec(remaining);

        if (match !== null) {
          const matchedText = match[0];
          words.push(matchedText.substring(1));
          remaining = remaining.substring(matchedText.length);
        } else {
          re = new RegExp(`^${regex}`);
          match = re.exec(remaining);

          if (match !== null) {
            const matchedText = match[0];
            words.push(this.oneWord(matchedText));
            remaining = remaining.substring(matchedText.length);
          } else {
            words.push(remaining.charAt(0));
            remaining = remaining.substring(1);
          }
        }
      }
    }

    return words.join('');
  }
}
