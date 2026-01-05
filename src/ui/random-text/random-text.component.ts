import { randomNumber } from '../../shared/utils/random-number.util.ts';
import { animateTextChange } from '../../shared/utils/animate-text-change.util.ts';

export class RandomTextComponent extends HTMLSpanElement {
  private items: string[] = [];
  private currentText: string = '';
  private readonly intervalId: number;

  constructor() {
    super();

    this.intervalId = setInterval(() => {
      this.currentText = this.defineNewText();

      this.connectedCallback();
    }, 3000);
  }

  private defineNewText(): string {
    const min = 0;
    const max = this.items.length - 1;

    if(this.items.length === 0) {
      throw new Error('RandomTextComponent: Items array is empty');
    }

    const index = randomNumber(min, max);

    return this.items[index];
  }

  setItems(items: string[]) {
    this.items = items;

    this.currentText = this.defineNewText();

    this.connectedCallback();
  }

  connectedCallback() {
    this.classList.add('fade-container');

    animateTextChange({
      element: this,
      showAnimateClass: 'fade-in',
      hideAnimateClass: 'fade-out',
      handleHide: () => {
        this.innerHTML = this.currentText;
      }
    })
  }

  disconnectedCallback() {
    clearInterval(this.intervalId);
  }

}

customElements.define('random-text', RandomTextComponent, { extends: 'span' });