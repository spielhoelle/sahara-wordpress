import * as THREE from 'three'
import { AnimationMixer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as TWEEN from "@tweenjs/tween.js";
import './ajax_template'

let mixer: AnimationMixer
let clock: any
var renderCalls: any = [];
const raycaster = new THREE.Raycaster();

function render() {
    if (mixer) mixer.update(clock.getDelta());
    requestAnimationFrame(render);
    renderCalls.forEach((callback: any) => {
        callback();
    });
}
render();
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / (window.innerHeight - 400), 0.1, 90000)
// camera.position.z = 2

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight - 400)
const selector = document.querySelector('#animation')
selector && selector.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)
controls.rotateSpeed = 0.9;

controls.zoomSpeed = 0.9;

controls.minDistance = 0;
controls.maxDistance = 10;
camera.position.set(0, 1, 5);
// console.log('camera', camera);
scene.add(camera);

controls.minPolarAngle = 0; // radians
controls.maxPolarAngle = Math.PI / 2; // radians

controls.enableDamping = true;
controls.dampingFactor = 0.5;

renderCalls.push(function () {
    controls.update()
});
function renderScene() { renderer.render(scene, camera); }
renderCalls.push(renderScene);

var loader: GLTFLoader = new GLTFLoader();
//var loader = new THREE.FBXLoader();
// loader.crossOrigin = true;
loader.load('/wp-content/uploads/animation/animation.gltf', function (gltf) {
    // console.log('gltf', gltf);
    clock = new THREE.Clock();
    // gltf.animations; // Array<THREE.AnimationClip>
    // gltf.scene; // THREE.Group
    // gltf.scenes; // Array<THREE.Group>
    // gltf.cameras; // Array<THREE.Camera>
    // gltf.asset; // Object
    mixer = new THREE.AnimationMixer(gltf.scene);
    gltf.animations.forEach((clip) => {
        // console.log('clip', clip);
        mixer.clipAction(clip).play();
    });
    // document.querySelector("#animation video")?.classList.remove("d-none");
    scene.add(gltf.scene);
    renderer.physicallyCorrectLights = true
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
    const button1 = document.querySelector("#camera-getposition-button")
    button1 && button1.addEventListener('click', (e) => {
        console.log('e', camera.position);
    }, false);

    const button3 = document.querySelector("#hide_overlay")
    button3 && button3.addEventListener('click', (e) => {
        console.log('e', camera.position);
        document.querySelector("#animation video")?.classList.toggle("d-none");
    }, false);

    const camera4 = document.querySelector("#camera-reset-face-button")
    camera4 && camera4.addEventListener('click', function (event) {
        event.preventDefault();
        camera.position.set(-0.005965521933062601, 1.519582946590508, 2.089809912013327);
    })
    const camera2 = document.querySelector("#camera-reset-button")
    let mouse: any
    camera2 && camera2.addEventListener('click', function (event) {
        event.preventDefault();
        const coords: any = { x: -0.15068312198864986, y: 0.8484002343428817, z: -9.961277192854826 }
        // camera.position.set(-0.15068312198864986, 0.8484002343428817, -9.961277192854826);
        camera.lookAt(coords);
        new TWEEN.Tween(coords)
            .to({ x: coords.x, y: coords.y })
            .onUpdate(() =>
                camera.position.set(coords.x, coords.y, camera.position.z)
            )
            .start();
        //TODO camera sometimes not reseting
        // controls.autoRotate = false
        // setTimeout(() => {
        //     controls.autoRotate = true
        // }, 3000);
        // mouse.x = ((event as any).clientX / window.innerWidth) * 2 - 1;
        // mouse.y = - ((event as any).clientY / window.innerHeight) * 2 + 1;
        // raycaster.setFromCamera(mouse, camera);
        // var intersects = raycaster.intersectObjects(scene.children, true);
        // if (intersects.length > 0) {
        //     // console.log('Intersection:', intersects[0]);
        //     // newPosition.x = Math.cos(800);
        //     // newPosition.z = Math.sin(800);
        //     // camera.lookAt(newPosition);
        //     // camera.position.copy(newPosition);
        //     renderer.render(scene, camera);
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
export { camera }