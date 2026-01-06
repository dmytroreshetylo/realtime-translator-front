import type { HistoryModel } from './history.model.ts';

export class HistoryService {
  private list: HistoryModel[] = [];

  addHistory(history: Omit<HistoryModel, 'date'>): void {
    const addHistory: HistoryModel = {
      ...history,
      date: new Date()
    };

    this.list.push(addHistory);
  }

  removeHistory(history: HistoryModel): void {
    this.list = this.list.filter(item => item.id !== history.id);
  }

  getHistoryList(): HistoryModel[] {
    return this.list;
  }

  getMostPopularLanguage(): string {
    const rating = new Map<string, number>();

    this.list.forEach(item => {
      const count = rating.get(item.translatedLanguage) || 0;
      rating.set(item.translatedLanguage, count + 1);
    });

    const [mostPopular] = Array.from(rating.entries()).reduce((prev, current) => {
      return (current[1] > prev[1]) ? current : prev;
    });

    return mostPopular;
  }
}

export const historyService = new HistoryService();