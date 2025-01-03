document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    // Afficher les données envoyées
    console.log('Tentative de connexion avec:', { username });

    try {
        // Vérifier l'URL de l'API
        const apiUrl = 'http://localhost/moto_loc/pageIdentification/iden.php';
        console.log('Envoi requête à:', apiUrl);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        // Log la réponse brute
        console.log('Status de la réponse:', response.status);
        const responseText = await response.text();
        console.log('Réponse brute:', responseText);

        // Tenter de parser la réponse JSON
        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            console.error('Erreur parsing JSON:', e);
            throw new Error('Réponse invalide du serveur');
        }

        if (result.success) {
            messageElement.textContent = 'Connexion réussie! Redirection...';
            messageElement.style.color = 'green';
            
            // Redirection vers la page d'accueil
            setTimeout(() => {
                window.location.href = '/PageAcceuil/Acceuil.html';
            }, 1000);
        } else {
            messageElement.textContent = result.message;
            messageElement.style.color = 'red';
        }
    } catch (error) {
        console.error('Erreur complète:', error);
        messageElement.textContent = 'Erreur de connexion au serveur';
        messageElement.style.color = 'red';
    }
});

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost/moto_loc/pageIdentification/isLoggedIn.php');
        const result = await response.json();

        if (result.loggedIn) {
            // Masquer les boutons Connexion et Inscription
            document.getElementById('loginButton').style.display = 'none';
            document.getElementById('registerButton').style.display = 'none';

            // Afficher un message de bienvenue
            const welcomeMessage = document.getElementById('welcomeMessage');
            welcomeMessage.textContent = `Bienvenue, ${result.username}`;
            welcomeMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Erreur lors de la vérification de la session :', error);
    }
});


async function logout() {
    try {
        const response = await fetch('http://localhost/moto_loc/pageIdentification/logout.php', {
            method: 'POST',
        });
        const result = await response.json();

        if (result.success) {
            alert(result.message);
            window.location.href = '../pageIdentification/index.html'; 
        }
    } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
    }
}

