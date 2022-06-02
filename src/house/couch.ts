import * as utils from '@dcl/ecs-scene-utils';
import { ACTIONS } from 'src/constants';
import { Model } from 'src/model';

export class Couch extends Model {
  private isMoved = false;

  constructor(model: Model) {
    super(model);

    this.entity.addComponentOrReplace(
      new OnPointerDown(this.toggle.bind(this), { hoverText: ACTIONS.move })
    );
  }

  private toggle() {
    const { position } = this.transform;
    const endPosX = position.x + (this.isMoved ? 1 : -1);
    const endPos = new Vector3(endPosX, position.y, position.z);

    this.entity.addComponent(
      new utils.MoveTransformComponent(position, endPos, 1)
    );

    this.isMoved = !this.isMoved;
  }
}
