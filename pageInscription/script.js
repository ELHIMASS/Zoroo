document.getElementById('registrationForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Récupérer les données du formulaire
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validation des mots de passe
    if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas.');
        return;
    }

    // Envoi des données au serveur
    try {
        const response = await fetch('http://127.0.0.1:5000/register', { // Remplacez l'URL par celle de votre API backend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Inscription réussie. Vous pouvez maintenant vous connecter.');
            window.location.href = '/pageConnexion.html'; // Redirection vers la page de connexion
        } else {
            alert(result.message || 'Une erreur est survenue.');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Impossible de se connecter au serveur.');
    }
});
