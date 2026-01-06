import './page.component.scss';

import { historyService } from '../../domain/history/history.service.ts';

export function historyPageComponent() {
  const app = document.querySelector('#app');

  if(!app) {
    throw new Error('App element not found');
  }

  app.classList.add('history-page', 'main-width');

  const history = historyService.getHistoryList();

  const historyHtml = history.map(item => `
        <li class="history-item">
          <p><strong>Оригінал (${item.originalLanguage}):</strong> ${item.originalText}</p>
          <p><strong>Переклад (${item.translatedLanguage}):</strong> ${item.translatedText}</p>
        </li>
      `).join('');

  const mostPopularLanguage = historyService.getMostPopularLanguage() || 'Нема даних';

  app.innerHTML = `
    <h2>Історія перекладів</h2>
    <h4>Найпопулярніша мова: ${mostPopularLanguage}</h4>
    <ul class="history-list">
      ${history.length ? historyHtml : '<li class="no-history">Нема збережених перекладів.</li>'}
    </ul>
  `
}

