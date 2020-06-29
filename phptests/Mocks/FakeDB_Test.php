<?php
use PHPUnit\Framework\TestCase;
use Mocks\FakeDB;

class FakeDB_Test extends TestCase {
  /** @test **/
  public function queryReturnNull() {
    $db = new FakeDB([]);
    $this->assertSame(null, $db->query(''));
  }

  /** @test **/
  public function queryReturnStats() {
    $db = new FakeDB([]);
    $db->stats([4, 5]);

    $stats = $db->query('');
    $this->assertSame(4, $stats->affected);
    $this->assertSame(5, $stats->insertId);
  }
}
?>
