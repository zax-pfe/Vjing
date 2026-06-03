import * as THREE from "three";
import Experience from "../../Experience.js";
import vertex from "../../shaders/transitionShader/vertex.glsl";
import fragment from "../../shaders/transitionShader/fragment.glsl";

export default class Plane {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.revealMaskTexture = this.resources.items.revealMask;
    this.motifMaskTexture = this.resources.items.motifMask;

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 1);
  }

  setTextures() {}

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uRevealMask: { value: this.motifMaskTexture },
        uTime: { value: 0 },
      },
      side: THREE.DoubleSide,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = 3;
    // this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }

  update() {
    this.material.uniforms.uTime.value += this.experience.time.delta * 0.001;
  }
}
