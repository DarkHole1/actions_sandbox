<?php
header('Content-Type: application/json');
include '../../../../includes/_preconfigure.php';

requireAuth();

$task = new \UserTasks\VK\CTargeting(new \Globals\CmrArray($_POST));
if(!$task->isValid()) {
  die(json_encode(['error' => 'Invalid task.']));
}
echo json_encode($user->tasks()->create($task));
?>
