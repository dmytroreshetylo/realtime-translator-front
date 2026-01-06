export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeoutId: number | undefined;

  return function (this: any, ...args: Parameters<T>) {
    // Якщо таймер уже запущений — скасовуємо його
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }

    // Встановлюємо новий таймер
    timeoutId = window.setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}