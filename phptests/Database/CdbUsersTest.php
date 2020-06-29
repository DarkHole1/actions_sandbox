<?php
use PHPUnit\Framework\TestCase;
use Mocks\FakeDB;
use Database\CdbUsers;

class CdbUsersTest extends TestCase {
  /** @test **/
  public function basicSuccessLogin() {
    $db = new FakeDB([
      FakeDB::Return([['id' => '1']])
    ]);
    $users = new CdbUsers($db);
    $usr = $users->login('login', 'password hash');
    $this->assertEquals(1, $db->querys());
    $this->assertEquals(1, $usr->ID());
  }

  /** @test **/
  public function login_query() {
    $db = new FakeDB([FakeDB::Return([])]);
    $users = new CdbUsers($db);
    $users->login('login', 'password hash');

    $query = $db->actions()[0];
    $this->assertStringContainsString('Users', $query['sql']);
    $this->assertStringContainsString('login = ?s', $query['sql']);
    $this->assertStringContainsString('password = ?s', $query['sql']);
    $this->assertEquals(['login', 'password hash'], $query['args']);
  }

  /** @test **/
  public function nullIfNotFounded() {
    $users = new CdbUsers(new FakeDB([FakeDB::Return([])]));
    $usr = $users->login('login', 'password hash');
    $this->assertNull($usr);
  }

  /** @test **/
  public function byID() {
    $db = new FakeDB([
      FakeDB::Return([['id' => '1']])
    ]);
    $users = new CdbUsers($db);
    $usr = $users->byID(1);
    $this->assertEquals(1, $db->querys());
    $this->assertEquals(1, $usr->ID());
  }

  /** @test **/
  public function byID_query() {
    $db = new FakeDB([FakeDB::Return([])]);
    $users = new CdbUsers($db);
    $users->byID(321);

    $query = $db->actions()[0];
    $this->assertStringContainsString('Users', $query['sql']);
    $this->assertStringContainsString('id = ?i', $query['sql']);
    $this->assertEquals([321], $query['args']);
  }
}
?>
