import './page.component.scss';

import { provideTranslatePageView } from './application/provide-view.ts';
import { provideTranslatePageListeners } from './application/provide-listeners.ts';

export function translatePageComponent() {
  const app = document.querySelector('#app');

  if(!app) {
    throw new Error('App element not found');
  }

  app.classList.add('translate-page', 'main-center', 'main-width');

  provideTranslatePageView(app);

  provideTranslatePageListeners(app)
}