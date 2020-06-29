<?php
namespace Mocks;

class FakeDB {
  private $_querys;
  private $_query = 0;
  private $_stats = [];

  private $_actions = [];

  public function __construct($querys) {
    $this->_querys = $querys;
  }

  public function all($sql) {
    $args = func_get_args();
    array_shift($args);
    $this->_actions[] = ['sql' => $sql, 'args' => $args];
    $this->_query++;
    return $this->_querys[$this->_query - 1]($sql);
  }

  public function query($sql) {
    $args = func_get_args();
    array_shift($args);
    $this->_actions[] = ['sql' => $sql, 'args' => $args];

    if(0 < count($this->_stats))
      return array_shift($this->_stats);
    return null;
  }
  /////////////////////////////////
  public function stats() {
    $args = func_get_args();
    foreach ($args as $val) {
      $stat = new \stdClass();
      $stat->affected = $val[0];
      $stat->insertId = $val[1];
      $this->_stats[] = $stat;
    }
  }

  public function querys() {
    return $this->_query;
  }

  public function actions() {
    $res = $this->_actions;
    $this->_actions = [];
    return $res;
  }
  ////////////////////////////////
  public static function Return($value) {
    return function($sql) use($value) {
      return $value;
    };
  }
}

?>
