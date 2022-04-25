import * as THREE from 'three'
import { AnimationMixer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
var newPosition = new THREE.Vector3();
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
let mixer: AnimationMixer
let clock: any
var renderCalls: any = [];

function render() {
    if (mixer) mixer.update(clock.getDelta());
    requestAnimationFrame(render);
    renderCalls.forEach((callback: any) => {
        callback();
    });
}
render();
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 2

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight)
const selector = document.querySelector('#animation')
selector && selector.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)

var light2 = new THREE.AmbientLight(0xffffcc, 1);
light2.position.set(30, -10, 30);
scene.add(light2);

controls.rotateSpeed = 0.9;
controls.zoomSpeed = 0.9;

controls.minDistance = 0;
controls.maxDistance = 10;
camera.position.distanceTo(newPosition);
scene.add(camera);

controls.minPolarAngle = 0; // radians
controls.maxPolarAngle = Math.PI / 2; // radians

controls.enableDamping = true;
controls.dampingFactor = 0.05;

renderCalls.push(function () {
    controls.update()
});
function renderScene() { renderer.render(scene, camera); }
renderCalls.push(renderScene);

var loader: GLTFLoader = new GLTFLoader();
//var loader = new THREE.FBXLoader();
// loader.crossOrigin = true;
loader.load('wp-content/themes/twentytwentytwo-child/animation/TIMEMACHINE7.gltf', function (gltf) {
    clock = new THREE.Clock();
    // gltf.animations; // Array<THREE.AnimationClip>
    // gltf.scene; // THREE.Group
    // gltf.scenes; // Array<THREE.Group>
    // gltf.cameras; // Array<THREE.Camera>
    // gltf.asset; // Object
    mixer = new THREE.AnimationMixer(gltf.scene);
    gltf.animations.forEach((clip) => {
        console.log('clip', clip);
        mixer.clipAction(clip).play();
    });
    scene.add(gltf.scene);
    renderer.render(scene, camera);
    //object.position.set(0, -10, -0.75);
    //     object.rotation.set(Math.PI / -2, 0, 0);
    //     TweenLite.from( object.rotation, 1.3, {
    //       y: Math.PI * 2,
    //       ease: 'Power3.easeOut'
    //     });
    //TweenMax.from( object.position, 3, {
    //y: -8,
    //yoyo: true,
    //repeat: -1,
    //ease: 'Power2.easeInOut'
    //});
    ////object.position.y = - 95;
    // scene.add(object);
    // scene.position.y = -10
    const camera1 = document.querySelector("#camera-getposition-button")
    camera1 && camera1.addEventListener('click', (e) => {
        console.log('e', camera.position);
    }, false);

    const camera2 = document.querySelector("#camera-reset-button")
    camera2 && camera2.addEventListener('click', function (event) {
        event.preventDefault();
        //TODO camera sometimes not reseting
        controls.autoRotate = false
        setTimeout(() => {
            controls.autoRotate = true
        }, 3000);
        // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        // mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        // raycaster.setFromCamera(mouse, camera);
        // var intersects = raycaster.intersectObjects(scene.children, true);
        // if (intersects.length > 0) {
        // 	// console.log('Intersection:', intersects[0]);
        // 	// newPosition.x = Math.cos(800);
        // 	// newPosition.z = Math.sin(800);
        // 	// camera.lookAt(newPosition);
        // 	// camera.position.copy(newPosition);
        // 	renderer.render(scene, camera);
        // }
    }, false);

    // , onProgress, onError );
}, undefined, function (e) {
    console.log("Error in loading")
    console.error(e);
});
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}
function animate() {
    requestAnimationFrame(animate)
    controls.update()
    console.log('Date.now(', Date.now());
    render()
}
// animate()