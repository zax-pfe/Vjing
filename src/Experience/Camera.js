import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import EventEmitter from "./Utils/EventEmitter.js";

export default class Camera extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    // this.renderer = this.experience.renderer;
    this.sound = this.experience.sound;

    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.debug = this.experience.debug;
    this.cameraIsTop = false;

    this.cameraStatus = "normal"; // 'normal' | 'top' | 'far'

    this.initialPosition = new THREE.Vector3(0, 8, 10);
    this.currentPosition = this.initialPosition.clone();
    this.radius = 18;
    this.incrementAngle = (2 * Math.PI) / 8; // 15 positions around the circle
    this.topAngle = 0; // angle de rotation en vue du dessus

    this.cameraTopPosition = new THREE.Vector3(0, 30, 0);

    this.listenKick = true;
    this.listenKickTimeout = 100;
    this.timeCounter = 0;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("camera");

      const debugObject = {
        rotateCamera: () => {
          this.onBeat();
        },

        moveCameraUp: () => {
          this.moveUp();
        },
      };
      this.debugFolder.add(debugObject, "rotateCamera");
      this.debugFolder.add(debugObject, "moveCameraUp");
      // this.debugFolder.add(this, "activateRotation", true).name("auto rotate on kick");
    }

    this.setInstance();
    this.setControls();

    this.transitioning = false;

    this.sound.on("kickHard", () => {
      if (this.transitioning) return;
      this.onBeat();
    });
  }

  setRenderer() {
    console.log("Camera received setRenderer event");
    this.renderer = this.experience.renderer;
    this.experience.renderer.on("transition_complete", () => {
      this.transitioning = true;
      this.moveUp();
    });
  }

  onBeat() {
    if (this.cameraIsTop) {
      // Vue du dessus : rotation sur elle-même autour de Y
      this.topAngle += this.incrementAngle;

      const lookAtTarget = new THREE.Vector3(
        Math.cos(this.topAngle) * 0.001,
        0,
        Math.sin(this.topAngle) * 0.001,
      );

      gsap.to(this.controls.target, {
        x: lookAtTarget.x,
        z: lookAtTarget.z,
        duration: 0.2,
        onUpdate: () => {
          this.controls.update();
        },
      });
    } else {
      // Vue normale : rotation autour de la scène sur X/Z
      const angle =
        Math.atan2(this.currentPosition.z, this.currentPosition.x) + this.incrementAngle;
      const newPosition = new THREE.Vector3(
        this.radius * Math.cos(angle),
        this.currentPosition.y,
        this.radius * Math.sin(angle),
      );
      this.currentPosition.copy(newPosition);

      gsap.to(this.instance.position, {
        x: newPosition.x,
        y: newPosition.y,
        z: newPosition.z,
        duration: 0.2,
      });
    }
  }

  moveUp() {
    gsap.killTweensOf(this.instance.position);
    gsap.killTweensOf(this.controls.target);
    if (!this.cameraIsTop) {
      // Monter en vue du dessus
      gsap.to(this.instance.position, {
        x: this.cameraTopPosition.x,
        y: this.cameraTopPosition.y,
        z: this.cameraTopPosition.z,
        duration: 0.1,
        onUpdate: () => {
          this.instance.lookAt(0, 0, 0);
        },
        onComplete: () => {
          this.transitioning = false;
          this.cameraIsTop = true;
          this.controls.target.set(0, 0, 0);
          this.topAngle = 0;
          this.onBeat(); // pour réinitialiser la position de la cible de regard
        },
      });
    } else {
      // Redescendre à la position précédente
      gsap.to(this.instance.position, {
        x: this.currentPosition.x,
        y: this.currentPosition.y,
        z: this.currentPosition.z,
        duration: 0.1,
        onUpdate: () => {
          this.instance.lookAt(0, 0, 0);
        },
        onComplete: () => {
          this.transitioning = false;
          this.cameraIsTop = false;
          this.controls.target.set(0, 0, 0);
        },
      });
    }
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100);
    // this.instance.position.copy(this.cameraPositions[this.currentPositionIndex]);
    this.instance.position.copy(this.initialPosition);
    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.target.set(0, 4, 0);
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
