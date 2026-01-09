import { httpService } from './http.service.ts';
import type { HistoryModel } from '../../entities/history/history.model.ts';
import type { PaginatedListModel } from '../models/paginated-list.model.ts';

export class HistoryService {
  getHistoryList(from: number, to: number): Promise<PaginatedListModel<HistoryModel>> {
    return httpService.request('post', `/history/list`, { from, to });
  }

  getMostPopularLanguage(): Promise<string> {
    return httpService.request<string | null>('get', '/history/most-popular-original-language').then(value => {
      return value ?? 'Не встановлено'
    });
  }
}

export const historyService = new HistoryService();
