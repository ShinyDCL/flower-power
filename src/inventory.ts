import * as ui from '@dcl/ui-scene-utils';
import { Item, ItemKey, SEEDS } from 'src/constants';
import { ITEM_ICONS, PROMPT_RESOURCES } from 'src/resources';
import { Image } from './ui/image';

export class Inventory {
  private readonly items: { [key: string]: ui.UICounter } = {};

  constructor() {
    this.renderInventorySidebar();
  }

  private renderInventorySidebar() {
    const keys = Object.keys(Item) as ItemKey[];
    const offsetX = -5;
    let offsetY = 80;

    const inventoryBackground = new Image(
      offsetX,
      offsetY - 5,
      125,
      495,
      PROMPT_RESOURCES.inventoryBackground
    );
    inventoryBackground.image.opacity = 0.9;

    keys.forEach((key: ItemKey) => {
      this.items[Item[key]] = new ui.UICounter(
        0,
        offsetX - 35,
        offsetY,
        Color4.White()
      );
      new Image(offsetX - 10, offsetY + 7, 36, 36, ITEM_ICONS[Item[key]]);

      offsetY += 40;
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

  public getItemCount(item: Item): number {
    return this.items[item].read();
  }
}
