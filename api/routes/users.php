<?php
session_start();


$userDAO = new UserDAO();


$app->get('/users/?',function() use ($userDAO){
	header("Content-Type: application/json");
	$data = $userDAO->selectAll();
	$fail = "failed";

	foreach ($data as $key => $value) {
		unset($data[$key]['email']);
		unset($data[$key]['password']);
	}

	if(!empty($_SESSION['user'])){
		echo json_encode($data, JSON_NUMERIC_CHECK);
	}
	else {
		echo json_encode($fail, JSON_NUMERIC_CHECK);
	}

	exit();
});


$app->get('/users/:id/?',function($id) use ($userDAO){
	header("Content-Type: application/json");
	$data = $userDAO->selectById($id);

	foreach ($data as $key => $value) {
		unset($data['email']);
		unset($data['password']);
	}

	echo json_encode($data, JSON_NUMERIC_CHECK);
	exit();
});

$app->put('/users/:id/?', function($id) use ($app, $userDAO){
	header("Content-Type: application/json");
	$post = $app->request->post();
	if(empty($post)){
		$post = (array) json_decode($app->request()->getBody());
	}
	echo json_encode($userDAO->update($id, $post), JSON_NUMERIC_CHECK);
	exit();
});

$app->get('/users/emails/:email/?',function($email) use ($userDAO){
	header("Content-Type: application/json");
	echo json_encode($userDAO->selectByEmail($email), JSON_NUMERIC_CHECK);
	exit();
});

$app->post('/users/?', function() use ($app, $userDAO){
	header("Content-Type: application/json");
	$post = $app->request->post();

	if(empty($post)){
		$post = (array) json_decode($app->request()->getBody());
	}

	if(!empty($post['name']) && !empty($post['email']) && !empty($post['password'])) {

		$errors = array();

		$words = explode(' ', $post['name']);
		if(count($words) < 2){
			array_push($errors, "Voor -en achternaam.");
		}

		$pattern = "/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/";
		if(preg_match($pattern, $post['email']) == 0){
			array_push($errors, "Foute email...");
		}

		if(count($errors) == 1){
			echo '{"error": "'.$errors[0].'"}';
		}

		if(count($errors) == 2){
			echo '{"error": "Foute naam en email."}';
		}

		else if(count($errors) == 0){
			$hasher = new \Phpass\Hash;
			$passwordHash = $hasher->hashPassword($post["password"]);
			$post["password"] = $passwordHash;
			echo json_encode($userDAO->insert($post), JSON_NUMERIC_CHECK);
		}

	}
	else {
		echo '{"error": "Vul alles in..."}';
	}
});


