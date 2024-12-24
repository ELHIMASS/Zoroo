document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const ville = document.getElementById('depart').value;
    const permis = document.getElementById('permis').value;

    if (!ville) {
        alert('Veuillez indiquer votre ville de départ.');
    } else {
        alert(`Recherche pour ${ville} avec permis ${permis}.`);
    }
});
