<?php
use PHPUnit\Framework\TestCase;
use Mocks\FakeDB;
use Core\CuTasks;
use Core\CuTask;

class CuTasksTest extends TestCase {
  /** @test **/
  public function create_serializeTask() {
    $db = $this->getMockBuilder('db')->setMethods(array('create'))->getMock();
    $db->expects($this->once())->method('create')->with('{}')->willReturn(true);

    $task = $this->createMock(\UserTasks\IUserTask::class);
    $task->expects($this->once())->method('toJson')->willReturn('{}');

    $tasks = new CuTasks($db);
    $this->assertSame(true, $tasks->create($task));
  }

  /** @test **/
  public function all_convertDbData() {
    $db = new FakeDB([
      FakeDB::Return([
        ['id' => 1, 'userID' => 1, 'data' => '{"artist":"artist","date":"date","network":"N","track":"track","type":"type","other":5}'],
        ['id' => 2, 'userID' => 1, 'data' => '{"artist":"artist","date":"date","network":"N","track":"track","type":"type","data":"true"}'],
      ])
    ]);
    $tasks = new CuTasks(new \Database\CdbTasks($db, 0));

    $this->assertEquals(
      [
        ['id' => 1, "artist" => "artist", "date" => "date", "network" => "N", "track" => "track", "type" => "type"],
        ['id' => 2, "artist" => "artist", "date" => "date", "network" => "N", "track" => "track", "type" => "type"],
      ],
      $tasks->all()
    );
  }

  /** @test **/
  public function get_null() {
    $db = $this->getMockBuilder('db')->setMethods(array('get'))->getMock();
    $db->expects($this->once())->method('get')->with(123)->willReturn(null);

    $tasks = new CuTasks($db);
    $this->assertSame(null, $tasks->get(123));
  }
}
?>
