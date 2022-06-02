import { Model } from 'src/model';
import { marketPrompt } from 'src/ui/index';

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
  }
}
