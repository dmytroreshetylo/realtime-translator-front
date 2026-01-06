import { TranslatePageStore } from './store.ts';
import { TranslatePageElementIds } from '../shared/constants.ts';

export function provideTranslatePageListeners(app: Element) {
  const autoTranslateCheckbox = app.querySelector(`#${TranslatePageElementIds.AutoTranslateCheckbox}`);
  const originalTextarea = app.querySelector(`#${TranslatePageElementIds.OriginalTextarea}`);
  const originalSelect = app.querySelector(`#${TranslatePageElementIds.SelectOriginalLanguage}`);

  if(!autoTranslateCheckbox) {
    throw Error('TranslatePageComponent: auto-translate-check-box not found');
  }

  const handleButtonSubmit = (event: Event) => {
    alert('Кнопка перекласти натиснута');
  }

  const handleCheckboxChange = (event: Event) => {
    const target = event.target as HTMLInputElement;

    TranslatePageStore.autoTranslate = target.checked;

    if(!TranslatePageStore.autoTranslate) {
      const translateButtonWrapper = app.querySelector('div:has(button)');
      const translateButton = app.querySelector('button');

      if(!translateButton || !translateButtonWrapper) {
        return;
      }

      translateButton.removeEventListener('click', handleButtonSubmit);

      app.removeChild(translateButtonWrapper);
    }
    else {
      const translateButtonWrapper = document.createElement('div');
      const translateButton = document.createElement('button');

      translateButtonWrapper.classList.add('w-100');

      translateButton.textContent = 'Перекласти';

      translateButtonWrapper.appendChild(translateButton);

      app.appendChild(translateButtonWrapper);

      translateButton.addEventListener('click', handleButtonSubmit);
    }
  }

  const handleOriginalTextChange = (event: Event) => {
    alert('Теперешній текст для перекладу - ' + (event.target as HTMLTextAreaElement).value);
  }

  const handleOriginalLanguageChange = (event: Event) => {
    alert('Обрана мова оригіналу - ' + (event.target as HTMLSelectElement).value);
  }

  autoTranslateCheckbox.addEventListener('input', handleCheckboxChange);
  originalTextarea.addEventListener('input', handleOriginalTextChange);
  originalSelect.addEventListener('change', handleOriginalLanguageChange);
}