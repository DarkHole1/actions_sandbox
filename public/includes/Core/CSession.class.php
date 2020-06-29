<?php
namespace Core;

class CSession  {
  private $_api;

  public function __construct($api = null) {
    $this->_api = $api ?? new CSessionApi();
  }

  public function item($name, $value = 'getVal') {
    if(!$this->_api->isActive()) return;

    if('getVal' === $value) {
      $value = $this->_api->get($name);
      return json_decode($value ?? 'null');
    }

    $this->_api->set($name, json_encode($value));
  }

  public function init() {
    $this->_api->init();
  }

  public function clear() {
    $this->_api->clear();
  }
}
?>
