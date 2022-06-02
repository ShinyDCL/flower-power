import { Item } from './constants';
import { setUpHouse } from './house/house';
import { setUpGarden } from './garden/garden';
import { setUpPond } from './pond/pond';
import { inventory } from './state';

// Add starter seeds to inventory
inventory.addItem(Item.ROSE_SEED, 3);

// Set up four scene areas
setUpGarden();
setUpHouse();
setUpPond();
