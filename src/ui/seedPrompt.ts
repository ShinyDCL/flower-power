import * as ui from '@dcl/ui-scene-utils';
import { ItemComponent } from 'src/components/itemComponent';
import { Item, ITEM_TITLES, Seed, SEEDS } from 'src/constants';
import { IMAGE_TEXTURE, ITEM_ICONS, PROMPT } from 'src/resources';
import { inventory } from 'src/state';
import { setSection } from 'src/utils';

export class SeedPrompt {
  private static prompt: ui.CustomPrompt;

  private static create() {
    const prompt = new ui.CustomPrompt(
      ui.PromptStyles.DARK,
      undefined,
      undefined,
      true
    );

    // Add title
    prompt.addText('Choose a seed', 0, 150, Color4.White(), 30);

    // Override background
    prompt.background.source = IMAGE_TEXTURE;
    prompt.background.opacity = 0.97;
    setSection(prompt.background, PROMPT.background);

    // Override close icon
    prompt.closeIcon.source = IMAGE_TEXTURE;
    setSection(prompt.closeIcon, PROMPT.close);

    this.prompt = prompt;
    this.addButtons();
  }

  private static addButtons() {
    const spaceX = 200,
      spaceY = 130,
      startX = -100,
      startY = 0,
      itemsPerRow = 2,
      imageSize = 70;

    SEEDS.forEach((item: Item, index: number) => {
      const row = Math.floor(index / itemsPerRow);
      const column = index % itemsPerRow;
      const positionX = startX + column * spaceX;
      const positionY = startY - row * spaceY;

      const button = this.prompt.addButton(
        ITEM_TITLES[item],
        positionX,
        positionY,
        () => {},
        ui.ButtonStyles.ROUNDGOLD
      );
      button.addComponent(new ItemComponent(item));

      const icon = new ui.CustomPromptIcon(
        this.prompt,
        IMAGE_TEXTURE,
        positionX,
        positionY + imageSize,
        imageSize,
        imageSize,
        ITEM_ICONS[item]
      );
      this.prompt.elements.push(icon);
    });
  }

  public static openPrompt(onSelect: (seed: Seed) => void): void {
    if (!this.prompt) this.create();

    const buttons = this.prompt.elements.filter(
      (elem) => elem instanceof ui.CustomPromptButton
    ) as ui.CustomPromptButton[];

    buttons.forEach((button: ui.CustomPromptButton) => {
      const item = button.getComponent(ItemComponent).getItem();

      inventory.getItemCount(item) <= 0 ? button.grayOut() : button.enable();

      button.image.onClick = new OnPointerDown(() => {
        inventory.removeItem(item, 1);
        onSelect(item as Seed);
        this.prompt.hide();
      });
    });

    this.prompt.show();
  }
}
