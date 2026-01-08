export class LocalStorageService {
  get<T>(key: string): T | null {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error getting data from localStorage for key "${key}"`, error);
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      const data = JSON.stringify(value);
      localStorage.setItem(key, data);
    } catch (error) {
      console.error(`Error setting data to localStorage for key "${key}"`, error);
    }
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}

export const localStorageService = new LocalStorageService();
