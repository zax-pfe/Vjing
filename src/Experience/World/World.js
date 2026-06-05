import Experience from "../Experience.js";
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
      this.experience.camera.setRenderer();

      this.chryslerTower = new ChryslerTower();
      this.buildingsBackground = new BuildingsBackground();
      this.route = new Route();
    });
  }

  update() {
    if (this.chryslerTower) this.chryslerTower.update();
    if (this.route) this.route.update();
    if (this.buildingsBackground) this.buildingsBackground.update();
  }
}
