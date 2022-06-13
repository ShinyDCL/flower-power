import * as utils from '@dcl/ecs-scene-utils';
import { Inventory } from 'src/common/inventory';
import {
  ACTIONS,
  ACTIVATION_COST,
  GROW_TIMES,
  Item,
  ITEM_TITLES,
  Seed,
  SEED_FLOWER_MAP,
  SPROUT_TIMES,
} from 'src/constants';
import { Model } from 'src/model';
import { ITEM_ICONS, MODELS, SOUNDS } from 'src/resources';
import { userState } from 'src/state';
import { SeedPrompt } from 'src/ui/seedPrompt';
import { SimplePrompt } from 'src/ui/simplePrompt';
import { Timer } from 'src/ui/timer';
import { getRandomIntInclusive } from 'src/utils';

export class Flowerbed extends Model {
  private readonly timer: Timer;
  private sprout: Entity;
  private flower: Entity;
  private seed?: Seed;
  private text?: Entity;

  constructor(model: Model, isActive: boolean = false) {
    super(model);

    this.transform.rotation = Quaternion.Euler(
      0,
      getRandomIntInclusive(1, 360),
      0
    );
    this.entity.addComponentOrReplace(new AudioSource(SOUNDS.click));

    this.timer = new Timer(0, 1.3, 0);
    this.timer.setParent(this.entity);

    this.sprout = new Entity();
    this.sprout.addComponent(
      new Transform({
        position: new Vector3(0, 0.3, 0),
      })
    );
    this.sprout.setParent(this.entity);

    this.flower = new Entity();
    this.flower.setParent(this.entity);

    if (isActive) {
      this.addPlantButton();
    } else {
      const textShape = new TextShape('x');
      textShape.visible = true;
      textShape.color = Color3.Yellow();
      textShape.fontSize = 4;
      textShape.font = new Font(Fonts.SansSerif_Bold);
      textShape.billboard = true;
      textShape.outlineWidth = 0.1;
      textShape.outlineColor = Color3.Black();

      const text = new Entity();
      text.addComponent(new Transform({ position: new Vector3(0, 0.5, 0) }));
      text.addComponent(textShape);
      text.setParent(this.entity);

      this.text = text;
      this.entity.addComponent(
        new OnPointerDown(this.handleClickActivate.bind(this), {
          hoverText: ACTIONS.activate,
        })
      );
    }
  }

  private handleClickPlant(): void {
    if (Inventory.getSeedCount() > 0) {
      SeedPrompt.openPrompt(this.handleChooseSeed.bind(this));
    } else {
      SimplePrompt.openPrompt(`You don't have any seeds, buy some at market!`);
    }
  }

  private handleClickActivate(): void {
    if (Inventory.getItemCount(Item.COINS) >= ACTIVATION_COST) {
      SimplePrompt.openPrompt(
        'Activate flowerbed!',
        this.handleActivate.bind(this),
        ITEM_ICONS[Item.COINS],
        ACTIVATION_COST.toString()
      );
    } else {
      SimplePrompt.openPrompt(
        `Not enough coins!`,
        undefined,
        ITEM_ICONS[Item.COINS],
        ACTIVATION_COST.toString()
      );
    }
  }

  private handleActivate(): void {
    if (Inventory.getItemCount(Item.COINS) >= ACTIVATION_COST) {
      Inventory.removeItem(Item.COINS, ACTIVATION_COST);
      this.text && engine.removeEntity(this.text);
      this.addPlantButton();
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
    this.sprout.addComponentOrReplace(MODELS.sprout);
    this.sprout.addComponentOrReplace(
      new utils.ScaleTransformComponent(
        new Vector3(0, 0, 0),
        new Vector3(1, 1, 1),
        time,
        () => {
          this.entity.addComponentOrReplace(
            new OnPointerDown(this.handleClickWater.bind(this), {
              hoverText: this.getHoverText(ACTIONS.water),
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
        this.entity.getComponent(AudioSource).playOnce();
      } else {
        SimplePrompt.openPrompt('Bucket is empty, get water from well!');
      }
    } else {
      SimplePrompt.openPrompt('Pick up bucket and get water from well!');
    }
  }

  private spawnFlower() {
    const time = GROW_TIMES[this.seed!];
    let endScale = new Vector3(1, 1, 1);

    this.timer.startCountDown(time);

    switch (this.seed) {
      case Item.ROSE_SEED:
        this.flower.addComponentOrReplace(MODELS.rose);
        this.flower.addComponentOrReplace(
          new Transform({
            position: new Vector3(0.03, 0.6, 0.03),
            rotation: Quaternion.Euler(30, 0, 0),
          })
        );
        endScale = new Vector3(0.5, 0.8, 0.5);
        break;
      case Item.TULIP_SEED:
        this.flower.addComponentOrReplace(MODELS.tulip);
        this.flower.addComponentOrReplace(
          new Transform({
            position: new Vector3(-0.02, 0.3, 0),
            rotation: Quaternion.Euler(0, 180, 0),
          })
        );
        break;
      case Item.SUNFLOWER_SEED:
        this.flower.addComponentOrReplace(MODELS.sunflower);
        this.flower.addComponentOrReplace(
          new Transform({
            position: new Vector3(0, 0.6, 0),
            rotation: Quaternion.Euler(30, 0, 0),
          })
        );
        break;
      case Item.BEAN_SEED:
        this.timer.getComponent(Transform).position.x = -0.55;
        this.flower.addComponentOrReplace(MODELS.bean);
        this.flower.addComponentOrReplace(
          new Transform({
            position: new Vector3(0, 0.3, 0),
          })
        );
        endScale = new Vector3(2.25, 5, 2.25);
        break;
    }

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
    Inventory.addItem(flower, 1);

    this.addPlantButton();
    this.sprout.removeComponent(GLTFShape);
    this.flower.removeComponent(GLTFShape);
    this.entity.getComponent(AudioSource).playOnce();
    this.seed = undefined;
  }

  private getHoverText(action: string): string {
    const flower = SEED_FLOWER_MAP[this.seed!];
    return `${action} ${this.seed && ITEM_TITLES[flower].toLowerCase()}`;
  }

  private addPlantButton() {
    this.entity.addComponentOrReplace(
      new OnPointerDown(this.handleClickPlant.bind(this), {
        hoverText: ACTIONS.plant,
      })
    );
  }
}
