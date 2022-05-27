import * as ui from '@dcl/ui-scene-utils';

export class Prompt {
  private readonly prompt: ui.OkPrompt;
  constructor() {
    this.prompt = new ui.OkPrompt('', undefined, 'Ok', true);
    this.prompt.hide();
  }

  public openPrompt(message: string) {
    this.prompt.text.value = message;
    this.prompt.show();
  }
}

export const prompt = new Prompt();
