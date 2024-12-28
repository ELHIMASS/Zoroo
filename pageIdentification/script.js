// Gestion de la connexion
document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const emailInput = document.getElementById("email").value.trim();
    const passwordInput = document.getElementById("password").value.trim();

    // Récupérer les utilisateurs enregistrés dans localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Vérifier les informations de connexion
    const user = users.find(user => user.email === emailInput && user.password === passwordInput);

    if (user) {
        alert("Connexion réussie !");
        // Sauvegarder l'état connecté
        localStorage.setItem("authenticatedUser", JSON.stringify(user));
        window.location.href = "/PageAcceuil/pageAcceuil.html"; // Redirige vers la page d'accueil
    } else {
        alert("Email ou mot de passe incorrect !");
    }
});
