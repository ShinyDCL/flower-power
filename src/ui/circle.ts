import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'src/constants';
import { IMAGE_TEXTURE } from 'src/resources';
import { getRandomDecimal, getRandomIntInclusive } from 'src/utils';

export class Circle extends UIImage {
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  targetOpacity: number;
  dOpacity: number = 0.006;

  constructor(parent: UIShape) {
    super(parent, IMAGE_TEXTURE);

    const size = getRandomIntInclusive(100, 300);
    const x = getRandomIntInclusive(0, SCREEN_WIDTH - size);
    const y = getRandomIntInclusive(0, SCREEN_HEIGHT - size);

    this.dx = getRandomIntInclusive(3, 6);
    this.dy = getRandomIntInclusive(3, 6);
    this.targetOpacity = getRandomDecimal(0.5, 0.8);
    this.opacity = 0;

    this.width = this.height = this.size = size;
    this.positionX = this.x = x;
    this.positionY = this.y = y;
    this.hAlign = 'left';
    this.vAlign = 'bottom';
    this.isPointerBlocker = false;
  }
}
