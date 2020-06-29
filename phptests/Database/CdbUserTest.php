<?php
use PHPUnit\Framework\TestCase;
use Mocks\FakeDB;
use Database\CdbUser;

class CdbUserTest extends TestCase {
  /** @test **/
  public function UserData_get() {
    $data = $this->getMockBuilder('className')->setMethods(['get'])->getMock();
    $data->method('get')->with(['test'])->willReturn('OK');
    $user = new CdbUser(['id' => 132], null, $data);

    $this->assertEquals('OK', $user->UserData(['test']));
  }

  /** @test **/
  public function UserData_put() {
    $data = $this->getMockBuilder('className')->setMethods(['put'])->getMock();
    $data->method('put')->with('test', 'new value')->willReturn('OK');
    $user = new CdbUser(['id' => 132], null, $data);

    $this->assertEquals('OK', $user->UserData('test', 'new value'));
  }

  /** @test **/
  public function UserData_delete() {
    $data = $this->getMockBuilder('className')->setMethods(['delete'])->getMock();
    $data->method('delete')->with('test')->willReturn('OK');
    $user = new CdbUser(['id' => 132], null, $data);

    $this->assertEquals('OK', $user->UserData('test', $user::DELETE));
  }

  /** @test **/
  public function tasks_userID() {
    $user = new CdbUser(['id' => 132], null);

    $this->assertEquals(132, $user->tasks()->userID());
  }
}
?>
