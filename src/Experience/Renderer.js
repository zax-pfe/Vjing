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

    this.bloom_strength = 1.5;
    this.bloom_threshold = 0.4;
    this.bloom_radius = 0.85;

    // Noise
    this.noiseStrengthRatio = 0.0;
    this.noiseStrength = 20.5;
    this.noiseScale = 0.05;

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

    this.setCustomPass();
    this.setUnrealBloom();
    // this.setBloom();
  }

  setCustomPass() {
    this.resources = this.experience.resources;

    if (this.debug.active) {
      this.debugFolder.add(this, "noiseStrength", 1, 25, 1);
      this.debugFolder.add(this, "noiseStrengthRatio", 0, 1, 0.01);
      this.debugFolder.add(this, "noiseScale", 0, 1, 0.01);
    }

    this.customPass = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        uStrength: { value: this.noiseStrength },
        uStrengthRatio: { value: this.noiseStrengthRatio },
        uScale: { value: this.noiseScale },
        uTime: { value: 0 },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    this.composer.addPass(this.customPass);
  }

  setUnrealBloom() {
    if (this.debug.active) {
      this.debugFolder.add(this, "bloom_strength", 0, 3, 0.01);
      this.debugFolder.add(this, "bloom_threshold", 0, 3, 0.01);
      this.debugFolder.add(this, "bloom_radius", 0, 1, 0.01);
    }

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

    if (this.customPass) {
      this.customPass.uniforms.uStrength.value = this.noiseStrength;
      this.customPass.uniforms.uStrengthRatio.value = this.noiseStrengthRatio;
      this.customPass.uniforms.uScale.value = this.noiseScale;
      // this.customPass.uniforms.uTime.value += this.experience.time.delta * 0.001;
    }
    if (this.unrealBloomPass) {
      this.unrealBloomPass.strength = this.bloom_strength;
      this.unrealBloomPass.radius = this.bloom_radius;
      this.unrealBloomPass.threshold = this.bloom_threshold;
    }
  }
}
