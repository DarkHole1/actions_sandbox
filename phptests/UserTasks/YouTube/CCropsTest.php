<?php
use PHPUnit\Framework\TestCase;
use UserTasks\YouTube\CCrops;

class UserTasks_YouTube_CCropsTest extends BasicTaskUseCase {
  public function task($data) {
    return new CCrops($data);
  }

  public function validData() {
    return [
      'track' => 't',
      // 'artist' => 'a',
      'description' => 'd',
      'date' => '21.11.2010',
      'network' => 'YouTube',
      'type' => 'crops'
    ];
  }

  public function coverageFields() {
    return ['coverage', 'subscribers'];
  }
}
?>
