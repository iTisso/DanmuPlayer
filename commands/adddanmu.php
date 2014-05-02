<?php
$option = $options;
if (count($option) == 6) {
    connectSQL();
    Global $SQL;
    $videoid = $option[0];
    $type    = $option[1];
    $content = $option[2];
    $time    = $option[3];
    $color   = $option[4];
    $size    = intval($option[5]);
    if (!$videoid) {
        echo "Error:No video id.";
        return;
    }
    if ($type > 5 || $type < 0) {
        $type = 0;
    }
    if (($time % 1) != 0) {
        echo "Error:invalid time.";
        return;
    }
    if ($color != "NULL") {
        /*preg_match("/^rgb\(\d\d\d,\d\d\d,\d\d\d\)$/i", $color, $matches);
        if ($matches == $color) {
            preg_match("/(\d\d\d),(\d\d\d),(\d\d\d)/i", $color, $matches);
            $color = $matches[1] . $matches[2] . $matches[3];
        } else {*/
            preg_match("/[\w\d]{6}/i", $color, $matches);
            if ($matches[0]) {
                $color = $matches[0];
            } else {
                $color = "NULL";
            }
       /* }*/
    }else{
    	$color=NULL;
    }
    
    
    if (!($size > 0)) {
        $size = 30;
    }
    $stmt = mysqli_stmt_init($SQL);
    $date=date("Y-m-d");
    mysqli_stmt_prepare($stmt, "INSERT into danmu (`id`, `videoid`, `type`, `content`, `time`, `color`, `size`,`date`) VALUES (NULL,?, ?, ?, ?, ?, ?,?)");
    mysqli_stmt_bind_param($stmt, "iisisis", $videoid, $type, $content, $time, $color, $size,$date);
    mysqli_stmt_execute($stmt);
    if (mysqli_error($SQL)) {
        echo (mysqli_error($SQL));
    } else {
        echo mysqli_insert_id($SQL);
    }
} else {
    echo "Error:参数数量错误:";
    for ($i = 0; $i < count($option); $i++) {
        echo $option[$i] . ";";
    }
}

?>