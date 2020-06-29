<?php
use PHPUnit\Framework\TestCase;
use UserTasks\Instagram\CCrops;

class UserTasks_Instagram_CCropsTest extends BasicTaskUseCase {
  public function task($data) {
    return new CCrops($data);
  }

  public function validData() {
    return [
      'artist' => 'a',
      'track' => 't',
      'description' => 'd',
      'date' => '21.11.2010',
      'network' => 'Instagram',
      'type' => 'crops'
    ];
  }

  public function coverageFields() {
    return ['coverage', 'coverageStories'];
  }
}
?>
