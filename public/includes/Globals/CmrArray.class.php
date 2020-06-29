<?php
namespace Globals;

class CmrArray {
  private $_data;

  public function __construct(Array $data) {
    $this->_data = $data;
  }

  public function __get($name) {
    if (array_key_exists($name, $this->_data)) {
      return $this->_data[$name];
    }
    return null;
  }
}
?>
