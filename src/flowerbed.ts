import * as utils from '@dcl/ecs-scene-utils';
import { Model } from './model';
import { Timer } from './timer';
import { ACTIONS, Item, ITEM_TITLES, SEED_FLOWER_MAP } from './constants';
import { GameEntity } from './gameEntity';
import { resources } from './resources';
import { inventory, userState } from './state';

export class Flowerbed extends Model {
  private readonly timer: Timer;
  private sprout?: GameEntity;
  private flower?: GameEntity;
  private seed?: Item;

  constructor(model: Model) {
    super(model);

    const position = this.transform.position;
    this.timer = new Timer(position.x, 1.3, position.z);

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
    const pos = this.transform.position;
    //const rot = this.transform.rotation;

    this.timer.startCountDown(5);
    this.sprout = new GameEntity(resources.sprout, {
      position: new Vector3(pos.x, pos.y + 0.3, pos.z),
      //rotation: Quaternion.Euler(rot.x, rot.y, rot.z),
    });
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
  }

  private handleClickWater(): void {
    const { pickedUpBucket } = userState;

    if (pickedUpBucket) {
      if (pickedUpBucket.isFull()) {
        pickedUpBucket.empty();
        this.spawnFlower();
        this.entity.removeComponent(OnPointerDown);
      } else {
        log('Bucket is empty, get water from well or pond');
      }
    } else {
      log('Pick up bucket and get water from well or pond');
    }
  }

  private spawnFlower() {
    if (!this.sprout) return;

    const pos = this.entity.getComponent(Transform).position;
    //const rot = this.getComponent(Transform).rotation.eulerAngles;
    let endScale = new Vector3(1, 1, 1);

    switch (this.seed) {
      case Item.ROSE_SEED:
        this.flower = new GameEntity(resources.rose, {
          position: new Vector3(pos.x + 0.03, pos.y + 0.6, pos.z + 0.03),
          // rotation: Quaternion.Euler(rot.x + 30, rot.y, rot.z),
        });
        endScale = new Vector3(0.5, 0.8, 0.5);
        break;
      case Item.TULIP_SEED:
        this.flower = new GameEntity(resources.tulip, {
          position: new Vector3(pos.x - 0.02, pos.y + 0.3, pos.z),
          // rotation: Quaternion.Euler(rot.x, rot.y + 180, rot.z),
        });
        break;
      case Item.SUNFLOWER_SEED:
        this.flower = new GameEntity(resources.sunflower, {
          position: new Vector3(pos.x, pos.y + 0.6, pos.z),
          // rotation: Quaternion.Euler(rot.x + 30, rot.y, rot.z),
        });
        break;
      default:
        this.flower = new GameEntity(resources.rose, {
          position: new Vector3(pos.x, 0.6, pos.z),
        });
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

    if (this.sprout) {
      engine.removeEntity(this.sprout);
      this.sprout = undefined;
    }

    if (this.flower) {
      engine.removeEntity(this.flower);
      this.flower = undefined;
    }
  }

  private getHoverText(action: string): string {
    const flower = SEED_FLOWER_MAP[this.seed!];
    return `${action} ${this.seed && ITEM_TITLES[flower].toLowerCase()}`;
  }
}
