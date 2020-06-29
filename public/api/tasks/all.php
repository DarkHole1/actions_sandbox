<?php
header('Content-Type: application/json');
include '../../includes/_preconfigure.php';

requireAuth();
echo json_encode($user->tasks()->all());
?>
