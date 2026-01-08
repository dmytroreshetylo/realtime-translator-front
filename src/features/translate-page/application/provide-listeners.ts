import { TranslatePageStore } from './store.ts';
import { TranslatePageElementIds } from '../shared/constants.ts';
import { languageService } from '../../../domain/languages/language.service.ts';
import { getLanguageOptions } from '../shared/get-language-options.util.ts';
import { removeEmptyLanguage } from '../shared/remove-empty-language.util.ts';
import { historyService } from '../../../domain/history/history.service.ts';
import { debounce } from '../../../shared/utils/debounce-time.util.ts';
import { translateService } from '../../../domain/translate/translate.service.ts';
import { Toast } from 'bootstrap';

export function provideTranslatePageListeners(app: Element) {
  const autoTranslateCheckbox = app.querySelector(`#${TranslatePageElementIds.AutoTranslateCheckbox}`);
  const originalTextarea = app.querySelector(`#${TranslatePageElementIds.OriginalTextarea}`);
  const originalSelect = app.querySelector(`#${TranslatePageElementIds.SelectOriginalLanguage}`);
  const translateTextarea = app.querySelector(`#${TranslatePageElementIds.TranslateTextarea}`);
  const translateSelect = app.querySelector(`#${TranslatePageElementIds.SelectTranslateLanguage}`);
  const translateButton = app.querySelector('button[type="submit"]');
  const form = app.querySelector('form');
  const spinner = translateButton?.querySelector('.spinner-border');
  const buttonText = translateButton?.querySelector('.button-text');
  const toastEl = app.querySelector('#toast') ;
  const toastBody = toastEl.querySelector('.toast-body');
  const toast = new Toast(toastEl);

  if (
    !autoTranslateCheckbox ||
    !originalTextarea ||
    !originalSelect ||
    !translateTextarea ||
    !translateSelect ||
    !translateButton ||
    !form ||
    !spinner ||
    !buttonText ||
    !toastEl ||
    !toastBody
  ) {
    throw new Error('TranslatePage: One or more elements not found');
  }

  const showToast = (message: string) => {
    toastBody.textContent = message;
    toast.show();
  };

  const provideLanguageOptions = (el: Element, exceptCode: string, selected: string) => {
    const languages = languageService.getLanguages();
    console.log(languages);
    const availableLanguages = languages.filter((l) => l.code !== exceptCode);
    el.innerHTML = getLanguageOptions(availableLanguages, selected);
  };

  const handleTranslate = async () => {
    spinner.style.display = 'inline-block';
    buttonText.textContent = 'Переклад...';
    translateButton.disabled = true;

    try {
      const result = await translateService.translate(
        TranslatePageStore.originalText,
        TranslatePageStore.selectedOriginalLanguage,
        TranslatePageStore.selectedTranslateLanguage,
      );

      const translatedText = result ?? 'Невідомий переклад';

      historyService.addHistory({
        originalLanguage: TranslatePageStore.selectedOriginalLanguage,
        translatedLanguage: TranslatePageStore.selectedTranslateLanguage,
        originalText: TranslatePageStore.originalText,
        translatedText,
      });

      addTranslatedTextToTextarea(translatedText);
    } catch (error) {
      showToast('Помилка перекладу');
      console.error(error);
    } finally {
      spinner.style.display = 'none';
      buttonText.textContent = 'Перекласти';
      translateButton.disabled = false;
    }
  };

  const addTranslatedTextToTextarea = (text: string) => {
    (translateTextarea as HTMLTextAreaElement).value = text;
  };

  const handleButtonSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    handleTranslate();
  };

  const handleCheckboxChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    TranslatePageStore.autoTranslate = target.checked;
    translateButton.style.display = TranslatePageStore.autoTranslate ? 'none' : '';
  };

  const handleOriginalTextChange = debounce((event: Event) => {
    TranslatePageStore.originalText = (event.target as HTMLTextAreaElement).value;
    if (TranslatePageStore.autoTranslate) {
      handleTranslate();
    }
  }, 300);

  const handleOriginalLanguageChange = (event: Event) => {
    TranslatePageStore.selectedOriginalLanguage = (event.target as HTMLSelectElement).value;
    removeEmptyLanguage(originalSelect);
    provideLanguageOptions(
      translateSelect,
      TranslatePageStore.selectedOriginalLanguage,
      TranslatePageStore.selectedTranslateLanguage,
    );
    if (TranslatePageStore.autoTranslate) {
      handleTranslate();
    }
  };

  const handleTranslateLanguageChange = (event: Event) => {
    TranslatePageStore.selectedTranslateLanguage = (event.target as HTMLSelectElement).value;
    removeEmptyLanguage(translateSelect);
    provideLanguageOptions(
      originalSelect,
      TranslatePageStore.selectedTranslateLanguage,
      TranslatePageStore.selectedOriginalLanguage,
    );
    if (TranslatePageStore.autoTranslate) {
      handleTranslate();
    }
  };

  autoTranslateCheckbox.addEventListener('input', handleCheckboxChange);
  originalTextarea.addEventListener('input', handleOriginalTextChange);
  originalSelect.addEventListener('change', handleOriginalLanguageChange);
  translateSelect.addEventListener('change', handleTranslateLanguageChange);
  form.addEventListener('submit', handleButtonSubmit);

  console.log(1);

  provideLanguageOptions(
    originalSelect,
    TranslatePageStore.selectedTranslateLanguage,
    TranslatePageStore.selectedOriginalLanguage,
  );
  provideLanguageOptions(
    translateSelect,
    TranslatePageStore.selectedOriginalLanguage,
    TranslatePageStore.selectedTranslateLanguage,
  );
}
