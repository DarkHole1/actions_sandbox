<?php
use PHPUnit\Framework\TestCase;
use Globals\CmrArray;

class CmrArrayTest extends TestCase {
  /** @test **/
  public function accessToKeyValue() {
    $reader = new CmrArray([ 'key' => 'value' ]);
    $this->assertSame('value', $reader->key);
  }
  
  /** @test **/
  public function accessToUndefinedKey() {
    $reader = new CmrArray([]);
    $this->assertSame(null, $reader->anykey);
  }
}
?>
