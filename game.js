// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Spaceship (a cone)
const shipGeometry = new THREE.ConeGeometry(0.5, 1, 32);
const shipMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const ship = new THREE.Mesh(shipGeometry, shipMaterial);
scene.add(ship);

// Space station (a torus with a docking target)
const stationGeometry = new THREE.TorusGeometry(2, 0.2, 16, 100);
const stationMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
const station = new THREE.Mesh(stationGeometry, stationMaterial);
scene.add(station);

const dockGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const dockMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const dock = new THREE.Mesh(dockGeometry, dockMaterial);
dock.position.set(2, 0, 0);
station.add(dock);

// Position objects
ship.position.set(0, 0, 0);
station.position.z = -5;
camera.position.z = 5;

// Controls
const speed = 0.1;
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp': ship.position.y += speed; break;
        case 'ArrowDown': ship.position.y -= speed; break;
        case 'ArrowLeft': ship.position.x -= speed; break;
        case 'ArrowRight': ship.position.x += speed; break;
        case 'w': ship.position.z -= speed; break;
        case 's': ship.position.z += speed; break;
    }
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    station.rotation.y += 0.02; // Spin station
    const shipPos = ship.position;
    const dockPos = dock.getWorldPosition(new THREE.Vector3());
    if (shipPos.distanceTo(dockPos) < 0.7) {
        console.log("Docked Successfully!");
        station.rotation.y = 0; // Stop spinning
    }
    renderer.render(scene, camera);
}
animate();