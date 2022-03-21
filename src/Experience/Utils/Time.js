import * as THREE from 'three';

import EventEmitter from './EventEmitter.js';

export default class Time extends EventEmitter {
  constructor() {
    super();

    // Setup
    this.clock = new THREE.Clock();
    this.elapsed = 0;

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    this.elapsed = this.clock.getElapsedTime();

    this.trigger('tick');

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}