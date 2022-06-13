# Decentraland scene

This folder contains all the necessary files to launch a Decentraland scene.

## Try it out

**Install the CLI**

Download and install the Decentraland CLI by running the following command:

```bash
npm i -g decentraland
```

**Previewing the scene**

Open this folder on the command line, then run:

```
dcl start
```

Any dependencies are installed and then the CLI opens the scene in a new browser tab.

## Scene description

This scene contains a game developed during 2022 Decentraland Game Jam
Checkout the deployed version [here](https://flower-power-dcl.herokuapp.com/?realm=localhost-stub&renderer-branch=master&position=0,0)

### Game description

Game consists of four areas with different activities

**Garden and market area**

- plant seeds and water them to grow flowers
- sell produce at market for coins
- activate extra flowerbeds for planting by using coins
- shake lemon trees to get lemons and sell them at market

**House area**

- do a scavenger hunt to find 5 gems and receive a gift

**Pond area**

- catch fish in the pond which can be sold at the market
- get water from well with bucket to water plants in Garden and market area

**Forest area**

- eat mushrooms and experience different effects

### Images, 3D models, sounds

All assets used in this game are from Decentraland builder, with exception of few assets which were created by myself.
No assets from other websites or people are used in this game.

### Tools and libraries

- DCL-Edit tool - used for editing scene (downloaded models from builder, copied them into project, placed them in scene with DCL-Edit tool and exposed to script, added interactions to entities in code)
- @dcl/ecs-scene-utils - used for moving or rotating an entity over a period of time
- @dcl/ui-scene-utils - used for displaying prompts, counters and announcements

### Backend

There is no backend developed for this scene and all the data is stored locally, meaning all the progress is lost upon refreshing the scene.
