import * as THREE from "three";
import Experience from "../../Experience.js";
import vertex from "../../shaders/round/vertex.glsl";
import fragment from "../../shaders/round/fragment.glsl";
import Building from "./Building.js";
import EventEmitter from "../../Utils/EventEmitter.js";

export default class BuildingsBackground extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    if (this.debug.active) {
      this.setDebug();
    }
    this.ressource = this.resources.items.cube_loca2;

    // this.positionsArray = [
    //   [0, 0, 5],
    //   [3, 0, 5],
    //   [-3, 0, 5],
    // ];
    this.setPositions();
    this.setBuildings();
  }

  setPositions() {
    this.positionsArray = [];
    this.childrens = this.ressource.scene.children;
    this.childrens.forEach((child) => {
      this.positionsArray.push([child.position.x, child.position.y, child.position.z]);
    });
    // this.positionsArray = this.positionsArray[0];
    // this.positionsArray = [[0, 0, 5]];
  }

  setDebug() {
    this.debugFolder = this.debug.ui.addFolder("buildingManager");
    const debugObject = {
      beatSimulation: () => {
        // this.trigger("beat");
        this.buildings.forEach((building) => {
          // building.trigger("beat");
          building.onBeat();
        });
      },
    };
    this.debugFolder.add(debugObject, "beatSimulation");
  }

  setBuildings() {
    this.buildings = [];

    for (let i = 0; i < this.positionsArray.length; i++) {
      const position = new THREE.Vector3(...this.positionsArray[i]);
      const offSetShader = Math.random() * 10.0; // Random offset for shader animation
      const building = new Building(position, offSetShader);
      this.buildings.push(building);
    }
  }

  update() {
    this.buildings.forEach((building) => {
      building.update();
    });
  }
}
