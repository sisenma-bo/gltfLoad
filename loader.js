import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import modelUrl from "./magicalmirai2022_test02.glb";

const windowWidth=window.innerWidth;
const windowHeight=window.innerHeight;

const canvas=document.getElementById('canvas');
//rendererの諸設定
const renderer=new THREE.WebGLRenderer({
    canvas:canvas,
    antialias:true
});
renderer.setSize(windowWidth,windowHeight);
renderer.setPixelRatio(window.devicePixelRatio);
const scene=new THREE.Scene();

scene.background=new THREE.Color('#555555');

let gridHelper=new THREE.GridHelper();
scene.add(gridHelper);

const camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 0.1, 1000);
camera.position.set(5, 2, 0);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);

const loader=new GLTFLoader();
loader.load(modelUrl, function (gltf) {
    const model = gltf.scene;
    model.scale.set(1, 1, 1);
    scene.add(model);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

const al=new THREE.AmbientLight("#ffffff",1.0);
const dl=new THREE.DirectionalLight("#ffffff",10,0);
scene.add(al);
scene.add(dl);
// アニメーション実行
animate();

window.addEventListener('resize',()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.render(scene,camera);
})