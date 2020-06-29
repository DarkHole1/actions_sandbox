<?php
use PHPUnit\Framework\TestCase;
use Core\CEmptyUser;

class EmptyUserTest extends TestCase {
  /** @test **/
  public function basic() {
    $user = new CEmptyUser();
    $this->assertFalse($user->isLogged());
    $this->assertEquals('{}', $user->toJsonString());
  }
}
?>
