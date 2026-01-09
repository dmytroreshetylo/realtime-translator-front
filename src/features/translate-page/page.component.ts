import './page.component.scss';
import { provideTranslatePageView } from './application/provide-view.ts';
import { provideTranslatePageListeners } from './application/provide-listeners.ts';
import { localStorageService } from '../../shared/services/localstorage.service.ts';
import { LocalStorageKeys } from '../../shared/constants/localstorage-keys.constant.ts';
import { TranslatePageStore } from './application/store.ts';
import { languageService } from '../../shared/services/language.service.ts';
import { getLanguageOptions } from './shared/get-language-options.util.ts';
import { TranslatePageElementIds } from './shared/constants.ts';
import { toastService } from '../../shared/services/toast.service.ts';

export function translatePageComponent() {
  const app = document.querySelector('#app');

  if (!app) {
    throw new Error('App element not found');
  }

  app.classList.add('translate-page', 'main-width');

  provideTranslatePageView(app);

  try {
    const savedOriginalLanguage = localStorageService.get<string>(LocalStorageKeys.OriginalLanguage);
    const savedTranslateLanguage = localStorageService.get<string>(LocalStorageKeys.TranslateLanguage);

    if (savedOriginalLanguage) {
      TranslatePageStore.selectedOriginalLanguage = savedOriginalLanguage;
    }

    if (savedTranslateLanguage) {
      TranslatePageStore.selectedTranslateLanguage = savedTranslateLanguage;
    }
  } catch (error) {
    toastService.show((error as Error).message);
    console.error(error);
  }

  const originalSelect = app.querySelector(`#${TranslatePageElementIds.SelectOriginalLanguage}`);
  const translateSelect = app.querySelector(`#${TranslatePageElementIds.SelectTranslateLanguage}`);

  if (!originalSelect || !translateSelect) {
    throw new Error('Select elements not found');
  }

  const provideLanguageOptions = (el: Element, exceptCode: string, selected: string) => {
    const languages = languageService.getLanguages();
    const availableLanguages = languages.filter((l) => l.code !== exceptCode);
    el.innerHTML = getLanguageOptions(availableLanguages, selected);
  };

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

  provideTranslatePageListeners(app);
}
