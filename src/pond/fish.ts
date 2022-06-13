import * as utils from '@dcl/ecs-scene-utils';
import * as ui from '@dcl/ui-scene-utils';
import { Inventory } from 'src/common/inventory';
import { ACTIONS, GROUND_LEVEL, Item } from 'src/constants';
import { MODELS } from 'src/resources';
import { getRandomDecimal, getRandomIntInclusive, getShape } from 'src/utils';

const redFishShape = getShape(MODELS.fishRed, true, true, true);
const greenFishShape = getShape(MODELS.fishGreen, true, true, true);

export class Fish extends Entity {
  private parent: Entity;
  constructor() {
    super();

    this.addComponent(
      new Transform({
        scale: new Vector3(1.5, 1.5, 1.5),
        rotation: Quaternion.Euler(0, 0, 270),
      })
    );
    // Add interaction to catch fish
    this.addComponentOrReplace(
      new OnPointerDown(this.handleCatch.bind(this), {
        hoverText: ACTIONS.catch,
      })
    );

    this.parent = new Entity();
    this.parent.addComponent(new Transform({}));
    this.parent.addComponent(new utils.Interval(3000, this.jump.bind(this)));

    this.setParent(this.parent);
    engine.addEntity(this.parent);
  }

  public jump() {
    const X1 = getRandomDecimal(19, 22);
    const Z1 = getRandomDecimal(19.5, 22);
    const X2 = getRandomDecimal(22, 25);
    const Z2 = getRandomDecimal(18, 20);
    const Y = getRandomDecimal(1.5, 2.6);

    // Define the positions of the path
    const path = [];
    path.push(new Vector3(X1, GROUND_LEVEL - 0.5, Z1));
    path.push(new Vector3((X1 + X2) / 2, Y, (Z1 + Z2) / 2));
    path.push(new Vector3(X2, GROUND_LEVEL - 0.5, Z2));

    // Randomize from which side fish starts to jump
    getRandomIntInclusive(1, 2) === 1 && path.reverse();

    // Randomize fish type
    this.addComponentOrReplace(
      getRandomIntInclusive(1, 2) === 1 ? redFishShape : greenFishShape
    );
    this.getComponent(GLTFShape).visible = true;

    // Move entity
    this.parent.addComponentOrReplace(
      new utils.FollowCurvedPathComponent(path, 1.5, 20, true)
    );
  }

  private handleCatch() {
    const shape = this.getComponent(GLTFShape);
    const fish = shape === redFishShape ? Item.RED_FISH : Item.GREEN_FISH;

    Inventory.addItem(fish, 1);
    shape.visible = false;

    ui.displayAnnouncement('Cought it!', 1, Color4.Yellow(), 40);
  }
}
