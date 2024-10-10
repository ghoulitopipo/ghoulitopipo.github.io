// camera.js
import * as THREE from 'three';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'; // Importation de l'extension pour contrôle

export function createCamera(renderer) {
    // Création de la caméra perspective
    const camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
    );
    camera.position.set(0, 10, 50); // Position initiale de la caméra

    // Création du contrôleur en première personne
    const controls = new FirstPersonControls(camera, renderer.domElement);
    controls.movementSpeed = 20; // Vitesse de déplacement
    controls.lookSpeed = 0.1; // Vitesse de rotation (vue)

    return { camera, controls };
}
