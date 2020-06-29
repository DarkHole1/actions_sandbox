<?php
header('Content-Type: application/json');
include '../../includes/_preconfigure.php';

if(!$user->isLogged()) {
  $login = $_POST['login'];
  $password = $_POST['password'];
  $user = $usersRepository->login($login, \Globals\SecurityPolicy::encryptPassword($login, $password));
}

if(!$user->isLogged()) {
  die(json_encode(['error' => 'Incorrect login or password.']));
}

echo $user->toJsonString();
?>
