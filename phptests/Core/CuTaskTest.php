<?php
use PHPUnit\Framework\TestCase;
use Core\CuTask;

class CuTaskTest extends TestCase {
  /** @test **/
  public function details_decodeJson() {
    $db = new \Database\CdbTask(
      ['id' => 1, 'userID' => 1, 'data' => '{"KEY": 1}'],
      null
    );
    $task = new CuTask($db);
    $this->assertSame('{"KEY":1}', json_encode($task->details()));
  }
}
?>
