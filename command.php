<?php
if (@$_POST['cmd']||@$_GET['cmd']) {
    /*在这里增加一些命令或许可检测*/
    if (true) { //查找指令前判断是否要执行
        require_once("funs.php");
        function unescape($escstr)
        {
            preg_match_all("/%u[0-9A-Za-z]{4}|%.{2}|[0-9a-zA-Z.+-_]+/", $escstr, $matches);
            $ar =& $matches[0];
            $c = "";
            foreach ($ar as $val) {
                if (substr($val, 0, 1) != "%") {
                    $c .= $val;
                } elseif (substr($val, 1, 1) != "u") {
                    $x = hexdec(substr($val, 1, 2));
                    $c .= chr($x);
                } else {
                    $val = intval(substr($val, 2), 16);
                    if ($val < 0x7F) // 0000-007F 
                        {
                        $c .= chr($val);
                    } elseif ($val < 0x800) // 0080-0800 
                        {
                        $c .= chr(0xC0 | ($val / 64));
                        $c .= chr(0x80 | ($val % 64));
                    } else // 0800-FFFF 
                        {
                        $c .= chr(0xE0 | (($val / 64) / 64));
                        $c .= chr(0x80 | (($val / 64) % 64));
                        $c .= chr(0x80 | ($val % 64));
                    }
                }
            }
            return $c;
        }
        
        function cmd($cmd)
        {
            global $options;
            $options = explode(" ", $cmd);
            $script  = unescape(array_shift($options));
            for ($ind = 0; $ind < count($options); $ind++) {
                $options[$ind] = unescape($options[$ind]);
            }
            if (is_file("commands/" . $script . ".php")) {
                require_once("commands/" . $script . ".php");
            } else {
                echo "未找到命令:" . $script;
            }
        }
        if(@$_POST['cmd']){
        	cmd($_POST['cmd']);
        }elseif(@$_GET['cmd']){
        	cmd($_GET['cmd']);
        }
        
    } else {
        echo "无法执行";
    }
}
?>
