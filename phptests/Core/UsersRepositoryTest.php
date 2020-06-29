<?php
use PHPUnit\Framework\TestCase;
use Mocks\FakeDB;
use Mocks\FakeSessionStorage;
use Database\CdbUsers;
use Core\CUsersRepository;

class UsersRepositoryTest extends TestCase {
  /** @test **/
  public function loginFailed() {
    $userRepo = new CUsersRepository(
      new FakeSessionStorage(),
      new CdbUsers(new FakeDB([FakeDB::Return([])]))
    );
    $user = $userRepo->login('login', 'password');

    $this->assertInstanceOf('Core\CEmptyUser', $user);
  }

  /** @test **/
  public function loginSuccess() {
    $userRepo = new CUsersRepository(
      new FakeSessionStorage(),
      new CdbUsers(new FakeDB([FakeDB::Return([['id' => '1']])]))
    );
    $user = $userRepo->login('login', 'password');

    $this->assertInstanceOf('Core\CAuthUser', $user);
  }

  /** @test **/
  public function setupSessionOnLogin() {
    $session = new FakeSessionStorage();
    $userRepo = new CUsersRepository(
      $session,
      new CdbUsers(new FakeDB([FakeDB::Return([['id' => '1']])]))
    );
    $user = $userRepo->login('login', 'password');

    $this->assertEquals(['init', 'id = 1'], $session->actions());
  }

  /** @test **/
  public function getEmptyCurrentUser() {
    $session = new FakeSessionStorage([]);
    $userRepo = new CUsersRepository($session, null);

    $user = $userRepo->currentUser();
    $this->assertInstanceOf('Core\CEmptyUser', $user);
  }

  /** @test **/
  public function getCurrentUser() {
    $session = new FakeSessionStorage(['id' => 1]);
    $db = $this->createMock(CdbUsers::class);
    $db->method('byID')->willReturn(null);
    $userRepo = new CUsersRepository($session, $db);

    $user = $userRepo->currentUser();
    $this->assertInstanceOf('Core\CAuthUser', $user);
    $this->assertEquals(['get id | 1'], $session->actions());
  }
}
?>
