import type { LanguageModel } from './language.model.ts';

export class LanguageService {
  private readonly list: LanguageModel[]  = [
    { code: 'english', name: 'Англійська' },
    { code: 'french', name: 'Французька' },
    { code: 'german', name: 'Німецька' },
    { code: 'spanish', name: 'Іспанська' },
    { code: 'italian', name: 'Італійська' },
    { code: 'portuguese', name: 'Португальська' },
    { code: 'ukrainian', name: 'Українська' },
    { code: 'chinese', name: 'Китайська' },
    { code: 'japanese', name: 'Японська' },
    { code: 'korean', name: 'Корейська' }
  ]

  getLanguages() {
    return this.list;
  }
}

export const languageService = new LanguageService();