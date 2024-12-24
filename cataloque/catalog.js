/* we make it
*/
document.addEventListener("DOMContentLoaded", () => {
    const motos = [
        { 
            id: 1,
            name: "Yamaha MT-07",
            type: "Sportif",
            images: [
                "../catalo/images/mt07.jpeg",
                "../catalo/images/mt071.jpg",
                "../catalo/images/mt072.jpeg",
                "../catalo/images/mt073.jpeg"
            ],
            link: "../descriptPage/descript.html?id=1"
        },

        { 
            id: 2,
            name: "Harley-Davidson V Rod",
            type: "Cruiser",
            images: [
                "../catalo/images/harley01.jpg",
                "../catalo/images/harley02.jpg",
                "../catalo/images/harley03.jpg",
                "../catalo/images/harley04.jpg",
                "../catalo/images/harley05.jpg"
            ],
             link: "../descriptPage/descript.html?id=2"
        },

        { 
            id: 3,
            name: "BMW F 450 GS",
            type: "Adventure",
            images: [
                "../catalo/images/bmw01.jpg",
                "../catalo/images/bmw02.jpg",
                "../catalo/images/bmw03.jpg"
            ],
             link: "../descriptPage/descript.html?id=3"
        },

        { 
            id: 4,
            name: "Honda X-ADV",
            type: "Scooter",
            images: [
                "../catalo/images/xadv01.jpg",
                "../catalo/images/xadv02.jpg",
                "../catalo/images/xadv03.jpg"
            ],
             link: "../descriptPage/descript.html?id=4"
        },

        { 
            id: 5,
            name: "Yamaha R1",
            type: "Sportif",
            images: [
                "../catalo/images/r01.jpg",
                "../catalo/images/r02.jpg",
                "../catalo/images/r03.jpg",
                "../catalo/images/r04.jpg",
                "../catalo/images/r05.jpg"
            ],
             link: "../descriptPage/descript.html?id=5"
        },


        { 
            id: 6,
            name: "Yamaha Tmax Tech Max",
            type: "Scooter",
            images: [
                "../catalo/images/tmax01.jpg",
                "../catalo/images/tmax02.jpg",
                "../catalo/images/tmax03.jpg",
                "../catalo/images/tmax04.jpg",
                "../catalo/images/tmax05.jpg"
            ],
             link: "../descriptPage/descript.html?id=6"
        },

        { 
            id: 7,
            name: "Quad électrique sportif",
            type: "Sportif",
            images: [
                "../catalo/images/q01.jpg",
                "../catalo/images/q02.jpg",
                "../catalo/images/q03.jpg"
            ],
             link: "../descriptPage/descript.html?id=7"
        },

        { 
            id: 8,
            name: "scooter BMW CE 04",
            type: "Scooter",
            images: [
                "../catalo/images/bmwe01.png",
                "../catalo/images/bmwe05.jpg",
                "../catalo/images/bmwe06.jpg",
                "../catalo/images/bmwe02.jpg",
                "../catalo/images/bmwe03.jpg",
                "../catalo/images/bmwe04.jpg",
                "../catalo/images/bmwe07.jpg"
            ],
             link: "../descriptPage/descript.html?id=8"
        },
    ];

    const motoGrid = document.querySelector(".moto-grid");

    const displayMoto = (moto) => {
        const motoCard = document.createElement("div");
        motoCard.classList.add("moto-card");
        motoCard.innerHTML = `
            <div class="image-container">
                <img src="${moto.images[0]}" alt="${moto.name}" class="main-image">
                
            </div>
            <div class="card-content">
                <h3>${moto.name}</h3>
            </div>
        `;

        let currentImageIndex = 0;
        const mainImage = motoCard.querySelector(".main-image");
        const prevBtn = motoCard.querySelector(".prev-btn");
        const nextBtn = motoCard.querySelector(".next-btn");

        

        // Encapsuler la carte dans un lien
        const motoLink = document.createElement("a");
        motoLink.href = moto.link; // Lien vers la page spécifique
        motoLink.classList.add("moto-link"); // Optionnel : pour un style spécifique
        motoLink.appendChild(motoCard);

        motoGrid.appendChild(motoLink);
    };

    motos.forEach(displayMoto);
});