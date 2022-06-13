import { ACTIONS } from 'src/constants';
import { Model } from 'src/model';
import { SOUNDS } from 'src/resources';
import { userState } from 'src/state';
import { SimplePrompt } from 'src/ui/simplePrompt';

export class Well extends Model {
  constructor(model: Model) {
    super(model);

    this.entity.addComponentOrReplace(
      new OnPointerDown(this.handleGetWater.bind(this), {
        hoverText: ACTIONS.getWater,
      })
    );
    this.entity.addComponentOrReplace(new AudioSource(SOUNDS.click));
  }

  private handleGetWater() {
    const { pickedUpBucket } = userState;

    if (pickedUpBucket) {
      if (pickedUpBucket.isFull()) {
        SimplePrompt.openPrompt('Bucket is already full!');
      } else {
        this.entity.getComponent(AudioSource).playOnce();
        pickedUpBucket.fillUp();
      }
    } else {
      SimplePrompt.openPrompt('Pick up bucket first!');
    }
  }
}
