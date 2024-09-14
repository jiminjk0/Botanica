
// Mock plant data for demonstration
const plants = [
    {
        id: 1,
        name: "Tulsi",
        scientificName: "Ocimum tenuiflorum",
        region: "Asia",
        usage: "Medicinal",
        benefits: "Anti-inflammatory",
        imageUrl: "tulsi.jpg"
    },
    {
        id: 2,
        name: "Neem",
        scientificName: "Azadirachta indica",
        region: "India",
        usage: "Medicinal",
        benefits: "Antibacterial, Antiviral",
        imageUrl: "neem.jpg"
    },
    {
        id: 3,
        name: "Aloe Vera",
        scientificName: "Aloe barbadensis miller",
        region: "Africa",
        usage: "Medicinal",
        benefits: "Skin Healing, Digestive Aid",
        imageUrl: "aloe-vera.jpeg"
    },
    {
        id: 4,
        name: "Ashwagandha",
        scientificName: "Withania somnifera",
        region: "India",
        usage: "Medicinal",
        benefits: "Stress Relief, Immune Support",
        imageUrl: "Ashwagandha.jpeg"
    },
    {
        id: 5,
        name: "Turmeric",
        scientificName: "Curcuma longa",
        region: "Southeast Asia",
        usage: "Medicinal",
        benefits: "Anti-inflammatory, Antioxidant",
        imageUrl: "Turmeric.jpg"
    },
    {
        id: 6,
        name: "Ginger",
        scientificName: "Zingiber officinale",
        region: "Southeast Asia",
        usage: "Medicinal",
        benefits: "Digestive Aid, Anti-nausea",
        imageUrl: "ginger.jpg"
    },
    {
        id: 7,
        name: "Peppermint",
        scientificName: "Mentha piperita",
        region: "Europe",
        usage: "Medicinal",
        benefits: "Digestive Aid, Respiratory Relief",
        imageUrl: "plant/peppermint.jpeg"
    },
    {
        id: 8,
        name: "Lavender",
        scientificName: "Lavandula angustifolia",
        region: "Mediterranean",
        usage: "Medicinal",
        benefits: "Relaxation, Skin Healing",
        imageUrl: "plant/Lavender.jpg"
    },
    {
        id: 9,
        name: "Thyme",
        scientificName: "Thymus vulgaris",
        region: "Mediterranean",
        usage: "Medicinal",
        benefits: "Respiratory Health, Antibacterial",
        imageUrl: "plant/Thyme.jpg"

    },
    {
        id: 10,
        name: "Echinacea",
        scientificName: "Echinacea purpurea",
        region: "North America",
        usage: "Medicinal",
        benefits: "Immune Boost, Cold Prevention",
        imageUrl: "plant/Echinacea.jpg"
    },
    
   
   
    
    
    
    

    // Add more plant objects as needed
];

// Function to display plant cards
function displayPlants(plantList) {
    const plantContainer = document.getElementById('plant-container');
    plantContainer.innerHTML = ''; // Clear previous content

    if (plantList.length === 0) {
        plantContainer.innerHTML = '<p>No plants found!</p>';
    } else {
        plantList.forEach(plant => {
            const plantCard = document.createElement('div');
            plantCard.className = 'plant-card';
            plantCard.innerHTML = `
                <img src="${plant.imageUrl}" alt="${plant.name}" class="plant-img">
                <p>${plant.name}</p>
            `;
            plantCard.addEventListener('click', () => viewPlant(plant.id));
            plantContainer.appendChild(plantCard);
        });
    }
}

// Function to view plant details (simulating page navigation)
function viewPlant(id) {
    const plant = plants.find(p => p.id === id);
    if (plant) {
        localStorage.setItem('currentPlant', JSON.stringify(plant));
        window.location.href = 'plant.html'; // Redirect to detailed plant page
    }
}

// Function to handle search and filter
function searchPlants() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const selectedRegion = document.getElementById('filter-region').value;
    const selectedUsage = document.getElementById('filter-usage').value;
    const selectedBenefits = document.getElementById('filter-benefits').value;

    const filteredPlants = plants.filter(plant => {
        return (
            (searchTerm === '' || plant.name.toLowerCase().includes(searchTerm)) &&
            (selectedRegion === '' || plant.region === selectedRegion) &&
            (selectedUsage === '' || plant.usage === selectedUsage) &&
            (selectedBenefits === '' || plant.benefits === selectedBenefits)
        );
    });

    displayPlants(filteredPlants);
}

// Initial display of all plants
displayPlants(plants);

// Event listener for search functionality
document.getElementById('search-filter-form').addEventListener('submit', function(event) {
    event.preventDefault();
    searchPlants();
});
