<?php
if($_SERVER['REMOTE_ADDR'] === '127.0.0.1' or $_SERVER['REMOTE_ADDR'] === '::1') {
	header('Access-Control-Allow-Origin: http://localhost:3000');
	header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type');
	header('Access-Control-Allow-Credentials: true');
}

include_once(__DIR__ . '/../configs/_configs.php');
include_once(__DIR__ . '/vendor/ClassLoader/ClassLoader.class.php');
ClassLoader::add(__DIR__);
ClassLoader::add(__DIR__ . '/vendor');

date_default_timezone_set('UTC');
Logger::setFlushCallback(function($log){
		(new DB\CdbLog())->save($log);
});
Logger::logLevel(2);

Logger::Debug('<script ip=\'%s\' time=\'%s\' script=\'%s\'/>',
	isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'unknown',
	date('Y.m.d H:i:s'),
	$_SERVER['PHP_SELF']
);
//////////////////////////////////////////
$SESSION = new Core\CSession();
$DB = new Database\CdbAdapter();
$usersRepository = new Core\CUsersRepository($SESSION, new Database\CdbUsers($DB));
$user = $usersRepository->currentUser();
//////////////////////////////////////////
function requireAuth() {
	global $user;
	if(!$user->isLogged()) {
		header('HTTP/1.0 401 Unauthorized');
		die(json_encode(['error' => 'Need authorization.']));
	}
}
?>
