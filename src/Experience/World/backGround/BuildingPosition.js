import * as THREE from "three";
import Experience from "../../Experience.js";
import vertex from "../../shaders/round/vertex.glsl";
import fragment from "../../shaders/round/fragment.glsl";
import gsap from "gsap";
import EventEmitter from "../../Utils/EventEmitter.js";

export default class BuildingPosition extends EventEmitter {
  constructor(position) {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.position = position;
    this.debug = this.experience.debug;

    this.ressource = this.resources.items.cube_loca;

    this.setMesh();
  }

  setGeometry() {}

  setTextures() {}

  setMaterial() {}

  setMesh() {
    // this.mesh = this.ressource.scene;
    // children
    this.childrens = this.ressource.scene.children;
    this.childrens.forEach((child) => {});

    // this.scene.add(this.mesh);
  }

  setRandomSizes() {}

  onBeat() {}

  setDebug() {}

  update() {}
}
