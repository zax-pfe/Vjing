import * as THREE from "three";
import Experience from "../Experience.js";

import motif_vertex from "../shaders/boxMotifs/vertex.glsl";
import motif_fragment from "../shaders/boxMotifs/fragment.glsl";

export default class MurChrysler {
  constructor() {
    // setup
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.speed = 2;
    this.resource = this.resources.items.mur_chrysler;
    console.log(this.resource);

    this.setModel();
  }

  setModel() {
    // this.geometry = new THREE.PlaneGeometry(1, 1, 1);
    this.model = this.resource.scene;
    this.children = this.model.children;
    console.log(this.children);
    this.model.scale.set(1, 1, 1);
    this.setMurLumiere();
    this.scene.add(this.model);
  }

  setCube() {
    this.cube = this.children[0];
    this.cube.material = new THREE.ShaderMaterial({
      vertexShader: motif_vertex,
      fragmentShader: motif_fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: this.speed },
      },
    });
  }

  setMurLumiere() {
    this.murLumiere = this.children[1];
    this.murLumiere.material = new THREE.ShaderMaterial({
      vertexShader: motif_vertex,
      fragmentShader: motif_fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: this.speed },
      },
    });
  }

  update() {
    this.murLumiere.material.uniforms.uTime.value += this.experience.time.delta * 0.001;
  }
}
