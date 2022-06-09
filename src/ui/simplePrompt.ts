import * as ui from '@dcl/ui-scene-utils';
import { IMAGE_TEXTURE, PROMPT } from 'src/resources';
import { ImageSection, setSection } from 'src/utils';
import { Image } from './image';

export class SimplePrompt {
  private static prompt: ui.OkPrompt;
  private static image: Image;
  private static text: UIText;

  static create() {
    const prompt = new ui.OkPrompt('', undefined, 'Ok', true);
    this.prompt = prompt;
    prompt.text.positionY = -40;

    // Override background
    prompt.background.source = IMAGE_TEXTURE;
    prompt.background.opacity = 0.97;
    setSection(prompt.background, PROMPT.background);

    // Override close icon
    prompt.closeIcon.source = IMAGE_TEXTURE;
    setSection(prompt.closeIcon, PROMPT.close);

    // Override onClick function for close icon to hide additional elements
    prompt.closeIcon.onClick = new OnPointerDown(() => {
      this.image.visible = false;
      this.text.visible = false;
      this.prompt.hide();
    });

    // Add image between title and accept button
    const image = new Image(0, 5, 64, 64, PROMPT.background);
    image.visible = false;
    image.hAlign = 'center';
    image.vAlign = 'center';
    this.image = image;

    // Add text above image
    const text = new UIText(ui.canvas);
    text.visible = false;
    text.hAlign = 'center';
    text.vAlign = 'center';
    text.hTextAlign = 'center';
    text.fontSize = 20;
    text.positionY = 40;
    this.text = text;
  }

  static openPrompt(
    message: string,
    onAccept?: () => void,
    imageSection?: ImageSection,
    imageText?: string
  ) {
    if (!this.prompt) {
      this.create();
    }

    if (imageSection) {
      setSection(this.image, imageSection);
      this.image.visible = true;
    }

    if (imageText) {
      this.text.value = imageText;
      this.text.visible = true;
    }

    this.prompt.text.value = message;
    this.prompt.onAccept = () => {
      this.image.visible = false;
      this.text.visible = false;
      onAccept && onAccept();
    };
    this.prompt.close;
    this.prompt.show();
  }
}
