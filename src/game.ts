import { Item } from './constants';
import { setUpHouse } from './house/house';
import { setUpGarden } from './garden/garden';
import { setUpPond } from './pond/pond';
import { setUpForest } from './forest/forest';
import { Inventory } from './common/inventory';

Inventory.renderInventorySidebar();

// Add starter seeds and coins to inventory
Inventory.addItem(Item.ROSE_SEED, 3);
Inventory.addItem(Item.COINS, 10000);

// Set up four scene areas
setUpGarden();
setUpHouse();
setUpPond();
setUpForest();
