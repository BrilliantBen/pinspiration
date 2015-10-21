<?php

$pinDAO = new PinDAO();


$app->get('/pins/?',function() use ($pinDAO){
	header("Content-Type: application/json");
	$data = $pinDAO->selectByUserId($_SESSION['user']['id']);



	if(!empty($_SESSION['user'])){
		echo json_encode($data, JSON_NUMERIC_CHECK);
	}
	else {
		echo json_encode($fail, JSON_NUMERIC_CHECK);
	}

	exit();
});

$app->post('/pins/?', function() use ($app, $pinDAO){
	header("Content-Type: application/json");
	$post = $app->request->post();

	if(empty($post)){
		$post = (array) json_decode($app->request()->getBody());
	}

	if(empty($post['author'])){
		$post['author'] = 'none';
	}

	$errors = array();

	if(!empty($_POST['file'])) {

		$dataURL = $_POST['file'];
		$data = explode(',', $dataURL)[1];
		$data = base64_decode($data);
		$file = uniqid();
		$name = preg_replace("/\\.[^.\\s]{3,4}$/", "", $file);

		$location = WWW_ROOT . 'uploads/images/' . $_POST['content'];
		$success = file_put_contents($location, $data);

		$upload =$pinDAO->insert($post);


		if(!empty($upload)) {

			$image = new Eventviva\ImageResize($location);
			$image->resizeToWidth(800);
			$image->save(WWW_ROOT . 'uploads/images/'. 'large_' .$_POST['content']);
			$image->resizeToWidth(300);
			$image->save(WWW_ROOT . 'uploads/images/' .$_POST['content']);

			echo json_encode($upload);

		}
	}
	else{
		echo json_encode($pinDAO->insert($post), JSON_NUMERIC_CHECK);
	}
});


$app->get('/pins/tags/?', function() use ($pinDAO){
	header("Content-Type: application/json");
	echo json_encode($pinDAO->selectTagsById($_SESSION['user']['id']), JSON_NUMERIC_CHECK);
	exit();
});

$app->get('/pins/tags/:tag/?', function($tag) use ($pinDAO){
	header("Content-Type: application/json");
	echo json_encode($pinDAO->selectByTag($tag, $_SESSION['user']['id']), JSON_NUMERIC_CHECK);
	exit();
});

$app->delete('/pins/:id/?', function($id) use ($pinDAO){
	header("Content-Type: application/json");
	$data = $pinDAO->selectById($id);
	if($data['type']=="imageupload"){
	$path= WWW_ROOT . 'uploads/images/' .$data['content'];
	$path2= WWW_ROOT . 'uploads/images/large_' .$data['content'];
	unlink($path);
	unlink($path2);
}

	echo json_encode($pinDAO->delete($id));
});



$app->put('/pins/:id/?', function($id) use ($app, $pinDAO){
	header("Content-Type: application/json");
	$post = $app->request->post();
	if(empty($post)){
		$post = (array) json_decode($app->request()->getBody());
	}
	echo json_encode($post);
	echo json_encode($pinDAO->update($id, $post), JSON_NUMERIC_CHECK);
	exit();
});





