import { Sign } from 'src/common/sign';
import { scene } from 'src/scene';
import { Flowerbed } from './flowerbed';
import { Store } from './store';
import { Tree } from './tree';

export const setUpGarden = () => {
  new Store(scene.store);
  new Flowerbed(scene.dirt1);
  new Flowerbed(scene.dirt2);
  new Flowerbed(scene.dirt3, true);
  new Flowerbed(scene.dirt4);
  new Flowerbed(scene.dirt5, true);
  new Flowerbed(scene.dirt6);
  new Sign(scene.signGarden, 'Garden & \n Market');
  new Tree(scene.tree1);
  new Tree(scene.tree2);
};
