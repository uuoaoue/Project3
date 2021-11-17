// Art 109 Three.js Demo Site
// client7.js
// A three.js scene which uses planes and texture loading to generate a scene with images which can be traversed with basic WASD and mouse controls, this scene is full screen with an overlay.

// Import required source code
// Import three.js core
import * as THREE from "./build/three.module.js";
// Import pointer lock controls
import {
  PointerLockControls
} from "./src/PointerLockControls.js";
import { GLTFLoader } from "./src/GLTFLoader.js";

// Establish variables
let camera, scene, renderer, controls, material;
let among_us, mesh4, mesh5, mesh6, teapot,girl;
const objects = [];
let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();





// Initialization and animation function calls
init();
animate();

// Initialize the scene
function init() {

  // Establish the camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.y = 10;


  // Define basic scene parameters
  scene = new THREE.Scene();
  scene.background = new THREE.Color("rgb(2, 28, 82)");

  scene.fog = new THREE.Fog(0x7985ba, 0, 200);

  // Define scene lighting
  const light = new THREE.HemisphereLight(0xffffff, 5, 2  );

  scene.add(light);


  // Define controls
  controls = new PointerLockControls(camera, document.body);

  // Identify the html divs for the overlays
  const blocker = document.getElementById("blocker");
  const instructions = document.getElementById("instructions");

  // Listen for clicks and respond by removing overlays and starting mouse look controls
  // Listen
  instructions.addEventListener("click", function() {
    controls.lock();
  });
  // Remove overlays and begin controls on click
  controls.addEventListener("lock", function() {
    instructions.style.display = "none";
    blocker.style.display = "none";
  });
  // Restore overlays and stop controls on esc
  controls.addEventListener("unlock", function() {
    blocker.style.display = "block";
    instructions.style.display = "";
  });
  // Add controls to scene
  scene.add(controls.getObject());

  // Define key controls for WASD controls
  const onKeyDown = function(event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        moveForward = true;
        break;

      case "ArrowLeft":
      case "KeyA":
        moveLeft = true;
        break;

      case "ArrowDown":
      case "KeyS":
        moveBackward = true;
        break;

      case "ArrowRight":
      case "KeyD":
        moveRight = true;
        break;

      case "Space":
        if (canJump === true) velocity.y += 350;
        canJump = false;
        break;
    }
  };

  const onKeyUp = function(event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        moveForward = false;
        break;

      case "ArrowLeft":
      case "KeyA":
        moveLeft = false;
        break;

      case "ArrowDown":
      case "KeyS":
        moveBackward = false;
        break;

      case "ArrowRight":
      case "KeyD":
        moveRight = false;
        break;
    }
  };

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  // Add raycasting for mouse controls
  raycaster = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(0, -1, 0),
    0,
    10
  );

  // Generate the ground
  let floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
  floorGeometry.rotateX(-Math.PI / 2);

  // Vertex displacement pattern for ground
  let position = floorGeometry.attributes.position;

  for (let i = 0, l = position.count; i < l; i++) {
    vertex.fromBufferAttribute(position, i);

    vertex.x += Math.random() * 25 - 20;
    vertex.y += Math.random() * 2;
    // vertex.z += Math.random() * 30 - 10;

    position.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

  position = floorGeometry.attributes.position;
  const colorsFloor = [];

  for (let i = 0, l = position.count; i < l; i++) {
    color.setRGB(Math.random() * 0.1+ 0.1, Math.random() * 0.3 + 0.1, Math.random() * 0.1 + 0.4);
    colorsFloor.push(color.r, color.g, color.b);
  }

  floorGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colorsFloor, 3)
  );

  const floorMaterial = new THREE.MeshBasicMaterial({
    vertexColors: true
  });

  const floor = new THREE.Mesh(floorGeometry, floorMaterial);

  // Insert completed floor into the scene
  scene.add(floor);
