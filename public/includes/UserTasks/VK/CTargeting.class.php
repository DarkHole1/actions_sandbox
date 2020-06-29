<?php
namespace UserTasks\VK;

class CTargeting implements \UserTasks\IUserTask {
  private $_data;

  public function __construct($data) {
    $this->_data = new \UserTasks\Common\CtfSorted(
      new \UserTasks\Common\CtfMerge(
        new \UserTasks\Common\CtfCommon($data),
        new \UserTasks\Common\CtfCoverage($data, ['coverage', 'coverageStories', 'coverageSubscribers']),
        new \UserTasks\Common\CtfConst([ 'network' => 'VK', 'type' => 'target' ])
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
