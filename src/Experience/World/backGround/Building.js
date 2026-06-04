import * as THREE from "three";
import Experience from "../../Experience.js";
import vertex from "../../shaders/batimentsBackground/vertex.glsl";
import fragment from "../../shaders/batimentsBackground/fragment.glsl";
import gsap from "gsap";
import EventEmitter from "../../Utils/EventEmitter.js";

export default class Building extends EventEmitter {
  constructor(position, offSetShader) {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.revealMask = this.resources.items.backgroundBuildingMaskBaked;

    this.backBuilding = this.resources.items.back_building;

    // buildings models
    this.backBuilding1 = this.resources.items.back_building1;
    this.backBuilding2 = this.resources.items.back_building2;
    this.backBuilding3 = this.resources.items.back_building3;
    this.backBuilding4 = this.resources.items.back_building4;
    this.backBuildingList = [
      this.backBuilding1,
      this.backBuilding2,
      this.backBuilding3,
      this.backBuilding4,
    ];

    // buildings textures
    this.backBuildingTexture1 = this.resources.items.maison1_texture;
    this.backBuildingTexture2 = this.resources.items.maison2_texture;
    this.backBuildingTexture3 = this.resources.items.maison3_texture;
    this.backBuildingTexture4 = this.resources.items.maison4_texture;
    this.backBuildingTextureList = [
      this.backBuildingTexture1,
      this.backBuildingTexture2,
      this.backBuildingTexture3,
      this.backBuildingTexture4,
    ];

    this.position = position;
    this.debug = this.experience.debug;
    this.offSetShader = offSetShader;
    console.log("offSetShader", this.offSetShader);
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
    // this.geometry_1 = this.backBuilding.scene.children[0].geometry;
    // console.log("GEOMETRY", this.backBuilding.scene.children[0]);
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
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uRevealMask: { value: this.revealMask },
        uTime: { value: 0 },
      },
    });
  }

  setModel(index) {
    this.model = this.backBuildingList[index].scene;
    this.backgroundBuildings = this.model.children[0].children;
    console.log("model", this.backgroundBuildings);
    this.model.scale.set(1 - 0.2 * index, 1 - 0.2 * index, 1 - 0.2 * index);
    this.backgroundBuildings[0].material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0, 0, 0),
    });
    this.backgroundBuildings[1].material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uRevealMask: { value: this.backBuildingTextureList[index] },
        uTime: { value: 0 },
        uOffSet: { value: this.offSetShader },
      },
    });

    const building = this.model.clone();
    return building;
  }

  setMesh() {
    this.group = new THREE.Group();
    for (let i = 0; i < this.geometryList.length; i++) {
      // mesh.position.y = i * 0.5;
      const building = this.setModel(i);
      this.group.add(building);
    }

    this.group.position.copy(this.position);
    const randomScale = Math.random() * 3.0 + 0.75; // Scale between 0.75 and 2.75
    this.group.scale.set(randomScale, randomScale, randomScale);
    this.group.position.y = -2;
    this.group.rotation.y = Math.random() * Math.PI * 2; // Random rotation around Y-axis
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
      if (random < 0.7) {
        this.buildingStatus = this.buildingStatus + 1;
        console.log("push first building", this.buildingStatus);

        gsap.to(this.group.children[1].position, {
          y: 0.25,
          duration: this.animationDuration,
        });
      }
    } else if (this.buildingStatus === this.buildingStatusMax) {
      const random = Math.random();
      if (random < 0.5) {
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
          y: 0.25 * this.buildingStatus,
          duration: this.animationDuration,
        });
      } else {
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

  update() {
    this.group.children.forEach((building) => {
      building.traverse((obj) => {
        if (obj.isMesh && obj.material && obj.material.uniforms && obj.material.uniforms.uTime) {
          obj.material.uniforms.uTime.value += this.experience.time.delta * 0.001;
        }
      });
    });
  }
}
