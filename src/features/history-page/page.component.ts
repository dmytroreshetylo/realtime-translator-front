import './page.component.scss';
import { historyService } from '../../domain/history/history.service.ts';
import type { HistoryModel } from '../../domain/history/history.model.ts';
import { toastService } from '../../shared/services/toast.service.ts';
import { languageService } from '../../domain/languages/language.service.ts';

const PAGE_SIZE = 10;

export async function historyPageComponent() {
  const app = document.querySelector('#app');

  if (!app) {
    throw new Error('App element not found');
  }

  app.innerHTML = `
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
    <nav>
      <ul class="pagination"></ul>
    </nav>
  `;

  app.classList.add('history-page', 'main-width');

  const spinnerHistory = app.querySelector('#spinner-history') as HTMLElement;
  const spinnerLang = app.querySelector('#spinner-lang') as HTMLElement;
  const mostPopularLangEl = app.querySelector('#most-popular-lang') as HTMLElement;
  const historyListEl = app.querySelector('.history-list') as HTMLElement;
  const paginationEl = app.querySelector('.pagination') as HTMLElement;

  let currentPage = 1;
  let totalItems = 0;

  const renderPagination = () => {
    const totalPages = Math.ceil(totalItems / PAGE_SIZE);
    paginationEl.innerHTML = '';

    if (totalPages === 0) {
      return;
    }

    // Previous button
    const prevLi = document.createElement('li');
    prevLi.classList.add('page-item');
    if (currentPage === 1) {
      prevLi.classList.add('disabled');
    }
    const prevA = document.createElement('a');
    prevA.classList.add('page-link');
    prevA.href = '#';
    prevA.textContent = 'Попередня';
    prevA.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        loadHistory();
      }
    });
    prevLi.appendChild(prevA);
    paginationEl.appendChild(prevLi);

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement('li');
      li.classList.add('page-item');
      if (i === currentPage) {
        li.classList.add('active');
      }
      const a = document.createElement('a');
      a.classList.add('page-link');
      a.href = '#';
      a.textContent = i.toString();
      a.addEventListener('click', (e) => {
        e.preventDefault();
        currentPage = i;
        loadHistory();
      });
      li.appendChild(a);
      paginationEl.appendChild(li);
    }

    // Next button
    const nextLi = document.createElement('li');
    nextLi.classList.add('page-item');
    if (currentPage === totalPages) {
      nextLi.classList.add('disabled');
    }
    const nextA = document.createElement('a');
    nextA.classList.add('page-link');
    nextA.href = '#';
    nextA.textContent = 'Наступна';
    nextA.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentPage < totalPages) {
        currentPage++;
        loadHistory();
      }
    });
    nextLi.appendChild(nextA);
    paginationEl.appendChild(nextLi);
  };

  const loadHistory = async () => {
    spinnerHistory.style.display = 'block';
    historyListEl.innerHTML = '';

    try {
      const from = (currentPage - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE;
      const history = await historyService.getHistoryList(from, to);

      totalItems = history.totalCount;
      spinnerHistory.style.display = 'none';

      if (history.items.length) {
        const historyHtml = history.items
          .map(
            (item: HistoryModel) => `
          <li class="history-item">
            <p><strong>Оригінал (${languageService.getName(item.originalLanguage)}):</strong> ${item.originalText}</p>
            <p><strong>Переклад (${languageService.getName(item.translatedLanguage)}):</strong> ${item.translatedText}</p>
          </li>
        `,
          )
          .join('');
        historyListEl.innerHTML = historyHtml;
      } else {
        historyListEl.innerHTML = '<li class="no-history">Нема збережених перекладів.</li>';
      }
      renderPagination();
    } catch (error) {
      spinnerHistory.style.display = 'none';
      toastService.show((error as Error).message);
      console.error(error);
    }
  };

  const loadMostPopularLanguage = async () => {
    spinnerLang.style.display = 'block';
    try {
      const mostPopularLanguage = await historyService.getMostPopularLanguage();
      mostPopularLangEl.textContent = mostPopularLanguage ? languageService.getName(mostPopularLanguage) : 'Нема даних';
    } catch (error) {
      toastService.show((error as Error).message);
      console.error(error);
    } finally {
      spinnerLang.style.display = 'none';
    }
  };

  loadHistory();
  loadMostPopularLanguage();
}
