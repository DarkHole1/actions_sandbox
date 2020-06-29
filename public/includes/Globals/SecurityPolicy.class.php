<?php
namespace Globals;

class SecurityPolicy {
  public static function encryptPassword($login, $password) {
    return hash('sha256', $password . $login . $login . $password);
  }
}
?>
