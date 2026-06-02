import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Fox from "./Fox.js";
import TestCube from "./TestCube.js";
import TestPlane from "./planes/TestPlane.js";
import GradientPlane from "./planes/gradientPlane.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      // this.floor = new Floor();
      // this.fox = new Fox();
      this.environment = new Environment();
      this.testCube = new TestCube();
      this.testPlane = new TestPlane();
      this.gradientPlane = new GradientPlane();
    });
  }

  update() {
    if (this.fox) this.fox.update();
  }
}
