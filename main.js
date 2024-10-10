// main.js
import * as THREE from 'three';
import { createCamera } from './camera.js';
import { createScene } from './scene.js';

let camera, scene, renderer, controls;

// Initialisation du jeu
function init() {
    // Création du renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // Activer les ombres
    document.body.appendChild(renderer.domElement);

    // Création de la scène
    scene = createScene();

    // Création de la caméra et des contrôles
    const { camera: cam, controls: ctrl } = createCamera(renderer);
    camera = cam;
    controls = ctrl;

    // Gérer le redimensionnement de la fenêtre
    window.addEventListener('resize', onWindowResize, false);

    // Lancer la boucle d'animation
    animate();
}

// Fonction pour ajuster la taille de la fenêtre
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Boucle d'animation
function animate() {
    requestAnimationFrame(animate);

    // Mise à jour des contrôles
    controls.update(1); // Le paramètre ici correspond à deltaTime

    // Rendu de la scène
    renderer.render(scene, camera);
}

// Appel de la fonction d'initialisation
init();
