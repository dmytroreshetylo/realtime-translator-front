import { TranslatePageElementIds } from '../shared/constants.ts';

export function provideTranslatePageView(app: Element) {
  app.innerHTML = `
    <form class="main-center w-100">
      <div class="w-100">
        <label class="form-check-label" for="${TranslatePageElementIds.AutoTranslateCheckbox}">Автопереклач без кнопки</label class="form-label">
        <input class="form-check-input" id="${TranslatePageElementIds.AutoTranslateCheckbox}" type="checkbox">
      </div>
  
      <section>
        <div class="field-container">
          <label class="form-label" for="${TranslatePageElementIds.SelectOriginalLanguage}">Оберіть мову оригіналу</label class="form-label">
          <select class="form-select" required id="${TranslatePageElementIds.SelectOriginalLanguage}"></select>
        </div>
        
        <div class="field-container">
          <label class="form-label" for="${TranslatePageElementIds.SelectTranslateLanguage}">Оберіть мову перекладу</label class="form-label">
          <select class="form-select" required id="${TranslatePageElementIds.SelectTranslateLanguage}"></select>
        </div>
      </section>
  
      <section>
        <div class="field-container">
          <label class="form-label" for="${TranslatePageElementIds.OriginalTextarea}">Введіть текст</label class="form-label">
          <textarea class="form-control" required class="w-100" id="${TranslatePageElementIds.OriginalTextarea}"></textarea>
        </div>
        
        <div class="field-container">
          <label class="form-label" for="${TranslatePageElementIds.TranslateTextarea}">Переклад</label class="form-label">
          <textarea class="form-control" readonly class="w-100" id="${TranslatePageElementIds.TranslateTextarea}"></textarea>
        </div>
      </section>
      
      <div class="w-100">
        <button class="btn btn-light" type="submit">Перекласти</button>
      </div>
    </form>
  `
}