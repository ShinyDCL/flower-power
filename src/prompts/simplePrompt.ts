import * as ui from '@dcl/ui-scene-utils';
import { IMAGE_TEXTURE, PROMPT_RESOURCES } from 'src/resources';
import { setSection } from 'src/utils';

export class SimplePrompt {
  private readonly prompt: ui.OkPrompt;
  constructor() {
    this.prompt = new ui.OkPrompt('', undefined, 'Ok', true);

    // Override background
    const { background } = this.prompt;
    background.source = IMAGE_TEXTURE;
    background.opacity = 0.97;
    setSection(background, PROMPT_RESOURCES.background);

    // Override close icon
    const { closeIcon } = this.prompt;
    closeIcon.source = IMAGE_TEXTURE;
    setSection(closeIcon, PROMPT_RESOURCES.closeIcon);

    this.prompt.hide();
  }

  public openPrompt(message: string) {
    this.prompt.text.value = message;
    this.prompt.show();
  }
}
