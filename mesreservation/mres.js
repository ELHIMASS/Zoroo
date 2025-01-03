document.addEventListener("DOMContentLoaded", function () {
    const reservationList = document.getElementById("reservation-list");

    // Récupérer les réservations depuis localStorage
    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];

    if (reservations.length === 0) {
        // Si aucune réservation n'existe
        reservationList.innerHTML = `<p class="text-center">Vous n'avez aucune réservation pour le moment.</p>`;
        return;
    }

    // Trier les réservations par date de début
    reservations.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

    // Afficher chaque réservation
    reservations.forEach(reservation => {
        const card = document.createElement("div");
        card.classList.add("reservation-card");
        card.innerHTML = `
            <h4>Moto : ${getMotoName(reservation.moto)}</h4>
            <p><strong>Nom :</strong> ${reservation.name}</p>
            <p><strong>Email :</strong> ${reservation.email}</p>
            <p><strong>Date de début :</strong> ${reservation.startDate}</p>
            <p><strong>Date de fin :</strong> ${reservation.endDate}</p>
        `;
        reservationList.appendChild(card);
    });
});

// Fonction pour obtenir le nom de la moto à partir de son ID
function getMotoName(id) {
    const motos = {
        "1": "Yamaha MT-07",
        "2": "Harley-Davidson V Rod",
        "3": "BMW F 450 GS"
    };
    return motos[id] || "Moto inconnue";
}
