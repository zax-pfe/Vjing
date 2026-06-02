import * as THREE from "three";
import Experience from "../Experience.js";
// import fragment from "../shaders/test/fragment.glsl";
import vertex from "../shaders/tower/vertex.glsl";
import fragment from "../shaders/tower/fragment.glsl";

export default class Cube {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    // console.log("vertex ", vertex);
    this.palette = this.resources.items.paletteTexture;

    console.log("palette ", this.palette);
    this.coordPaletteX = 0.7;
    this.coordPaletteY = 0.1;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("tower");
      this.debugFolder.add(this, "coordPaletteX").name("x").min(0).max(1).step(0.001);
      this.debugFolder.add(this, "coordPaletteY").name("y").min(0).max(1).step(0.001);
    }

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.BoxGeometry(1, 3, 1);
  }

  setTextures() {}

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPalette: { value: this.palette },
        uCoordPaletteX: { value: this.coordPaletteX },
        uCoordPaletteY: { value: this.coordPaletteY },
      },
      // map: this.palette,
      vertexShader: vertex,
      fragmentShader: fragment,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    // this.mesh.rotation.x = -Math.PI * 0.5;
    // this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }

  update() {
    this.material.uniforms.uTime.value += this.experience.time.delta * 0.001;
    this.material.uniforms.uCoordPaletteX.value = this.coordPaletteX;
    this.material.uniforms.uCoordPaletteY.value = this.coordPaletteY;
  }
}
