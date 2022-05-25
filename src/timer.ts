import * as utils from '@dcl/ecs-scene-utils';

export class Timer extends Entity {
  constructor(positionX: number, positionY: number, positionZ: number) {
    super();

    this.addComponent(
      new Transform({
        position: new Vector3(positionX, positionY, positionZ),
      })
    );
    this.addComponent(new TextShape());
    this.getComponent(TextShape).visible = false;
    this.getComponent(TextShape).color = Color3.White();
    this.getComponent(TextShape).fontSize = 2;
    this.addComponent(new Billboard());

    engine.addEntity(this);
  }

  public startCountDown(seconds: number): void {
    this.getComponent(TextShape).visible = true;
    this.getComponent(TextShape).value = this.formatTimeString(seconds);

    this.addComponent(
      new utils.Interval(1000, (): void => {
        seconds--;

        if (seconds > 0) {
          this.updateTimeString(seconds);
        } else {
          this.removeComponent(utils.Interval);
          this.getComponent(TextShape).visible = false;
        }
      })
    );
  }

  private formatTimeString(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return (
      mins.toLocaleString(undefined, { minimumIntegerDigits: 2 }) +
      ':' +
      secs.toLocaleString(undefined, { minimumIntegerDigits: 2 })
    );
  }

  private updateTimeString(seconds: number): void {
    this.getComponent(TextShape).value = this.formatTimeString(seconds);
  }
}
