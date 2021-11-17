// Import three.js core
import * as THREE from "./build/three.module.js";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 10;

var starTexture = new THREE.TextureLoader().load("./assets/star.png");
var stars = [];

for (let i = 0; i < 200; i++) {
  let geometry = new THREE.PlaneGeometry(0.5, 0.5);
  let material = new THREE.MeshBasicMaterial({ map: starTexture });
  let star = new THREE.Mesh(geometry, material);
  star.position.set(getRandom(), getRandom(), getRandom());
  star.material.side = THREE.DoubleSide;
  stars.push(star);
}



for (let j = 0; j < stars.length; j++) {
  scene.add(stars[j]);
}

var lightness = 0;
var rotSpeed = 0.001;

function animate() {

  // Rotate and change saturation lightness of each star
  for (let k = 0; k < stars.length; k++) {
    let star = stars[k];
    star.rotation.x += 0.001;
    star.rotation.y += 0.001;
    lightness > 100 ? lightness = 1 : lightness++;
    star.material.color = new THREE.Color("hsl(233, 80%, " + lightness + "%)");
  }

  // Rotate camera
  // source: http://mikeheavers.com/tutorials/webgl_circular_camera_rotation_around_a_single_axis_in_threejs/
  let x = camera.position.x;
  let z = camera.position.z;
  camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
  camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
  camera.lookAt(scene.position);

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

function getRandom() {
  // source: https://stackoverflow.com/questions/13455042/random-number-between-negative-and-positive-value
  var num = Math.floor(Math.random() * 10) + 1; // this will get a number between 1 and x;
  num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
  return num;
}

