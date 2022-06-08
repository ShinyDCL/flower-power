import { scene } from 'src/scene';
import { Bucket } from './bucket';
import { Fish } from './fish';
import { Well } from './well';

export const setUpPond = () => {
  // Create invisible box that blocks user from going onto pond
  const boxShape = new BoxShape();
  boxShape.visible = true;
  boxShape.isPointerBlocker = false;
  const box = new Entity();
  box.addComponentOrReplace(
    new Transform({
      position: new Vector3(22.75, 0, 20.75),
      rotation: new Quaternion(0, 0.258819, 0, 0.9659259),
      scale: new Vector3(7.5, 10, 6.5),
    })
  );
  box.addComponentOrReplace(boxShape);
  engine.addEntity(box);

  new Well(scene.well);
  new Bucket(scene.wellBucket1);
  new Bucket(scene.wellBucket2);
  new Bucket(scene.wellBucket3);
  new Fish();
};
