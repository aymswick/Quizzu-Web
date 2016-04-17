<?php
session_start(); //Start a new session or resume an existing session
require 'dbConnection.php';
$dbConn = getConnection();

$username = $_POST['signupEmail'];
$password $_POST['signupPassword']; //Another way to do the line above


$stmt = $dbConn->prepare($sql);
$namedParameters = array();
$namedParameters[":signupEmail"] = $username;
$namedParameters[":signupPassword"] = $password;
$stmt->execute($namedParameters);
$result = $stmt->fetch();





if (empty($result)) {

	

} else {
	
	//check if name exist
	`
	$_SESSION['username'] = $result['username'];
	$_SESSION['adminName'] = $result['firstName'] . " " . $result['lastName'];
	header("Location: index.html"); //redirects users to a new file

	

}





?>

