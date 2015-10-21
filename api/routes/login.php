<?php

$userDAO = new UserDAO();

$app->post('/login/?', function() use ($app, $userDAO){
	header("Content-Type: application/json");
	$post = $app->request->post();

	if(empty($post)){
		$post = (array) json_decode($app->request()->getBody());
	}

	if(!empty($post['email']) && !empty($post['password'])) {

		$user = $userDAO->selectByEmail($post['email']);

		if(!empty($user)) {

			$hasher = new \Phpass\Hash;

			if ($hasher->checkPassword($post['password'], $user['password'])) {
				$user = $userDAO->selectById($user['id']);
				$user["loggedIn"] = true;
				$_SESSION['user'] = $user;

				echo json_encode($user, JSON_NUMERIC_CHECK);
			} else {
				echo '{"error":"Fout wachtwoord."}';
			}

		} else {
			echo '{"error":"Foute gebruiker."}';
		}
	} else {
		echo '{"error":"Vul alles in..."}';
	}
});
