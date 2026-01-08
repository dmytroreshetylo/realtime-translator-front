export interface AnimateTextChangeConfig {
  element: HTMLElement;
  showAnimateClass: string;
  hideAnimateClass: string;
  handleShow?: () => void;
  handleHide?: () => void;
}