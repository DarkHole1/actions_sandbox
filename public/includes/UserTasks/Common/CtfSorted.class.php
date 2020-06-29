<?php
namespace UserTasks\Common;

class CtfSorted {
  private $_data;

  public function __construct($data) {
    $this->_data = $data;
  }

  public function isValid() {
    return $this->_data->isValid();
  }

  public function toArray() {
    $res = $this->_data->toArray();
    ksort($res);
    return $res;
  }
}
?>
