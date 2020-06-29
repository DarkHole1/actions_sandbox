<?php
namespace Core;

class CEmptyUser {
  public function isLogged() {
    return false;
  }

  public function toJsonString() {
    return '{}';
  }
}
?>
