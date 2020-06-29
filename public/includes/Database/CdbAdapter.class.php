<?php
namespace Database;

class __HACK_DB__ extends \DB\CdbBase {
  public static function get() {
    $self = new self();
    return $self->_db;
  }
}

class CdbAdapter {
  private $_db;

  public function __construct($db = null) {
    $this->_db = $db ?? __HACK_DB__::get();
  }

  public function all() {
    return call_user_func_array(array($this->_db, 'getAll'), func_get_args());
	}

	public function query(){
		call_user_func_array(array($this->_db, 'query'), func_get_args());

    $stats = new \stdClass();
    $stats->affected = $this->_db->affectedRows();
    $stats->insertId = $this->_db->insertId();

    return $stats;
	}
}
?>
