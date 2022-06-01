import { Item } from 'src/constants';

@Component('itemComponent')
export class ItemComponent {
  private item: Item;
  private action?: string;

  constructor(item: Item, action?: string) {
    this.item = item;
    this.action = action;
  }

  public getItem(): Item {
    return this.item;
  }
  public getAction(): string | undefined {
    return this.action;
  }
}
