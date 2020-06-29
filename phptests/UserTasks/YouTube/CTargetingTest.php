<?php
use PHPUnit\Framework\TestCase;
use UserTasks\YouTube\CTargeting;

class UserTasks_YouTube_CTargetingTest extends BasicTaskUseCase {
  public function task($data) {
    return new CTargeting($data);
  }

  public function validData() {
    return [
      'artist' => 'a',
      'track' => 't',
      'description' => 'd',
      'date' => '21.11.2010',
      'network' => 'YouTube',
      'type' => 'target'
    ];
  }

  public function coverageFields() {
    return ['views'];
  }
}
?>
