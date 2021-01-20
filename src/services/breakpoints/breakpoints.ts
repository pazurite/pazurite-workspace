import { BreakpointOptions, BreakpointThresholds } from './types';
import { VueConstructor } from 'vue';
import { debounce } from 'lodash';

const baseThresholds: BreakpointThresholds = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

class Breakpoint {
  public thresholds: BreakpointThresholds;

  public isMobile: boolean;

  public mobileBreakpoint;

  public only: { [key: string]: boolean } = {};

  public down: { [key: string]: boolean } = {};

  public up: { [key: string]: boolean } = {};

  public name = '';

  private keys: Array<string> = [];

  private _eventHandlers: Map<EventListenerOrEventListenerObject, null> = new Map();

  constructor(options?: BreakpointOptions) {
    this.thresholds = options?.thresholds || baseThresholds;

    this.keys = Object.keys(this.thresholds);

    this.mobileBreakpoint = options?.mobileBreakpoint || 'sm';

    this.init();

    window.addEventListener('resize', this.onResize.bind(this), { passive: true });
  }

  private init() {
    const width = this.getClientWidth();

    Object.entries(this.thresholds).reduce((isExceed: boolean, [key, value]) => {
      this.only[key] = width < value && !isExceed;
      this.down[key] = !isExceed;
      this.up[key] = this.only[key] || isExceed;

      if (this.only[key]) {
        this.name = key;
      }

      return isExceed || this.only[key];
    }, false);

    this.isMobile =
      typeof this.mobileBreakpoint === 'number'
        ? width < parseInt(this.mobileBreakpoint, 10)
        : width <= this.thresholds[this.mobileBreakpoint];
  }

  /** Registers a specific event listener to 'resize' event */
  public subscribe(listener: EventListener) {
    // Only set up a new handler if it's not already being registered.
    if (this._eventHandlers.has(listener)) {
      return;
    }

    this._eventHandlers.set(listener, null);
  }

  public unsubscribe(listener: EventListener) {
    this._eventHandlers.delete(listener);
  }

  private onResize = debounce((e: Event) => {
    this._eventHandlers.forEach((v, fn: EventListener) => fn(e));
  }, 200);

  private getClientWidth() {
    if (typeof document === 'undefined') return 0; // SSR
    return Math.max(document.documentElement!.clientWidth, window.innerWidth || 0);
  }
}

export const CdkBreakpoint = {
  install: (Vue: VueConstructor, options: BreakpointOptions) => {
    Vue.prototype.$breakpoint = new Breakpoint(options);
  },
};
