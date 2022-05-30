import { Item } from 'src/constants';

export type MarketAction = 'Buy' | 'Sell';

@Component('itemComponent')
export class ItemComponent {
  private item: Item;
  private action?: MarketAction;

  constructor(item: Item, action?: MarketAction) {
    this.item = item;
    this.action = action;
  }

  public getItem(): Item {
    return this.item;
  }
  public getAction(): MarketAction | undefined {
    return this.action;
  }
}
