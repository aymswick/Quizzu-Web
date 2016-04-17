<?php

$connection = new Mongo();

$connecting_string=sprintf('mongodb://%s:%d/%s', $hosts, $port, $database),
$connection= new Mongo($connecting_string,array('username'=>$username,'password'=>$password));

$dbname = $connection->selectDB('login');

?>
