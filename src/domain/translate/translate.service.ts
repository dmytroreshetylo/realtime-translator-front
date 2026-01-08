import { userService } from '../../shared/services/user.service.ts';

export class TranslateService {
  translate(text: string, originalLanguage: string, translateLanguage: string): Promise<string | undefined> {

    return fetch(
      'http://localhost:3000/translate',
      {
        method: 'post',
        body: JSON.stringify({ text, originalLanguage, translateLanguage }),
        headers: {
          'Content-Type': 'application/json',
          'uuid': userService.identificator
        }
      }
    ).then(res => res.json())
  }
}

export const translateService = new TranslateService();