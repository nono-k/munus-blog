export class ControlPanel {
  els: NodeListOf<HTMLElement>;
  constructor() {
    this.els = document.querySelectorAll('.controlPanel');
    if (this.els.length === 0) return;

    this.init();
  }

  init() {
    for (const el of this.els) {
      new ControlPanelInstance(el);
    }
  }
}

class ControlPanelInstance {
  private el: HTMLElement;
  private wrap: HTMLElement;
  private prevBtn: HTMLButtonElement;
  private nextBtn: HTMLButtonElement;

  private index = 0;
  private total = 0;
  private cardWidth = 0;
  private visibleCount = 2;
  private maxIndex = 0;

  constructor(el: HTMLElement) {
    this.el = el;
    this.wrap = el.querySelector('.controlPanel-main__wrap') as HTMLElement;
    this.prevBtn = el.querySelector(
      '.controlPanel-side__btn.-prev',
    ) as HTMLButtonElement;
    this.nextBtn = el.querySelector(
      '.controlPanel-side__btn.-next',
    ) as HTMLButtonElement;

    this.setup();
    this.bind();
    this.update();
  }

  private setup() {
    const card = this.wrap.querySelector('.controlPanel-card') as HTMLElement;
    this.cardWidth = card.getBoundingClientRect().width;

    const total = this.wrap?.children.length || 0;
    this.maxIndex = Math.max(0, total - this.visibleCount);
  }

  private bind() {
    this.prevBtn.addEventListener('click', () => {
      this.index = Math.max(0, this.index - 1);
      this.update();
    });

    this.nextBtn.addEventListener('click', () => {
      this.index = Math.min(this.maxIndex, this.index + 1);
      this.update();
    });
  }

  private update() {
    this.wrap.style.transform = `translateX(-${this.index * this.cardWidth}px)`;

    this.prevBtn.disabled = this.index === 0;
    this.nextBtn.disabled = this.index === this.maxIndex;
  }
}
