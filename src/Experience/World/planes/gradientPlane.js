import * as THREE from "three";
import Experience from "../../Experience.js";
import vertex from "../../shaders/gradient/vertex.glsl";
import fragment from "../../shaders/gradient/fragment.glsl";

export default class GradientPlane {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(1, 3, 1);
  }

  setTextures() {}

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      side: THREE.DoubleSide,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = -3;
    // this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
}
