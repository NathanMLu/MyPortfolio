let scene, camera, renderer, loader, sizes;
let material, geometry;
let sphere;
let bubbles = [];

/* FOR DEBUG ONLY, REMOVE AFTER */
let controls;

function init() {
    darkMode();

    sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(0, 0, 2);
    scene.add(camera)

    // Point Light (shadows)
    const pointLight = new THREE.PointLight(0xffffff, 0.1);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    // Main Light
    const ambientLight = new THREE.AmbientLight();
    scene.add(ambientLight);

    // Background Image
    scene.background = new THREE.Color(0xecede8);

    // Renderer
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg')
    });
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Load 3d models
    loader = new THREE.GLTFLoader();
    loadModels();


    //const lightHelper = new THREE.PointLightHelper(pointLight)
    //const gridHelper = new THREE.GridHelper(200, 50);
    //scene.add(lightHelper, gridHelper)

    //const axesHelper = new THREE.AxesHelper(5);
    //scene.add(axesHelper);
}

function onWindowResize() {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
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

    Promise.all([loadAsync('resources/models/desk/scene.gltf')]).then(models => {
        //initModels(models);
        start();
    })

     */
    start();
}

function initModels(models) {
    /*
    desk = models[0].scene;
    desk.scale.set(1, 1, 1);
    desk.position.set(0, 0, 0);
    desk.rotation.set(0, -Math.PI/2, 0);
    scene.add(desk);

     */
}

function initObjects(){
    geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
    material = new THREE.MeshBasicMaterial()

    material.color = new THREE.Color(0xff0000)

    sphere = new THREE.Mesh(geometry,material)
    scene.add(sphere)
}

function updateScroll() {
    const t = document.body.getBoundingClientRect().top;

    camera.position.y = (t * 0.03);
}

function updateObjects(elapsedTime) {
    sphere.rotation.y = .5 * elapsedTime
}


window.addEventListener('resize', onWindowResize);
document.body.onscroll = updateScroll;

function start() {
    //scrollHandler();
    //createBubbles();
    initObjects();
    animate();
}

// Game Loop
const clock = new THREE.Clock()
function animate() {
    const elapsedTime = clock.getElapsedTime()

    updateObjects(elapsedTime);

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
}

/* For scrolling to location */
$("#about").click(function () {
    $('html, body').animate({
        scrollTop: $(".about").offset().top
    }, 2000);
});

$("#projects").click(function () {
    $('html, body').animate({
        scrollTop: $(".projects").offset().top
    }, 2000);
});

$("#contact").click(function () {
    $('html, body').animate({
        scrollTop: $(".contact").offset().top
    }, 2000);
});

$(".contact_me").click(function () {
    $('html, body').animate({
        scrollTop: $(".contact").offset().top
    }, 2000);
});

let scrolldown = document.querySelector(".scroll-down p");
$(window).scroll(function () {
    if ($(window).scrollTop() == 0)
        scrolldown.innerHTML = "SCROLL DOWN";
    else if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        scrolldown.innerHTML = "SCROLL UP";
    }
});

/* Handles dark mode */
function darkMode() {
    let my_logo = document.getElementById("my_logo");
    let dark = document.getElementById("dark");
    dark.checked = false;

    dark.addEventListener('change', function () {
        if (this.checked) {
            // Dark Color
            my_logo.src = "/dark.svg";
            scene.background = new THREE.Color(0x2E383F);

            // Swaps Colors
            let temp = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
            document.documentElement.style.setProperty('--background-color', getComputedStyle(document.documentElement).getPropertyValue('--dark-color'));
            document.documentElement.style.setProperty('--dark-color', temp);


        } else {
            // Light Color
            my_logo.src = "/favicon.svg";
            scene.background = new THREE.Color(0xecede8);

            // Swaps Colors
            let temp = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
            document.documentElement.style.setProperty('--background-color', getComputedStyle(document.documentElement).getPropertyValue('--dark-color'));
            document.documentElement.style.setProperty('--dark-color', temp);
        }
    });
}

init();