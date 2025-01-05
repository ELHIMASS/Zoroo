document.addEventListener("DOMContentLoaded", () => {
    const motoGrid = document.querySelector(".moto-grid");
    const searchButton = document.querySelector("#searchButton");
    const typeSelect = document.querySelector("#type");
    const searchInput = document.querySelector("#searchInput");

    // Fonction pour afficher les motos
    const displayMotos = (motos) => {
        motoGrid.innerHTML = ""; // Vider la grille actuelle
        if (motos.length === 0) {
            motoGrid.innerHTML = "<p>Aucune moto ne correspond à votre recherche.</p>";
            return;
        }
        motos.forEach((moto) => {
            const motoCard = document.createElement("div");
            motoCard.classList.add("moto-card");
            motoCard.innerHTML = `
                <div class="image-container">
                    <img src="${moto.images[0]}" alt="${moto.name}" class="main-image">
                </div>
                <div class="card-content">
                    <h3>${moto.name}</h3>
                    <p>${moto.type}</p>
                </div>
            `;
            const motoLink = document.createElement("a");
            motoLink.href = moto.link;
            motoLink.appendChild(motoCard);
            motoGrid.appendChild(motoLink);
        });
    };

    // Charger les données JSON
    fetch("{{ url_for('static', filename='json/moto.json') }}")
        .then((response) => response.json())
        .then((data) => {
            // Récupérer les paramètres de l'URL
            const urlParams = new URLSearchParams(window.location.search);
            const typeParam = urlParams.get("type") || ""; // Paramètre "type"

            // Si un type est spécifié dans l'URL, filtrer les motos par ce type
            const filteredMotos = typeParam 
                ? data.filter((moto) => moto.type.toLowerCase() === typeParam.toLowerCase()) 
                : data;

            // Afficher les motos (filtrées ou non)
            displayMotos(filteredMotos);

            // Remplir le champ de sélection avec la valeur du type de l'URL, si présente
            if (typeParam) {
                typeSelect.value = typeParam;
            }

            // Gérer la recherche lorsque l'utilisateur clique sur le bouton "Rechercher"
            searchButton.addEventListener("click", () => {
                const selectedType = typeSelect.value; // Type sélectionné
                const searchQuery = searchInput.value.toLowerCase(); // Mot-clé

                // Filtrer les motos par type et mot-clé
                const filteredMotos = data.filter((moto) => {
                    const matchesType = selectedType === "" || moto.type === selectedType;
                    const matchesQuery = searchQuery === "" || moto.name.toLowerCase().includes(searchQuery);
                    return matchesType && matchesQuery;
                });

                // Afficher les résultats filtrés
                displayMotos(filteredMotos);
            });
        })
        .catch((error) => console.error("Erreur lors du chargement des données JSON :", error));
});