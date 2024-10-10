// Importer THREE.js
import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

// Variables globales pour la scène, la caméra, le renderer, et les contrôles de déplacement
let scene, camera, renderer;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
const speed = 0.1; // Vitesse de déplacement

// Variables pour le contrôle de la souris
let pitchObject, yawObject;
let mouseSensitivity = 0.002; // Sensibilité de la souris

// Fonction d'initialisation
function init() {
    // Créer la scène
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Fond noir pour l'ambiance horreur

    // Créer la caméra (vue à la première personne)
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Création de deux objets pour séparer les rotations verticale (pitch) et horizontale (yaw)
    pitchObject = new THREE.Object3D();
    pitchObject.add(camera);
    
    yawObject = new THREE.Object3D();
    yawObject.position.set(0, 1.6, 5);  // Hauteur caméra
    yawObject.add(pitchObject);
    
    scene.add(yawObject); // Ajouter l'objet racine à la scène

    // Créer le renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Ajouter un sol
    const floorGeometry = new THREE.PlaneGeometry(100, 100);
    const floorMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2; // Le sol doit être horizontal
    scene.add(floor);

    // Ajouter une lumière pour l'ambiance
    const ambientLight = new THREE.AmbientLight(0x404040, 1); // lumière faible
    scene.add(ambientLight);

    const spotlight = new THREE.SpotLight(0xffffff, 1);
    spotlight.position.set(0, 10, 0);
    spotlight.castShadow = true;
    scene.add(spotlight);

    // Activer le verrouillage du pointeur (Pointer Lock)
    document.addEventListener('click', () => {
        document.body.requestPointerLock();
    });
    document.addEventListener('pointerlockchange', onPointerLockChange);
    document.addEventListener('mousemove', onMouseMove);

    // Ajouter des événements pour les touches
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    // Lancer la boucle d'animation
    animate();
}

// Gestion des touches pressées
function onKeyDown(event) {
    switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
            moveForward = true;
            break;
        case 'KeyA':
        case 'ArrowLeft':
            moveRight = true;
            break;
        case 'KeyS':
        case 'ArrowDown':
            moveBackward = true;
            break;
        case 'KeyD':
        case 'ArrowRight':
            moveLeft = true;
            break;
    }
}

// Gestion des touches relâchées
function onKeyUp(event) {
    switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
            moveForward = false;
            break;
        case 'KeyA':
        case 'ArrowLeft':
            moveRight = false;
            break;
        case 'KeyS':
        case 'ArrowDown':
            moveBackward = false;
            break;
        case 'KeyD':
        case 'ArrowRight':
            moveLeft = false;
            break;
    }
}

// Fonction pour gérer les mouvements de la souris
function onMouseMove(event) {
    if (document.pointerLockElement === document.body) {
        // Faire tourner l'objet 'yawObject' (horizontalement) avec mouvement en X
        yawObject.rotation.y -= event.movementX * mouseSensitivity;

        // Faire tourner l'objet 'pitchObject' (verticalement) avec mouvement en Y
        pitchObject.rotation.x -= event.movementY * mouseSensitivity;
        
        // Limiter la rotation de la caméra pour éviter de regarder complètement en haut ou en bas
        pitchObject.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitchObject.rotation.x));
    }
}

// Gestion du changement d'état du verrouillage du pointeur
function onPointerLockChange() {
    if (document.pointerLockElement !== document.body) {
        console.log('Le pointeur a été libéré');
    }
}

// Boucle d'animation pour mettre à jour la scène à chaque frame
function animate() {
    requestAnimationFrame(animate);

    // Gérer les mouvements de la caméra
    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize(); // Pour éviter que la diagonale soit plus rapide

    if (moveForward || moveBackward) velocity.z -= direction.z * speed * 0.1;
    if (moveLeft || moveRight) velocity.x -= direction.x * speed * 0.1;

    // Appliquer le mouvement à la caméra
    yawObject.translateX(velocity.x);
    yawObject.translateZ(velocity.z);
    
    // Décélération (friction)
    velocity.multiplyScalar(0.9);

    renderer.render(scene, camera);
}

// Ajuster la taille du renderer si la fenêtre est redimensionnée
window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Appeler la fonction init pour démarrer
init();
