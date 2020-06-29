<?php
namespace Database;

class CdbUserData {
  private $_id;
  private $_db;

  public function __construct($id, $db) {
    $this->_id = $id;
    $this->_db = $db;
  }

  public function get($fields) {
    $data = $this->_db->all(
      'SELECT * FROM UsersData WHERE (userID = ?i) AND (dataName IN (?a))',
      $this->_id, $fields
    );

    $res = new \stdClass();
    foreach ($fields as $name) {
      $res->$name = new \stdClass();
    }

    foreach ($data as $value) {
      $name = $value['dataName'];
      $res->$name = json_decode($value['data']);
    }
    return $res;
  }

  public function put($name, $value) {
    $this->_db->query(
      'REPLACE INTO UsersData(userID, dataName, data) VALUES(?i, ?s, ?s)',
      $this->_id, $name, json_encode($value)
    );
  }

  public function delete($name) {
    $data = $this->_db->query(
      'DELETE FROM UsersData WHERE (userID = ?i) AND (dataName = ?s)',
      $this->_id, $name
    );
  }
}
?>
