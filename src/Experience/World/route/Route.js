import * as THREE from "three";
import Experience from "../../Experience.js";

import EventEmitter from "../../Utils/EventEmitter.js";
import vertex from "../../shaders/route/vertex.glsl";
import fragment from "../../shaders/route/fragment.glsl";

export default class Route extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.sound = this.experience.sound;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.resource = this.resources.items.route;
    this.routeMask = this.resources.items.routeMaskBaked;

    this.model = this.resource.scene;
    this.children = this.model.children;

    if (this.debug.active) {
      this.setDebug();
    }
    this.setMaterial();
    this.setModel();
  }

  setModel() {
    this.model.scale.set(1, 1, 1);
    this.model.position.set(0, -2, 0);
    this.scene.add(this.model);
  }

  setMaterial() {
    this.route = this.children[0];
    this.route.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: 1.0 },
        uRevealMask: { value: this.routeMask },
        uVolume: { value: 0 },
      },
      // transparent: true,
    });
  }

  setDebug() {}

  setBuildings() {}

  update() {
    this.route.material.uniforms.uTime.value = this.experience.time.elapsed * 0.001;
    this.route.material.uniforms.uVolume.value = this.sound.volumeSmooth;
    // console.log("volume route ", this.sound.volumeSmooth);
  }
}
