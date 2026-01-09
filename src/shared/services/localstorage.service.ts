export class LocalStorageService {
  get<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  set<T>(key: string, value: T): void {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}

export const localStorageService = new LocalStorageService();
