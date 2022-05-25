export class GameEntity extends Entity {
  constructor(model: GLTFShape, transform: TranformConstructorArgs) {
    super();

    this.addComponent(new Transform(transform));
    this.addComponent(model);

    engine.addEntity(this);
  }
}
