import './style.css'

import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, loader;

function init() {

    // Camera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 300);
    camera.position.set(0, 50, 70);

    // Scene
    scene = new THREE.Scene();



    // Point Light (shadows)
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    // Main Light
    const ambientLight = new THREE.AmbientLight();
    scene.add(ambientLight);

    // Background Image
    //scene.background = new THREE.TextureLoader().load('resources/old.jpg');

    // Renderer
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg')
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Load 3d models
    loader = new GLTFLoader();
    loadModels();

    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function loadModels() {
    /*
        const loadAsync = url => {
            return new Promise(resolve => {
                loader.load(url, gltf => {
                    resolve(gltf);
                })
            })
        }

        Promise.all([loadAsync('')]).then(models => {
            initModels(models);

            start();
        })

         */
    start();
}

function start() {
    scrollHandler();

    animate();
}

function scrollHandler() {

    let timer;

    function moveCamera() {
        const t = document.body.getBoundingClientRect().top;

        // ADD UPDATES HERE

        // Updates camera
        camera.position.z = t * 0.05;
    }

    // Checks if document is being scrolled or not
    document.addEventListener("scroll", function () {
        if (timer != "undefined") {
            clearTimeout(timer);
        }

        // Scrolling
        moveCamera();

        timer = setTimeout(function () {
            console.log("Now they're not scrolling");
            // Not scrolling

        }, 100);
    });
}

function initModels(models){
    //EX:
    //drone = models[0].scene;
    //earth.position.set(7, 45, -200);
    //earth.scale.set(0.01, 0.01, 0.01);
    //scene.add(earth);
}

function updateObjects(){

}

// Game Loop
function animate() {

    let timer = Date.now() * 0.01;

    requestAnimationFrame(animate);

    // Update
    updateObjects();
    renderer.render(scene, camera);
}


init();