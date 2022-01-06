let scene, camera, renderer, loader, sizes, mouse;
let material, geometry, texture, normal;
let sphere, mousepos;
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
    camera = new THREE.PerspectiveCamera(30, sizes.width / sizes.height, 1, 100);
    camera.position.set(0, 0, 10);
    scene.add(camera)

    // Point Light (shadows)
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(0, 0, 0);
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
    const gridHelper = new THREE.GridHelper(200, 50);
    scene.add(gridHelper)

    mouse = {
        x:0,
        y:0
    };

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
    geometry = new THREE.TorusKnotGeometry(1, 0.3, 200, 25);
    //texture = new THREE.TextureLoader().load('resources/textures/cube.jpg');
    //normal = new THREE.TextureLoader().load('resources/textures/cube_normal.png');
    material = new THREE.MeshStandardMaterial({
        color: 0x04adf6,
        metalness: 0.7,
        flatShading: true,
        roughness: 0
    });
    sphere = new THREE.Mesh(geometry,material)
    sphere.position.set(0,0,0);

    scene.add(sphere)
}

function updateScroll() {
    const t = document.body.getBoundingClientRect().top;

    sphere.rotation.y = 0.002 * t
}

function updateObjects(elapsedTime) {
    //sphere.rotation.y = .5 * elapsedTime
}

function move(mesh, speed) {
    let d = mesh.position.x - mesh2.position.x;
    if (mesh.position.x > mesh2.position.x) {
        mesh.position.x -= Math.min(speed, d);
    }
}

document.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    vector.unproject( camera );
    const dir = vector.sub( camera.position ).normalize();
    const distance = - camera.position.z / dir.z;
    mousepos = camera.position.clone().add( dir.multiplyScalar( distance ) );

    //console.log(pos)

    sphere.position.copy(mousepos);
});

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

/* For user mouse position */


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