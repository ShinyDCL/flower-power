import { Sign } from 'src/common/sign';
import { scene } from 'src/scene';
import { Bucket } from './bucket';
import { Fish } from './fish';
import { Well } from './well';

export const setUpPond = () => {
  new Sign(scene.signPond, 'Catch fish');

  // Create invisible box that blocks user from going onto pond
  const boxShape = new BoxShape();
  boxShape.visible = false;
  boxShape.isPointerBlocker = false;
  boxShape.withCollisions = true;
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

  // Create invisible layer on top of pond which works as pointer blocker
  // It is possible to click through pond even though for the pond shape isPointerBlocker is set to true
  const layerShape = new BoxShape();
  layerShape.visible = false;
  layerShape.isPointerBlocker = true;
  layerShape.withCollisions = true;
  const layer = new Entity();
  layer.addComponentOrReplace(
    new Transform({
      position: new Vector3(22, 0.08, 20),
      rotation: new Quaternion(0, 0.258819, 0, 0.9659259),
      scale: new Vector3(7, 0.01, 4),
    })
  );
  layer.addComponentOrReplace(layerShape);
  engine.addEntity(layer);

  new Well(scene.well);
  new Bucket(scene.wellBucket1);
  new Bucket(scene.wellBucket2);
  new Bucket(scene.wellBucket3);
  new Fish();
};
