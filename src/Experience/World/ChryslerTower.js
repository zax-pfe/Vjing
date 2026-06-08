import * as THREE from "three";
import Experience from "../Experience.js";

import vertex from "../shaders/boxMotifs/vertex.glsl";
import fragment from "../shaders/boxMotifs/fragment.glsl";

import lightWall_vertex from "../shaders/ChryslerTower/Motifs/vertex.glsl";
import lightWall_fragment from "../shaders/ChryslerTower/Motifs/fragment.glsl";

import gsap from "gsap";

export default class ChryslerTower {
  constructor() {
    // setup
    this.experience = new Experience();
    this.sound = this.experience.sound;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.speed = 2;

    this.resource = this.resources.items.tour_chrysler_rigged;

    this.motifMask = this.resources.items.murLumiere;
    this.ornementMask = this.resources.items.Ornement;

    this.modelScale = 2;

    this.setModel();

    if (this.debug.active) {
      this.setDebug();
    }

    this.sound.on("kick", () => {
      this.onBeat();
    });
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
    this.model = this.resource.scene;
    this.towerChildren = this.model.children[0].children;

    //  'deco_light_wall_1'
    //  'deco_lightwall_0'
    //  'deco_lightwall_2'
    //  'deco_lightwall_3'
    //  'deco_lightwall_4'
    //  'deco_tower'
    //  'struct_0'
    //  'struct_1'
    //  'struct_2'
    //  'struct_3'
    //  'struct_4'
    //  'struct_pique'
    //  'struct_top'

    console.log("children ", this.children);
    this.model.position.set(0, 1, 0);
    this.setMurLumiere();
    this.setOrnementTour();
    // this.setPique();
    // this.setCube();
    // this.setTop();
    this.model.scale.set(this.modelScale, this.modelScale, this.modelScale);
    this.scene.add(this.model);
  }

  addBlackTowerBody() {
    // add tower to the scene
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const towerBody = new THREE.Mesh(geometry, material);
    towerBody.position.set(0, -1, 0);
    towerBody.scale.set(3.2, 5, 3.2);
    this.scene.add(towerBody);
  }

  setMurLumiere() {
    this.lightWalls = [];
    this.lightWallMaterial = new THREE.ShaderMaterial({
      vertexShader: lightWall_vertex,
      fragmentShader: lightWall_fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: this.speed },
        uRevealMask: { value: this.motifMask },
        uVolume: { value: 0 },
        uOffset: { value: 0 },
      },
    });

    // les elements de 0 a 4 = deco lightwall
    for (let i = 0; i < 4; i++) {
      this.lightWalls.push(this.towerChildren[i]);
      this.lightWalls[i].material = this.lightWallMaterial;
      // this.lightWalls[i].material.fog = true;

      this.lightWalls[i].material.uniforms.uOffset.value = i * 0.25;
    }
  }

  setOrnementTour() {
    this.ornementTourMaterial = new THREE.ShaderMaterial({
      vertexShader: lightWall_vertex,
      fragmentShader: lightWall_fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: this.speed },
        uRevealMask: { value: this.ornementMask },
        uVolume: { value: 0 },
        uOffset: { value: 0 },
      },
    });
    this.ornementTour = this.towerChildren[5];
    this.ornementTour.material = this.ornementTourMaterial;

    console.log("ornement tour ", this.ornementTour);
  }

  setPique() {
    this.pique = this.children[4];
    console.log("pique ", this.pique);

    this.pique.material = new THREE.ShaderMaterial({
      vertexShader: lightWall_vertex,
      fragmentShader: lightWall_fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: this.speed },
        uRevealMask: { value: this.motifMask },
        uVolume: { value: 0 },
      },
    });
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
    // Mur lumiere
    this.lightWalls.forEach((wall) => {
      wall.material.uniforms.uTime.value += this.experience.time.delta * 0.001;
      wall.material.uniforms.uVolume.value = this.sound.volumeSmooth;
    });

    // Ornement tour
    this.ornementTour.material.uniforms.uTime.value += this.experience.time.delta * 0.001;
    this.ornementTour.material.uniforms.uVolume.value = this.sound.volumeSmooth;
    // this.murLumiere.material.uniforms.uTime.value += this.experience.time.delta * 0.001;
    // this.ornementTour.material.uniforms.uTime.value += this.experience.time.delta * 0.001;
    // this.pique.material.uniforms.uTime.value += this.experience.time.delta * 0.001;
    // this.murLumiere.material.uniforms.uVolume.value = this.sound.volumeSmooth;
    // this.ornementTour.material.uniforms.uVolume.value = this.sound.volumeSmooth;
    // this.pique.material.uniforms.uVolume.value = this.sound.volumeSmooth;
  }
}
