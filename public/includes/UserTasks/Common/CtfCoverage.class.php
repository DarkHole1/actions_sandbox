<?php
namespace UserTasks\Common;

class CtfCoverage {
  private $_data;
  private $_fields;

  public function __construct($data, $fields) {
    $this->_data = $data;
    $this->_fields = $fields;
  }

  private function get($name) {
    return (int)$this->_data->{$name};
  }

  public function isValid() {
    foreach ($this->_fields as $field) {
      $value = $this->get($field);
      if(0 < $value) return true;
    }
    return false;
  }

  public function toArray() {
    $res = [];
    foreach ($this->_fields as $field) {
      $res[$field] = $this->get($field);
    }
    return $res;
  }
}
?>
