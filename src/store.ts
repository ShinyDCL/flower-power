import { Item } from './constants';
import { Model } from './model';
import { marketPrompt } from './prompts/index';
import { inventory } from './state';

export class Store extends Model {
  constructor(model: Model) {
    super(model);

    this.entity.addComponent(
      new OnPointerDown(this.handleClick.bind(this), {
        hoverText: 'Open market',
      })
    );
  }

  private handleClick(): void {
    marketPrompt.openPrompt();
    //inventory.addItem(Item.ROSE_SEED, 3);
    //inventory.addItem(Item.TULIP_SEED, 3);
    //inventory.addItem(Item.SUNFLOWER_SEED, 3);
  }
}
