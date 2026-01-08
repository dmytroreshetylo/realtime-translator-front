import { httpService } from '../../shared/services/http.service.ts';
import type { HistoryModel } from './history.model.ts';
import type { PaginatedListModel } from '../../shared/models/paginated-list.model.ts';

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
