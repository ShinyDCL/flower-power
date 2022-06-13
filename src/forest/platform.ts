import * as utils from '@dcl/ecs-scene-utils';
import { movePlayerTo } from '@decentraland/RestrictedActions';
import { MODELS } from 'src/resources';

export class Platform extends Entity {
  private isMoving: boolean = false;

  constructor() {
    super();

    this.addComponent(MODELS.platform);
    this.addComponent(
      new Transform({
        position: new Vector3(5.75, -2.2, 27.25),
        scale: new Vector3(1, 1.1, 1),
      })
    );

    engine.addEntity(this);
  }

  public move(duration: number) {
    if (this.isMoving) return;

    this.isMoving = true;

    //Define the positions of the path
    const path: Vector3[] = [];
    path.push(new Vector3(5.75, -0.2, 27.25));
    path.push(new Vector3(5.75, 15, 27.25));
    path.push(new Vector3(16, 15, 28));
    path.push(new Vector3(24.2, 15, 24.2));
    path.push(new Vector3(28, 15, 16));
    path.push(new Vector3(24.2, 15, 7.8));
    path.push(new Vector3(16, 15, 4));
    path.push(new Vector3(7.8, 15, 7.8));
    path.push(new Vector3(4, 15, 16));
    path.push(new Vector3(7.8, 15, 24.2));
    path.push(new Vector3(5.75, -0.2, 27.25));
    path.push(new Vector3(5.75, -2.2, 27.25));

    void movePlayerTo({ x: 5.75, y: 0.2, z: 27.25 }).then(() => {
      utils.setTimeout(1, () => {
        // Move entity
        this.addComponent(
          new utils.FollowPathComponent(path, duration, () => {
            this.isMoving = false;
          })
        );
      });
    });
  }
}
