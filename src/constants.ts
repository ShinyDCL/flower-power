export enum Item {
  ROSE_SEED = 'roseSeed',
  TULIP_SEED = 'tulipSeed',
  SUNFLOWER_SEED = 'sunflowerSeed',
  ROSE = 'rose',
  TULIP = 'tulip',
  SUNFLOWER = 'sunflower',
  WATER = 'water',
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
  [Item.WATER]: 'Water',
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
};

export const GROUND_LEVEL = 0;
