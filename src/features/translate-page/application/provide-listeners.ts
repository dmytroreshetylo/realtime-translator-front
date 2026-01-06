import { TranslatePageStore } from './store.ts';
import { TranslatePageElementIds } from '../shared/constants.ts';
import { languageService } from '../../../domain/languages/language.service.ts';
import { getLanguageOptions } from '../shared/get-language-options.util.ts';
import { removeEmptyLanguage } from '../shared/remove-empty-language.util.ts';
import { historyService } from '../../../domain/history/history.service.ts';
import { debounce } from '../../../shared/utils/debounce-time.util.ts';

export function provideTranslatePageListeners(app: Element) {
  const autoTranslateCheckbox = app.querySelector(`#${TranslatePageElementIds.AutoTranslateCheckbox}`);
  const originalTextarea = app.querySelector(`#${TranslatePageElementIds.OriginalTextarea}`);
  const originalSelect = app.querySelector(`#${TranslatePageElementIds.SelectOriginalLanguage}`);
  const translateTextarea = app.querySelector(`#${TranslatePageElementIds.TranslateTextarea}`);
  const translateSelect = app.querySelector(`#${TranslatePageElementIds.SelectTranslateLanguage}`);

  const provideLanguageOptions = (el: Element, exceptCode: string, selected: string) => {
    const languages = languageService.getLanguages();

    const availableLanguages = languages.filter(l => l.code !== exceptCode);

    el.innerHTML = getLanguageOptions(availableLanguages, selected);
  }

  const handleTranslate = debounce(() => {
    if(!TranslatePageStore.selectedOriginalLanguage || !TranslatePageStore.selectedTranslateLanguage) {
      alert('Будь ласка, оберіть мову оригіналу та перекладу');
      return;
    }

    if(!TranslatePageStore.originalText.trim()) {
      alert('Будь ласка, введіть текст для перекладу');
      return;
    }

    // TODO: Replace with real translated text
    historyService.addHistory({
      originalLanguage: TranslatePageStore.selectedOriginalLanguage,
      translatedLanguage: TranslatePageStore.selectedTranslateLanguage,
      originalText: TranslatePageStore.originalText,
      translatedText: 'Перекладений текст'
    });

    addTranslatedTextToTextarea();
  }, 300);

  const addTranslatedTextToTextarea = () => {
    // TODO: Replace with real translated text
    (translateTextarea as HTMLTextAreaElement).value = 'Перекладений текст';
  }

  const createTranslateButton = () => {
    const translateButtonWrapper = document.createElement('div');
    const translateButton = document.createElement('button');

    translateButtonWrapper.classList.add('w-100');

    translateButton.textContent = 'Перекласти';

    translateButtonWrapper.appendChild(translateButton);

    translateButton.addEventListener('click', handleButtonSubmit);

    return translateButtonWrapper;
  }

  const removeTranslateButton = () => {
    const translateButtonWrapper = app.querySelector('div:has(button)');
    const translateButton = app.querySelector('button');

    if(!translateButton || !translateButtonWrapper) {
      return;
    }

    translateButton.removeEventListener('click', handleButtonSubmit);

    app.removeChild(translateButtonWrapper);
  }

  // Check if all elements are found
  if(!autoTranslateCheckbox || !originalTextarea || !originalSelect || !translateTextarea || !translateSelect) {
    throw new Error('TranslatePage: One or more elements not found');
  }

  // All handlers
  const handleButtonSubmit = () => {
    handleTranslate();
  }

  const handleCheckboxChange = (event: Event) => {
    const target = event.target as HTMLInputElement;

    TranslatePageStore.autoTranslate = target.checked;

    if(!TranslatePageStore.autoTranslate) {
      const translateButtonWrapper = createTranslateButton();

      app.appendChild(translateButtonWrapper);
    }
    else {
      removeTranslateButton();
    }
  }

  const handleOriginalTextChange = (event: Event) => {
    TranslatePageStore.originalText = (event.target as HTMLTextAreaElement).value;

    if(!TranslatePageStore.autoTranslate) {
      return;
    }

    handleTranslate();
  }

  const handleOriginalLanguageChange = (event: Event) => {
    TranslatePageStore.selectedOriginalLanguage = (event.target as HTMLSelectElement).value;

    removeEmptyLanguage(originalSelect);

    provideLanguageOptions(translateSelect, TranslatePageStore.selectedOriginalLanguage, TranslatePageStore.selectedTranslateLanguage);

    if(!TranslatePageStore.autoTranslate) {
      return;
    }

    handleTranslate();
  }

  const handleTranslateLanguageChange = (event: Event) => {
    TranslatePageStore.selectedTranslateLanguage = (event.target as HTMLSelectElement).value;

    removeEmptyLanguage(translateSelect);

    provideLanguageOptions(originalSelect, TranslatePageStore.selectedTranslateLanguage, TranslatePageStore.selectedOriginalLanguage);

    if(!TranslatePageStore.autoTranslate) {
      return;
    }

    handleTranslate();
  }

  autoTranslateCheckbox.addEventListener('input', handleCheckboxChange);
  originalTextarea.addEventListener('input', handleOriginalTextChange);
  originalSelect.addEventListener('change', handleOriginalLanguageChange);
  translateSelect.addEventListener('change', handleTranslateLanguageChange);

  // Provide initial options for language selects
  provideLanguageOptions(originalSelect, TranslatePageStore.selectedTranslateLanguage, TranslatePageStore.selectedOriginalLanguage);
  provideLanguageOptions(translateSelect, TranslatePageStore.selectedOriginalLanguage, TranslatePageStore.selectedTranslateLanguage);

  const translateButtonWrapper = createTranslateButton();

  app.appendChild(translateButtonWrapper);
}