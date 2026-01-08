import { httpService } from '../../shared/services/http.service.ts';

export class TranslateService {
  translate(text: string, originalLanguage: string, translateLanguage: string): Promise<string | undefined> {

    return httpService.request<string>('post', '/translate', { text, originalLanguage, translateLanguage });
  }
}

export const translateService = new TranslateService();