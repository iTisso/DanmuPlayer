<?php
require_once("config.php");

function connectSQL(){
	Global $SQL;
	$SQL=mysqli_connect(sqlAddress,sqlUser,sqlPass,dbname);
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
function getYouKuAddress($id){
	return "http://m.youku.com/wap/pvs?format=3gphd&id=".$id;
}

function translateAddress($address){
	preg_match_all("/\w+/i",$address,$result);
	if($result)$pre=$result[0][0];
	$url=$address;
	switch($pre){
		case "youku":{
			$url=getYouKuAddress($result[0][1]);
			break;
		}
	}
	return $url;
}
?>