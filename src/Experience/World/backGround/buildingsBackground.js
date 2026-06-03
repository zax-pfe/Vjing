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

    this.positionsArray = [
      [0, 0, 5],
      [3, 0, 5],
      [-3, 0, 5],
    ];
    this.setBuildings();
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

      const building = new Building(position);
      this.buildings.push(building);
    }
  }
}
