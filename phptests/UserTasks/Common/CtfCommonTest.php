<?php
use PHPUnit\Framework\TestCase;
use UserTasks\Common\CtfCommon;
use Globals\CmrArray;

class CtfCommonTest extends TestCase {
  private function fullyValidData() {
    $res = [
      'artist' => 'a',
      'track' => 't',
      'description' => 'd',
      'date' => '21.11.2010',
    ];
    ksort($res);
    return $res;
  }

  /** @test **/
  public function fullyValid() {
    $data = $this->fullyValidData();
    $this->assertTrue((new CtfCommon(new CmrArray($data)))->isValid());
  }

  /** @test **/
  public function dateMustBeSet() {
    $data = $this->fullyValidData();
    $data['date'] = null;
    $this->assertFalse((new CtfCommon(new CmrArray($data)))->isValid());

    unset($data['date']);
    $this->assertFalse((new CtfCommon(new CmrArray($data)))->isValid());
  }

  /** @test **/
  public function dateOnlyInDDMMYYYY() {
    $data = $this->fullyValidData();
    $data['date'] = '2010.01.10';
    $this->assertFalse((new CtfCommon(new CmrArray($data)))->isValid());
  }
}
?>
