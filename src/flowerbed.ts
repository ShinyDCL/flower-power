import * as utils from '@dcl/ecs-scene-utils';
import { Model } from './model';
import { Timer } from './timer';
import {
  ACTIONS,
  Item,
  ITEM_TITLES,
  RESOURCES,
  SEED_FLOWER_MAP,
} from './constants';
import { inventory, userState } from './state';
import { getRandomIntInclusive, getShape } from './utils';
import { prompt } from './prompt';

export class Flowerbed extends Model {
  private readonly timer: Timer;
  private sprout: Entity;
  private flower: Entity;
  private seed?: Item;

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
    this.sprout.addComponent(getShape(RESOURCES.sprout, true, false, false));
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
    inventory.showModalSelectSeed(this.handleChooseSeed.bind(this));
  }

  private handleChooseSeed(seed: Item): void {
    this.seed = seed;
    this.entity.removeComponent(OnPointerDown);
    this.spawnSprout();
  }

  private spawnSprout() {
    this.timer.startCountDown(5);
    this.sprout.addComponentOrReplace(
      new utils.ScaleTransformComponent(
        new Vector3(0, 0, 0),
        new Vector3(1, 1, 1),
        5,
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
        prompt.openPrompt('Bucket is empty, get water from well!');
      }
    } else {
      prompt.openPrompt('Pick up bucket and get water from well!');
    }
  }

  private spawnFlower() {
    let endScale = new Vector3(1, 1, 1);

    switch (this.seed) {
      case Item.ROSE_SEED:
        this.flower.addComponentOrReplace(getShape(RESOURCES.rose));
        this.flower.addComponentOrReplace(
          new Transform({
            position: new Vector3(0.03, 0.6, 0.03),
            rotation: Quaternion.Euler(30, 0, 0),
          })
        );
        endScale = new Vector3(0.5, 0.8, 0.5);
        break;
      case Item.TULIP_SEED:
        this.flower.addComponentOrReplace(getShape(RESOURCES.tulip));
        this.flower.addComponentOrReplace(
          new Transform({
            position: new Vector3(-0.02, 0.3, 0),
            rotation: Quaternion.Euler(0, 180, 0),
          })
        );
        break;
      case Item.SUNFLOWER_SEED:
        this.flower.addComponentOrReplace(getShape(RESOURCES.sunflower));
        this.flower.addComponentOrReplace(
          new Transform({
            position: new Vector3(0, 0.6, 0),
            rotation: Quaternion.Euler(30, 0, 0),
          })
        );
        break;
    }

    this.timer.startCountDown(5);
    this.flower.addComponentOrReplace(
      new utils.ScaleTransformComponent(
        new Vector3(0, 0, 0),
        endScale,
        5,
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
  }

  private getHoverText(action: string): string {
    const flower = SEED_FLOWER_MAP[this.seed!];
    return `${action} ${this.seed && ITEM_TITLES[flower].toLowerCase()}`;
  }
}
