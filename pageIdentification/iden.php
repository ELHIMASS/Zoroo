<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

session_start(); // Démarrer la session

$host = 'localhost';
$dbname = 'inscription';
$username_db = 'root';
$password_db = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username_db, $password_db);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['message' => 'Erreur de connexion à la base de données : ' . $e->getMessage()]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    $stmt = $pdo->prepare("SELECT password FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result && password_verify($password, $result['password'])) {
        $_SESSION['username'] = $username; // Stocke l'utilisateur dans la session
        echo json_encode(['success' => true, 'message' => 'Connexion réussie']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Nom d\'utilisateur ou mot de passe incorrect']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
}
?>
