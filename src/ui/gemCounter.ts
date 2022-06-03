import * as ui from '@dcl/ui-scene-utils';

export class GemCounter {
  private readonly counter: ui.UICounter;
  constructor() {
    this.counter = new ui.UICounter(0, -5, 50, Color4.White());
    this.counter.hide();
  }

  public addGem() {
    if (!this.counter.uiText.visible) {
      this.counter.show();
    }
    this.counter.increase(1);
  }

  public getCount() {
    return this.counter.read();
  }
}
