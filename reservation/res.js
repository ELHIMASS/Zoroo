document.getElementById('reservationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupération des données
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const motoModel = document.getElementById('motoModel').value;
    const reservationDate = document.getElementById('reservationDate').value;
    const notes = document.getElementById('notes').value;

    // Vérification simple des champs
    if (!fullName || !email || !phone || !motoModel || !reservationDate) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
    }

    // Confirmation de la réservation
    alert(`Merci ${fullName}, votre réservation pour la ${motoModel} le ${reservationDate} a été prise en compte.`);
    this.reset(); // Réinitialise le formulaire
});
