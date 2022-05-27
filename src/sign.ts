import { Model } from './model';

export class Sign extends Model {
  constructor(model: Model, text: string) {
    super(model);

    const textShape = new TextShape(text);
    textShape.color = Color3.White();
    textShape.fontSize = 2;

    const textEntity = new Entity();
    textEntity.addComponent(textShape);
    textEntity.addComponent(
      new Transform({
        position: new Vector3(-0.05, 1.32, 0.28),
        rotation: Quaternion.Euler(0, 180, 0),
      })
    );
    textEntity.setParent(this.entity);
  }
}
