import { RandomTextComponent } from './src/ui/random-text/random-text.component';

function main() {
  const sloganComponent = document.querySelector('span[is="random-text"]');

  if(!(sloganComponent instanceof RandomTextComponent)) {
    throw new Error('RandomTextComponent not found');
  }

  const slogans: string[] = [
    'Перекладаємо світ разом!',
    'Ваш міст у світ мов!',
    'Переклад без меж!',
    'З\'єднуємо культури через слова!',
    'Точність у кожному перекладі!',
    'Відкрийте нові горизонти з нами!',
    'Мови світу у ваших руках!',
    'Переклад, якого ви заслуговуєте!',
    'Зробіть світ ближчим!',
    'Ваш надійний партнер у перекладі!'
  ]

  sloganComponent.setItems(slogans);
}

main();