import { Item } from './constants';
import { ImageSection } from './utils';

const MODELS = {
  sprout: 'models/sprout/Grass05.glb',
  tulip: 'models/tulip/Plant_03.glb',
  rose: 'models/rose/Flower_02.glb',
  sunflower: 'models/sunflower/Flower_01.glb',
  bean: 'models/bean/Vegetation_05.glb',
  lemon: 'models/lemon/FoodLemon_01.glb',
  plank: 'models/plank/Wood 2.glb',
  fishRed: 'models/fishRed/Fish_02.glb',
  fishGreen: 'models/fishGreen/Fish_03.glb',
};

const IMAGE_TEXTURE = new Texture('images/inventory.png');

const iconSize = {
  sourceWidth: 100,
  sourceHeight: 100,
};

const PROMPT_RESOURCES = {
  background: {
    sourceWidth: 600,
    sourceHeight: 400,
    sourceLeft: 0,
    sourceTop: 0,
  },
  inventoryBackground: {
    sourceWidth: 560,
    sourceHeight: 360,
    sourceLeft: 20,
    sourceTop: 20,
  },
  closeIcon: {
    ...iconSize,
    sourceLeft: 800,
    sourceTop: 300,
  },
};

const ITEM_ICONS: { [key in Item]: ImageSection } = {
  [Item.ROSE_SEED]: {
    ...iconSize,
    sourceLeft: 700,
    sourceTop: 200,
  },
  [Item.TULIP_SEED]: {
    ...iconSize,
    sourceLeft: 700,
    sourceTop: 100,
  },
  [Item.SUNFLOWER_SEED]: {
    ...iconSize,
    sourceLeft: 700,
    sourceTop: 0,
  },
  [Item.BEAN_SEED]: {
    ...iconSize,
    sourceLeft: 700,
    sourceTop: 300,
  },
  [Item.ROSE]: {
    ...iconSize,
    sourceLeft: 600,
    sourceTop: 200,
  },
  [Item.TULIP]: {
    ...iconSize,
    sourceLeft: 600,
    sourceTop: 100,
  },
  [Item.SUNFLOWER]: {
    ...iconSize,
    sourceLeft: 600,
    sourceTop: 0,
  },
  [Item.BEAN]: {
    ...iconSize,
    sourceLeft: 600,
    sourceTop: 300,
  },
  [Item.LEMON]: {
    ...iconSize,
    sourceLeft: 600,
    sourceTop: 300,
  },
  [Item.RED_FISH]: {
    ...iconSize,
    sourceLeft: 800,
    sourceTop: 0,
  },
  [Item.GREEN_FISH]: {
    ...iconSize,
    sourceLeft: 800,
    sourceTop: 100,
  },
  [Item.COINS]: {
    ...iconSize,
    sourceLeft: 800,
    sourceTop: 200,
  },
};

export { MODELS, IMAGE_TEXTURE, PROMPT_RESOURCES, ITEM_ICONS };
