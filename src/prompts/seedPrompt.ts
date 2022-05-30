import * as ui from '@dcl/ui-scene-utils';
import { ItemComponent } from 'src/components/itemComponent';
import { Item, ITEM_TITLES, SEEDS } from 'src/constants';
import { IMAGE_TEXTURE, ITEM_ICONS, PROMPT_RESOURCES } from 'src/resources';
import { inventory } from 'src/state';
import { setSection } from 'src/utils';

export class SeedPrompt {
  private readonly prompt: ui.CustomPrompt;

  constructor() {
    this.prompt = new ui.CustomPrompt(
      ui.PromptStyles.DARK,
      undefined,
      undefined,
      true
    );

    // Add title
    this.prompt.addText('Choose a seed', 0, 150, Color4.White(), 30);

    // Override background
    const { background } = this.prompt;
    background.source = IMAGE_TEXTURE;
    background.opacity = 0.97;
    setSection(background, PROMPT_RESOURCES.background);

    // Override close icon
    const { closeIcon } = this.prompt;
    closeIcon.source = IMAGE_TEXTURE;
    setSection(closeIcon, PROMPT_RESOURCES.closeIcon);

    this.addButtons();
  }

  private addButtons() {
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

  public openPrompt(onSelect: (item: Item) => void): void {
    const buttons = this.prompt.elements.filter(
      (elem) => elem instanceof ui.CustomPromptButton
    ) as ui.CustomPromptButton[];

    buttons.forEach((button: ui.CustomPromptButton) => {
      const item = button.getComponent(ItemComponent).getItem();
      if (inventory.getItemCount(item) <= 0) button.grayOut();

      button.image.onClick = new OnPointerDown(() => {
        inventory.removeItem(item, 1);
        onSelect(item);
        this.prompt.hide();
      });
    });

    this.prompt.show();
  }
}
