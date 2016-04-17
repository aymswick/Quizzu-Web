<?php

session_start(); //Start a new session or resume an existing session
require 'dbConnection.php';
$dbConn = getConnection();

$email = $_POST['email'];
$password = $_POST['password']; //NEED TO WRAP IN SHA1!@#!@#!@#//encryption using sha1 method directly
//$password = hash("sha1", $_POST['password']); //Another way to do the line above

$sql = "SELECT * FROM quizzu.users WHERE email = :email AND password = :password";

$stmt = $dbConn->prepare($sql);
$namedParameters = array();
$namedParameters[":email"] = $email;
$namedParameters[":password"] = $password;
$stmt->execute($namedParameters);
$result = $stmt->fetch();


//print_r($result);

if (empty($result)) {
       // header("Location: fail.php?error=Wrong username or password!");
	header("Location: fail.php");
} else {
//
      $_SESSION['email'] = $result['email'];

//        $myfile = fopen("log.txt", "a");
//        $date= $_SESSION['email']. " ". date("Y/m/d") .  " " . date("h:i:sa") . "\n";
//        $_SESSION['date'] = "Today is " . $date;

//   fwrite($myfile , $date);

//  fclose($myfile);

//        $_SESSION['adminName'] = $result['firstName'] . " " . $result['lastName'];
        header("Location: index.html"); //redirects users to a new file

}


?>
