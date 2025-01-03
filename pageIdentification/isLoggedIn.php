<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

if (isset($_SESSION['user'])) {
    echo json_encode([
        'loggedIn' => true,
        'user' => $_SESSION['user']
    ]);
} else {
    echo json_encode([
        'loggedIn' => false,
        'user' => null
    ]);
}
?>
