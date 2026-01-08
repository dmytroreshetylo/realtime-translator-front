import { RandomTextComponent } from './src/ui/random-text/random-text.component';
import { routerService } from './src/shared/services/router.service';
import type { RouterPath } from './src/shared/models/router-path.model';

const routes: RouterPath[] = [
  {
    path: '/',
    loadComponent: () => import('./src/features/translate-page/page.component').then(c => c.translatePageComponent())
  },
  {
    path: '/history',
    loadComponent: () => import('./src/features/history-page/page.component').then(c => c.historyPageComponent())
  }
]

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

  routerService.setConfig(routes);

  routerService.init();
}

main();