import * as THREE from "three";
import Experience from "../../Experience.js";
import vertex from "../../shaders/round/vertex.glsl";
import fragment from "../../shaders/round/fragment.glsl";
import gsap from "gsap";
import EventEmitter from "../../Utils/EventEmitter.js";

export default class Building extends EventEmitter {
  constructor(position) {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.position = position;
    this.debug = this.experience.debug;
    this.buildingStatus = 0;
    this.buildingStatusMax = 3;
    this.animationDuration = 0.2;

    // faire un array de taille entre 1 et 2 pour chaque box
    this.setRandomSizes();

    if (this.debug.active) {
      // this.setDebug();
    }

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();

    //prend une liste de points aléatoire
    // pour chaque point, créer une box
    // au debut prend un point et créer une box
    // créer 3 autre box, qui seront dans la grosses
    // mettre le tout dans un group et le group dans la scene
  }

  setGeometry() {
    this.geometryList = [];
    this.geometry_1 = new THREE.BoxGeometry(1, this.arraySizes[0] + 0.4, 1);

    this.geometryList.push(this.geometry_1);
    this.geometry_2 = new THREE.BoxGeometry(0.8, this.arraySizes[1], 0.8);
    this.geometryList.push(this.geometry_2);
    this.geometry_3 = new THREE.BoxGeometry(0.6, this.arraySizes[2], 0.6);
    this.geometryList.push(this.geometry_3);
    this.geometry_4 = new THREE.BoxGeometry(0.4, this.arraySizes[3], 0.4);
    this.geometryList.push(this.geometry_4);
  }

  setTextures() {}

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0.1, 0.0, 0.0),
    });
  }

  setMesh() {
    this.group = new THREE.Group();
    for (let i = 0; i < this.geometryList.length; i++) {
      const mesh = new THREE.Mesh(this.geometryList[i], this.material);
      // mesh.position.y = i * 0.5;
      this.group.add(mesh);
    }
    this.group.position.copy(this.position);
    const randomScale = Math.random() * 0.5 + 0.75; // Scale between 0.75 and 1.25
    this.group.scale.set(randomScale, randomScale, randomScale);
    this.scene.add(this.group);
  }

  setRandomSizes() {
    this.arraySizes = [];
    for (let i = 0; i < this.buildingStatusMax; i++) {
      const size = Math.random() * 1 + 1 - 0.1 * i; // Size between 1 and 2, decreasing with each box
      this.arraySizes.push(size);
    }
  }

  onBeat() {
    // quand on lcique sur le bouton
    // augmente le building status
    // si le uilding status est a 0 on fait monter la premeire box avec gsap avec une chance sur deux
    // sinon aléatoirement on rajoute on choisi de rajouter une box ou de faire descendre une box
    // si le building status est a 4 on fait descendre la derniere box avec gsap avec une chance sur deux
    // sans le modulo sur le status

    if (this.buildingStatus === 0) {
      const random = Math.random();
      if (random < 0.5) {
        this.buildingStatus = this.buildingStatus + 1;
        console.log("push first building", this.buildingStatus);

        gsap.to(this.group.children[1].position, {
          y: 0.5,
          duration: this.animationDuration,
        });
      }
    } else if (this.buildingStatus === this.buildingStatusMax) {
      const random = Math.random();
      if (random < 0.5) {
        console.log("push last building", this.buildingStatus);

        gsap.to(this.group.children[this.buildingStatus].position, {
          y: 0,
          duration: this.animationDuration,
        });
        this.buildingStatus = this.buildingStatus - 1;
      }
    } else {
      const random = Math.random();
      if (random < 0.5) {
        this.buildingStatus = this.buildingStatus + 1;
        console.log("push up  building", this.buildingStatus);
        gsap.to(this.group.children[this.buildingStatus].position, {
          y: 0.5 * this.buildingStatus,
          duration: this.animationDuration,
        });
      } else {
        console.log("push down building", this.buildingStatus);
        gsap.to(this.group.children[this.buildingStatus].position, {
          y: 0,
          duration: this.animationDuration,
        });
        this.buildingStatus = this.buildingStatus - 1;
      }
    }
  }

  setDebug() {
    this.debugFolder = this.debug.ui.addFolder("building");
    const debugObject = {
      pushBuilding: () => {
        this.onBeat();
      },
    };
    this.debugFolder.add(debugObject, "pushBuilding");
  }

  update() {}
}
