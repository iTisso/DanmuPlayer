<?php
$option = $options;
header("Content-Type:text/json", true);
if (isID($option[0])) {
    if (connectSQL()) {
        Global $SQL;
        $stmt = mysqli_stmt_init($SQL);
        mysqli_stmt_prepare($stmt, "SELECT address,count FROM video WHERE id=?");
        mysqli_stmt_bind_param($stmt, "i", $option[0]);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_bind_result($stmt, $address, $count);
        mysqli_stmt_fetch($stmt);
            if (! $address) {
                echo "Error";
                return;
            }
            if (!$count) {
                $count = 0;
            } 
            $addresses=explode(";",$address);
 		$json = '{url:[';
 		for($i=0;$i<count($addresses);$i++){
 			$json.='"'.translateAddress($addresses[$i]).'"';
 			if($i!=count($addresses)-1){
 				$json.=",";
 			}
 		}

 		$json.='],count:' . $count . '}';
           /* if(count($addresses)==1){

            }*/
           // $json = '{url:"' . $address. '",count:' . $count . '}';

            echo $json;
            $newc=abs($count)+1;
            mysqli_stmt_prepare($stmt, 'UPDATE  `video` SET  `count` =? WHERE  `id` =?');
        mysqli_stmt_bind_param($stmt, "ii",$newc, $option[0]);
        mysqli_stmt_execute($stmt);
           // mysqli_query($SQL,'UPDATE  `video` SET  `count` = "'.$newc.'" WHERE  `id` ='.$option[0]);
        }
        else{
        	echo "Error";
                return;
        }
        
    
} else {
    echo "Error";
}

?>