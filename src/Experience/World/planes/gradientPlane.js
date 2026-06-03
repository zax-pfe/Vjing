import * as THREE from "three";
import Experience from "../../Experience.js";
import vertex from "../../shaders/gradient/vertex.glsl";
import fragment from "../../shaders/gradient/fragment.glsl";

export default class GradientPlane {
  constructor() {
    // setup
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    // variables
    this.speed = 3.0;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("gradientPlane");
      this.debugFolder.add(this, "speed").name("speed").min(0).max(10).step(0.001);
    }

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(0.1, 3, 1);
  }

  setTextures() {}

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: this.speed },
      },
      side: THREE.DoubleSide,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x = -3;
    // this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }

  update() {
    this.material.uniforms.uTime.value += this.experience.time.delta * 0.001;
    this.material.uniforms.uSpeed.value = this.speed;
    //  this.animation.mixer.update(this.time.delta * 0.001)
  }
}
