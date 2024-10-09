// Initialisation de la scène, de la caméra et du rendu
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Création du sol
const floorGeometry = new THREE.PlaneGeometry(500, 500);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = - Math.PI / 2;
scene.add(floor);

// Ajouter une lumière
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 50, 50).normalize();
scene.add(light);

// Position de la caméra
camera.position.y = 5; // Hauteur de la caméra

// Variables pour les contrôles
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
const speed = 0.2;

// Écouter les événements du clavier
document.addEventListener('keydown', (event) => {
    if (event.key === 'w' || event.key === 'ArrowUp') moveForward = true;
    if (event.key === 's' || event.key === 'ArrowDown') moveBackward = true;
    if (event.key === 'a' || event.key === 'ArrowLeft') moveLeft = true;
    if (event.key === 'd' || event.key === 'ArrowRight') moveRight = true;
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'w' || event.key === 'ArrowUp') moveForward = false;
    if (event.key === 's' || event.key === 'ArrowDown') moveBackward = false;
    if (event.key === 'a' || event.key === 'ArrowLeft') moveLeft = false;
    if (event.key === 'd' || event.key === 'ArrowRight') moveRight = false;
});

// Fonction de mise à jour
function animate() {
    requestAnimationFrame(animate);

    if (moveForward) camera.position.z -= speed;
    if (moveBackward) camera.position.z += speed;
    if (moveLeft) camera.position.x -= speed;
    if (moveRight) camera.position.x += speed;

    renderer.render(scene, camera);
}

animate();

// Ajuster la taille du rendu quand la fenêtre est redimensionnée
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
