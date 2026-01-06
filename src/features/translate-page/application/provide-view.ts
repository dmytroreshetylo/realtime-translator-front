import { TranslatePageElementIds } from '../shared/constants.ts';

export function provideTranslatePageView(app: Element) {
  app.innerHTML = `
    <div class="w-100">
      <label for="${TranslatePageElementIds.AutoTranslateCheckbox}">Автопереклач без кнопки</label>
      <input id="${TranslatePageElementIds.AutoTranslateCheckbox}" type="checkbox">
    </div>

    <section>
      <div class="field-container">
        <label for="${TranslatePageElementIds.SelectOriginalLanguage}">Оберіть мову оригіналу</label>
        <select id="${TranslatePageElementIds.SelectOriginalLanguage}">
          <option value="1">English</option>
          <option value="2">Українська</option>
        </select>
      </div>
      
      <div class="field-container">
        <label for="${TranslatePageElementIds.SelectTranslateLanguage}">Оберіть мову перекладу</label>
        <select id="${TranslatePageElementIds.SelectTranslateLanguage}"></select>
      </div>
    </section>

    <section>
      <div class="field-container">
        <label for="${TranslatePageElementIds.OriginalTextarea}">Введіть текст</label>
        <textarea class="w-100" id="${TranslatePageElementIds.OriginalTextarea}"></textarea>
      </div>
      
      <div class="field-container">
        <label for="${TranslatePageElementIds.TranslateTextarea}">Переклад</label>
        <textarea readonly class="w-100" id="${TranslatePageElementIds.TranslateTextarea}"></textarea>
      </div>
    </section>
  `
}