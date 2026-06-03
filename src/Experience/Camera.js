import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.debug = this.experience.debug;

    this.initialPosition = new THREE.Vector3(0, 4, 10);
    this.currentPosition = this.initialPosition.clone();
    this.radius = 10;
    this.incrementAngle = (2 * Math.PI) / 8; // 8 positions around the circle

    this.cameraTopPosition = new THREE.Vector3(0, 20, 0);

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("camera");

      const debugObject = {
        rotateCamera: () => {
          const newPosition = this.currentPosition.clone();
          const angle = Math.atan2(newPosition.z, newPosition.x) + this.incrementAngle;
          newPosition.x = this.radius * Math.cos(angle);
          newPosition.z = this.radius * Math.sin(angle);
          this.currentPosition.copy(newPosition);

          gsap.to(this.instance.position, {
            x: newPosition.x,
            y: newPosition.y,
            z: newPosition.z,
            duration: 1,
          });
        },
        moveCameraUp: () => {
          gsap.to(this.instance.position, {
            x: this.cameraTopPosition.x,
            y: this.cameraTopPosition.y,
            z: this.cameraTopPosition.z,
            duration: 1,
          });
        },
      };
      this.debugFolder.add(debugObject, "rotateCamera");
      this.debugFolder.add(debugObject, "moveCameraUp");
    }

    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100);
    // this.instance.position.copy(this.cameraPositions[this.currentPositionIndex]);
    this.instance.position.copy(this.initialPosition);
    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
    // console.log(this.instance.position);
  }
}
