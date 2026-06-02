import * as THREE from "three";
import Experience from "./Experience.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { BloomPass } from "three/addons/postprocessing/BloomPass.js";

import vertex from "./shaders/postProcessing/vertex.glsl";
import fragment from "./shaders/postProcessing/fragment.glsl";

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.debug = this.experience.debug;
    this.offsetX = 0;

    // Bloom

    this.bloom_strength = 0.4;
    this.bloom_threshold = 0.1;
    this.bloom_radius = 0.9;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("renderer");
    }

    this.setInstance();
  }

  setPostProcessing() {
    this.composer = new EffectComposer(this.instance);
    this.renderPass = new RenderPass(this.scene, this.camera.instance);
    this.composer.addPass(this.renderPass);

    // this.setUnrealBloom();
    // this.setBloom();
    this.setCustomPass();
  }

  setCustomPass() {
    this.resources = this.experience.resources;
    this.palette = this.resources.items.paletteTexture3;

    this.customPass = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        uPalette: { value: this.palette },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    this.composer.addPass(this.customPass);
  }

  setUnrealBloom() {
    this.debugFolder.add(this, "bloom_strength", 0, 3, 0.01);
    this.debugFolder.add(this, "bloom_threshold", 0, 1, 0.01);
    this.debugFolder.add(this, "bloom_radius", 0, 1, 0.01);

    const resolution = new THREE.Vector2(this.sizes.width, this.sizes.height);
    this.unrealBloomPass = new UnrealBloomPass(
      resolution,
      this.bloom_strength,
      this.bloom_radius,
      this.bloom_threshold,
    );
    // this.bloomPass = bloomPass;
    this.composer.addPass(this.unrealBloomPass);
  }

  setBloom() {
    this.bloomPass = new BloomPass(0.9);
    this.composer.addPass(this.bloomPass);
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor("#000000");
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    // this.instance.render(this.scene, this.camera.instance);
    if (this.composer) {
      this.composer.render();
    }

    if (this.bloomPass) {
      this.bloomPass.strength = this.bloom_strength;
      this.bloomPass.radius = this.bloom_radius;
      this.bloomPass.threshold = this.bloom_threshold;
    }
  }
}
