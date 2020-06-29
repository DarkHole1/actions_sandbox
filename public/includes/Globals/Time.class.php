<?php
namespace Globals;

class Time {
  private static $_timeMock;

  public static function time() {
    return self::$_timeMock ?? time();
  }

  public static function mock($value) {
    self::$_timeMock = $value;
  }

  public static function validString($string) {
    $matches = array();
    $pattern = '/^([0-9]{2})\.([0-9]{2})\.([0-9]{4})$/';
    if (!preg_match($pattern, $string, $matches)) return false;
    if (!checkdate($matches[2], $matches[1], $matches[3])) return false;
    return true;
  }
}
?>
