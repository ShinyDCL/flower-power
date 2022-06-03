import { ACTIONS } from 'src/constants';
import { Model } from 'src/model';
import { gemCounter, simplePrompt } from 'src/ui/index';

export class Gem extends Model {
  constructor(model: Model) {
    super(model);

    this.entity.addComponent(
      new OnPointerDown(this.handleCollect.bind(this), {
        hoverText: ACTIONS.collect,
        distance: 2,
      })
    );
  }

  private handleCollect() {
    gemCounter.addGem();

    if (gemCounter.getCount() === 5) {
      simplePrompt.openPrompt('Congrats, you found 5 gems! Here is your gift:');
    }

    engine.removeEntity(this.entity);
  }
}
