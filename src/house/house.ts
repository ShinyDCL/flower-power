import { scene } from 'src/scene';
import { Chest } from './chest';
import { Couch } from './couch';
import { Door } from './door';

export const setUpHouse = () => {
  new Door(scene.door);
  new Chest(scene.chest1);
  new Chest(scene.chest2);
  new Couch(scene.couch);
};
