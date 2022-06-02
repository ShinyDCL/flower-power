import { ACTIONS } from 'src/constants';
import { Model } from 'src/model';
import { userState } from 'src/state';
import { simplePrompt } from 'src/ui/index';

export class Well extends Model {
  constructor(model: Model) {
    super(model);

    this.entity.addComponentOrReplace(
      new OnPointerDown(this.handleGetWater.bind(this), {
        hoverText: ACTIONS.getWater,
      })
    );
  }

  private handleGetWater() {
    const { pickedUpBucket } = userState;

    if (pickedUpBucket) {
      if (pickedUpBucket.isFull()) {
        simplePrompt.openPrompt('Bucket is already full!');
      } else {
        pickedUpBucket.fillUp();
      }
    } else {
      simplePrompt.openPrompt('No bucket picked up!');
    }
  }
}
