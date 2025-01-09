import Phaser from "phaser";
import MainScene from "./scenes/mainscene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [MainScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300, x: 0 }, 
      debug: false,
    },
  },
};

new Phaser.Game(config);
