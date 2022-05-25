import { ACTIONS } from './constants';
import { Model } from './model';
import { userState } from './state';

export class Pond extends Model {
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
        log('Bucket is already full');
      } else {
        pickedUpBucket.fillUp();
      }
    } else {
      log('No bucket picked up');
    }
  }
}
