import * as utils from '@dcl/ecs-scene-utils';
import { ACTIONS } from 'src/constants';
import { Model } from 'src/model';
import { getRandomIntInclusive } from 'src/utils';
import { Lemon } from './lemon';

export class Tree extends Model {
  private readonly lemonPositions: Vector3[] = [
    new Vector3(1.2, 3.2, 0.4),
    new Vector3(-1.3, 3, 0.1),
    new Vector3(-0.3, 3.6, 0.6),
    new Vector3(-0.4, 3.35, -0.6),
    new Vector3(0.5, 4.7, -0.5),
    new Vector3(0.45, 4.85, 0.15),
  ];
  private readonly lemons: Lemon[] = [];
  private maxShakeCount = 6;
  private shakeCount = 0;
  private rotation = 10;

  constructor(model: Model) {
    super(model);

    this.addShakeButton();
    this.transform.rotation = Quaternion.Euler(0, 0, 0);

    for (let i = 0; i < 3; i++) {
      const index = getRandomIntInclusive(0, 5);
      const position = this.lemonPositions[index];
      const lemon = new Lemon({ position }, this.entity);
      this.lemons.push(lemon);
    }
  }

  private handleShake() {
    // Remove shake button when starting to shake tree
    if (this.shakeCount === 0) {
      this.entity.removeComponent(OnPointerDown);
    }

    if (this.shakeCount > this.maxShakeCount) {
      this.shakeCount = 0;

      this.lemons.forEach((lemon: Lemon) => {
        const timeout = getRandomIntInclusive(10000, 20000);
        lemon.drop();
        utils.setTimeout(timeout, () => {
          const index = getRandomIntInclusive(0, 5);
          const position = this.lemonPositions[index];
          lemon.respawn({ position });
        });
      });
      this.addShakeButton();

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
        this.handleShake.bind(this),
        utils.InterpolationType.EASEEXPO
      )
    );
  }

  private addShakeButton() {
    this.entity.addComponentOrReplace(
      new OnPointerDown(this.handleShake.bind(this), {
        hoverText: ACTIONS.shake,
      })
    );
  }
}
