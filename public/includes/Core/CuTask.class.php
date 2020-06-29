<?php
namespace Core;

class CuTask {
  /**
  *  @var \Database\CdbTask
  */
  private $_db;

  public function __construct(\Database\CdbTask $db) {
    $this->_db = $db;
  }

  public function details() {
    return json_decode($this->_db->data());
  }


  /**
   *  Deep merges two objects
   *  @param object base
   *  @param object obj
   *  @return object
   */
  private function merge(object $base, object $obj) {
    $res = clone $base;

    foreach ($obj as $key => $value) {
      if(is_object($value)) {
        if(\property_exists($res, $key)) {
          $res->$key = $this->merge($res->$key, $value);
        } else {
          $res->$key = clone $value;
        }
      } else {
        $res->$key = $value;
      }
    }
    
    return $res;
  }

  public function update($changes) {
    $old = $this->details();
    $data = $this->merge($old, $changes);
    $this->_db->update(json_encode($data));
  }
}
?>
