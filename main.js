import * as THREE from "three";
import gsap from "gsap/gsap-core";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {cameraPosition,cameraRotation,titles} from './constants'

const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x171d20);

const aspect = { width: window.innerWidth, height: window.innerHeight };

const camera = new THREE.PerspectiveCamera(50, aspect.width / aspect.height);
camera.position.set(100, 100, 100);
camera.rotation.set(0, 6.2, 0);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
const spotLight = new THREE.SpotLight(0x86e5e1, 11000, 200, 35);
const pointLight1 = new THREE.PointLight(0x86e5e1, 4800, 70);
const pointLight2 = new THREE.PointLight(0x86e5e1, 50, 10);
const pointLight3 = new THREE.PointLight(0x86e5e1, 40000, 400);
const pointLight4 = new THREE.PointLight(0x86e5e1, 300, 20);

spotLight.position.set(-4, 80, -70);
pointLight1.position.set(0, 23, 30);
pointLight2.position.set(0, 0, -49);
pointLight3.position.set(35, 125, -150);
pointLight4.position.set(-14, 14, -50);

scene.add(camera);
scene.add(ambientLight);
scene.add(spotLight);
scene.add(pointLight1);
scene.add(pointLight2);
scene.add(pointLight3);
scene.add(pointLight4);

const gltfLoader = new GLTFLoader();
gltfLoader.load("dragon.glb", (glb) => {
    scene.add(glb.scene);
});

const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);

window.addEventListener("resize", () => {
    aspect.width = window.innerWidth;
    aspect.height = window.innerHeight;
    
    camera.aspect = aspect.width / aspect.height;
    camera.updateProjectionMatrix();

    renderer.setSize(aspect.width, aspect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

let index = { index: 0 };

function changeView(change){
    index.index += change;
    if (index.index < 0) index.index = 12;
    else if (index.index > 12) index.index = 0;
    console.log(index.index);
    gsap.to(camera.position, {
        duration: 2,
        delay: 0,
        x: cameraPosition[index.index].x,
        y: cameraPosition[index.index].y,
        z: cameraPosition[index.index].z,
    });
    gsap.to(camera.rotation, {
        delay: 0,
        duration: 2,
        x: cameraRotation[index.index].x,
        y: cameraRotation[index.index].y,
        z: cameraRotation[index.index].z,
    });
    title.innerHTML = titles[index.index];
};

prev.addEventListener("click", () => {
    changeView(-1);
});

next.addEventListener("click", () => {
    changeView(1);
});

window.addEventListener("load", () => {
    changeView(0);
});

const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();
