<?php
use PHPUnit\Framework\TestCase;
use Mocks\FakeDB;
use Database\CdbUserData;

class CdbUserDataTest extends TestCase {
  /** @test **/
  public function get_query() {
    $db = new FakeDB([FakeDB::Return([])]);
    $data = new CdbUserData(132, $db);
    $data->get(['test']);

    $query = $db->actions()[0];
    $this->assertStringContainsString('UsersData', $query['sql']);
    $this->assertStringContainsString('userID = ?i', $query['sql']);
    $this->assertStringContainsString('dataName IN (?a)', $query['sql']);
    $this->assertEquals([132, ['test']], $query['args']);
  }

  /** @test **/
  public function get_emptyObject() {
    $db = new FakeDB([FakeDB::Return([])]);
    $data = new CdbUserData(132, $db);

    $this->assertEquals('{}', json_encode($data->get([])));
  }

  /** @test **/
  public function get_createField() {
    $db = new FakeDB([FakeDB::Return([
      ['dataName' => 'test', 'data' => '{"key":"value"}']
    ])]);
    $data = new CdbUserData(132, $db);

    $this->assertEquals('{"test":{"key":"value"}}', json_encode($data->get(['test'])));
  }

  /** @test **/
  public function get_createComplexField() {
    $db = new FakeDB([FakeDB::Return([
      ['dataName' => 'test', 'data' => '{"obj":{"key":"value"}}']
    ])]);
    $data = new CdbUserData(132, $db);

    $this->assertEquals('value', $data->get(['test'])->test->obj->key);
  }

  /** @test **/
  public function get_emptyFieldByDefault() {
    $db = new FakeDB([FakeDB::Return([])]);
    $data = new CdbUserData(132, $db);

    $this->assertEquals('{"test":{}}', json_encode($data->get(['test'])));
  }

  /** @test **/
  public function put_query() {
    $db = new FakeDB([]);
    $data = new CdbUserData(132, $db);

    $val = new \stdClass();
    $val->key = 1;
    $data->put('test', $val);

    $query = $db->actions()[0];
    $this->assertStringContainsStringIgnoringCase('replace into UsersData', $query['sql']);
    $this->assertStringContainsString('(userID, dataName, data)', $query['sql']);
    $this->assertStringContainsStringIgnoringCase('values(?i, ?s, ?s)', $query['sql']);
    $this->assertEquals([132, 'test', '{"key":1}'], $query['args']);
  }

  /** @test **/
  public function delete() {
    $db = new FakeDB([]);
    $data = new CdbUserData(132, $db);

    $data->delete('test');

    $query = $db->actions()[0];
    $this->assertStringContainsStringIgnoringCase('delete from UsersData', $query['sql']);
    $this->assertStringContainsString('(userID = ?i)', $query['sql']);
    $this->assertStringContainsString('(dataName = ?s)', $query['sql']);
    $this->assertEquals([132, 'test'], $query['args']);
  }
}
?>
