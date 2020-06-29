<?php
use PHPUnit\Framework\TestCase;
use Mocks\FakeDB;
use Database\CdbTask;

class CdbUTasks extends TestCase {
  /** @test **/
  public function baseTest() {
    $task = new CdbTask(['userID' => 1, 'id' => 1, 'data' => '{}'], null);
    $this->assertNotNull($task);
    $this->assertSame($task->data(), '{}');
  }

  /** @test **/
  public function updateTest() {
    $db = new FakeDB([]);
    $task = new CdbTask(['userID' => 1, 'id' => 2, 'data' => '{"test": 1}'], $db);
    $this->assertSame($task->data(), '{"test": 1}');
    $task->update('{"test": 2}');
    $this->assertSame($db->actions()[0]['args'], ['{"test": 2}', 2, 1]);
    $this->assertSame($task->data(), '{"test": 2}');
  }
}

?>
