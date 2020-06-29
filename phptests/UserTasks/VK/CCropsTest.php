<?php
use PHPUnit\Framework\TestCase;
use UserTasks\VK\CCrops;

class UserTasks_VK_CCropsTest extends BasicTaskUseCase {
  public function task($data) {
    return new CCrops($data);
  }

  public function validData() {
    return [
      'artist' => 'a',
      'track' => 't',
      'description' => 'd',
      'date' => '21.11.2010',
      'network' => 'VK',
      'type' => 'crops'
    ];
  }

  public function coverageFields() {
    return ['coverage', 'coverageStories'];
  }
}
?>
