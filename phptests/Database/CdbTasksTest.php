<?php
use PHPUnit\Framework\TestCase;
use Mocks\FakeDB;
use Database\CdbUser;
use Database\CdbTasks;

class CdbUTasksTest extends TestCase {
  /** @test **/
  public function create_returnID() {
    $db = new FakeDB([]);
    $db->stats([1, 134]);
    $tasks = new CdbTasks($db, 0);

    $this->assertEquals(134, $tasks->create('{}'));
    $this->assertSame(['{}', 0], $db->actions()[0]['args']);
  }

  /** @test **/
  public function get_nullIfNotExist() {
    $db = new FakeDB([
      FakeDB::Return([])
    ]);
    $tasks = new CdbTasks($db, 0);

    $this->assertSame(null, $tasks->get(1));
  }

  /*
  /** @test /
  public function get_rawFirstRow() {
    $db = new FakeDB([
      FakeDB::Return([['first'], ['second']])
    ]);
    $tasks = new CdbTasks($db, 0);

    $this->assertSame(['first'], $tasks->get(1));
  }
  */
}
?>
