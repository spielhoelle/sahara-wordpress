const backgroundColor = 0x000000;
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
var newPosition = new THREE.Vector3();
let mixer, clock


/*////////////////////////////////////////*/

var renderCalls = [];
function render() {
	if (mixer) mixer.update(clock.getDelta());
	requestAnimationFrame(render);
	renderCalls.forEach((callback) => {
		callback();
	});
}
render();

/*////////////////////////////////////////*/

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(40, window.innerWidth / (window.innerHeight), 1, 80);
camera.position.set(5, -600, 5);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight - 32);
renderer.setClearColor(backgroundColor);//0x );
var vector = camera.position.clone();

renderer.toneMapping = THREE.LinearToneMapping;
renderer.toneMappingExposure = Math.pow(0.94, 5.0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

window.addEventListener('resize', function () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectiOnMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

document.querySelector('#animation').appendChild(renderer.domElement);
// document.getElementById("animation").onwheel = function (event) {
// 	event.preventDefault();
// };

// document.getElementById("animation").onmousewheel = function (event) {
// 	event.preventDefault();
// };
// Play a specific animation

function renderScene() { renderer.render(scene, camera); }
renderCalls.push(renderScene);


var controls = new THREE.OrbitControls(camera);

controls.rotateSpeed = 0.1;
controls.zoomSpeed = 0.9;

controls.minDistance = 0;
controls.maxDistance = 10;
camera.position.distanceTo(10);
scene.add(camera);


controls.minPolarAngle = 0; // radians
controls.maxPolarAngle = Math.PI / 2; // radians

controls.enableDamping = true;
controls.dampingFactor = 0.05;
// controls.autoRotate = true
// controls.autoRotateSpeed = 0.2
renderCalls.push(function () {
	controls.update()
});



// var light = new THREE.PointLight(0xffffcc, 1, 10);
// light.position.set(4, 30, -20);
// scene.add(light);

var light2 = new THREE.AmbientLight(0xffffcc, 1);
light2.position.set(30, -10, 30);
scene.add(light2);



var loader = new THREE.GLTFLoader();
//var loader = new THREE.FBXLoader();
loader.crossOrigin = true;
loader.load('wp-content/themes/twentytwentytwo-child/animation/TIMEMACHINE7.gltf', function (gltf) {

	clock = new THREE.Clock();



	// gltf.animaVjtions; // Array<THREE.AnimationClip>
	// gltf.scene; // THREE.Group
	// gltf.scenes; // Array<THREE.Group>
	// gltf.cameras; // Array<THREE.Camera>
	// gltf.asset; // Object
	mixer = new THREE.AnimationMixer(gltf.scene);


	gltf.animations.forEach((clip) => {
		// console.log('clip', clip);
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

	document.querySelector("#camera-getposition-button").addEventListener('click', (e) => {
		console.log('e', camera.position);
	}, false);

	document.querySelector("#camera-reset-button").addEventListener('click', function (event) {
		event.preventDefault();

		//TODO camera sometimes not reseting
		controls.autoRotate = false
		setTimeout(() => {
			controls.autoRotate = true
		}, 3000);

		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

		raycaster.setFromCamera(mouse, camera);

		var intersects = raycaster.intersectObjects(scene.children, true);

		if (intersects.length > 0) {
			// console.log('Intersection:', intersects[0]);

			// newPosition.x = Math.cos(800);
			// newPosition.z = Math.sin(800);

			// camera.lookAt(newPosition);

			// camera.position.copy(newPosition);

			renderer.render(scene, camera);
		}

	}, false);

	// , onProgress, onError );
}, undefined, function (e) {
	console.log("Error in loading")
	console.error(e);

});
