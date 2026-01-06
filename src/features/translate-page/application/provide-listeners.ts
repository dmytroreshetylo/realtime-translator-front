import { TranslatePageStore } from './store.ts';
import { TranslatePageElementIds } from '../shared/constants.ts';
import { languageService } from '../../../domain/languages/language.service.ts';
import { getLanguageOptions } from '../shared/get-language-options.util.ts';
import { removeEmptyLanguage } from '../shared/remove-empty-language.util.ts';

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
  const handleButtonSubmit = (event: Event) => {
    alert('Кнопка перекласти натиснута');
  }

  const handleCheckboxChange = (event: Event) => {
    const target = event.target as HTMLInputElement;

    TranslatePageStore.autoTranslate = target.checked;

    if(!TranslatePageStore.autoTranslate) {
      removeTranslateButton();
    }
    else {
      const translateButtonWrapper = createTranslateButton();

      app.appendChild(translateButtonWrapper);
    }
  }

  const handleOriginalTextChange = (event: Event) => {
    alert('Теперешній текст для перекладу - ' + (event.target as HTMLTextAreaElement).value);
  }

  const handleOriginalLanguageChange = (event: Event) => {
    TranslatePageStore.selectedOriginalLanguage = (event.target as HTMLSelectElement).value;

    removeEmptyLanguage(originalSelect);

    provideLanguageOptions(translateSelect, TranslatePageStore.selectedOriginalLanguage, TranslatePageStore.selectedTranslateLanguage);
  }

  const handleTranslateLanguageChange = (event: Event) => {
    TranslatePageStore.selectedTranslateLanguage = (event.target as HTMLSelectElement).value;

    removeEmptyLanguage(translateSelect);

    provideLanguageOptions(originalSelect, TranslatePageStore.selectedTranslateLanguage, TranslatePageStore.selectedOriginalLanguage);
  }

  autoTranslateCheckbox.addEventListener('input', handleCheckboxChange);
  originalTextarea.addEventListener('input', handleOriginalTextChange);
  originalSelect.addEventListener('change', handleOriginalLanguageChange);
  translateSelect.addEventListener('change', handleTranslateLanguageChange);

  // Provide initial options for language selects
  provideLanguageOptions(originalSelect, TranslatePageStore.selectedTranslateLanguage, TranslatePageStore.selectedOriginalLanguage);
  provideLanguageOptions(translateSelect, TranslatePageStore.selectedOriginalLanguage, TranslatePageStore.selectedTranslateLanguage);
}