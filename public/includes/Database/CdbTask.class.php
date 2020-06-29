<?php
namespace Database;

class CdbTask {
  /**
  *  @var CdbAdapter
  */
  private $_db;

  /**
  *  @var int
  */
  private $_uid;

  /**
  *  @var int
  */
  private $_id;

  /**
  *  @var string
  */
  private $_data;

  public function __construct($row, $db) {
    $this->_db = $db;
    $this->_uid = $row['userID'];
    $this->_id = $row['id'];
    $this->_data = $row['data'];
  }

  public function data() {
    return $this->_data;
  }

  public function update(string $newData) {
    $this->_data = $newData;
    $this->_db->query(
      'UPDATE Tasks SET data=?s WHERE id = ?i and userID = ?i',
      $newData,
      $this->_id,
      $this->_uid
    );
  }
}
?>
