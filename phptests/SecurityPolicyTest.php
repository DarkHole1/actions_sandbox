<?php
use PHPUnit\Framework\TestCase;
use Globals\SecurityPolicy;

class SecurityPolicyTest extends TestCase {
  /** @test **/
  public function alwaysSame() {
    $this->assertEquals(
      SecurityPolicy::encryptPassword('login', 'password'),
      SecurityPolicy::encryptPassword('login', 'password')
    );
  }

  /** @test **/
  public function different() {
    $this->assertNotEquals(
      SecurityPolicy::encryptPassword('login', 'password'),
      SecurityPolicy::encryptPassword('login', 'another password')
    );
  }

  /** @test **/
  public function exactHash() {
    $hash = SecurityPolicy::encryptPassword('login', 'password');
    $this->assertEquals('5d19649c2bb363c79925e62f140eff4f13fde8ac8ecbb24cfe4b589c0e2414b4', $hash);
    $this->assertEquals(64, strlen($hash));
  }
}
?>
