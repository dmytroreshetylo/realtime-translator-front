import type { LanguageModel } from './language.model.ts';

export class LanguageService {
  private readonly list: LanguageModel[]  = [
    { code: 'en', name: 'Англійська' },
    { code: 'fr', name: 'Французька' },
    { code: 'de', name: 'Німецька' },
    { code: 'es', name: 'Іспанська' },
    { code: 'it', name: 'Італійська' },
    { code: 'pt', name: 'Португальська' },
    { code: 'uk', name: 'Українська' },
    { code: 'zh', name: 'Китайська' },
    { code: 'ja', name: 'Японська' },
    { code: 'ko', name: 'Корейська' }
  ]

  getLanguages() {
    return this.list;
  }
}

export const languageService = new LanguageService();