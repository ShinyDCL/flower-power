import { ACTIONS, GROUND_LEVEL } from './constants';
import { Model } from './model';
import { userState } from './state';

export class Bucket extends Model {
  private readonly water: Entity;
  private full: boolean = false;

  constructor(model: Model) {
    super(model);

    const waterShape = new CylinderShape();
    waterShape.withCollisions = false;
    waterShape.visible = false;
    waterShape.isPointerBlocker = false;

    const waterMaterial = new Material();
    waterMaterial.albedoColor = Color3.FromHexString('#9dcffa');
    waterMaterial.metallic = 0;
    waterMaterial.reflectivityColor = Color3.FromHexString('#9dcffa');

    const water = new Entity();
    water.addComponent(waterShape);
    water.addComponent(waterMaterial);
    water.addComponent(
      new Transform({
        scale: new Vector3(0.2, 0.01, 0.2),
      })
    );
    water.getComponent(Transform).position.y = 0.3;
    engine.addEntity(water);
    water.setParent(this.entity);

    this.water = water;
    this.addPickUpButton();

    // Handle press on 'F' button - but down bucket
    const input = Input.instance;
    input.subscribe(
      'BUTTON_DOWN',
      ActionButton.SECONDARY,
      false,
      this.handlePutDown.bind(this)
    );
  }

  private handlePickUp(): void {
    this.entity.removeComponent(OnPointerDown);
    this.entity.setParent(Attachable.AVATAR);
    this.entity.addComponentOrReplace(
      new Transform({
        position: new Vector3(0, -0.3, 0.5),
      })
    );
    userState.pickedUpBucket = this;
  }

  private handlePutDown({ origin, direction }: LocalActionButtonEvent): void {
    // Check if this is the bucket that user is currently carrying
    if (userState.pickedUpBucket?.entity.uuid !== this.entity.uuid) return;

    userState.pickedUpBucket = null;

    this.entity.setParent(null);
    this.entity.addComponentOrReplace(
      new Transform({
        position: new Vector3(
          origin.x + direction.x,
          GROUND_LEVEL,
          origin.z + direction.z
        ),
      })
    );

    this.addPickUpButton();
  }

  private addPickUpButton() {
    this.entity.addComponentOrReplace(
      new OnPointerDown(this.handlePickUp.bind(this), {
        hoverText: ACTIONS.pickUp,
      })
    );
  }

  public empty(): void {
    this.full = false;
    this.water.getComponent(CylinderShape).visible = false;
  }

  public fillUp(): void {
    this.full = true;
    this.water.getComponent(CylinderShape).visible = true;
  }

  public isFull(): boolean {
    return this.full;
  }
}
