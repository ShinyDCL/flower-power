enum Item {
  ROSE_SEED = 'roseSeed',
  TULIP_SEED = 'tulipSeed',
  SUNFLOWER_SEED = 'sunflowerSeed',
  BEAN_SEED = 'beanSeed',
  ROSE = 'rose',
  TULIP = 'tulip',
  SUNFLOWER = 'sunflower',
  BEAN = 'bean',
  LEMON = 'lemon',
  RED_FISH = 'redFish',
  GREEN_FISH = 'greenFish',
  COINS = 'coins',
}
type ItemKey = keyof typeof Item;
type Seed =
  | Item.ROSE_SEED
  | Item.TULIP_SEED
  | Item.SUNFLOWER_SEED
  | Item.BEAN_SEED;

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
  [Item.BEAN]: 'Magic bean',
  [Item.LEMON]: 'Lemon',
  [Item.RED_FISH]: 'Red fish',
  [Item.GREEN_FISH]: 'Green fish',
  [Item.COINS]: 'Coins',
};

const ITEM_VALUES: { [key in Item]: number } = {
  [Item.ROSE_SEED]: 5,
  [Item.TULIP_SEED]: 20,
  [Item.SUNFLOWER_SEED]: 50,
  [Item.BEAN_SEED]: 1000,
  [Item.ROSE]: 10,
  [Item.TULIP]: 40,
  [Item.SUNFLOWER]: 100,
  [Item.BEAN]: 5000,
  [Item.LEMON]: 2,
  [Item.RED_FISH]: 2,
  [Item.GREEN_FISH]: 2,
  [Item.COINS]: 1,
};

const SEEDS: Seed[] = [
  Item.ROSE_SEED,
  Item.TULIP_SEED,
  Item.SUNFLOWER_SEED,
  Item.BEAN_SEED,
];

const SPROUT_TIMES: { [key in Seed]: number } = {
  [Item.ROSE_SEED]: 5,
  [Item.TULIP_SEED]: 10,
  [Item.SUNFLOWER_SEED]: 20,
  [Item.BEAN_SEED]: 40,
};

const GROW_TIMES: { [key in Seed]: number } = {
  [Item.ROSE_SEED]: 10,
  [Item.TULIP_SEED]: 20,
  [Item.SUNFLOWER_SEED]: 40,
  [Item.BEAN_SEED]: 80,
};

const ACTIONS: { [key: string]: string } = {
  plant: 'Plant',
  water: 'Water',
  harvest: 'Harvest',
  pickUp: 'Pick up',
  getWater: 'Get water',
  catch: 'Catch',
  buy: 'Buy',
  sell: 'Sell',
  open: 'Open',
  close: 'Close',
  move: 'Move',
  collect: 'Collect',
  click: 'Click',
  activate: 'Activate',
  shake: 'Shake',
  eat: 'Eat',
};

const GROUND_LEVEL = 0;
const ACTIVATION_COST = 5000;
const SCREEN_WIDTH = 1422;
const SCREEN_HEIGHT = 686;

export {
  Item,
  ItemKey,
  Seed,
  SEED_FLOWER_MAP,
  ITEM_TITLES,
  ITEM_VALUES,
  SEEDS,
  SPROUT_TIMES,
  GROW_TIMES,
  ACTIONS,
  GROUND_LEVEL,
  ACTIVATION_COST,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
};
