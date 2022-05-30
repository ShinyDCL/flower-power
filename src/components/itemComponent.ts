import { Item } from 'src/constants';

@Component('itemComponent')
export class ItemComponent {
  private item: Item;

  constructor(item: Item) {
    this.item = item;
  }

  public getItem(): Item {
    return this.item;
  }
}
