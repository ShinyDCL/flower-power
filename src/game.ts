import { Bucket } from './bucket';
import { Flowerbed } from './flowerbed';
import { scene } from './scene';
import { Store } from './store';
import { Sign } from './sign';
import { Well } from './well';
import { Fish } from './fish';
import { inventory } from './state';
import { Item } from './constants';
import { setUpHouse } from './house/house';

new Store(scene.store);
new Flowerbed(scene.dirt1);
new Flowerbed(scene.dirt2);
new Flowerbed(scene.dirt3);
new Flowerbed(scene.dirt4);
new Flowerbed(scene.dirt5);
new Flowerbed(scene.dirt6);

new Well(scene.well);
new Bucket(scene.wellBucket1);
new Bucket(scene.wellBucket2);
new Bucket(scene.wellBucket3);

new Sign(scene.signGarden, 'Garden & \n Market');

new Fish();

inventory.addItem(Item.ROSE_SEED, 3);

setUpHouse();

//setInterval(fish.jump, 1000);

//seedPrompt.openPrompt(() => {});

// Create screenspace component
//const canvas = new UICanvas();

// Create a textShape component, setting the canvas as parent
/*const text = new UIText(canvas);
text.value = 'Hello world!';

const message = new UIText(canvas);
message.value = 'Close UI';
message.fontSize = 15;
message.width = 120;
message.height = 30;
message.vAlign = 'bottom';
message.positionX = -80;*/

/*const inventoryContainer = new UIContainerStack(canvas);
inventoryContainer.color = Color4.Black();
inventoryContainer.opacity = 0.9;
inventoryContainer.hAlign = 'center';
inventoryContainer.vAlign = 'center';
inventoryContainer.stackOrientation = UIStackOrientation.VERTICAL;
inventoryContainer.isPointerBlocker = false;
inventoryContainer.adaptHeight = true;
inventoryContainer.adaptWidth = false;
inventoryContainer.width = 480;
inventoryContainer.height = 384;

const title = new UIText(inventoryContainer);
title.value = 'Select a seed to plant';
title.fontSize = 20;
title.vAlign = 'top';
title.hAlign = 'center';

const scrollableContainer = new UIScrollRect(inventoryContainer);
scrollableContainer.width = '90%';
scrollableContainer.height = '90%';
//scrollableContainer.backgroundColor = Color4.tr();
//scrollableContainer.opacity = 0.9;
scrollableContainer.scrollableContainer.isVertical = true;

const message = new UIText(scrollableContainer);
message.value = 'Rose seed';
message.fontSize = 15;
message.width = '30%';
message.height = 30;*/

/*const triggerBox = new utils.TriggerBoxShape();

scene.shovel.GLTFShape.withCollisions = false;
scene.shovel.entity.addComponent(
  new utils.TriggerComponent(
    triggerBox, //shape
    {
      onCameraEnter: () => {
        log('triggered!');

        //Define start and end directions
        const startRot = Quaternion.Euler(0, 0, 0);
        const endRot = Quaternion.Euler(90, 0, 0);

        // Rotate entity
        scene.shovel.entity.addComponent(
          new utils.RotateTransformComponent(startRot, endRot, 1)
        );
      },
      onCameraExit: () => {
        log('triggered!');
        //Define start and end directions
        const startRot = Quaternion.Euler(90, 0, 0);
        const endRot = Quaternion.Euler(0, 0, 0);

        // Rotate entity
        scene.shovel.entity.addComponent(
          new utils.RotateTransformComponent(startRot, endRot, 1)
        );
      },
    }
  )
);*/

/*//create entity
const box = new Entity();

//create shape for entity and disable its collision
box.addComponent(new BoxShape());
box.getComponent(BoxShape).withCollisions = false;

//set transform component with initial position
box.addComponent(new Transform({ position: new Vector3(11, 0, 4.5) }));

// create trigger area object, setting size and relative position
const triggerBox = new utils.TriggerBoxShape();

//create trigger for entity
box.addComponent(
  new utils.TriggerComponent(
    triggerBox, //shape
    {
      onCameraEnter: () => {
        log('triggered!');
        box.getComponent(Transform).position = new Vector3(
          1 + Math.random() * 14,
          0,
          1 + Math.random() * 14
        );
      },
    }
  )
);

//add entity to engine
engine.addEntity(box);*/
