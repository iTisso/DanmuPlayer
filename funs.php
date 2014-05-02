<?php
require_once("config.php");

function connectSQL(){
	Global $SQL;
	$SQL=mysqli_connect(sqlAddress,sqlUser,sqlPass,"danmu");
if (!$SQL)
  {
  die('Could not connect: ' . mysqli_connect_error());
  return false;
  }
  return true;
}

function isID($id){
	$result=preg_match("/^\d+$/", $id);
	if($result)return true;
	else{return false;}
}

?>