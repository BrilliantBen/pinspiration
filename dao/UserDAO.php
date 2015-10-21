<?php

require_once WWW_ROOT . 'dao' . DIRECTORY_SEPARATOR . 'DAO.php';

class UserDAO extends DAO {

	public function selectAll() {
		$sql = "SELECT *
		FROM `ins_users`";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	public function selectById($id) {
		$sql = "SELECT *
		FROM `ins_users`
		WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		$stmt->execute();
		$result = $stmt->fetch(PDO::FETCH_ASSOC);
		if($result){
			return $result;
		}
		return [];
	}

	public function selectByEmail($email) {
		$sql = "SELECT *
		FROM `ins_users`
		WHERE `email` = :email";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':email', $email);
		$stmt->execute();
		$result = $stmt->fetch(PDO::FETCH_ASSOC);
		if($result){
			return $result;
		}
		return false;
	}

	public function insert($data) {
		$errors = $this->getValidationErrors($data);
		if(empty($errors)) {
			$sql = "INSERT INTO `ins_users` (`name`, `email`, `password`)
			VALUES (:name, :email, :password)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':name', $data['name']);
			$stmt->bindValue(':email', $data['email']);
			$stmt->bindValue(':password', $data['password']);
			if($stmt->execute()) {
				$insertedId = $this->pdo->lastInsertId();
				return $this->selectById($insertedId);
			}
		}
		return false;
	}

	public function getValidationErrors($data) {
		$errors = array();
		if(empty($data['name'])) {
			$errors['name'] = 'field name has no value';
		}
		if(empty($data['email'])) {
			$errors['email'] = 'field email has no value';
		}
		if(empty($data['password'])) {
			$errors['password'] = 'field password has no value';
		}
		return $errors;
	}

	/*public function login($id) {
		$sql = "UPDATE `ins_users` SET `loggedIn` = 1 WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		if($stmt->execute()){
			return $this->selectById($id);
		}
		return false;
	}

	public function logout($id) {
		$sql = "UPDATE `ins_users` SET `loggedIn` = 0 WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		if($stmt->execute()){
			return $this->selectById($id);
		}
		return false;
	}

	public function selectByUsername($username) {
		$sql = "SELECT *
						FROM `ins_users`
						WHERE `username` = :username";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':username', $username);
		$stmt->execute();
		$result = $stmt->fetch(PDO::FETCH_ASSOC);
		if($result){
			return $result;
		}
		return [];
	}

	public function update($id, $data) {
		$errors = $this->getValidationErrorsOnUpdate($data);
		if(empty($errors)) {
			$sql = "UPDATE `ins_users` SET `email` = :email, `groupid` = :groupid, `loggedIn` = :loggedIn, `name` = :name, `password` = :password WHERE `id` = :id";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':email', $data['email']);
			$stmt->bindValue(':groupid', $data['groupid']);
			$stmt->bindValue(':loggedIn', $data['loggedIn']);
			$stmt->bindValue(':name', $data['name']);
			$stmt->bindValue(':password', $data['password']);
			$stmt->bindValue(':id', $id);
			if($stmt->execute()){
				return $this->selectById($id);
			}
		}
		return false;
	}

	public function getValidationErrorsOnUpdate($data) {
		$errors = array();
		if(empty($data['name'])) {
			$errors['name'] = 'field name has no value';
		}
		if(empty($data['email'])) {
			$errors['email'] = 'field email has no value';
		}
		if(empty($data['password'])) {
			$errors['password'] = 'field password has no value';
		}
		if(empty($data['loggedIn'])) {
			$errors['loggedIn'] = 'field loggedIn has no value';
		}
		if(empty($data['groupid'])) {
			$errors['groupid'] = 'field groupid has no value';
		}
		return $errors;
	}*/

}
