let scene, camera, renderer, loader;
let donut;
let desk;

/* FOR DEBUG ONLY, REMOVE AFTER */
let controls;

function init() {
    darkMode();

    // Camera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 300);
    camera.position.set(0, 0, 15);

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
    scene.background = new THREE.Color(0xecede8);

    // Renderer
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg')
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

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
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function loadModels() {

    const loadAsync = url => {
        return new Promise(resolve => {
            loader.load(url, gltf => {
                resolve(gltf);
            })
        })
    }

    Promise.all([loadAsync('resources/models/desk/scene.gltf')]).then(models => {
        initModels(models);
        start();
    })

}

function initModels(models) {
    desk = models[0].scene;
    desk.scale.set(1, 1, 1);
    desk.position.set(8, -2, 0);
    desk.rotation.set(0, -Math.PI/1.5, 0);
    scene.add(desk);


}

function updateObjects() {
    const t = document.body.getBoundingClientRect().top;

    camera.position.y = (t * 0.03);
}

function createDonut() {
    const geometry = new THREE.TorusGeometry(5, 2, 16, 100);
    const material = new THREE.MeshStandardMaterial({color: 0x468B95});
    donut = new THREE.Mesh(geometry, material);
    donut.position.set(0, 0, 0);
    scene.add(donut);
}

window.addEventListener('resize', onWindowResize);
document.body.onscroll = updateObjects;

/*
// Checks if document is being scrolled or not
function scrollHandler() {
    let timer;

    document.addEventListener("scroll", function () {
        if (timer != "undefined") {
            clearTimeout(timer);
        }

        // Scrolling
        //updateObjects();

        timer = setTimeout(function () {
            // Not scrolling

        }, 10);
    });
}

 */

function start() {
    //scrollHandler();
    //createDonut();
    animate();
}

// Game Loop
function animate() {
    //donut.rotation.x += 0.01;
    //donut.rotation.y += 0.01;
    //controls.update();

    let timer = Date.now() * 0.01;

    requestAnimationFrame(animate);

    renderer.render(scene, camera);
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