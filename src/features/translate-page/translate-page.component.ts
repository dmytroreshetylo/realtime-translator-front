import './translate-page.component.scss';

function translatePageComponent() {
  const app = document.querySelector('#app');

  if(!app) {
    throw new Error('App element not found');
  }

  app.innerHTML = `
    <section>
      <div class="field-container">
        <label for="select-original-language">Оберіть мову оригіналу</label>
        <select id="select-original-language"></select>
      </div>
      
      <div class="field-container">
        <label for="select-translate-language">Оберіть мову перекладу</label>
        <select id="select-translate-language"></select>
      </div>
    </section>

    <section>
      <div class="field-container">
        <label for="original-text">Введіть текст</label>
        <textarea id="original-text"></textarea>
      </div>
      
      <div class="field-container">
        <label for="translate-text">Переклад</label>
        <textarea readonly id="translate-text"></textarea>
      </div>
    </section>
  `
}

translatePageComponent();