export function removeEmptyLanguage(select: Element): void {
  const options = Array.from(select.querySelectorAll('option'));
  options.forEach((option) => {
    if (option.value === '') {
      option.remove();
    }
  });
}