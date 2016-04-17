<?php 
require "dbConnection.php";
$dbConn=getConnection();
$sql = "SELECT email FROM quizzu.users WHERE email = :email";
$namedParameters = array();
$namedParameters[':email'] = $_GET['email'];
echo "Available";
$stmt = $dbConn->prepare($sql);
$stmt->execute($namedParameters);
return $stmt->fetch();
$availability = array();


if (!empty($result)){
	$availability["available"]="true";
	//INSERT THE EMAIL INTO THE DATABASE
	$email=$namedParameters[':signupEmail'];
	$password = $_GET[':signupPassword'];
	$sql="INSERT INTO quizzu.users (email, pasword) VALUES ('$_GET['email'], 
}
else {
	//echo "Not Available";
	$availability["availiable"]="false";
}

echo json_encode($availability);

?>