//  insert "welcome"
  var loader4 = new THREE.FontLoader();

  loader4.load( './assets/Schoolbell_Regular.json', function ( font ) {
  
      var textGeo = new THREE.TextGeometry( "Welcome", {
  
          font: font,
  
          size: 10,
          height: 2,
          curveSegments: 2,
  
          bevelThickness: .5,
          bevelSize: .5,
          bevelEnabled: true
  
      } );
  
      var textMaterial = new THREE.MeshPhongMaterial( { color: "#4070ff" } );
  
      var word = new THREE.Mesh( textGeo, textMaterial );
      word.position.set( -25,8,-30);
  
      scene.add( word );
  
  } );
  
  // First Image
  // Load image as texture
  const texture = new THREE.TextureLoader().load( './assets/Sin1.jpg' );
  // Immediately use the texture for material creation
  const material = new THREE.MeshBasicMaterial( { map: texture } );
  // Create plane geometry
  const geometry = new THREE.BoxGeometry( 15, 20, .5 );
  // Apply image texture to plane geometry
  const plane = new THREE.Mesh( geometry, material );
  // Position plane geometry
  plane.position.set(-50 ,12 ,-200);
  // Place plane geometry
  scene.add( plane );

  // Second Image
  // Load image as texture
  const texture2 = new THREE.TextureLoader().load( './assets/Sin2.jpg' );
  // immediately use the texture for material creation
  const material2 = new THREE.MeshBasicMaterial( { map: texture2 } );
  // Create plane geometry
  const geometry2 = new THREE.BoxGeometry( 15, 20, .5 );
  // Apply image texture to plane geometry
  const plane2 = new THREE.Mesh( geometry2, material2 );
  // Position plane geometry
  plane2.position.set(-30 , 12 , -200);
  // Place plane geometry
  scene.add( plane2 );

   // Third Image
  // Load image as texture
  const texture3 = new THREE.TextureLoader().load( './assets/Sin3.jpg' );
  // immediately use the texture for material creation
  const material3 =new THREE.MeshBasicMaterial( {map: texture3} );
  // Create plane geometry
  const geometry3 =new THREE.BoxGeometry( 15, 20, 0.5 );
  // Apply image texture to plane geometry
  const plane3 = new THREE.Mesh( geometry3, material3 );
  // Position plane geometry
  plane3.position.set(-10 , 12 , -200);
  // Place plane geometry
  scene.add( plane3 );

     // sin 4 Image 
  // Load image as texture
  const texture7 = new THREE.TextureLoader().load( './assets/Sin4.jpg' );
  // immediately use the texture for material creation
  const material7 =new THREE.MeshBasicMaterial( {map: texture7} );
  // Create plane geometry
  const geometry7 =new THREE.BoxGeometry( 15, 20, 0.5 );
  // Apply image texture to plane geometry
  const plane7= new THREE.Mesh( geometry7, material7 );
  // Position plane geometry
  plane7.position.set(10 , 12 , -200);
  // Place plane geometry
  scene.add( plane7 ); 


       // sin 5 Image 
  // Load image as texture
  const texture8 = new THREE.TextureLoader().load( './assets/Sin5.jpg' );
  // immediately use the texture for material creation
  const material8 =new THREE.MeshBasicMaterial( {map: texture8} );
  // Create plane geometry
  const geometry8 =new THREE.BoxGeometry( 15, 20, 0.5 );
  // Apply image texture to plane geometry
  const plane8= new THREE.Mesh( geometry8, material8);
  // Position plane geometry
  plane8.position.set(30 , 12 , -200);
  // Place plane geometry
  scene.add( plane8 ); 


       // sin 6 Image
  // Load image as texture
  const texture9 = new THREE.TextureLoader().load( './assets/Sin6.jpg' );
  // immediately use the texture for material creation
  const material9 =new THREE.MeshBasicMaterial( {map: texture9} );
  // Create plane geometry
  const geometry9 =new THREE.BoxGeometry( 15, 20, 0.5 );
  // Apply image texture to plane geometry
  const plane9= new THREE.Mesh( geometry9, material9);
  // Position plane geometry
  plane9.position.set(50 , 12 , -200);
  // Place plane geometry
  scene.add( plane9 ); 



       // sin 7 Image
  // Load image as texture
  const texture10= new THREE.TextureLoader().load( './assets/Sin7.jpg' );
  // immediately use the texture for material creation
  const material10 =new THREE.MeshBasicMaterial( {map: texture10} );
  // Create plane geometry
  const geometry10 =new THREE.BoxGeometry( 15, 20, 0.5 );
  // Apply image texture to plane geometry
  const plane10= new THREE.Mesh( geometry10, material10);
  // Position plane geometry
  plane10.position.set(70 , 12 , -200);
  // Place plane geometry
  scene.add( plane10 ); 

         //title 3d models
  // Load image as texture
  const texture11= new THREE.TextureLoader().load( './assets/title3.png' );
  // immediately use the texture for material creation
  const material11 =new THREE.MeshBasicMaterial( {map: texture11} );
  // Create plane geometry
  const geometry11=new THREE.BoxGeometry( 30, 15, .5 );
  // Apply image texture to plane geometry
  const plane11=  new THREE.Mesh( geometry11, material11);
  // Position plane geometry
  plane11.position.set(90 , 12, -50);
  // Place plane geometry
  scene.add( plane11 ); 

      //title organic shapes 
  // Load image as texture
  const texture12= new THREE.TextureLoader().load( './assets/title1.png' );
  // immediately use the texture for material creation
  const material12 =new THREE.MeshBasicMaterial( {map: texture12} );
  // Create plane geometry
  const geometry12=new THREE.BoxGeometry( 20, 20, .5 );
  // Apply image texture to plane geometry
  const plane12=  new THREE.Mesh( geometry12, material12);
  // Position plane geometry
  plane12.position.set(-150 , 12 , -50);
  // Place plane geometry
  scene.add( plane12); 

     //title 7 sins 
  // Load image as texture
  const texture13= new THREE.TextureLoader().load( './assets/title2.png' );
  // immediately use the texture for material creation
  const material13 =new THREE.MeshBasicMaterial( {map: texture13} );
  // Create plane geometry
  const geometry13=new THREE.BoxGeometry( 40, 20, .5 );
  // Apply image texture to plane geometry
  const plane13=  new THREE.Mesh( geometry13, material13);
  // Position plane geometry
  plane13.position.set(10 , 40 , -200);
  // Place plane geometry
  scene.add( plane13); 

  // Load GLTF AMONGUS
  const loader = new GLTFLoader().load(
    "./assets/AMONGUS.glb", // comment this line out and un comment the line below to swithc models
    function(gltf) {    
      // set position and scale
      among_us = gltf.scene;
      among_us.position.set(90 , 2 , -70);
      among_us.rotation.set(0, 0, 0);
      among_us.scale.set(3, 3, 3); // <-- change this to (1, 1, 1) for photogrammetery model
      // Add model to scene
      scene.add(among_us);
    },
    undefined,
    function(error) {
      console.error(error);
    }
  );

   // Load GLTF TEAPOT
   const loader1 = new GLTFLoader().load(
    "./assets/teapot.glb", // comment this line out and un comment the line below to swithc models
    function(gltf) {    
      // set position and scale
      teapot = gltf.scene;
     teapot.position.set(90 , 2 , -100);
      teapot.rotation.set(0, 0, 0);
      teapot.scale.set(0.15, 0.15,0.15); // <-- change this to (1, 1, 1) for photogrammetery model
      // Add model to scene
      scene.add(teapot);
    },
    undefined,
    function(error) {
      console.error(error);
    }
  );


     // 4th Image (Text with image and white background)
