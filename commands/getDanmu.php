<?php
$option=$options;
header("Content-Type:text/json",true);
if(isID($option[0])){
	connectSQL();
	Global $SQL;
	$stmt = mysqli_stmt_init($SQL);
	mysqli_stmt_prepare($stmt, "SELECT id,type,content,time,color,size,date FROM danmu WHERE videoid=?");
	mysqli_stmt_bind_param($stmt, "i", $option[0]);
	 mysqli_stmt_execute($stmt);
        mysqli_stmt_bind_result($stmt, $id,$type,$content,$time,$color,$size,$date);
        $arr=[];
	for($i=0;mysqli_stmt_fetch($stmt);$i++){
		if(!$id){
			echo "Error";
			return;
		}
		$arr[$i]='{id:'.$id.
			',ty:'.$type.
			',c:"'.($content).'"';
		if($time>=0)$arr[$i]=$arr[$i].',t:'.($time?$time:0);
		if($color)$arr[$i]=$arr[$i].',co:"'.$color.'"';
		if($size)$arr[$i]=$arr[$i].',s:'.$size;
		$arr[$i]=$arr[$i].',d:"'.($date?$date:"0000-00-00");
		$arr[$i]=$arr[$i].'"}';
	}
	if(count($arr)>=0){
		echo json_encode($arr);
	}else{
		echo "Error";
	}
	
}else{
	echo "Error";
}

?>