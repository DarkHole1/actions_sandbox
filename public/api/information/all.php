<?php
header('Content-Type: application/json');
include '../../includes/_preconfigure.php';

requireAuth();
// TODO: Impl. CUserInformation class
// TODO: Impl. Returning CUserInformation from user->information
// TODO: Impl. CUserInformation->all()
echo json_encode($user->information()->all());
?>
