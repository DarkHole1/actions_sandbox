<?php
header('Content-Type: application/json');
include '../../includes/_preconfigure.php';

requireAuth();

$id = (int)$_POST['id'];
// TODO: Add scheme for task data
// TODO: Add validation with this task scheme
$changes = json_decode($_POST['changes']);

$task = $user->tasks()->get($id);
if(null === $task) {
  die(json_encode(['error' => 'Unknown task.']));
}

$task->update($changes);
?>
