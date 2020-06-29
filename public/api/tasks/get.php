<?php
header('Content-Type: application/json');
include '../../includes/_preconfigure.php';

requireAuth();
$id = (int)$_POST['id'];
$task = $user->tasks()->get($id);
if(null ===$task) {
  die(json_encode(['error' => 'Unknown task.']));
}
die(json_encode($task->details()));
?>
