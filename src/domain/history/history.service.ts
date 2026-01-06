import type { HistoryModel } from './history.model.ts';

export class HistoryService {
  private list: HistoryModel[] = [];

  addHistory(history: Omit<HistoryModel, 'id' | 'date'>): void {
    const addHistory: HistoryModel = {
      id: this.list.length + 1,
      ...history,
      date: new Date()
    };

    this.list.push(addHistory);
  }

  getHistoryList(): HistoryModel[] {
    return this.list;
  }

  getMostPopularLanguage(): string {
    const rating = new Map<string, number>();

    this.list.forEach(item => {
      const count = rating.get(item.originalLanguage) || 0;
      rating.set(item.originalLanguage, count + 1);
    });

    if(rating.size === 0){
      return '';
    }

    const [mostPopular] = Array.from(rating.entries()).reduce((prev, current) => {
      return (current[1] > prev[1]) ? current : prev;
    });

    return mostPopular;
  }
}

export const historyService = new HistoryService();