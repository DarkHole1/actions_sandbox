<?php
namespace UserTasks\OK;

class CCrops implements \UserTasks\IUserTask {
  private $_data;

  public function __construct($data) {
    $this->_data = new \UserTasks\Common\CtfSorted(
      new \UserTasks\Common\CtfMerge(
        new \UserTasks\Common\CtfCommon($data),
        new \UserTasks\Common\CtfCoverage($data, ['coverage']),
        new \UserTasks\Common\CtfConst([ 'network' => 'OK', 'type' => 'crops' ])
      )
    );
  }

  public function isValid() {
    return $this->_data->isValid();
  }

  public function toJson() {
    return json_encode($this->_data->toArray());
  }
}
?>
