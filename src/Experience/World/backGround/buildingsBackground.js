import * as THREE from "three";
import Experience from "../../Experience.js";
import vertex from "../../shaders/round/vertex.glsl";
import fragment from "../../shaders/round/fragment.glsl";

export default class BuildingsBackground {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.size = this.setSize();

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    for (let i = 0; i < this.size; i++) {
      this.geometry = new THREE.BoxGeometry(this.size, this.size, 1);
    }
  }

  setTextures() {}

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: { value: 0 },
      },
      side: THREE.DoubleSide,
    });
  }

  setSize() {
    const randomInt = Math.floor(Math.random() * 4) + 3; // random int between 3 and 6
    return randomInt;
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = 6;
    // this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }

  update() {
    this.material.uniforms.uTime.value += this.experience.time.delta * 0.001;
    //  this.animation.mixer.update(this.time.delta * 0.001)
  }
}
