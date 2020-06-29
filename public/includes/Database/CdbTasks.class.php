<?php
namespace Database;

class CdbTasks {
  /**
  *  @var int
  */
  private $_id;
  /**
  *  @var CdbAdapter
  */
  private $_db;

  public function __construct($db, int $id) {
    $this->_id = $id;
    $this->_db = $db;
  }

  public function all() {
    return $this->_db->all(
      'SELECT id, data FROM Tasks WHERE userID = ?i',
      $this->_id
    );
  }

  public function get(int $id) {
    $res = $this->_db->all(
      'SELECT * FROM Tasks WHERE (userID = ?i) AND (id = ?i)',
      $this->_id, $id
    );

    if(0 < count($res))
      return new CdbTask($res[0], $this->_db);
    return null;
  }

  public function create(string $json) {
    $id = $this->_db->query(
      'INSERT INTO Tasks (data, userID) VALUES(?s, ?i)',
      $json, $this->_id
    )->insertId;

    return $id;
  }

  public function userID() {
    return $this->_id;
  }
}
?>
