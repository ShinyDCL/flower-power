import * as utils from '@dcl/ecs-scene-utils';
import { ACTIONS } from 'src/constants';
import { Model } from 'src/model';
import { SOUNDS } from 'src/resources';

export class Door extends Model {
  private isOpen = false;

  constructor(model: Model) {
    super(model);

    this.entity.addComponentOrReplace(
      new OnPointerDown(this.toggle.bind(this), { hoverText: ACTIONS.open })
    );

    this.transform.rotation = Quaternion.Euler(0, -90, 0);
  }

  private toggle() {
    const startRot = this.transform.rotation;
    let endRot: Quaternion;

    if (this.isOpen) {
      this.entity.addComponentOrReplace(new AudioSource(SOUNDS.doorClose));
      this.entity.getComponent(OnPointerDown).hoverText = ACTIONS.open;
      endRot = Quaternion.Euler(0, -90, 0);
    } else {
      this.entity.addComponentOrReplace(new AudioSource(SOUNDS.doorOpen));
      this.entity.getComponent(OnPointerDown).hoverText = ACTIONS.close;
      endRot = Quaternion.Euler(0, 20, 0);
    }

    this.entity.addComponent(
      new utils.RotateTransformComponent(startRot, endRot, 1)
    );

    this.entity.getComponent(AudioSource).playOnce();

    this.isOpen = !this.isOpen;
  }
}
