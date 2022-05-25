const getShape = (
  src: string,
  withCollisions: boolean = true,
  isPointerBlocker: boolean = true,
  visible: boolean = true
): GLTFShape => {
  const shape = new GLTFShape(src);
  shape.withCollisions = withCollisions;
  shape.isPointerBlocker = isPointerBlocker;
  shape.visible = visible;

  return shape;
};

export const resources = {
  sprout: getShape('models/sprout/Grass05.glb', true, false),
  tulip: getShape('models/tulip/Plant_03.glb', true, false),
  rose: getShape('models/rose/Flower_02.glb', true, false),
  sunflower: getShape('models/sunflower/Flower_01.glb', true, false),
};
