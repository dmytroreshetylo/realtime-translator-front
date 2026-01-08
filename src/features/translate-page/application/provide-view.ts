import { TranslatePageElementIds } from '../shared/constants.ts';

export function provideTranslatePageView(app: Element) {
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

    <form class="main-center w-100">
      <div class="w-100">
        <label class="form-check-label" for="${TranslatePageElementIds.AutoTranslateCheckbox}">Автопереклад</label>
        <input class="form-check-input" id="${TranslatePageElementIds.AutoTranslateCheckbox}" type="checkbox">
      </div>

      <section>
        <div class="field-container">
          <label class="form-label" for="${TranslatePageElementIds.SelectOriginalLanguage}">Оберіть мову оригіналу</label>
          <select class="form-select" required id="${TranslatePageElementIds.SelectOriginalLanguage}"></select>
        </div>
        
        <div class="field-container">
          <label class="form-label" for="${TranslatePageElementIds.SelectTranslateLanguage}">Оберіть мову перекладу</label>
          <select class="form-select" required id="${TranslatePageElementIds.SelectTranslateLanguage}"></select>
        </div>
      </section>

      <section>
        <div class="field-container">
          <label class="form-label" for="${TranslatePageElementIds.OriginalTextarea}">Введіть текст</label>
          <textarea class="form-control" required id="${TranslatePageElementIds.OriginalTextarea}"></textarea>
        </div>
        
        <div class="field-container">
          <label class="form-label" for="${TranslatePageElementIds.TranslateTextarea}">Переклад</label>
          <textarea class="form-control" readonly id="${TranslatePageElementIds.TranslateTextarea}"></textarea>
        </div>
      </section>
      
      <div class="w-100">
        <button class="btn btn-light" type="submit">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="display: none;"></span>
          <span class="button-text">Перекласти</span>
        </button>
      </div>
    </form>
  `;
}
