import { ACTIONS } from './constants';
import { Model } from './model';
import { prompt } from './prompt';
import { userState } from './state';

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
        prompt.openPrompt('Bucket is already full!');
      } else {
        pickedUpBucket.fillUp();
      }
    } else {
      prompt.openPrompt('No bucket picked up!');
    }
  }
}
