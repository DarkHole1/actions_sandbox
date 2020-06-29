<?php
namespace Database;

class CdbUsers {
  private $_db;

  public function __construct($db) {
    $this->_db = $db;
  }

  private function populate($data) {
    if(empty($data)) return null;

    return new CdbUser($data[0], $this->_db);
  }

  public function login($login, $password){
    return $this->populate(
      $this->_db->all(
        'SELECT * FROM Users WHERE (login = ?s) and (password = ?s)',
        $login, $password
      )
    );
  }

  public function byID($id){
    return $this->populate(
      $this->_db->all(
        'SELECT * FROM Users WHERE id = ?i',
        $id
      )
    );
  }
}
?>
