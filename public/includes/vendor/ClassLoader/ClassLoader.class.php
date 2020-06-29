<?php
class ClassLoader {
	private static $_paths = [];

	public static function add($path) {
		self::$_paths[] = $path;
	}

	public static function load($class) {
		$file = str_replace('\\', DIRECTORY_SEPARATOR, $class);
		if(DIRECTORY_SEPARATOR != $file[1])
			$file = DIRECTORY_SEPARATOR . $file;
		$file .= '.class.php';
		foreach (self::$_paths as $dir) {
			$path = $dir . $file;
			if(is_readable($path)) {
				include_once($path);
				return(true);
			}
		}
		return(false);
	}
}

spl_autoload_register(__NAMESPACE__ . '\ClassLoader::load');
?>