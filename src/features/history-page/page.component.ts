export function historyPageComponent() {
  const app = document.querySelector('#app');

  if(!app) {
    throw new Error('App element not found');
  }

  app.innerHTML = `
    test
  `
}

