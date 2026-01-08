import { languageService } from '../../../domain/languages/language.service.ts';
import { getLanguageOptions } from './get-language-options.util.ts';

export function provideLanguageOptions(el: Element, exceptCode: string, selected: string): void{
  const languages = languageService.getLanguages();
  const availableLanguages = languages.filter((l) => l.code !== exceptCode);
  el.innerHTML = getLanguageOptions(availableLanguages, selected);
}