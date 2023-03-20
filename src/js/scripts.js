import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import starsTexture from '../img/stars.jpg';
import earthTexture from '../img/earth.jpg';
import cloudsTexture from '../img/clouds.jpg';
import moonTexture from '../img/moon.jpg';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 0, 50);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture
]);

const textureLoader = new THREE.TextureLoader();

const earthGeo = new THREE.SphereGeometry(10, 50, 50);
const earthMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load(earthTexture)
});
const earth = new THREE.Mesh(earthGeo, earthMat);
scene.add(earth);

const cloudsMat = new THREE.MeshLambertMaterial({
  map: textureLoader.load(cloudsTexture),
  transparent: true,
  opacity : 0.7
});
const clouds = new THREE.Mesh(earthGeo, cloudsMat);
clouds.scale.set(1.02, 1.02, 1.02);
earth.add(clouds);

const moonGeo = new THREE.SphereGeometry(2, 32, 32);
const moonMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load(moonTexture)
});
const moon = new THREE.Mesh(moonGeo, moonMat);
moon.position.set(15, 0, 0);
scene.add(moon);

const earthMoonGroup = new THREE.Object3D();
earthMoonGroup.add(earth);
earthMoonGroup.add(moon);
scene.add(earthMoonGroup);

function animate() {
  // Earth rotation
  earth.rotateY(0.005);

  // Moon rotation around Earth
  moon.rotateY(0.02);
  moon.position.set(
    15 * Math.sin(moon.rotation.y),
    0,
    15 * Math.cos(moon.rotation.y)
  );

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
