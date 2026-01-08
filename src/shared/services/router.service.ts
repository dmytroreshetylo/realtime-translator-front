import type { RouterPath } from '../models/router-path.model.ts';

export class RouterService {
  private path: string = window.location.pathname;
  private config: RouterPath[] = [];

  constructor() {
    window.addEventListener('popstate', () => {
      this.path = window.location.pathname;
      this.renderCurrentPath();
    });

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (link && link.getAttribute('href')?.startsWith('/')) {
        e.preventDefault();
        const path = link.getAttribute('href')!;
        this.navigateTo(path);
      }
    });
  }

  setConfig(config: RouterPath[]) {
    this.config = config;
  }

  init() {
    this.renderCurrentPath();
  }

  async navigateTo(path: string): Promise<void> {
    if (this.path === path) return;

    this.path = path;

    window.history.pushState({}, '', path);

    await this.renderCurrentPath();
  }

  private async renderCurrentPath(): Promise<void> {
    try {
      const render = this.getCurrentComponentToLoad();

      const app = document.querySelector('#app');

      if (app) {
        app.innerHTML = '';
        app.classList = '';
        await render();
      }
    } catch (error) {
      if (this.path !== '/') this.navigateTo('/');
    }
  }

  private getCurrentComponentToLoad(): () => Promise<void> {
    const matchedRoute = this.config.find(route => route.path === this.path);

    if (matchedRoute) {
      return matchedRoute.loadComponent;
    }

    const fallbackRoute = this.config.find(route => route.path === '/');
    if (fallbackRoute) return fallbackRoute.loadComponent;

    throw new Error(`Route not found for path: ${this.path}`);
  }
}

export const routerService = new RouterService();