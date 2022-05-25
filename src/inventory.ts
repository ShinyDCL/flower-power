import * as ui from '@dcl/ui-scene-utils';
import { Item, ItemKey, ITEM_TITLES, SEEDS } from './constants';
import { Modal } from './modal';

export class Inventory {
  private readonly modal: Modal;
  private readonly items: { [key: string]: ui.UICounter } = {};

  constructor() {
    this.renderInventorySidebar();
    this.modal = new Modal();
  }

  private renderInventorySidebar() {
    const keys = Object.keys(Item) as ItemKey[];
    const offsetX = 0;
    let offsetY = 500;

    keys.forEach((key: ItemKey) => {
      this.items[Item[key]] = new ui.UICounter(
        0,
        offsetX,
        offsetY,
        Color4.White()
      );
      offsetY -= 30;
    });
  }

  public addItem(item: Item, count: number): void {
    this.items[item].increase(count);
  }

  public removeItem(item: Item, count: number): void {
    this.items[item].decrease(count);
  }

  public getSeedCount(): number {
    let count = 0;
    SEEDS.forEach((seed: Item) => {
      count += this.items[seed].read();
    });
    return count;
  }

  public showModalSelectSeed(onSelect: (item: Item) => void): void {
    const positionDelta = 65;
    let positionY = 45;
    this.modal.prompt.elements = [];

    SEEDS.forEach((item: Item) => {
      if (this.getSeedCount() > 0) {
        this.modal.prompt.addText('Choose a seed', 0, 150, Color4.White(), 30);
        const button = this.modal.prompt.addButton(
          ITEM_TITLES[item],
          0,
          positionY,
          (() => {
            this.items[item].decrease(1);
            //this.events.fireEvent(new SelectItem(source, item));
            this.modal.prompt.hide();
            onSelect(item);
          }).bind(this),
          ui.ButtonStyles.ROUNDGOLD
        );
        if (this.items[item].read() <= 0) button.grayOut();
        positionY -= positionDelta;
      } else {
        this.modal.prompt.addText(
          `You don't have any seeds,`,
          0,
          130,
          Color4.White(),
          25
        );
        this.modal.prompt.addText(
          `by some at market`,
          0,
          90,
          Color4.White(),
          25
        );
      }
    });

    this.modal.prompt.show();
    //this.modal.prompt.background.visible = false;
  }
}
