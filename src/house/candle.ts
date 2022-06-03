import * as utils from '@dcl/ecs-scene-utils';
import { Model } from 'src/model';

export class Candle extends Model {
  private readonly clickSound = new AudioClip('models/candle/sounds/click.mp3');
  private isMoved = false;

  constructor(model: Model) {
    super(model);

    this.transform.rotation = Quaternion.Euler(0, 0, 0);
    this.entity.addComponentOrReplace(new AudioSource(this.clickSound));
  }

  public toggle() {
    const startRot = this.transform.rotation;
    let endRot: Quaternion;

    if (this.isMoved) {
      endRot = Quaternion.Euler(0, 0, 0);
    } else {
      endRot = Quaternion.Euler(0, 0, -30);
    }

    this.entity.addComponent(
      new utils.RotateTransformComponent(startRot, endRot, 0.8)
    );
    this.entity.getComponent(AudioSource).playOnce();
    this.isMoved = !this.isMoved;
  }
}
