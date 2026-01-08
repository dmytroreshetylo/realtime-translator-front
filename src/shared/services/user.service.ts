import { LocalStorageKeys } from '../constants/localstorage-keys.constant.ts';
import { localStorageService } from './localstorage.service.ts';

export class UserService {
  readonly identificator: string;

  constructor() {
    this.identificator = localStorageService.get<string>(LocalStorageKeys.Identificator) ?? crypto.randomUUID();
    localStorageService.set(LocalStorageKeys.Identificator, this.identificator);
  }
}

export const userService = new UserService();
