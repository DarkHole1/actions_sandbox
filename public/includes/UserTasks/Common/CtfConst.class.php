<?php
namespace UserTasks\Common;

class CtfConst {
  private $_data;

  public function __construct($data) {
    $this->_data = $data;
  }

  public function isValid() {
    return true;
  }

  public function toArray() {
    return $this->_data;
  }
}
?>
