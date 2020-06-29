<?php
namespace Core;

class CuTasks {
  private $_db;

  public function __construct($db) {
    $this->_db = $db;
  }

  public function all() {
    $validKeys = new \Globals\CArrayFilter(['date', 'artist', 'track', 'network', 'type', 'id']);

    $res = $this->_db->all();
    foreach ($res as &$value) {
      $data = json_decode($value['data'], true);
      $data['id'] = (int)$value['id'];
      $value = $validKeys->apply($data);
    }
    return $res;
  }

  public function get($id) {
    $res = $this->_db->get($id);
    return (is_null($res) ? null : new CuTask($res));
  }

  public function create(\UserTasks\IUserTask $task) {
    return $this->_db->create($task->toJson());
  }
}
?>
