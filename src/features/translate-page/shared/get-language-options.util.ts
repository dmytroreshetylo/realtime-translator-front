import type { LanguageModel } from '../../../entities/languages/language.model.ts';

export function getLanguageOptions(languages: LanguageModel[], selected: string): string {
  const options = languages.map((l: LanguageModel) => {
    if(l.code === selected) {
      return `<option value="${l.code}" selected>${l.name}</option>`;
    }

    return `<option value="${l.code}">${l.name}</option>`;
  });

  if(!selected) {
    options.unshift('<option value="">Виберіть мову</option>');
  }

  return options.join('\n');
}