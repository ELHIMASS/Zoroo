async function checkSession() {
    try {
        const response = await fetch('http://localhost/moto_loc/pageIdentification/isLoggedIn.php');
        const result = await response.json();

        // Récupération des éléments HTML
        const loginButton = document.getElementById('loginButton');
        const registerButton = document.getElementById('registerButton');
        const welcomeMessage = document.getElementById('welcomeMessage');
        const logoutButton = document.getElementById('logoutButton');

        if (result.loggedIn) {
            // Si connecté
            loginButton.style.display = 'none';
            registerButton.style.display = 'none';
            welcomeMessage.textContent = `Bienvenue, ${result.username}`;
            welcomeMessage.style.display = 'block';
            logoutButton.style.display = 'inline-block';
        } else {
            // Si non connecté
            loginButton.style.display = 'inline-block';
            registerButton.style.display = 'inline-block';
            welcomeMessage.style.display = 'none';
            logoutButton.style.display = 'none';
        }
    } catch (error) {
        console.error('Erreur lors de la vérification de la session :', error);
    }
}

async function logout() {
    try {
        const response = await fetch('http://localhost/moto_loc/pageIdentification/logout.php', {
            method: 'POST',
        });
        const result = await response.json();

        if (result.success) {
            alert('Déconnexion réussie');
            window.location.href = '../pageIdentification/index.html'; // Redirection vers la page de connexion
        }
    } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
    }
}

// Appeler la vérification de session au chargement
document.addEventListener('DOMContentLoaded', checkSession);
