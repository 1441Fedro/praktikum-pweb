<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "pweb_db";

$koneksi = mysqli_connect($host,$username,$password,$database);
if ($koneksi->connect_error) {
    die("Connection failed: " . $koneksi->connect_error);
}

?>