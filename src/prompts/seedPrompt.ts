import * as ui from '@dcl/ui-scene-utils';
import { ItemComponent } from 'src/components/itemComponent';
import { Item, ITEM_TITLES, Seed, SEEDS } from 'src/constants';
import { IMAGE_TEXTURE, ITEM_ICONS, PROMPT_RESOURCES } from 'src/resources';
import { inventory } from 'src/state';
import { setSection } from 'src/utils';

export class SeedPrompt extends ui.CustomPrompt {
  constructor() {
    super(ui.PromptStyles.DARK, undefined, undefined, true);

    // Add title
    this.addText('Choose a seed', 0, 150, Color4.White(), 30);

    // Override background
    this.background.source = IMAGE_TEXTURE;
    this.background.opacity = 0.97;
    setSection(this.background, PROMPT_RESOURCES.background);

    // Override close icon
    this.closeIcon.source = IMAGE_TEXTURE;
    setSection(this.closeIcon, PROMPT_RESOURCES.closeIcon);

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

      const button = this.addButton(
        ITEM_TITLES[item],
        positionX,
        positionY,
        () => {},
        ui.ButtonStyles.ROUNDGOLD
      );
      button.addComponent(new ItemComponent(item));

      const icon = new ui.CustomPromptIcon(
        this,
        IMAGE_TEXTURE,
        positionX,
        positionY + imageSize,
        imageSize,
        imageSize,
        ITEM_ICONS[item]
      );
      this.elements.push(icon);
    });
  }

  public openPrompt(onSelect: (seed: Seed) => void): void {
    const buttons = this.elements.filter(
      (elem) => elem instanceof ui.CustomPromptButton
    ) as ui.CustomPromptButton[];

    buttons.forEach((button: ui.CustomPromptButton) => {
      const item = button.getComponent(ItemComponent).getItem();

      inventory.getItemCount(item) <= 0 ? button.grayOut() : button.enable();

      button.image.onClick = new OnPointerDown(() => {
        inventory.removeItem(item, 1);
        onSelect(item as Seed);
        this.hide();
      });
    });

    this.show();
  }
}
