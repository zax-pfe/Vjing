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

    // console.log("vertex ", vertex);

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
        color: { value: new THREE.Color("red") },
      },
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
}
