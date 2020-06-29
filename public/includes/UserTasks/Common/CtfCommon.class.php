<?php
namespace UserTasks\Common;

class CtfCommon {
  private $_data;

  public function __construct($data) {
    $this->_data = $data;
  }

  public function isValid() {
    if('' == $this->_data->artist) return false;
    if('' == $this->_data->track) return false;

    if('' == $this->_data->date) return false;
    if(!\Globals\Time::validString($this->_data->date)) return false;

    return true;
  }

  public function toArray() {
    return [
      'artist' => $this->_data->artist,
      'track' => $this->_data->track,
      'description' => $this->_data->description,
      'date' => $this->_data->date
    ];
  }
}
?>
