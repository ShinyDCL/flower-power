import * as ui from '@dcl/ui-scene-utils';
import { IMAGE_TEXTURE, PROMPT } from 'src/resources';
import { ImageSection, setSection } from 'src/utils';
import { Image } from './image';

export class SimplePrompt {
  private static prompt: ui.OkPrompt;
  private static image?: Image;

  static create() {
    const prompt = new ui.OkPrompt('', undefined, 'Ok', true);

    // Override background
    prompt.background.source = IMAGE_TEXTURE;
    prompt.background.opacity = 0.97;
    setSection(prompt.background, PROMPT.background);

    // Override close icon
    prompt.closeIcon.source = IMAGE_TEXTURE;
    setSection(prompt.closeIcon, PROMPT.close);

    prompt.text.positionY = -40;

    this.prompt = prompt;
  }

  static openPrompt(
    message: string,
    onAccept?: () => void,
    imageSection?: ImageSection
  ) {
    if (!this.prompt) {
      this.create();
    }

    if (imageSection) {
      const image = new Image(0, 5, 64, 64, imageSection);
      image.hAlign = 'center';
      image.vAlign = 'center';
      image.visible = true;
      this.image = image;
    }

    this.prompt.text.value = message;
    this.prompt.onAccept = () => {
      if (this.image) {
        this.image.visible = false;
      }
      onAccept && onAccept();
    };
    this.prompt.show();
  }
}
