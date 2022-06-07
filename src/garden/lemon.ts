import * as utils from '@dcl/ecs-scene-utils';
import { ACTIONS, Item } from 'src/constants';
import { MODELS } from 'src/resources';
import { inventory } from 'src/state';
import { getShape } from 'src/utils';

export class Lemon extends Entity {
  constructor(transform: TransformConstructorArgs, parent: Entity) {
    super();

    this.addComponentOrReplace(getShape(MODELS.lemon, true, true, true));
    this.addComponentOrReplace(new Transform(transform));
    this.setParent(parent);
  }

  public drop() {
    const { position } = this.getComponent(Transform);
    const endPos = new Vector3(position.x, 0, position.z);

    this.addComponentOrReplace(
      new utils.MoveTransformComponent(
        position,
        endPos,
        1,
        this.addPickUpButton.bind(this),
        utils.InterpolationType.EASEOUTEBOUNCE
      )
    );
  }

  private addPickUpButton() {
    this.addComponentOrReplace(
      new OnPointerDown(this.handlePickUp.bind(this), {
        hoverText: ACTIONS.pickUp,
      })
    );
  }

  private handlePickUp() {
    inventory.addItem(Item.LEMON, 1);
    this.getComponent(GLTFShape).visible = false;
    this.removeComponent(OnPointerDown);
  }

  public respawn(transform: TransformConstructorArgs) {
    this.addComponentOrReplace(new Transform(transform));
    this.getComponent(GLTFShape).visible = true;
  }
}
