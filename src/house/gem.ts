import { ACTIONS } from 'src/constants';
import { Model } from 'src/model';
import { gemCounter, simplePrompt } from 'src/ui/index';

export class Gem extends Model {
  private readonly collectSound = new AudioClip(
    'models/gem/sounds/KeyEquip.mp3'
  );

  constructor(model: Model) {
    super(model);

    this.entity.addComponent(
      new OnPointerDown(this.handleCollect.bind(this), {
        hoverText: ACTIONS.collect,
        distance: 2,
      })
    );
    this.entity.addComponentOrReplace(new AudioSource(this.collectSound));
  }

  private handleCollect() {
    gemCounter.addGem();
    this.entity.getComponent(AudioSource).playOnce();

    if (gemCounter.getCount() === 5) {
      simplePrompt.openPrompt('Congrats, you found 5 gems! Here is your gift:');
    }

    // Hide gem after it is picked up
    this.entity.removeComponent(GLTFShape);
  }
}
