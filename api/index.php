<?php

define("WWW_ROOT", dirname(dirname(__FILE__)).DIRECTORY_SEPARATOR);

require_once WWW_ROOT. "dao" .DIRECTORY_SEPARATOR. "UserDAO.php";
require_once WWW_ROOT. "dao" .DIRECTORY_SEPARATOR. "PinDAO.php";
require_once WWW_ROOT. "api" .DIRECTORY_SEPARATOR. "Slim". DIRECTORY_SEPARATOR ."Slim.php";
require_once WWW_ROOT . "phpass" .DIRECTORY_SEPARATOR. "Phpass.php";
require_once WWW_ROOT . 'php-image-resize' .DIRECTORY_SEPARATOR. 'ImageResize.php';


\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

require_once WWW_ROOT. "api" .DIRECTORY_SEPARATOR. "routes" .DIRECTORY_SEPARATOR. "users.php";
require_once WWW_ROOT. "api" .DIRECTORY_SEPARATOR. "routes" .DIRECTORY_SEPARATOR. "login.php";
require_once WWW_ROOT. "api" .DIRECTORY_SEPARATOR. "routes" .DIRECTORY_SEPARATOR. "logout.php";
require_once WWW_ROOT. "api" .DIRECTORY_SEPARATOR. "routes" .DIRECTORY_SEPARATOR. "pins.php";

$app->run();
