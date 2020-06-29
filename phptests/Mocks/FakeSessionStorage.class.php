<?php
namespace Mocks;

class FakeSessionStorage {
  private $_actions = [];
  private $_data;

  public function __construct($data = null) {
    $this->_data = $data;
  }

  public function item($name, $value = 'getVal') {
    if('getVal' === $value) {
      $value = $this->_data[$name] ?? null;
      $this->_actions[] = sprintf('get %s | %s', $name, json_encode($value));
      return $value;
    }

    $this->_data[$name] = $value;
    $this->_actions[] = sprintf('%s = %s', $name, json_encode($value));
  }

  public function init() {
    $this->_actions[] = 'init';
    $this->_data = [];
  }

  public function clear() {
    $this->_actions[] = 'clear';
  }

  public function actions() {
    $res = $this->_actions;
    $this->_actions = [];
    return $res;
  }
}

?>
