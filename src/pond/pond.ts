import { scene } from 'src/scene';
import { Bucket } from './bucket';
import { Fish } from './fish';
import { Well } from './well';

export const setUpPond = () => {
  new Well(scene.well);
  new Bucket(scene.wellBucket1);
  new Bucket(scene.wellBucket2);
  new Bucket(scene.wellBucket3);
  new Fish();
};
