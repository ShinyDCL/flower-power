enum Item {
  ROSE_SEED = 'roseSeed',
  TULIP_SEED = 'tulipSeed',
  SUNFLOWER_SEED = 'sunflowerSeed',
  BEAN_SEED = 'beanSeed',
  ROSE = 'rose',
  TULIP = 'tulip',
  SUNFLOWER = 'sunflower',
  BEAN = 'bean',
  RED_FISH = 'redFish',
  GREEN_FISH = 'greenFish',
  COINS = 'coins',
}
type ItemKey = keyof typeof Item;

const SEED_FLOWER_MAP: { [key: string]: Item } = {
  [Item.ROSE_SEED]: Item.ROSE,
  [Item.TULIP_SEED]: Item.TULIP,
  [Item.SUNFLOWER_SEED]: Item.SUNFLOWER,
  [Item.BEAN_SEED]: Item.BEAN,
};

const ITEM_TITLES: { [key in Item]: string } = {
  [Item.ROSE_SEED]: 'Rose seed',
  [Item.TULIP_SEED]: 'Tulip seed',
  [Item.SUNFLOWER_SEED]: 'Sunflower seed',
  [Item.BEAN_SEED]: 'Bean seed',
  [Item.ROSE]: 'Rose',
  [Item.TULIP]: 'Tulip',
  [Item.SUNFLOWER]: 'Sunflower',
  [Item.BEAN]: 'Bean',
  [Item.RED_FISH]: 'Red fish',
  [Item.GREEN_FISH]: 'Green fish',
  [Item.COINS]: 'Coins',
};

const SEEDS: Item[] = [
  Item.ROSE_SEED,
  Item.TULIP_SEED,
  Item.SUNFLOWER_SEED,
  Item.BEAN_SEED,
];

const SPROUT_TIMES = {
  [Item.ROSE]: 5,
  [Item.TULIP]: 10,
  [Item.SUNFLOWER]: 20,
  [Item.BEAN]: 40,
};

const GROW_TIMES = {
  [Item.ROSE]: 10,
  [Item.TULIP]: 20,
  [Item.SUNFLOWER]: 40,
  [Item.BEAN]: 80,
};

const ACTIONS = {
  plant: 'Plant',
  water: 'Water',
  harvest: 'Harvest',
  pickUp: 'Pick up',
  getWater: 'Get water',
  catch: 'Catch!',
};

const GROUND_LEVEL = 0;

export {
  Item,
  ItemKey,
  SEED_FLOWER_MAP,
  ITEM_TITLES,
  SEEDS,
  SPROUT_TIMES,
  GROW_TIMES,
  ACTIONS,
  GROUND_LEVEL,
};
