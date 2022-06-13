import * as ui from '@dcl/ui-scene-utils';
import { IMAGE_TEXTURE, PROMPT } from 'src/resources';
import { setSection } from 'src/utils';
import { Image } from './image';

export class InstructionLabel {
  private static image: Image;
  private static text: UIText;

  private static create() {
    const image = new UIImage(ui.canvas, IMAGE_TEXTURE);
    image.hAlign = 'center';
    image.vAlign = 'top';
    image.positionY = 50;
    image.width = 300;
    image.height = 60;
    image.opacity = 0.9;
    setSection(image, PROMPT.background);
    this.image = image;

    const text = new UIText(image);
    text.hTextAlign = 'center';
    text.vTextAlign = 'center';
    text.fontSize = 18;
    this.text = text;
  }

  public static hide() {
    this.text.visible = false;
    this.image.visible = false;
  }

  public static show(text: string) {
    if (!this.image) this.create();

    this.text.value = text;
    this.text.visible = true;
    this.image.visible = true;
  }
}
