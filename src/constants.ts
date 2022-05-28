export enum Item {
  ROSE_SEED = 'roseSeed',
  TULIP_SEED = 'tulipSeed',
  SUNFLOWER_SEED = 'sunflowerSeed',
  ROSE = 'rose',
  TULIP = 'tulip',
  SUNFLOWER = 'sunflower',
  RED_FISH = 'redFish',
  GREEN_FISH = 'greenFish',
  COINS = 'coins',
}
export type ItemKey = keyof typeof Item;

export const SEED_FLOWER_MAP: { [key: string]: Item } = {
  [Item.ROSE_SEED]: Item.ROSE,
  [Item.TULIP_SEED]: Item.TULIP,
  [Item.SUNFLOWER_SEED]: Item.SUNFLOWER,
};

export const ITEM_TITLES: { [key in Item]: string } = {
  [Item.ROSE_SEED]: 'Rose seed',
  [Item.TULIP_SEED]: 'Tulip seed',
  [Item.SUNFLOWER_SEED]: 'Sunflower seed',
  [Item.ROSE]: 'Rose',
  [Item.TULIP]: 'Tulip',
  [Item.SUNFLOWER]: 'Sunflower',
  [Item.RED_FISH]: 'Red fish',
  [Item.GREEN_FISH]: 'Green fish',
  [Item.COINS]: 'Coins',
};

export const SEEDS: Item[] = [
  Item.ROSE_SEED,
  Item.TULIP_SEED,
  Item.SUNFLOWER_SEED,
];

export const SPROUT_TIMES = {
  [Item.ROSE]: 5,
  [Item.TULIP]: 10,
  [Item.SUNFLOWER]: 20,
};

export const GROW_TIMES = {
  [Item.ROSE]: 10,
  [Item.TULIP]: 20,
  [Item.SUNFLOWER]: 40,
};

export const ACTIONS = {
  plant: 'Plant',
  water: 'Water',
  harvest: 'Harvest',
  pickUp: 'Pick up',
  getWater: 'Get water',
  catch: 'Catch!',
};

export const GROUND_LEVEL = 0;

export const RESOURCES = {
  sprout: 'models/sprout/Grass05.glb',
  tulip: 'models/tulip/Plant_03.glb',
  rose: 'models/rose/Flower_02.glb',
  sunflower: 'models/sunflower/Flower_01.glb',
  fishRed: 'models/fishRed/Fish_02.glb',
  fishGreen: 'models/fishGreen/Fish_03.glb',
};
