<?php

require_once WWW_ROOT . 'dao' . DIRECTORY_SEPARATOR . 'DAO.php';

class PinDAO extends DAO {

	public function selectAll() {
		$sql = "SELECT *
		FROM `ins_content`";
		$stmt = $this->pdo->prepare($sql);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	public function selectTagsById($userid) {
		$sql = "SELECT `type`
		FROM `ins_content`
		WHERE `user_id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $userid);
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}

	public function selectById($id) {
		$sql = "SELECT *
		FROM `ins_content`
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

	public function selectByUserId($user_id) {
		$sql = "SELECT *
		FROM `ins_content`
		WHERE `user_id` = :user_id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':user_id', $user_id);
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		if($result){
			return $result;
		}
		return false;
	}

	public function update($id, $data) {
		$errors = $this->getValidationErrors($data);
		if(empty($errors)) {
			$sql = "UPDATE `ins_content`
			SET `author` = :author,
			`type` = :type,
			`content` = :content,
			`user_id` = :user_id
			WHERE `id` = :id";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':author', $data['author']);
			$stmt->bindValue(':type', $data['type']);
			$stmt->bindValue(':content', $data['content']);
			$stmt->bindValue(':user_id', $data['user_id']);
			$stmt->bindValue(':id', $id);
			if($stmt->execute()) {
				return $this->selectById($id);
			}
		}
		return false;
	}

	public function insert($data) {
		$errors = $this->getValidationErrors($data);
		if(empty($errors)) {
			$sql = "INSERT INTO `ins_content` (`author`, `type`, `content`, `user_id`)
			VALUES (:author, :type, :content, :user_id)";
			$stmt = $this->pdo->prepare($sql);
			$stmt->bindValue(':author', $data['author']);
			$stmt->bindValue(':type', $data['type']);
			$stmt->bindValue(':content', $data['content']);
			$stmt->bindValue(':user_id', $_SESSION['user']['id']);
			if($stmt->execute()) {
				$insertedId = $this->pdo->lastInsertId();
				return $this->selectById($insertedId);
			}
		}
		return false;
	}

	public function getValidationErrors($data) {
		$errors = array();
		if(empty($data['author'])) {
			$errors['author'] = 'field author has no value';
		}
		if(empty($data['type'])) {
			$errors['type'] = 'field type has no value';
		}
		if(empty($data['content'])) {
			$errors['content'] = 'field password has no value';
		}
		return $errors;
	}

	public function delete($id) {
		$sql = "DELETE
		FROM `ins_content`
		WHERE `id` = :id";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':id', $id);
		return $stmt->execute();
	}


	public function selectByTag($tag, $userid) {
		$sql = "SELECT *
		FROM `ins_content`
		WHERE `type` LIKE :tag
		AND `user_id` = :userid";
		$stmt = $this->pdo->prepare($sql);
		$stmt->bindValue(':tag', $tag);
		$stmt->bindValue(':userid', $userid);
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		if($result){
			return $result;
		}
		return [];
	}

}
