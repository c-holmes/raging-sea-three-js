import * as THREE from 'three';
import Experience from '../Experience.js';
import vertexShader from '../../shaders/water/vertex.glsl';
import fragmentShader from '../../shaders/water/fragment.glsl';

export default class Water {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.debugObject = {};

    // Setup
    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(2, 2, 512, 512);
  }

  setMaterial() {
    this.debugObject.depthColor = '#186691';
    this.debugObject.surfaceColor = '#9bd8ff';

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: {value: 0},

        uBigWavesElevation: { value: 0.2 },
        uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
        uBigWavesSpeed: { value: 0.75 },

        uSmallWavesElevation: { value: 0.15 },
        uSmallWavesFrequency: { value: 3 },
        uSmallWavesSpeed: { value: 0.2 },
        uSmallWavesIterations: { value: 4 },

        uDepthColor: {value: new THREE.Color(this.debugObject.depthColor)},
        uSurfaceColor: {value: new THREE.Color(this.debugObject.surfaceColor)},
        uColorOffset: {value: 0.08},
        uColorMultiplier: {value: 5}
      }
    });

    // Debug
    if (this.debug.active) {
      this.debug.gui.add(this.material.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name('uBigWavesElevation')
      this.debug.gui.add(this.material.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX')
      this.debug.gui.add(this.material.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyY')
      this.debug.gui.add(this.material.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001).name('uBigWavesSpeed')

      this.debug.gui.add(this.material.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
      this.debug.gui.add(this.material.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency')
      this.debug.gui.add(this.material.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
      this.debug.gui.add(this.material.uniforms.uSmallWavesIterations, 'value').min(0).max(5).step(1).name('uSmallWavesIterations')
    
      this.debug.gui.addColor(this.debugObject, 'depthColor')
        .name('depthColor')
        .onChange(() => {
          this.material.uniforms.uDepthColor.value.set(this.debugObject.depthColor)
        })
      this.debug.gui.addColor(this.debugObject, 'surfaceColor')
        .name('surfaceColor')
        .onChange(() => {
          this.material.uniforms.uSurfaceColor.value.set(this.debugObject.surfaceColor)
        })
      this.debug.gui.add(this.material.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('colorOffset')
      this.debug.gui.add(this.material.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('colorMultiplier')
    }
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = - Math.PI * 0.5;
    this.scene.add(this.mesh);
  }

  update() {
    this.material.uniforms.uTime.value = this.time.elapsed;
  }
}