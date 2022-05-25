import * as ui from '@dcl/ui-scene-utils';

export class Modal {
  public prompt: ui.CustomPrompt;

  constructor() {
    this.prompt = new ui.CustomPrompt(
      ui.PromptStyles.DARK,
      undefined,
      undefined,
      true
    );
    this.prompt.background.source = new Texture('images/promptBackground.png');
    this.prompt.background.opacity = 0.9;
  }
}