// A surface generated by providing a function that takes a 2D point from a grid and returns the corresponding 3d point.
// from: https://github.com/mrdoob/three.js/blob/b8d8a8625465bd634aa68e5846354d69f34d2ff5/examples/js/ParametricGeometries.js
function klein(v, u, target) {
  u *= Math.PI;
  v *= 2 * Math.PI;
  u = u * 2;

  let x;
  let z;

  if (u < Math.PI) {
      x = 30 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(u) * Math.cos(v);
      z = -20 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
  } else {
      x = 30 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(v + Math.PI);
      z = -20* Math.sin(u);
  }

  const y = -5 * (1 - Math.cos(u) / 2) * Math.sin(v);

  target.set(x, y, z).multiplyScalar(0.75);
}

const slices = 30;  

const stacks = 30;  


  // Load image as texture
  const texture4 = new THREE.TextureLoader().load( './assets/image_4.jpg' );
  // immediately use the texture for material creation
  const material4 =new THREE.MeshBasicMaterial( {map: texture4} );
  // Create plane geometry

  const geometry4 = new THREE.ParametricGeometry(klein, slices, stacks);  
  
  // Apply image texture to plane geometry
  mesh4 = new THREE.Mesh( geometry4, material4 );
  // Position plane geometry
  mesh4.position.set(-150 , 15 ,-200);
  // Place plane geometry
  scene.add( mesh4 );


   // Fifth Image (Text with image and white background)
  // Load image as texture
  const texture5 = new THREE.TextureLoader().load( './assets/image_5.jpg' );
  // immediately use the texture for material creation
  const material5 =new THREE.MeshBasicMaterial( {map: texture5} );
  // Create plane geometry
  const geometry5 = new THREE.TorusGeometry( 15, 3, 16, 100);
  // Apply image texture to plane geometry
  mesh5 = new THREE.Mesh( geometry5, material5 );
  // Position plane geometry
  mesh5.position.set(-150 , 20 , -150);
  // Place plane geometry
  scene.add( mesh5 );

     // Sixth Image (Text with image and white background)
  // Load image as texture
  const texture6 = new THREE.TextureLoader().load( './assets/image_6.jpg' );
  // immediately use the texture for material creation
  const material6 =new THREE.MeshBasicMaterial( {map: texture6} );
  // Create plane geometry
  const geometry6 = new THREE.TorusKnotBufferGeometry( 10, 3, 100, 20 );
  // Apply image texture to plane geometry
  mesh6 = new THREE.Mesh( geometry6, material6 );
  // Position plane geometry
  mesh6.position.set(-150 , 20 , -100);
  // Place plane geometry
  scene.add( mesh6 );



  // Define Rendered and html document placement
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Listen for window resizing
  window.addEventListener("resize", onWindowResize);
}

