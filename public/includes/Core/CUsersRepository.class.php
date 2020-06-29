<?php
namespace Core;

class CUsersRepository {
  private $_usersDB;
  private $_session;

  public function __construct($session, $usersDB) {
    $this->_session = $session;
    $this->_usersDB = $usersDB;
  }

  public function login($login, $password) {
    $user = $this->_usersDB->login($login, $password);
    if(is_null($user))
      return new CEmptyUser();

    $this->_session->init();
    $this->_session->item('id', $user->ID());
    return new CAuthUser($this->_session, $user);
  }

  public function currentUser() {
    $id = $this->_session->item('id');
    if(is_null($id))
      return new CEmptyUser();

    return new CAuthUser($this->_session, $this->_usersDB->byID($id));
  }
}
?>
