// Vérification de la session utilisateur
async function checkSession() {
    try {
        const response = await fetch('http://localhost/moto_loc/pageIdentification/isLoggedIn.php');
        const result = await response.json();

        // Sélection des éléments de navigation
        const loginButton = document.getElementById('loginButton');
        const registerButton = document.getElementById('registerButton');
        const welcomeMessage = document.getElementById('welcomeMessage');
        const logoutButton = document.getElementById('logoutButton');

        if (result.loggedIn) {
            // Masquer les boutons Connexion et Inscription
            if (loginButton) loginButton.style.display = 'none';
            if (registerButton) registerButton.style.display = 'none';

            // Afficher le message de bienvenue et le bouton Déconnexion
            if (welcomeMessage) {
                welcomeMessage.textContent = `Bienvenue, ${result.username}`;
                welcomeMessage.style.display = 'block';
            }
            if (logoutButton) logoutButton.style.display = 'inline-block';
        } else {
            // Afficher les boutons Connexion et Inscription si non connecté
            if (loginButton) loginButton.style.display = 'inline-block';
            if (registerButton) registerButton.style.display = 'inline-block';

            // Masquer le message de bienvenue et le bouton Déconnexion
            if (welcomeMessage) welcomeMessage.style.display = 'none';
            if (logoutButton) logoutButton.style.display = 'none';
        }
    } catch (error) {
        console.error('Erreur lors de la vérification de la session :', error);
    }
}

// Déconnexion de l'utilisateur
async function logout() {
    try {
        const response = await fetch('http://localhost/moto_loc/pageIdentification/logout.php', {
            method: 'POST',
        });
        const result = await response.json();

        if (result.success) {
            alert(result.message);
            window.location.reload(); // Recharge la page pour mettre à jour l'affichage
        }
    } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
    }
}

// Appeler checkSession() au chargement de la page
document.addEventListener('DOMContentLoaded', checkSession);
