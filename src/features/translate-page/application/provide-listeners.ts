import { TranslatePageStore } from './store.ts';
import { TranslatePageElementIds } from '../shared/constants.ts';
import { languageService } from '../../../domain/languages/language.service.ts';
import { getLanguageOptions } from '../shared/get-language-options.util.ts';
import { removeEmptyLanguage } from '../shared/remove-empty-language.util.ts';
import { historyService } from '../../../domain/history/history.service.ts';
import { debounce } from '../../../shared/utils/debounce-time.util.ts';
import { translateService } from '../../../domain/translate/translate.service.ts';

export function provideTranslatePageListeners(app: Element) {
  const autoTranslateCheckbox = app.querySelector(`#${TranslatePageElementIds.AutoTranslateCheckbox}`);
  const originalTextarea = app.querySelector(`#${TranslatePageElementIds.OriginalTextarea}`);
  const originalSelect = app.querySelector(`#${TranslatePageElementIds.SelectOriginalLanguage}`);
  const translateTextarea = app.querySelector(`#${TranslatePageElementIds.TranslateTextarea}`);
  const translateSelect = app.querySelector(`#${TranslatePageElementIds.SelectTranslateLanguage}`);
  const translateButton = app.querySelector('button');
  const form = app.querySelector('form');

  // Check if all elements are found
  if(!autoTranslateCheckbox || !originalTextarea || !originalSelect || !translateTextarea || !translateSelect || !translateButton || !form) {
    throw new Error('TranslatePage: One or more elements not found');
  }

  const provideLanguageOptions = (el: Element, exceptCode: string, selected: string) => {
    const languages = languageService.getLanguages();

    const availableLanguages = languages.filter(l => l.code !== exceptCode);

    el.innerHTML = getLanguageOptions(availableLanguages, selected);
  }

  const handleTranslate = async() => {
    const result = await translateService.translate(
      TranslatePageStore.originalText,
      TranslatePageStore.selectedOriginalLanguage,
      TranslatePageStore.selectedTranslateLanguage
    );

    const translatedText = result ?? 'Невідомий переклад';

    // TODO: Replace with real translated text
    historyService.addHistory({
      originalLanguage: TranslatePageStore.selectedOriginalLanguage,
      translatedLanguage: TranslatePageStore.selectedTranslateLanguage,
      originalText: TranslatePageStore.originalText,
      translatedText
    });

    addTranslatedTextToTextarea(translatedText);
  };

  const addTranslatedTextToTextarea = (text: string) => {
    // TODO: Replace with real translated text
    (translateTextarea as HTMLTextAreaElement).value = text;
  }


  // All handlers
  const handleButtonSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    handleTranslate();
  }

  const handleCheckboxChange = (event: Event) => {
    const target = event.target as HTMLInputElement;

    TranslatePageStore.autoTranslate = target.checked;

    if(TranslatePageStore.autoTranslate) {
      translateButton.style.display = 'none';
    }
    else {
      translateButton.style.display = '';
    }
  }

  const handleOriginalTextChange = debounce((event: Event) => {
    TranslatePageStore.originalText = (event.target as HTMLTextAreaElement).value;

    if(!TranslatePageStore.autoTranslate) {
      return;
    }

    translateButton.click();
  }, 300)

  const handleOriginalLanguageChange = (event: Event) => {
    TranslatePageStore.selectedOriginalLanguage = (event.target as HTMLSelectElement).value;

    removeEmptyLanguage(originalSelect);

    provideLanguageOptions(translateSelect, TranslatePageStore.selectedOriginalLanguage, TranslatePageStore.selectedTranslateLanguage);

    if(!TranslatePageStore.autoTranslate) {
      return;
    }

    translateButton.click();
  }

  const handleTranslateLanguageChange = (event: Event) => {
    TranslatePageStore.selectedTranslateLanguage = (event.target as HTMLSelectElement).value;

    removeEmptyLanguage(translateSelect);

    provideLanguageOptions(originalSelect, TranslatePageStore.selectedTranslateLanguage, TranslatePageStore.selectedOriginalLanguage);

    if(!TranslatePageStore.autoTranslate) {
      return;
    }

    translateButton.click();
  }

  autoTranslateCheckbox.addEventListener('input', handleCheckboxChange);
  originalTextarea.addEventListener('input', handleOriginalTextChange);
  originalSelect.addEventListener('change', handleOriginalLanguageChange);
  translateSelect.addEventListener('change', handleTranslateLanguageChange);
  form.addEventListener('submit', handleButtonSubmit);

  // Provide initial options for language selects
  provideLanguageOptions(originalSelect, TranslatePageStore.selectedTranslateLanguage, TranslatePageStore.selectedOriginalLanguage);
  provideLanguageOptions(translateSelect, TranslatePageStore.selectedOriginalLanguage, TranslatePageStore.selectedTranslateLanguage);
}