<?php
namespace Globals;

class CArrayFilter {
  private $_keys;

  public function __construct(Array $keys) {
    $this->_keys = $keys;
  }

  public function apply($arr) {
    foreach ($arr as $key => $value) {
      if(!in_array($key, $this->_keys)) {
        unset($arr[$key]);
      }
    }
    return $arr;
  }
}
?>
