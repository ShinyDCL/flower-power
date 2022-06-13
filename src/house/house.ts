import { Sign } from 'src/common/sign';
import { ACTIONS } from 'src/constants';
import { scene } from 'src/scene';
import { Bed } from './bed';
import { Candle } from './candle';
import { Chest } from './chest';
import { Couch } from './couch';
import { Door } from './door';
import { Gem } from './gem';

export const setUpHouse = () => {
  new Sign(scene.signHouse, 'Find 5 gems\n in the house');
  const bed = new Bed(scene.bed);
  const candle = new Candle(scene.candle);
  candle.entity.addComponent(
    new OnPointerDown(
      () => {
        candle.toggle();
        bed.toggle();
      },
      { hoverText: ACTIONS.click, distance: 3 }
    )
  );
  new Door(scene.door);
  new Chest(scene.chest);
  new Couch(scene.couch);
  new Gem(scene.gem1);
  new Gem(scene.gem2);
  new Gem(scene.gem3);
  new Gem(scene.gem4);
  new Gem(scene.gem5);
};
