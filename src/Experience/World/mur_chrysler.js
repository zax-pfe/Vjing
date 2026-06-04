import * as THREE from "three";
import Experience from "../Experience.js";

import vertex from "../shaders/boxMotifs/vertex.glsl";
import fragment from "../shaders/boxMotifs/fragment.glsl";

import motif_vertex from "../shaders/ChryslerTower/Motifs/vertex.glsl";
import motif_fragment from "../shaders/ChryslerTower/Motifs/fragment.glsl";

import cube_vertex from "../shaders/ChryslerTower/Cube/vertex.glsl";
import cube_fragment from "../shaders/ChryslerTower/Cube/fragment.glsl";

import gsap from "gsap";

export default class MurChrysler {
  constructor() {
    // setup
    this.experience = new Experience();
    this.sound = this.experience.sound;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.speed = 2;
    this.resource = this.resources.items.tour_chrysler;
    this.motifMask = this.resources.items.motifMaskBaked;
    this.modelScale = 2;

    this.setModel();

    if (this.debug.active) {
      this.setDebug();
    }
  }

  setDebug() {
    this.debugFolder = this.debug.ui.addFolder("chrysler tower");

    const debugObject = {
      beatSimulation: () => {
        this.onBeat();
      },
    };
    this.debugFolder.add(debugObject, "beatSimulation");
  }

  onBeat() {
    gsap.to(this.model.scale, {
      x: 1.1 * this.modelScale,
      y: 1.1 * this.modelScale,
      z: 1.1 * this.modelScale,
      duration: 0.1,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(this.model.scale, {
          x: this.modelScale,
          y: this.modelScale,
          z: this.modelScale,
          duration: 0.1,
          ease: "elastic.out(1, 0.3)",
        });
      },
    });
  }

  setModel() {
    // this.geometry = new THREE.PlaneGeometry(1, 1, 1);
    this.model = this.resource.scene;
    this.children = this.model.children;
    this.model.position.set(0, 1, 0);
    this.setMurLumiere();
    this.setCube();
    this.setTop();
    this.model.scale.set(this.modelScale, this.modelScale, this.modelScale);
    this.scene.add(this.model);
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
        uVolume: { value: 0 },
      },
    });
    // this.scene.add(this.murLumiere);
  }

  setCube() {
    this.cube = this.children[1];

    this.cube.material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0, 0, 0),
    });

    // this.scene.add(this.cube);
  }
  setTop() {
    this.top = this.children[0];
    this.top.material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0, 0, 0),
    });
    // this.scene.add(this.top);
  }

  update() {
    this.murLumiere.material.uniforms.uTime.value += this.experience.time.delta * 0.001;
    this.murLumiere.material.uniforms.uVolume.value = this.sound.volumeSmooth;
    if (this.sound.kickHard > 0.9) {
      this.onBeat();
    }
    // console.log("volume ", this.sound.volumeByFrequency);
  }
}
