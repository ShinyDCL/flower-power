import * as utils from '@dcl/ecs-scene-utils';
import { Model } from './model';
import { Timer } from './timer';
import {
  ACTIONS,
  GROW_TIMES,
  Item,
  ITEM_TITLES,
  Seed,
  SEED_FLOWER_MAP,
  SPROUT_TIMES,
} from './constants';
import { inventory, userState } from './state';
import { getRandomIntInclusive, getShape } from './utils';
import { MODELS } from './resources';
import { seedPrompt, simplePrompt } from './prompts/index';

export class Flowerbed extends Model {
  private readonly timer: Timer;
  private sprout: Entity;
  private flower: Entity;
  private seed?: Seed;

  constructor(model: Model) {
    super(model);

    this.transform.rotation = Quaternion.Euler(
      0,
      getRandomIntInclusive(1, 360),
      0
    );

    this.timer = new Timer(0, 1.3, 0);
    this.timer.setParent(this.entity);

    this.sprout = new Entity();
    this.sprout.addComponent(getShape(MODELS.sprout, true, false, false));
    this.sprout.addComponent(
      new Transform({
        position: new Vector3(0, 0.3, 0),
      })
    );
    this.sprout.setParent(this.entity);

    this.flower = new Entity();
    this.flower.setParent(this.entity);

    this.entity.addComponent(
      new OnPointerDown(this.handleClickPlant.bind(this), {
        hoverText: ACTIONS.plant,
      })
    );
  }

  private handleClickPlant(): void {
    if (inventory.getSeedCount() > 0) {
      seedPrompt.openPrompt(this.handleChooseSeed.bind(this));
    } else {
      simplePrompt.openPrompt(`You don't have any seeds, buy some at market!`);
    }
  }

  private handleChooseSeed(seed: Seed): void {
    this.seed = seed;
    this.entity.removeComponent(OnPointerDown);
    this.spawnSprout();
  }

  private spawnSprout() {
    const time = SPROUT_TIMES[this.seed!];

    this.timer.startCountDown(time);
    this.sprout.addComponentOrReplace(
      new utils.ScaleTransformComponent(
        new Vector3(0, 0, 0),
        new Vector3(1, 1, 1),
        time,
        () => {
          this.entity.addComponentOrReplace(
            new OnPointerDown(this.handleClickWater.bind(this), {
              hoverText: this.getHoverText(ACTIONS.water),
              button: ActionButton.PRIMARY,
            })
          );
        }
      )
    );
    this.sprout.getComponent(GLTFShape).visible = true;
  }

  private handleClickWater(): void {
    const { pickedUpBucket } = userState;

    if (pickedUpBucket) {
      if (pickedUpBucket.isFull()) {
        pickedUpBucket.empty();
        this.spawnFlower();
        this.entity.removeComponent(OnPointerDown);
      } else {
        simplePrompt.openPrompt('Bucket is empty, get water from well!');
      }
    } else {
      simplePrompt.openPrompt('Pick up bucket and get water from well!');
    }
  }

  private spawnFlower() {
    const time = GROW_TIMES[this.seed!];
    let endScale = new Vector3(1, 1, 1);

    switch (this.seed) {
      case Item.ROSE_SEED:
        this.flower.addComponentOrReplace(getShape(MODELS.rose));
        this.flower.addComponentOrReplace(
          new Transform({
            position: new Vector3(0.03, 0.6, 0.03),
            rotation: Quaternion.Euler(30, 0, 0),
          })
        );
        endScale = new Vector3(0.5, 0.8, 0.5);
        break;
      case Item.TULIP_SEED:
        this.flower.addComponentOrReplace(getShape(MODELS.tulip));
        this.flower.addComponentOrReplace(
          new Transform({
            position: new Vector3(-0.02, 0.3, 0),
            rotation: Quaternion.Euler(0, 180, 0),
          })
        );
        break;
      case Item.SUNFLOWER_SEED:
        this.flower.addComponentOrReplace(getShape(MODELS.sunflower));
        this.flower.addComponentOrReplace(
          new Transform({
            position: new Vector3(0, 0.6, 0),
            rotation: Quaternion.Euler(30, 0, 0),
          })
        );
        break;
      case Item.BEAN_SEED:
        this.flower.addComponentOrReplace(getShape(MODELS.bean));
        this.flower.addComponentOrReplace(
          new Transform({
            position: new Vector3(0, 0.3, 0),
          })
        );
        endScale = new Vector3(2.25, 5, 2.25);
        break;
    }

    this.timer.startCountDown(time);
    this.flower.addComponentOrReplace(
      new utils.ScaleTransformComponent(
        new Vector3(0, 0, 0),
        endScale,
        time,
        () => {
          this.entity.addComponentOrReplace(
            new OnPointerDown(this.handleClickHarvest.bind(this), {
              hoverText: this.getHoverText(ACTIONS.harvest),
            })
          );
        }
      )
    );
  }

  private handleClickHarvest(): void {
    const flower = SEED_FLOWER_MAP[this.seed!];
    inventory.addItem(flower, 1);

    this.entity.addComponentOrReplace(
      new OnPointerDown(this.handleClickPlant.bind(this), {
        hoverText: ACTIONS.plant,
      })
    );
    this.sprout.getComponent(GLTFShape).visible = false;
    this.flower.getComponent(GLTFShape).visible = false;
    this.seed = undefined;
  }

  private getHoverText(action: string): string {
    const flower = SEED_FLOWER_MAP[this.seed!];
    return `${action} ${this.seed && ITEM_TITLES[flower].toLowerCase()}`;
  }
}
