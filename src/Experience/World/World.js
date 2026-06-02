import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Fox from "./Fox.js";
import TestCube from "./TestCube.js";
import TestPlane from "./planes/TestPlane.js";
import GradientPlane from "./planes/gradientPlane.js";
import RoundPlane from "./planes/roundPlane.js";
import BoxMotif from "./boxMotif.js";
import MurChrysler from "./mur_chrysler.js";

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
      this.experience.renderer.setPostProcessing();
      this.environment = new Environment();
      // this.testCube = new TestCube();
      // this.testPlane = new TestPlane();
      // this.gradientPlane = new GradientPlane();
      // this.roundPlane = new RoundPlane();
      // this.boxMotif = new BoxMotif();
      this.murChrysler = new MurChrysler();
      // console.log(this.resources.items.motif1);
    });
  }

  update() {
    if (this.roundPlane) this.roundPlane.update();
    if (this.gradientPlane) this.gradientPlane.update();
    if (this.murChrysler) this.murChrysler.update();
    // if (this.testCube) this.testCube.update();
  }
}
