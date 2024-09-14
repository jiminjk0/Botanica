// Load the current plant from localStorage
const plant = JSON.parse(localStorage.getItem('currentPlant'));

if (plant) {
    // Update the plant details on the page
    document.getElementById('plant-name').textContent = plant.name;
    document.getElementById('scientific-name').textContent = plant.scientificName;
    document.getElementById('family').textContent = plant.family;
    document.getElementById('region').textContent = plant.region;
    document.getElementById('usage').textContent = plant.usage;
    document.getElementById('benefits').textContent = plant.benefits;

    const bookmarkButton = document.getElementById('bookmark-button');
    const notesTextarea = document.getElementById('notes-textarea');

    // Handle bookmarking
    bookmarkButton.addEventListener('click', () => {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        if (!bookmarks.some(b => b.id === plant.id)) {
            bookmarks.push(plant);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            alert('Plant bookmarked!');
        } else {
            alert('Plant already bookmarked.');
        }
    });

    // Handle notes saving
    document.getElementById('save-notes-button').addEventListener('click', () => {
        const notes = notesTextarea.value;
        let savedNotes = JSON.parse(localStorage.getItem('notes')) || {};
        savedNotes[plant.id] = notes;
        localStorage.setItem('notes', JSON.stringify(savedNotes));
        alert('Notes saved!');
    });

    // Load existing notes for this plant
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || {};
    notesTextarea.value = savedNotes[plant.id] || '';

    // 3D Model Viewer using Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, 400);
    document.getElementById('3d-viewer').appendChild(renderer.domElement);

    // Add lighting to the scene
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 1).normalize();
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);

    // Create a simple box geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Position the camera
    camera.position.z = 5;

    // Animate the box
    const animate = function () {
        requestAnimationFrame(animate);

        // Add rotation to the cube
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    };

    animate();
}


