import * as ui from '@dcl/ui-scene-utils';
import { ItemComponent } from 'src/components/itemComponent';
import {
  ACTIONS,
  Item,
  ItemKey,
  ITEM_TITLES,
  ITEM_VALUES,
} from 'src/constants';
import { IMAGE_TEXTURE, ITEM_ICONS, PROMPT } from 'src/resources';
import { inventory } from 'src/state';
import { setSection } from 'src/utils';

export class MarketPrompt extends ui.CustomPrompt {
  constructor() {
    super(ui.PromptStyles.DARK, 720, 540, true);

    // Add title
    this.addText('Market', 0, 230, Color4.White(), 30);
    this.addText(
      'Buy seeds, sell flowers and fish',
      0,
      200,
      Color4.White(),
      20
    );

    // Override background
    this.background.source = IMAGE_TEXTURE;
    this.background.opacity = 0.97;
    setSection(this.background, PROMPT.background);

    // Override close icon
    this.closeIcon.source = IMAGE_TEXTURE;
    setSection(this.closeIcon, PROMPT.close);

    this.addButtons();
  }

  private addButtons() {
    const spaceX = 160,
      spaceY = 130,
      startX = -240,
      startY = 50,
      itemsPerRow = 4,
      imageSize = 70;

    const keys = Object.keys(Item) as ItemKey[];

    keys.forEach((key: ItemKey, index: number) => {
      const item = Item[key];
      const row = Math.floor(index / itemsPerRow);
      const column = index % itemsPerRow;
      const positionX = startX + column * spaceX;
      const positionY = startY - row * spaceY;

      // Skip coins so it is not possible to buy or sell them
      if (item === Item.COINS) return;

      // First four items are seeds which can only be bought
      // The rest of the items are produce which can only be sold
      const action = index < 4 ? ACTIONS.buy : ACTIONS.sell;
      const button = this.addButton(
        action,
        positionX,
        positionY,
        (() => {
          if (action === ACTIONS.buy) {
            inventory.addItem(item, 1);
            inventory.removeItem(Item.COINS, ITEM_VALUES[item]);
          } else {
            inventory.removeItem(item, 1);
            inventory.addItem(Item.COINS, ITEM_VALUES[item]);
          }
          this.updateItemAvailability();
        }).bind(this),
        ui.ButtonStyles.ROUNDGOLD
      );
      button.image.width = 140;
      button.image.height = 40;
      button.label.font = new Font(Fonts.SansSerif_SemiBold);
      button.addComponent(new ItemComponent(item, action));

      const itemIcon = new ui.CustomPromptIcon(
        this,
        IMAGE_TEXTURE,
        positionX,
        positionY + imageSize,
        imageSize,
        imageSize,
        ITEM_ICONS[item]
      );
      this.elements.push(itemIcon);

      this.addText(
        `${ITEM_TITLES[item]} | ${ITEM_VALUES[item]} coins`,
        positionX,
        positionY + 50,
        Color4.White(),
        12
      );
    });
  }

  private updateItemAvailability() {
    const buttons = this.elements.filter(
      (elem) => elem instanceof ui.CustomPromptButton
    ) as ui.CustomPromptButton[];

    buttons.forEach((button: ui.CustomPromptButton) => {
      const itemComponent = button.getComponent(ItemComponent);
      const item = itemComponent.getItem();
      const action = itemComponent.getAction();

      if (action === ACTIONS.buy) {
        inventory.getItemCount(Item.COINS) < ITEM_VALUES[item]
          ? button.grayOut()
          : button.enable();
      } else {
        inventory.getItemCount(item) <= 0 ? button.grayOut() : button.enable();
      }
    });
  }

  public openPrompt(): void {
    this.updateItemAvailability();
    this.show();
  }
}
