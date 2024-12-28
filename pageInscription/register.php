<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Paramètres de connexion à la base de données
$host = 'localhost';
$dbname = 'inscription';
$username = 'root'; // Nom d'utilisateur par défaut dans XAMPP
$password = ''; // Mot de passe par défaut vide dans XAMPP

// Connexion à la base de données
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['message' => 'Erreur de connexion à la base de données : ' . $e->getMessage()]));
}

// Traitement des données POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données JSON envoyées
    $data = json_decode(file_get_contents('php://input'), true);
    $username = htmlspecialchars($data['username']);
    $email = htmlspecialchars($data['email']);
    $password = htmlspecialchars($data['password']);

    // Vérifier si l'utilisateur existe déjà
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetchColumn() > 0) {
        echo json_encode(['message' => 'Cet utilisateur existe déjà.']);
        exit;
    }

    // Insérer les données dans la base de données
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->execute([$username, $email, $hashedPassword]);

    echo json_encode(['message' => 'Inscription réussie.']);
}
?>
