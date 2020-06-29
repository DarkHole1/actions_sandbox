<?php
use PHPUnit\Framework\TestCase;
use Mocks\FakeDB;
use Mocks\FakeSessionStorage;
use Core\CAuthUser;
use Core\CEmptyUser;
use Core\CuTasks;

class AuthUserTest extends TestCase {
  /** @test **/
  public function basic() {
    $user = new CAuthUser(null, null);
    $this->assertTrue($user->isLogged());
  }

  /** @test **/
  public function toJsonString_fromSessionCache() {
    \Globals\Time::mock(0);
    $sess = new FakeSessionStorage([
      'infoChanged' => \Globals\Time::time(),
      'info' => 'json'
    ]);
    $user = new CAuthUser($sess, null);

    $this->assertEquals('"json"', $user->toJsonString());
    $this->assertEquals(['get infoChanged | 0', 'get info | "json"'], $sess->actions());
  }

  /** @test **/
  public function toJsonString_requireInfo() {
    \Globals\Time::mock(1);
    $sess = new FakeSessionStorage([]);
    $db = $this->getMockBuilder('dbUsr')->setMethods(array('UserData'))->getMock();
    $db->method('UserData')->with(['Profile', 'roles'])->willReturn(new stdClass());

    $user = new CAuthUser($sess, $db);

    $this->assertEquals('{}', $user->toJsonString());
    $this->assertEquals(['get infoChanged | null', 'info = {}', 'infoChanged = 1'], $sess->actions());
    ////////////////////////
    \Globals\Time::mock(0);
    $this->assertEquals('{}', $user->toJsonString());
    $this->assertEquals(['get infoChanged | 1', 'get info | {}'], $sess->actions());
  }

  /** @test **/
  public function logout() {
    $sess = new FakeSessionStorage([]);
    $user = new CAuthUser($sess, null);

    $this->assertInstanceOf(CEmptyUser::class, $user->logout());
    $this->assertEquals(['clear'], $sess->actions());
  }

  /** @test **/
  public function tasksProvider() {
    $db = $this->getMockBuilder('dbUsr')->setMethods(array('tasks'))->getMock();
    $db->expects($this->once())->method('tasks')->willReturn(null);
    $user = new CAuthUser(null, $db);

    $this->assertInstanceOf(CuTasks::class, $user->tasks());
  }
}

?>
