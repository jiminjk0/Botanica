// Function to display notes for all plants
function displayNotes() {
    const notesContainer = document.getElementById('notes-container');
    const notes = JSON.parse(localStorage.getItem('notes')) || {};
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

    notesContainer.innerHTML = ''; // Clear previous content

    if (Object.keys(notes).length === 0) {
        notesContainer.innerHTML = '<p>No notes yet!</p>';
    } else {
        bookmarks.forEach(plant => {
            if (notes[plant.id]) {
                const noteCard = document.createElement('div');
                noteCard.className = 'note-card';
                noteCard.innerHTML = `
                    <div class="note-header">
                        <img src="${plant.imageUrl}" alt="${plant.name}" class="plant-image">
                        <div>
                            <h5>${plant.name}</h5>
                            <textarea class="form-control" id="note-${plant.id}">${notes[plant.id]}</textarea>
                            <button class="btn btn-primary save-note-button" data-id="${plant.id}">Save Note</button>
                        </div>
                    </div>
                `;
                notesContainer.appendChild(noteCard);
            }
        });

        // Add event listeners to all save buttons
        document.querySelectorAll('.save-note-button').forEach(button => {
            button.addEventListener('click', saveNote);
        });
    }
}

// Function to save edited notes
function saveNote(event) {
    const plantId = event.target.getAttribute('data-id');
    const notes = JSON.parse(localStorage.getItem('notes')) || {};
    const noteContent = document.getElementById(`note-${plantId}`).value;

    notes[plantId] = noteContent;
    localStorage.setItem('notes', JSON.stringify(notes));

    alert('Note saved!');
}

// Event listener for Notes button in the navbar
document.getElementById('notes-nav-button').addEventListener('click', function() {
    displayNotes();
});

// Ensure the notes display when the page loads
d
