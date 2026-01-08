import { ServerPath } from '../constants/server-path.constant.ts';
import { userService } from './user.service.ts';

export class HttpService {
  async request<T>(
    method: 'post' | 'get' | 'delete' | 'put',
    path: string,
    body?: unknown,
  ): Promise<T> {
    const headers = this.getHeaders();
    const url = ServerPath + path;

    const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(await response.json());
    }

    return response.json() as Promise<T>;
  }

  private getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'X-User-Identificator': userService.identificator,
    };
  }
}

export const httpService = new HttpService();
