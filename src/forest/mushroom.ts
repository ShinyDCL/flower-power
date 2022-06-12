import * as utils from '@dcl/ecs-scene-utils';
import { Model } from 'src/model';
import { getRandomIntInclusive } from 'src/utils';

export class Mushroom extends Model {
  constructor(model: Model) {
    super(model);
  }

  public eat() {
    const timeout = getRandomIntInclusive(15000, 20000);

    this.entity.removeComponent(GLTFShape);
    utils.setTimeout(timeout, () => {
      this.entity.addComponentOrReplace(this.GLTFShape);
    });
  }
}
