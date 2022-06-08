import { ACTIONS } from 'src/constants';
import { Model } from 'src/model';
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
  }

  private handleGetWater() {
    const { pickedUpBucket } = userState;

    if (pickedUpBucket) {
      if (pickedUpBucket.isFull()) {
        SimplePrompt.openPrompt('Bucket is already full!');
      } else {
        pickedUpBucket.fillUp();
      }
    } else {
      SimplePrompt.openPrompt('No bucket picked up!');
    }
  }
}
