<?php
use PHPUnit\Framework\TestCase;
use UserTasks\OK\CTargeting;

class UserTasks_OK_CTargetingTest extends BasicTaskUseCase {
  public function task($data) {
    return new CTargeting($data);
  }

  public function validData() {
    return [
      'artist' => 'a',
      'track' => 't',
      'description' => 'd',
      'date' => '21.11.2010',
      'network' => 'OK',
      'type' => 'target'
    ];
  }

  public function coverageFields() {
    return ['coverage'];
  }
}
?>
