/* we make it
*/
document.addEventListener("DOMContentLoaded", () => {
    const motos = [
        { 
            id: 1,
            name: "Yamaha MT-07",
            images: [
                "../catalo/images/mt07.jpeg",
                "../catalo/images/mt071.jpg",
                "../catalo/images/mt072.jpeg",
                "../catalo/images/mt073.jpeg"
            ],
            type: "Sportif",
            link: "/descriptPage/descript.html?id=1"
        },

        { 
            id: 2,
            name: "Harley-Davidson V Rod",
            images: [
                "../catalo/images/harley01.jpg",
                "../catalo/images/harley02.jpg",
                "../catalo/images/harley03.jpg",
                "../catalo/images/harley04.jpg",
                "../catalo/images/harley05.jpg"
            ],
            type: "Cruiser",
            link: "/descriptPage/descript.html?id=2"
        },

        { 
            id: 3,
            name: "BMW F 450 GS",
            images: [
                "../catalo/images/bmw01.jpg",
                "../catalo/images/bmw02.jpg",
                "../catalo/images/bmw03.jpg"
            ],
            type: "Adventure",
            link: "/descriptPage/descript.html?id=3"
        },

        { 
            id: 4,
            name: "Honda X-ADV",
            images: [
                "../catalo/images/xadv01.jpg",
                "../catalo/images/xadv02.jpg",
                "../catalo/images/xadv03.jpg"
            ],
            type: "Scooter",
            link: "/descriptPage/descript.html?id=4"
        },

        { 
            id: 5,
            name: "Yamaha R1",
            images: [
                "../catalo/images/r01.jpg",
                "../catalo/images/r02.jpg",
                "../catalo/images/r03.jpg",
                "../catalo/images/r04.jpg",
                "../catalo/images/r05.jpg"
            ],
            type: "Sportif",
            link: "/descriptPage/descript.html?id=5"
        },


        { 
            id: 6,
            name: "Yamaha Tmax Tech Max",
            images: [
                "../catalo/images/tmax01.jpg",
                "../catalo/images/tmax02.jpg",
                "../catalo/images/tmax03.jpg",
                "../catalo/images/tmax04.jpg",
                "../catalo/images/tmax05.jpg"
            ],
            type: "Scooter",
            link: "/descriptPage/descript.html?id=6"
        },

        { 
            id: 7,
            name: "Quad électrique sportif",
            images: [
                "../catalo/images/q01.jpg",
                "../catalo/images/q02.jpg",
                "../catalo/images/q03.jpg"
            ],
            type: "Sportif",
            link: "/descriptPage/descript.html?id=7"
        },

        { 
            id: 8,
            name: "scooter BMW CE 04",
            images: [
                "../catalo/images/bmwe01.png",
                "../catalo/images/bmwe05.jpg",
                "../catalo/images/bmwe06.jpg",
                "../catalo/images/bmwe02.jpg",
                "../catalo/images/bmwe03.jpg",
                "../catalo/images/bmwe04.jpg",
                "../catalo/images/bmwe07.jpg"
            ],
            type: "Scooter",
            link: "/descriptPage/descript.html?id=8"
        },
    ];

    const motoGrid = document.querySelector(".moto-grid");
    const filterForm = document.querySelector("#filterForm");

  // Fonction pour afficher les motos
  const displayMotos = (filteredMotos) => {
    motoGrid.innerHTML = ""; // Vider la grille actuelle
    filteredMotos.forEach((moto) => {
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


document.querySelector("#filterForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Empêche la soumission classique
    const selectedType = document.querySelector("#type").value;
    if (selectedType) {
        window.location.href = `catalog.html?type=${selectedType}`;
    } else {
        alert("Veuillez sélectionner un type de moto.");
    }
});



// Lire les paramètres d'URL
const urlParams = new URLSearchParams(window.location.search);
const selectedType = urlParams.get("type"); // Récupérer le type sélectionné

// Filtrer les motos par type
if (selectedType) {
    const filteredMotos = motos.filter((moto) => moto.type === selectedType);
    displayMotos(filteredMotos);
} else {
    // Afficher toutes les motos si aucun filtre n'est appliqué
    displayMotos(motos);
}

});

