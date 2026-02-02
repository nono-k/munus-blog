import { ControlPanel } from './ControlPanel';

class AppScripts {
  constructor() {
    this.init();
  }

  private init() {
    new ControlPanel();
  }
}

export function initScripts() {
  new AppScripts();
}
