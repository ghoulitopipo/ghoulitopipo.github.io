// scene.js
import * as THREE from 'three';

export function createScene() {
    // Création de la scène
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Ciel bleu clair

    // Lumière ambiante
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
    scene.add(ambientLight);

    // Lumière directionnelle
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    // Ajout d'un sol
    const geometry = new THREE.PlaneGeometry(200, 200);
    const material = new THREE.MeshStandardMaterial({ color: 0x228B22 }); // Couleur verte
    const ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = -Math.PI / 2; // Pour placer le sol à l'horizontale
    ground.position.y = 0; // Position du sol
    ground.receiveShadow = true;
    scene.add(ground);

    return scene;
}
