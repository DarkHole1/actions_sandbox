<?php
namespace Core;

class CSessionApi {
  private $_active = null;

  private function destroy() {
    $_SESSION = array();
    if (ini_get("session.use_cookies")) {
      $params = session_get_cookie_params();
      setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
      );
    }
    session_destroy();
  }

  public function isActive() {
    if(is_null($this->_active)){
      $this->_active = false;
      if(isset($_COOKIE[session_name()])) {
        session_start(['cookie_lifetime' => 86400]);

        $UID = $_SESSION['_uid'] ?? '';
        $this->_active = $this->userUID() == $UID;
        if(!$this->_active) {
          $this->destroy();
        }
      }
    }

    return $this->_active;
  }

  private function userUID() {
    return md5($_SERVER['HTTP_USER_AGENT']);
  }

  public function set($name, $value) {
    $_SESSION[$name] = $value;
  }

  public function get($name) {
    return $_SESSION[$name] ?? null;
  }

  public function init() {
    if(!$this->isActive()) {
      session_start(['cookie_lifetime' => 86400]);
      $_SESSION['_uid'] = $this->userUID();
    }

    $this->_active = true;
  }

  public function clear() {
    if($this->isActive()) {
      $this->destroy();
    }
    $this->_active = false;
  }
}
?>
