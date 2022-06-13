import { Inventory } from 'src/common/inventory';
import { ACTIONS, Item } from 'src/constants';
import { Model } from 'src/model';
import { ITEM_ICONS, SOUNDS } from 'src/resources';
import { GemCounter } from 'src/ui/gemCounter';
import { SimplePrompt } from 'src/ui/simplePrompt';

export class Gem extends Model {
  constructor(model: Model) {
    super(model);

    this.entity.addComponent(
      new OnPointerDown(this.handleCollect.bind(this), {
        hoverText: ACTIONS.collect,
        distance: 3,
      })
    );
    this.entity.addComponentOrReplace(new AudioSource(SOUNDS.collect));
  }

  private handleCollect() {
    GemCounter.addGem();
    this.entity.getComponent(AudioSource).playOnce();

    if (GemCounter.getCount() === 5) {
      Inventory.addItem(Item.BEAN_SEED, 1);
      GemCounter.hide();
      SimplePrompt.openPrompt(
        'Congrats, here is your gift!',
        undefined,
        ITEM_ICONS[Item.BEAN_SEED]
      );
    }

    // Hide gem after it is picked up
    this.entity.removeComponent(GLTFShape);
  }
}
