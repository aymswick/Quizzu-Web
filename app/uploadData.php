<?php
session_start(); //Start a new session or resume an existing session
require "dbConnection.php";

$dbConn=getConnection();

$username = $_SESSION['email'];

$sql = "SELECT id FROM quizzu.users WHERE email = :email";
$stmt = $dbConn->prepare($sql);
$namedParameters = array();

$namedParameters[':email'] = $username;

$stmt->execute($namedParameters);
$result = $stmt->fetch();

$id=$result['id'];


if ($id) {
   $sql = "INSERT INTO quizzu.quizzes (id, question, title, correct, answers) VALUES (:id, :question, :title, :correct, :answers)";
   $namedParameter=array();
   $namedParameter[':id'] = $id;
   $namedParameter[':question'] = $_POST['question'];
   $namedParameter[':title'] = $_POST['title'];
   $namedParameter[':correct']= $_POST['correct'];
   $namedParameter[':answers']= "[ \"" . $_POST['answer1'] . "\", " . "\"" . $_POST['answer2'] . "\", " . "\"" . $_POST['answer3']. "\", " . "\"" . $_POST['answer4'] . "\" ]";
   $stmt = $dbConn->prepare($sql);
   $stmt->execute($namedParameter);

   header("Location: index.php");

 }
?>
