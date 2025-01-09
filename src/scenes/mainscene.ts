import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys; // Optional cursors

  constructor() {
    super("MainScene");
  }

  preload() {
    // Load assets
    this.load.image("player", "../assets/redcircle.png"); // Static path fallback
    this.load.image("ground", "../assets/ground.png");   // Static path fallback
  }

  create() {
    // Initialize the player
    this.player = this.physics.add.sprite(100, 450, "player");
    this.player.setCollideWorldBounds(true);

    // Add ground
    const ground = this.physics.add.staticGroup();
    ground.create(400, 568, "ground").setScale(2).refreshBody();

    // Add collision
    this.physics.add.collider(this.player, ground);

    // Set up keyboard input with null-check
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    } else {
      console.error("Keyboard input is not available.");
    }
  }

  update() {
    // Ensure player and cursors are initialized
    if (!this.player || !this.cursors) return;

    // Movement logic
    if (this.cursors.left?.isDown) {
      this.player.setVelocityX(-160); // Move left
    } else if (this.cursors.right?.isDown) {
      this.player.setVelocityX(160); // Move right
    } else {
      this.player.setVelocityX(0); // Stop horizontal movement
    }

    // Jump logic (only when touching the ground)
    if (this.cursors.up?.isDown && this.player.body?.blocked.down) {
      this.player.setVelocityY(-330); // Jump
    }
  }
}
