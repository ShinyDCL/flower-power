import * as ui from '@dcl/ui-scene-utils';
import { IMAGE_TEXTURE, PROMPT_RESOURCES } from 'src/resources';
import { setSection } from 'src/utils';

export class SimplePrompt extends ui.OkPrompt {
  constructor() {
    super('', undefined, 'Ok', true);

    // Override background
    this.background.source = IMAGE_TEXTURE;
    this.background.opacity = 0.97;
    setSection(this.background, PROMPT_RESOURCES.background);

    // Override close icon
    this.closeIcon.source = IMAGE_TEXTURE;
    setSection(this.closeIcon, PROMPT_RESOURCES.closeIcon);

    this.hide();
  }

  public openPrompt(message: string, onAccept: (() => void) | null = null) {
    this.text.value = message;
    this.onAccept = onAccept;
    this.show();
  }
}
