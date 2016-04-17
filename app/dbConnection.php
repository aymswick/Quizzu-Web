<?php
function getConnection(){
$host="localhost";
$dbname="quizzu";
$username="root";
$password="th1s1sR()()T";

//establish conn

$dbConn= new PDO("mysql:host=$host;dbname=$dbname",$username,$password);

//Setting Errorhandling to Exception

$dbConn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

return $dbConn;




}




?>
