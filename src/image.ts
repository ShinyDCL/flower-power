import { canvas } from '@dcl/ui-scene-utils';
import { IMAGE_TEXTURE } from './resources';
import { ImageSection, setSection } from './utils';

export class Image extends Entity {
  image: UIImage;
  constructor(
    xOffset: number,
    yOffset: number,
    width: number,
    height: number,
    section: ImageSection
  ) {
    super();

    this.image = new UIImage(canvas, IMAGE_TEXTURE);
    this.image.hAlign = 'right';
    this.image.vAlign = 'bottom';
    this.image.positionX = xOffset ? xOffset : 0;
    this.image.positionY = yOffset ? yOffset : 0;
    this.image.width = width ? width : 64;
    this.image.height = height ? height : 64;
    setSection(this.image, section);
  }
}
