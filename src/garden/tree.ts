import * as utils from '@dcl/ecs-scene-utils';
import { ACTIONS } from 'src/constants';
import { Model } from 'src/model';
import { Lemon } from './lemon';

export class Tree extends Model {
  private readonly lemons: Lemon[] = [];
  private maxShakeCount = 6;
  private shakeCount = 0;
  private rotation = 10;

  constructor(model: Model) {
    super(model);

    this.entity.addComponentOrReplace(
      new OnPointerDown(this.handleShake.bind(this), {
        hoverText: ACTIONS.shake,
      })
    );
    this.transform.rotation = Quaternion.Euler(0, 0, 0);

    this.lemons.push(
      new Lemon(
        [new Vector3(1.2, 3.2, 0.4), new Vector3(-1.3, 3, 0.1)],
        this.entity
      )
    );
    this.lemons.push(
      new Lemon(
        [new Vector3(-0.3, 3.6, 0.6), new Vector3(-0.4, 3.35, -0.6)],
        this.entity
      )
    );
    this.lemons.push(
      new Lemon(
        [new Vector3(0.5, 4.7, -0.5), new Vector3(0.45, 4.85, 0.15)],
        this.entity
      )
    );
  }

  private handleShake() {
    if (this.shakeCount === 0) this.shake();
  }

  /*
   * Imitates shaking animation by multiple times rotating tree
   * Method gets call recursively until maximum count of calls is reached
   */
  private shake() {
    if (this.shakeCount > this.maxShakeCount) {
      this.shakeCount = 0;
      this.lemons.forEach((lemon) => lemon.drop());
      return;
    }

    const startRot = this.transform.rotation;
    const endRot = Quaternion.Euler(
      this.shakeCount === this.maxShakeCount ? 0 : this.rotation,
      startRot.y,
      startRot.z
    );
    this.shakeCount++;
    this.rotation = -this.rotation;

    this.entity.addComponentOrReplace(
      new utils.RotateTransformComponent(
        startRot,
        endRot,
        0.7,
        this.shake.bind(this),
        utils.InterpolationType.EASEEXPO
      )
    );
  }
}
