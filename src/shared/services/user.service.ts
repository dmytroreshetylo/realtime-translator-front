import { LocalStorageKeys } from '../constants/localstorage-keys.constant.ts';

export class UserService {
  readonly identificator: string;

  constructor() {
    this.identificator = localStorage.getItem(LocalStorageKeys.Identificator) ?? crypto.randomUUID();

    localStorage.setItem(LocalStorageKeys.Identificator, this.identificator);
  }
}

export const userService = new UserService();