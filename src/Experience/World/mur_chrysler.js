import * as THREE from "three";
import Experience from "../Experience.js";

import vertex from "../shaders/boxMotifs/vertex.glsl";
import fragment from "../shaders/boxMotifs/fragment.glsl";

import motif_vertex from "../shaders/ChryslerTower/Motifs/vertex.glsl";
import motif_fragment from "../shaders/ChryslerTower/Motifs/fragment.glsl";

import cube_vertex from "../shaders/ChryslerTower/Cube/vertex.glsl";
import cube_fragment from "../shaders/ChryslerTower/Cube/fragment.glsl";

export default class MurChrysler {
  constructor() {
    // setup
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.speed = 2;
    this.resource = this.resources.items.tour_chrysler;
    this.motifMask = this.resources.items.motifMaskBaked;

    this.setModel();
  }

  setModel() {
    // this.geometry = new THREE.PlaneGeometry(1, 1, 1);
    this.model = this.resource.scene;
    console.log("model ", this.model);
    this.children = this.model.children;
    console.log("children", this.children);
    this.model.scale.set(1, 1, 1);
    this.setMurLumiere();
    this.setCube();
    this.setTop();
    // this.scene.add(this.model);
  }

  setMurLumiere() {
    this.murLumiere = this.children[2];

    this.murLumiere.material = new THREE.ShaderMaterial({
      vertexShader: motif_vertex,
      fragmentShader: motif_fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: this.speed },
        uRevealMask: { value: this.motifMask },
      },
    });
    this.scene.add(this.murLumiere);
  }

  setCube() {
    this.cube = this.children[1];

    this.cube.material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0, 0, 0),
    });

    this.scene.add(this.cube);
  }
  setTop() {
    this.top = this.children[0];
    this.top.material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0, 0, 0),
    });
    this.scene.add(this.top);
  }

  update() {
    this.murLumiere.material.uniforms.uTime.value += this.experience.time.delta * 0.001;
  }
}
