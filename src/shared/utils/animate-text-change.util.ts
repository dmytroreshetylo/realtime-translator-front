import type { AnimateTextChangeConfig } from '../models/animate-text-change.model.ts';

export function animateTextChange(config: AnimateTextChangeConfig) {
  config.element.classList.remove(config.hideAnimateClass);
  config.element.classList.remove(config.showAnimateClass);

  void config.element.offsetWidth;

  config.element.classList.add(config.hideAnimateClass);

  config.element.addEventListener('transitionend', () => {
    config.handleHide?.();

    if (config.element.classList.contains(config.hideAnimateClass)) {
      config.element.classList.remove(config.hideAnimateClass);
      config.element.classList.add(config.showAnimateClass);

      config.handleShow?.();
    }
  }, { once: true });

}