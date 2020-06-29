<?php
namespace Database;
use Database\CdbUserData;

class CdbUser {
  public const NONE = self::class . ' NONE';
  public const DELETE = self::class . ' DELETE';

  private $_id;
  private $_db;
  private $_userData;

  public function __construct($row, $db, $userData = null) {
    $this->_id = (int)$row['id'];
    $this->_db = $db;
    $this->_userData = $userData ?? new CdbUserData($this->_id, $db);
  }

  public function ID() {
    return $this->_id;
  }

  public function UserData($fields, $value = self::NONE) {
    if(self::DELETE === $value) {
      return $this->_userData->delete($fields);
    }

    if(self::NONE !== $value) {
      return $this->_userData->put($fields, $value);
    }

    return $this->_userData->get($fields);
  }

  public function tasks() {
    return new CdbTasks($this->_db, $this->ID());
  }
}
?>
