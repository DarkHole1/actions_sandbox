<?php
use PHPUnit\Framework\TestCase;
use UserTasks\TikTok\CCrops;

class UserTasks_TikTok_CCropsTest extends BasicTaskUseCase {
  public function task($data) {
    return new CCrops($data);
  }

  public function validData() {
    return [
      'artist' => 'a',
      'track' => 't',
      'description' => 'd',
      'date' => '21.11.2010',
      'network' => 'TikTok',
      'type' => 'crops'
    ];
  }

  public function coverageFields() {
    return ['coverage', 'subscribers'];
  }
}
?>
