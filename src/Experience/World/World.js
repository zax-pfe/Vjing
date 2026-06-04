import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Fox from "./Fox.js";
import TestCube from "./TestCube.js";
import TestPlane from "./planes/TestPlane.js";
import GradientPlane from "./planes/gradientPlane.js";
import RoundPlane from "./planes/roundPlane.js";
import BoxMotif from "./boxMotif.js";
import ChryslerTower from "./ChryslerTower.js";
import BuildingsBackground from "./backGround/buildingsBackground.js";
import Route from "./route/Route.js";
export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.experience.renderer.setPostProcessing();

      this.chryslerTower = new ChryslerTower();
      this.buildingsBackground = new BuildingsBackground();
      this.route = new Route();

      // this.environment = new Environment();
      // this.floor = new Floor();
      // this.fox = new Fox();
      // this.testCube = new TestCube();
      // this.testPlane = new TestPlane();
      // this.gradientPlane = new GradientPlane();
      // this.roundPlane = new RoundPlane();
      // this.boxMotif = new BoxMotif();
    });
  }

  update() {
    if (this.roundPlane) this.roundPlane.update();
    if (this.gradientPlane) this.gradientPlane.update();
    if (this.chryslerTower) this.chryslerTower.update();
    if (this.testPlane) this.testPlane.update();
    if (this.route) this.route.update();
    if (this.buildingsBackground) this.buildingsBackground.update();

    // if (this.testCube) this.testCube.update();
  }
}
