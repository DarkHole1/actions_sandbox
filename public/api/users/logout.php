<?php
header('Content-Type: application/json');
include '../../includes/_preconfigure.php';

if($user->isLogged()) {
  $user = $user->logout();
}

echo $user->toJsonString();
?>
