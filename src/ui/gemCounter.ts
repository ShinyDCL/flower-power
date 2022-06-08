import * as ui from '@dcl/ui-scene-utils';
import { INVENTORY } from 'src/resources';
import { Image } from './image';

export class GemCounter {
  private static counter: ui.UICounter;
  private static image: Image;

  static create() {
    this.counter = new ui.UICounter(0, -40, 10, Color4.Yellow(), 30);
    this.image = new Image(-15, 10, 50, 50, INVENTORY.gem);
  }

  static addGem() {
    if (!this.counter) {
      this.create();
    }
    this.counter.increase(1);
  }

  static getCount() {
    return this.counter.read();
  }

  static hide() {
    this.counter.hide();
    this.image.visible = false;
  }
}
