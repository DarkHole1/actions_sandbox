<?php
header('Content-Type: application/json');
include '../../includes/_preconfigure.php';

echo $user->toJsonString();
?>
