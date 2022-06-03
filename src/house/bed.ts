import * as utils from '@dcl/ecs-scene-utils';
import { Model } from 'src/model';

export class Bed extends Model {
  private isMoved = false;

  constructor(model: Model) {
    super(model);
  }

  public toggle() {
    const { position } = this.transform;
    const endPosX = position.x + (this.isMoved ? 1 : -1);
    const endPos = new Vector3(endPosX, position.y, position.z);

    this.entity.addComponent(
      new utils.MoveTransformComponent(position, endPos, 0.8)
    );

    this.isMoved = !this.isMoved;
  }
}
