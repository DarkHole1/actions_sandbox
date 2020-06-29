<?php
use PHPUnit\Framework\TestCase;
use UserTasks\Instagram\CTargeting;

class UserTasks_Instagram_CTargetingTest extends BasicTaskUseCase {
  public function task($data) {
    return new CTargeting($data);
  }

  public function validData() {
    return [
      'artist' => 'a',
      'track' => 't',
      'description' => 'd',
      'date' => '21.11.2010',
      'network' => 'Instagram',
      'type' => 'target'
    ];
  }

  public function coverageFields() {
    return ['coverage', 'coverageStories'];
  }
}
?>