// Window resizing function
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation function
function animate() {
  requestAnimationFrame(animate);

  const time = performance.now();

  // Check for controls being activated (locked) and animate scene according to controls
  if (controls.isLocked === true) {
    raycaster.ray.origin.copy(controls.getObject().position);
    raycaster.ray.origin.y -= 10;

    const intersections = raycaster.intersectObjects(objects, false);

    const onObject = intersections.length > 0;

    const delta = (time - prevTime) / 1000;

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize(); // this ensures consistent movements in all directions

    if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
    if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

    if (onObject === true) {
      velocity.y = Math.max(0, velocity.y);
      canJump = true;
    }

    controls.moveRight(-velocity.x * delta);
    controls.moveForward(-velocity.z * delta);

    controls.getObject().position.y += velocity.y * delta; // new behavior

    if (controls.getObject().position.y < 10) {
      velocity.y = 0;
      controls.getObject().position.y = 10;

      canJump = true;
    }
  }
  among_us.rotation.y += 0.01;
  teapot.rotation.y += 0.01;

  mesh4.rotation.y += 0.01;

  mesh5.rotation.x += 0.01;
  mesh5.rotation.y += 0.01;

  mesh6.rotation.x += 0.01;
  mesh6.rotation.y += 0.01;


  prevTime = time;

  renderer.render(scene, camera);
}
