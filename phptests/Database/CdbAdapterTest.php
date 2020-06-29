<?php
use PHPUnit\Framework\TestCase;
use Database\CdbAdapter;

class CdbAdapterTest extends TestCase {
  /** @test **/
  public function queryCollectStats() {
    $mysql = $this->getMockBuilder('className')->setMethods(['affectedRows', 'insertId', 'query'])->getMock();
    $mysql->method('affectedRows')->willReturn(4);
    $mysql->method('insertId')->willReturn(-5);
    $mysql->method('query')->with('sql');

    $db = new CdbAdapter($mysql);
    $stats = $db->query('sql');
    $this->assertSame(4, $stats->affected);
    $this->assertSame(-5, $stats->insertId);
  }
}
?>
