import { TranslatePageStore } from './store.ts';
import { TranslatePageElementIds } from '../shared/constants.ts';
import { languageService } from '../../../domain/languages/language.service.ts';
import { getLanguageOptions } from '../shared/get-language-options.util.ts';
import { removeEmptyLanguage } from '../shared/remove-empty-language.util.ts';
import { debounce } from '../../../shared/utils/debounce-time.util.ts';
import { translateService } from '../../../domain/translate/translate.service.ts';
import { Toast } from 'bootstrap';

export function provideTranslatePageListeners(app: Element) {
  const autoTranslateCheckbox: HTMLInputElement | null = app.querySelector(`#${TranslatePageElementIds.AutoTranslateCheckbox}`);
  const originalTextarea: HTMLTextAreaElement | null = app.querySelector(`#${TranslatePageElementIds.OriginalTextarea}`);
  const originalSelect: HTMLSelectElement | null = app.querySelector(`#${TranslatePageElementIds.SelectOriginalLanguage}`);
  const translateTextarea: HTMLTextAreaElement | null = app.querySelector(`#${TranslatePageElementIds.TranslateTextarea}`);
  const translateSelect: HTMLSelectElement | null = app.querySelector(`#${TranslatePageElementIds.SelectTranslateLanguage}`);
  const translateButton: HTMLButtonElement | null = app.querySelector('button[type="submit"]');
  const form: HTMLFormElement | null = app.querySelector('form');
  const spinner: HTMLElement | null = translateButton?.querySelector('.spinner-border') as HTMLElement;
  const buttonText: HTMLElement | null = translateButton?.querySelector('.button-text') as HTMLElement;
  const toastEl: HTMLElement | null = app.querySelector('#toast');
  const toastBody: HTMLElement | null = toastEl?.querySelector('.toast-body') as HTMLElement;

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

  const toast = new Toast(toastEl);

  const showToast = (message: string) => {
    toastBody.textContent = message;
    toast.show();
  };

  const provideLanguageOptions = (el: Element, exceptCode: string, selected: string) => {
    const languages = languageService.getLanguages();
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

      addTranslatedTextToTextarea(translatedText);
    } catch (error) {
      console.log(error);
      showToast((error as Error).message || 'Помилка перекладу');
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
