<?php
namespace UserTasks;

interface IUserTask {
  public function isValid();
  public function toJson();
}
?>
