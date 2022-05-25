import { Item } from './constants';
import { Model } from './model';
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
    inventory.addItem(Item.ROSE_SEED, 3);
  }
}
