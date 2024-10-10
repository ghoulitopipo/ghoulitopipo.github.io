// Variables pour la scène 3D
let scene, camera, renderer;
let player, floor;

// Variables pour les mouvements
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let canJump = false;
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
let playerSpeed = 5;
let gravity = 9.8;
let isMouseLocked = false;

const clock = new THREE.Clock(); // Pour gérer le temps

// Initialisation de la scène
function init() {
    scene = new THREE.Scene();

    // Caméra - ajustement pour simuler la vision humaine
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.fov = 90;  // Champ de vision modifié pour 90 degrés
    camera.updateProjectionMatrix();  // Met à jour la matrice de projection après changement de FOV
    camera.position.y = 1.6;  // Hauteur de la caméra, à environ 1,6 mètres (hauteur moyenne des yeux humains)

    // Rendu
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Lumière
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 100, 100).normalize();
    scene.add(light);

    // Sol
    const floorGeometry = new THREE.PlaneGeometry(200, 200);
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Joueur (boîte invisible)
    const playerGeometry = new THREE.BoxGeometry(1, 2, 1);
    const playerMaterial = new THREE.MeshBasicMaterial({ visible: false });
    player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.y = 1;  // Le joueur doit être au-dessus du sol
    scene.add(player);

    // Contrôle de la souris
    document.addEventListener('click', () => {
        if (!isMouseLocked) {
            document.body.requestPointerLock();
        }
    });

    // Mouvement de la souris
    document.addEventListener('mousemove', onMouseMove, false);

    // Contrôles clavier
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

    animate();
}

// Gestion de la souris pour bouger la caméra
function onMouseMove(event) {
    if (isMouseLocked) {

        var movementY = (event.movementY * Math.PI * cameraSensitivity) / 180;
        var movementX = (event.movementX * Math.PI * cameraSensitivity) / 180;

        camera.rotateOnWorldAxis(new THREE.Vector3(0, 1,0), THREE.Math.degToRad(50*movementX));
        camera.rotateX(movementY);
        
        //camera.rotation.y -= event.movementX * 0.002;
        //camera.rotation.x -= event.movementY * 0.002;

        // Limiter la rotation sur l'axe vertical
        //camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
        //camera.rotation.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.y));
    }
}

document.addEventListener('pointerlockchange', () => {
    isMouseLocked = !!document.pointerLockElement;
});

// Gestion du clavier
function onKeyDown(event) {
    switch (event.code) {
        case 'KeyW':
            moveForward = true;
            break;
        case 'KeyA':
            moveLeft = true;
            break;
        case 'KeyS':
            moveBackward = true;
            break;
        case 'KeyD':
            moveRight = true;
            break;
        case 'Space':
            if (canJump) {
                velocity.y += 5;  // Force du saut
                canJump = false;
            }
            break;
    }
}

function onKeyUp(event) {
    switch (event.code) {
        case 'KeyW':
            moveForward = false;
            break;
        case 'KeyA':
            moveLeft = false;
            break;
        case 'KeyS':
            moveBackward = false;
            break;
        case 'KeyD':
            moveRight = false;
            break;
    }
}

// Animation du joueur et de la caméra
function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;
    velocity.y -= gravity * delta;  // Appliquer la gravité

    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveLeft) - Number(moveRight);
    direction.normalize(); // Normaliser pour ne pas avoir de vitesse supérieure en diagonale

    if (moveForward || moveBackward) velocity.z -= direction.z * playerSpeed * delta;
    if (moveLeft || moveRight) velocity.x -= direction.x * playerSpeed * delta;

    // Appliquer le mouvement au joueur
    player.position.x += velocity.x;
    player.position.z += velocity.z;

    // Vérifier si le joueur touche le sol
    if (player.position.y <= 1) {
        velocity.y = 0;
        player.position.y = 1;
        canJump = true;
    } else {
        player.position.y += velocity.y * delta;
    }

    // Synchroniser la caméra avec le joueur
    camera.position.copy(player.position);

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Lancer le jeu
init();
