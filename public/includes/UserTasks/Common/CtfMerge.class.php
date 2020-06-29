<?php
namespace UserTasks\Common;

class CtfMerge {
  private $_items;

  public function __construct() {
    $this->_items = func_get_args();
  }

  public function isValid() {
    foreach ($this->_items as $item) {
      if(!$item->isValid())
        return false;
    }
    return true;
  }

  public function toArray() {
    $res = [];
    foreach ($this->_items as $item) {
      $res = array_merge($res, $item->toArray());
    }
    return $res;
  }
}
?>
