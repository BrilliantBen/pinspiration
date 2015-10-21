<?php


$app->get('/logout/?',function() use ($userDAO){
	header("Content-Type: application/json");
	$data = $userDAO->selectAll();
	$fail = "failed";

	if(!empty($_SESSION['user'])){
		echo json_encode($_SESSION['user'], JSON_NUMERIC_CHECK);
		$_SESSION['user'] = "";

	}
	else {
		echo json_encode($fail, JSON_NUMERIC_CHECK);
	}

	exit();
});




