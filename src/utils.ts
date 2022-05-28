export const getRandomIntInclusive = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

export const getRandomDecimal = (min: number, max: number): number => {
  return +(Math.random() * (max - min) + min).toFixed(2);
};

export const getShape = (
  src: string,
  withCollisions: boolean = true,
  isPointerBlocker: boolean = false,
  visible: boolean = true
): GLTFShape => {
  const shape = new GLTFShape(src);
  shape.withCollisions = withCollisions;
  shape.isPointerBlocker = isPointerBlocker;
  shape.visible = visible;

  return shape;
};
