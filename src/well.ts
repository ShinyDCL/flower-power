import { ACTIONS } from './constants';
import { Model } from './model';
import { simplePrompt } from './prompts/index';
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
        simplePrompt.openPrompt('Bucket is already full!');
      } else {
        pickedUpBucket.fillUp();
      }
    } else {
      simplePrompt.openPrompt('No bucket picked up!');
    }
  }
}
