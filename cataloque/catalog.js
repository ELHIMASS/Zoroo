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
        },

        { 
            id: 3,
            name: "BMW F 450 GS",
            images: [
                "../catalo/images/bmw01.jpg",
                "../catalo/images/bmw02.jpg",
                "../catalo/images/bmw03.jpg"
            ],
        },

        { 
            id: 4,
            name: "Honda X-ADV",
            images: [
                "../catalo/images/xadv01.jpg",
                "../catalo/images/xadv02.jpg",
                "../catalo/images/xadv03.jpg"
            ],
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
        },

        { 
            id: 7,
            name: "Quad électrique sportif",
            images: [
                "../catalo/images/q01.jpg",
                "../catalo/images/q02.jpg",
                "../catalo/images/q03.jpg"
            ],
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
        },
    ];

    const motoGrid = document.querySelector(".moto-grid");

    const displayMoto = (moto) => {
        const motoCard = document.createElement("div");
        motoCard.classList.add("moto-card");
        motoCard.innerHTML = `
            <div class="image-container">
                <img src="${moto.images[0]}" alt="${moto.name}" class="main-image">
                <button class="nav-btn prev-btn">❮</button>
                <button class="nav-btn next-btn">❯</button>
            </div>
            <div class="card-content">
                <h3>${moto.name}</h3>
            </div>
        `;

        let currentImageIndex = 0;
        const mainImage = motoCard.querySelector(".main-image");
        const prevBtn = motoCard.querySelector(".prev-btn");
        const nextBtn = motoCard.querySelector(".next-btn");

        prevBtn.addEventListener("click", () => {
            currentImageIndex = (currentImageIndex - 1 + moto.images.length) % moto.images.length;
            mainImage.src = moto.images[currentImageIndex];
        });

        nextBtn.addEventListener("click", () => {
            currentImageIndex = (currentImageIndex + 1) % moto.images.length;
            mainImage.src = moto.images[currentImageIndex];
        });

        motoGrid.appendChild(motoCard);
    };

    motos.forEach(displayMoto);
});
