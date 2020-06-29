
<?php
use PHPUnit\Framework\TestCase;
use UserTasks\IUserTask;
use Globals\CmrArray;

abstract class BasicTaskUseCase extends TestCase {
  public abstract function task($data);
  public abstract function validData();
  public abstract function coverageFields();

  private function fullyValidData() {
    $res = $this->validData();

    foreach ($this->coverageFields() as $name) {
      $res[$name] = 1;
    }

    ksort($res);
    foreach (func_get_args() as $key) {
      unset($res[$key]);
    }
    return $res;
  }

  /** @test **/
  public function implements_IUserTask() {
    $task = $this->task(new CmrArray($this->fullyValidData('type', 'network')));
    $this->assertTrue($task instanceof IUserTask);
  }

  /** @test **/
  public function toJson_basic() {
    $task = $this->task(new CmrArray($this->fullyValidData('type', 'network')));
    $this->assertSame(json_encode($this->fullyValidData()), $task->toJson());
  }

  /** @test **/
  public function isValid_valid() {
    $task = $this->task(new CmrArray($this->fullyValidData('type', 'network')));
    $this->assertTrue($task->isValid());
  }

  /** @test **/
  public function isValid_commonFieldsNotEmpty() {
    foreach(['artist', 'track', 'date'] as $key) {
      $task = $this->task(new CmrArray($this->fullyValidData('type', 'network', $key)));
      $this->assertFalse($task->isValid(), $key);
    }
  }

  /** @test **/
  public function isValid_coverageNotEmpty() {
    $task = $this->task(new CmrArray($this->fullyValidData('type', 'network', ...$this->coverageFields())));
    $this->assertFalse($task->isValid());
  }

  /** @test **/
  public function isValid_atLeastOneCoverageFields() {
    foreach($this->coverageFields() as $key) {
      $data = $this->fullyValidData('type', 'network', ...$this->coverageFields());
      $data[$key] = 1;
      $task = $this->task(new CmrArray($data));
      $this->assertTrue($task->isValid(), $key);
    }
  }
}
?>
