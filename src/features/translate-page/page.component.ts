import './page.component.scss';

import { provideTranslatePageView } from './application/provide-view.ts';
import { provideTranslatePageListeners } from './application/provide-listeners.ts';

function translatePageComponent() {
  const app = document.querySelector('#app');

  if(!app) {
    throw new Error('App element not found');
  }

  provideTranslatePageView(app);

  provideTranslatePageListeners(app)
}

translatePageComponent();