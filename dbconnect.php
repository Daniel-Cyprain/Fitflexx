<?php
//declare the variables
$dbhost='localhost';
$dbname='logbook';
$dbuser='root';
$dbpass='';
    // create data source name
    $dsn ='mysql:host='.$dbhost.';dbname='.$dbname;
    try {
        $conec = new PDO($dsn, $dbuser, $dbpass);
    } catch (PDOException $err) {
        echo'connection failed'.$err->getMessage();
    }//PDO = php data object