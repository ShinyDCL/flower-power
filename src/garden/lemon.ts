import * as utils from '@dcl/ecs-scene-utils';
import { Inventory } from 'src/common/inventory';
import { ACTIONS, Item } from 'src/constants';
import { MODELS, SOUNDS } from 'src/resources';

import { getRandomIntInclusive } from 'src/utils';

export class Lemon extends Entity {
  private readonly positions: Vector3[];

  constructor(positions: Vector3[], parent: Entity) {
    super();

    this.positions = positions;
    this.addComponentOrReplace(new AudioSource(SOUNDS.collect));
    this.addComponentOrReplace(new Transform());
    this.setParent(parent);

    this.spawn();
  }

  public drop() {
    const { position } = this.getComponent(Transform);
    const endPos = new Vector3(position.x, 0, position.z);

    this.addComponentOrReplace(
      new utils.MoveTransformComponent(
        position,
        endPos,
        0.3 * position.y,
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
    Inventory.addItem(Item.LEMON, 1);
    this.getComponent(AudioSource).playOnce();
    this.removeComponent(GLTFShape);
    this.removeComponent(OnPointerDown);

    const timeout = getRandomIntInclusive(10000, 20000);
    utils.setTimeout(timeout, this.spawn.bind(this));
  }

  private spawn() {
    const index = getRandomIntInclusive(0, this.positions.length - 1);
    const position = this.positions[index];
    this.getComponent(Transform).position = position.clone();
    this.addComponentOrReplace(MODELS.lemon);
  }
}
