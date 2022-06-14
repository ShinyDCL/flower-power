import { canvas } from '@dcl/ui-scene-utils';
import { Sign } from 'src/common/sign';
import { ACTIONS } from 'src/constants';
import { CIRCLES } from 'src/resources';
import { scene } from 'src/scene';
import { MoveSystem } from 'src/systems/moveSystem';
import { Circle } from 'src/ui/circle';
import { Mushroom } from './mushroom';
import { Platform } from './platform';

export const setUpForest = () => {
  new Sign(scene.signForest, 'Magic forest');
  const platform = new Platform();

  const moveSystem = new MoveSystem();
  for (let i = 0; i < 10; i++) {
    const circle = new Circle(canvas);
    moveSystem.group.push(circle);
  }

  const mushrooms = [
    { obj: new Mushroom(scene.mushroom1), color: CIRCLES.pink },
    { obj: new Mushroom(scene.mushroom2), color: CIRCLES.blue },
    { obj: new Mushroom(scene.mushroom3), color: CIRCLES.yellow },
    { obj: new Mushroom(scene.mushroom4), color: CIRCLES.green },
  ];
  mushrooms.forEach(({ obj, color }) => {
    obj.entity.addComponentOrReplace(
      new OnPointerDown(
        () => {
          if (platform.isMoving && moveSystem.active) return;

          obj.eat();
          platform.move(10);
          moveSystem.start(10, color);
        },
        {
          hoverText: ACTIONS.eat,
        }
      )
    );
  });
};
