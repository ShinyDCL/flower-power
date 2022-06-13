import * as ui from '@dcl/ui-scene-utils';
import { Item, ItemKey, SEEDS } from 'src/constants';
import { INVENTORY, ITEM_ICONS } from 'src/resources';
import { Image } from 'src/ui/image';

export class Inventory {
  private static items: { [key: string]: ui.UICounter } = {};

  public static renderInventorySidebar() {
    const keys = Object.keys(Item) as ItemKey[];
    const offsetX = -5;
    let offsetY = 80;

    const inventoryBackground = new Image(
      offsetX,
      offsetY - 5,
      125,
      495,
      INVENTORY.background
    );
    inventoryBackground.opacity = 0.9;

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

  public static addItem(item: Item, count: number): void {
    this.items[item].increase(count);
  }

  public static removeItem(item: Item, count: number): void {
    this.items[item].decrease(count);
  }

  public static getSeedCount(): number {
    let count = 0;
    SEEDS.forEach((seed: Item) => {
      count += this.items[seed].read();
    });
    return count;
  }

  public static getItemCount(item: Item): number {
    return this.items[item].read();
  }
}
