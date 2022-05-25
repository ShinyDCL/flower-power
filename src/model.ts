export class Model {
  public entity: Entity;
  public transform: Transform;
  public GLTFShape: GLTFShape;

  constructor({
    entity,
    transform,
    GLTFShape,
  }: {
    entity: Entity;
    transform: Transform;
    GLTFShape: GLTFShape;
  }) {
    this.entity = entity;
    this.transform = transform;
    this.GLTFShape = GLTFShape;
  }
}
