import './page.component.scss';
import { historyService } from '../../domain/history/history.service.ts';
import { Toast } from 'bootstrap';
import type { HistoryModel } from '../../domain/history/history.model.ts';

export async function historyPageComponent() {
  const app = document.querySelector('#app');

  if (!app) {
    throw new Error('App element not found');
  }

  app.innerHTML = `
    <div class="toast-container position-fixed top-0 end-0 p-3">
      <div id="toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">Помилка</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body"></div>
      </div>
    </div>
    <h2>Історія перекладів</h2>
    <div class="d-flex align-items-center">
      <h4>Найпопулярніша мова:</h4>
      <div id="spinner-lang" class="spinner-border spinner-border-sm ms-2" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <span id="most-popular-lang" class="ms-2"></span>
    </div>
    
    <div id="spinner-history" role="status">
      <div class="spinner-border">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <ul class="history-list"></ul>
  `;

  app.classList.add('history-page', 'main-width');

  const toastEl = app.querySelector('#toast') as HTMLElement;
  const toastBody = toastEl.querySelector('.toast-body') as HTMLElement;
  const toast = new Toast(toastEl);

  const spinnerHistory = app.querySelector('#spinner-history') as HTMLElement;
  const spinnerLang = app.querySelector('#spinner-lang') as HTMLElement;
  const mostPopularLangEl = app.querySelector('#most-popular-lang') as HTMLElement;
  const historyListEl = app.querySelector('.history-list') as HTMLElement;

  const showToast = (message: string) => {
    toastBody.textContent = message;
    toast.show();
  };

  try {
    const [history, mostPopularLanguage] = await Promise.all([
      historyService.getHistoryList(0, 1000),
      historyService.getMostPopularLanguage(),
    ]);

    spinnerHistory.style.display = 'none';
    spinnerLang.style.display = 'none';

    mostPopularLangEl.textContent = mostPopularLanguage || 'Нема даних';

    if (history.items.length) {
      const historyHtml = history.items
        .map(
          (item: HistoryModel) => `
        <li class="history-item">
          <p><strong>Оригінал (${item.originalLanguage}):</strong> ${item.originalText}</p>
          <p><strong>Переклад (${item.translatedLanguage}):</strong> ${item.translatedText}</p>
        </li>
      `,
        )
        .join('');
      historyListEl.innerHTML = historyHtml;
    } else {
      historyListEl.innerHTML = '<li class="no-history">Нема збережених перекладів.</li>';
    }
  } catch (error) {
    spinnerHistory.style.display = 'none';
    spinnerLang.style.display = 'none';
    showToast((error as Error).message || 'Не вдалося завантажити історію.');
    console.error(error);
  }
}
