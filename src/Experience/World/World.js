import * as THREE from 'three';

import Experience from '../Experience.js';
import Environment from './Environment.js';
import Water from './Water.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    // Setup
    this.environment = new Environment();
    this.water = new Water();
  }
}