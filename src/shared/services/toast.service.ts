import { Toast } from 'bootstrap';

class ToastService {
  private toastInstance: Toast | null = null;
  private toastBody: HTMLElement | null = null;
  private toastHeader: HTMLElement | null = null;

  private init() {
    if (this.toastInstance) {
      return;
    }

    const toastEl = document.querySelector('#toast') as HTMLElement | null;
    this.toastBody = toastEl?.querySelector('.toast-body')  as HTMLElement | null;
    this.toastHeader = toastEl?.querySelector('.me-auto')  as HTMLElement | null;

    if(toastEl) {
      this.toastInstance = new Toast(toastEl);
    }
  }

  show(message: string, title: string = 'Помилка') {
    this.init();

    if (this.toastInstance && this.toastBody && this.toastHeader) {
      this.toastHeader.textContent = title;
      this.toastBody.textContent = message;
      this.toastInstance.show();
    } else {
      console.error('Toast service not initialized correctly.');
    }
  }
}

export const toastService = new ToastService();
