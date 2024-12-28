document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost/moto_loc/pageIdentification/iden.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        const result = await response.json();
        const messageElement = document.getElementById('message');

        if (result.success) {
            messageElement.textContent = result.message;
            messageElement.style.color = 'green';
            // Redirection après connexion réussie
            setTimeout(() => {
                window.location.href = '/PageAcceuil/pageAcceuil.html'; // Redirige vers le tableau de bord
            }, 2000);
        } else {
            messageElement.textContent = result.message;
            messageElement.style.color = 'red';
        }
    } catch (error) {
        console.error('Erreur :', error);
        alert('Impossible de se connecter au serveur.');
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
            window.location.reload(); // Recharge la page pour mettre à jour l'affichage
        }
    } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
    }
}

