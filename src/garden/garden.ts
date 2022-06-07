import { scene } from 'src/scene';
import { Flowerbed } from './flowerbed';
import { Sign } from './sign';
import { Store } from './store';

export const setUpGarden = () => {
  new Store(scene.store);
  new Flowerbed(scene.dirt1, true);
  new Flowerbed(scene.dirt2);
  new Flowerbed(scene.dirt3, true);
  new Flowerbed(scene.dirt4);
  new Flowerbed(scene.dirt5);
  new Flowerbed(scene.dirt6);
  new Sign(scene.signGarden, 'Garden & \n Market');
};
