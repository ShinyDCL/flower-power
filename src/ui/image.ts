import { canvas } from '@dcl/ui-scene-utils';
import { IMAGE_TEXTURE } from 'src/resources';
import { ImageSection, setSection } from 'src/utils';

export class Image extends UIImage {
  constructor(
    xOffset: number,
    yOffset: number,
    width: number,
    height: number,
    section: ImageSection
  ) {
    super(canvas, IMAGE_TEXTURE);

    this.hAlign = 'right';
    this.vAlign = 'bottom';
    this.positionX = xOffset;
    this.positionY = yOffset;
    this.width = width;
    this.height = height;
    setSection(this, section);
  }
}
