import { Circle } from 'src/ui/circle';
import { ImageSection, setSection } from 'src/utils';

/*
 * Moves 2D circles on the screen
 * Starts with invisible circles and gradually increases opacity
 */
export class MoveSystem implements ISystem {
  public group: Circle[] = [];
  public active: boolean = false;
  private speed: number = 0;
  private normalizedTime: number = 0;

  start(duration: number, imageSection: ImageSection): void {
    if (this.active) return;

    // Reset system
    this.active = true;
    this.speed = 1 / duration;
    this.normalizedTime = 0;

    // Reset all circles
    this.group.forEach((circle: Circle) => {
      setSection(circle, imageSection);
      circle.opacity = 0;
      circle.dOpacity = Math.abs(circle.dOpacity);
    });

    engine.addSystem(this);
  }

  stop(): void {
    this.active = false;
    engine.removeSystem(this);
  }

  update(dt: number) {
    this.group.forEach((circle) => {
      const { size } = circle;
      let { x, y, dx, dy } = circle;

      if (x + dx + size > 1422 || x + dx < 0) {
        dx = -dx;
      }
      if (y + dy + size > 686 || y + dy < 0) {
        dy = -dy;
      }

      x += dx;
      y += dy;

      circle.positionX = circle.x = x;
      circle.positionY = circle.y = y;
      circle.dx = dx;
      circle.dy = dy;
      circle.opacity += circle.dOpacity;

      if (circle.opacity > circle.targetOpacity) {
        circle.dOpacity = -circle.dOpacity;
      }
    });

    this.normalizedTime = Scalar.Clamp(
      this.normalizedTime + dt * this.speed,
      0,
      1
    );

    if (this.hasFinished()) {
      this.stop();
    }
  }

  hasFinished(): boolean {
    return this.normalizedTime >= 1;
  }
}
