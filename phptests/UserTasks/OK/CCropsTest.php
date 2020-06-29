<?php
use PHPUnit\Framework\TestCase;
use UserTasks\OK\CCrops;

class UserTasks_OK_CCropsTest extends BasicTaskUseCase {
  public function task($data) {
    return new CCrops($data);
  }

  public function validData() {
    return [
      'artist' => 'a',
      'track' => 't',
      'description' => 'd',
      'date' => '21.11.2010',
      'network' => 'OK',
      'type' => 'crops'
    ];
  }

  public function coverageFields() {
    return ['coverage'];
  }
}
?>
