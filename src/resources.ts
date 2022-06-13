import { Item } from './constants';
import { getShape, ImageSection } from './utils';

const MODELS = {
  sprout: getShape('models/sprout/Grass05.glb'),
  tulip: getShape('models/tulip/Plant_03.glb'),
  rose: getShape('models/rose/Flower_02.glb'),
  sunflower: getShape('models/sunflower/Flower_01.glb'),
  bean: getShape('models/bean/Vegetation_05.glb'),
  lemon: getShape('models/lemon/FoodLemon_01.glb', true, true, true),
  fishRed: getShape('models/fishRed/Fish_02.glb', true, true, true),
  fishGreen: getShape('models/fishGreen/Fish_03.glb', true, true, true),
  platform: getShape('models/platform/Platform.glb', false, false, false),
};

const SOUNDS = {
  chestOpen: new AudioClip('sounds/ChestOpen.mp3'),
  chestClose: new AudioClip('sounds/ChestClose.mp3'),
  collect: new AudioClip('sounds/Collect.mp3'),
  leverClick: new AudioClip('sounds/LeverClick.mp3'),
  move: new AudioClip('sounds/Move.mp3'),
  doorOpen: new AudioClip('sounds/DoorOpen.mp3'),
  doorClose: new AudioClip('sounds/DoorClose.mp3'),
  pickUp: new AudioClip('sounds/PickUp.mp3'),
  click: new AudioClip('sounds/Click.mp3'),
};

const IMAGE_TEXTURE = new Texture('images/inventory.png');

const iconSize = {
  sourceWidth: 100,
  sourceHeight: 100,
};
const circleSize = {
  sourceWidth: 200,
  sourceHeight: 200,
};

const PROMPT = {
  background: {
    sourceWidth: 700,
    sourceHeight: 500,
    sourceLeft: 0,
    sourceTop: 0,
  },
  close: {
    ...iconSize,
    sourceLeft: 900,
    sourceTop: 300,
  },
};

const ITEM_ICONS: { [key in Item]: ImageSection } = {
  [Item.ROSE_SEED]: {
    ...iconSize,
    sourceLeft: 800,
    sourceTop: 200,
  },
  [Item.TULIP_SEED]: {
    ...iconSize,
    sourceLeft: 800,
    sourceTop: 100,
  },
  [Item.SUNFLOWER_SEED]: {
    ...iconSize,
    sourceLeft: 800,
    sourceTop: 0,
  },
  [Item.BEAN_SEED]: {
    ...iconSize,
    sourceLeft: 800,
    sourceTop: 300,
  },
  [Item.ROSE]: {
    ...iconSize,
    sourceLeft: 701,
    sourceTop: 200,
  },
  [Item.TULIP]: {
    ...iconSize,
    sourceLeft: 701,
    sourceTop: 100,
  },
  [Item.SUNFLOWER]: {
    ...iconSize,
    sourceLeft: 701,
    sourceTop: 0,
  },
  [Item.BEAN]: {
    ...iconSize,
    sourceLeft: 701,
    sourceTop: 300,
  },
  [Item.LEMON]: {
    ...iconSize,
    sourceLeft: 800,
    sourceTop: 400,
  },
  [Item.RED_FISH]: {
    ...iconSize,
    sourceLeft: 900,
    sourceTop: 0,
  },
  [Item.GREEN_FISH]: {
    ...iconSize,
    sourceLeft: 900,
    sourceTop: 100,
  },
  [Item.COINS]: {
    ...iconSize,
    sourceLeft: 900,
    sourceTop: 200,
  },
};

const CIRCLES = {
  pink: {
    ...circleSize,
    sourceLeft: 0,
    sourceTop: 501,
  },
  blue: {
    ...circleSize,
    sourceLeft: 200,
    sourceTop: 501,
  },
  yellow: {
    ...circleSize,
    sourceLeft: 400,
    sourceTop: 501,
  },
  green: {
    ...circleSize,
    sourceLeft: 600,
    sourceTop: 501,
  },
};

const INVENTORY = {
  gem: {
    ...iconSize,
    sourceLeft: 701,
    sourceTop: 400,
  },
  background: {
    sourceWidth: 660,
    sourceHeight: 460,
    sourceLeft: 20,
    sourceTop: 20,
  },
};

export {
  MODELS,
  SOUNDS,
  IMAGE_TEXTURE,
  PROMPT,
  ITEM_ICONS,
  CIRCLES,
  INVENTORY,
};
