import { Model } from 'src/model';
import { MarketPrompt } from 'src/ui/marketPrompt';

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
    MarketPrompt.openPrompt();
  }
}
