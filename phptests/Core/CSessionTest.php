<?php
use PHPUnit\Framework\TestCase;
use Core\CSession;

class CSessionTest extends TestCase {
  /** @test **/
  public function itemGet_returnNullIfNotActive() {
    $api = $this->getMockBuilder('clazz')->setMethods(array('isActive'))->getMock();
    $api->expects($this->once())->method('isActive')->willReturn(false);

    $session = new CSession($api);
    $this->assertSame(null, $session->item('name'));
  }

  /** @test **/
  public function itemGet_decodeJson() {
    $api = $this->getMockBuilder('clazz')->setMethods(array('isActive', 'get'))->getMock();
    $api->expects($this->once())->method('isActive')->willReturn(true);
    $api->expects($this->once())->method('get')->with('name')->willReturn('{"key": 1}');

    $session = new CSession($api);
    $this->assertSame( '{"key":1}', json_encode($session->item('name')) );
  }

  /** @test **/
  public function itemSet_returnNullIfNotActive() {
    $api = $this->getMockBuilder('clazz')->setMethods(array('isActive'))->getMock();
    $api->expects($this->once())->method('isActive')->willReturn(false);

    $session = new CSession($api);
    $this->assertSame(null, $session->item('name', 'val'));
  }

  /** @test **/
  public function itemSet_encodeJson() {
    $api = $this->getMockBuilder('clazz')->setMethods(array('isActive', 'set'))->getMock();
    $api->expects($this->once())->method('isActive')->willReturn(true);
    $api->expects($this->once())->method('set')->with('name', '{"key":1}')->willReturn('null');

    $session = new CSession($api);
    $this->assertSame('null', json_encode($session->item('name', ['key' => 1])));
  }
}
?>
