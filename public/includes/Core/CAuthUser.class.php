<?php
namespace Core;
use Core\CuTasks;

class CAuthUser {
  private $_session;
  private $_db;

  public function __construct($session, $db) {
    $this->_session = $session;
    $this->_db = $db;
  }

  public function isLogged() {
    return true;
  }

  public function info() {
    $time = $this->_session->item('infoChanged') ?? PHP_FLOAT_MIN;
    if(\Globals\Time::time() <= $time) {
      return $this->_session->item('info');
    }

    $info = $this->_db->UserData(['Profile', 'roles']);
    $this->_session->item('info', $info);
    $this->_session->item('infoChanged', \Globals\Time::time());

    return $info;
  }

  public function toJsonString() {
    return json_encode($this->info());
  }

  public function logout() {
    $this->_session->clear();
    return new CEmptyUser();
  }

  public function tasks() {
    return new CuTasks($this->_db->tasks());
  }
}
?>
