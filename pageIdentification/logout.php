<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

session_start(); // Démarrer la session
session_destroy(); // Détruire toutes les données de la session

echo json_encode(['success' => true, 'message' => 'Déconnexion réussie']);
?>
