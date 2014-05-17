var  cmd_url="command.php"; 
function cmd(command, bool, callback) { //bool为是否需要等待返回参数
	if (typeof(bool) != "boolean") {
		bool = true;
	}
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			if (!bool) {
				//console.log("异步接收到了命令:" + command + "的成功回应\n执行回调函数");
				(function(r){
					callback(r);
				})(xmlhttp.responseText);
			}
		}
	}
	xmlhttp.open("POST", cmd_url,!bool);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	command = command.replace(/(^\s*)|(\s*$)/g, "");
	xmlhttp.send("cmd=" + command);
	console.log("命令:" + command);
	if (bool) {
		while (! (xmlhttp.responseText)) {}
		return xmlhttp.responseText;
	}
}

function cmd_unitrans(string) {
	if (typeof(string) == "string") {
		return  escape(escape(string));
	}else if(typeof string=="number"){
		return string;
	}
	else {
		console.log(string);
	}
}
function formArguments(){
	var command = "";
	for (var i = 0; typeof(arguments[i]) == "string"||typeof(arguments[i]) == "number"; i++) {
				command += cmd_unitrans(arguments[i]);
				if (i <=( length - 1)) {
					command += " ";
				}
			}
			return command;
}
function autocmd() {
	var callback, length = arguments.length;
	var command = "";
	if (arguments.length >= 2) {
		if (typeof(arguments[length - 1]) == "function") {
			callback = arguments[length - 1];
			for (var i = 0; typeof(arguments[i]) == "string"||typeof(arguments[i]) == "number"; i++) {
				command += cmd_unitrans(arguments[i]);
				if (i <=( length - 2)) {
					command += " ";
				}
			}
			cmd(command, false, callback);
		}
	} else {
		for (var i = 0; typeof(arguments[i]) == "string"||typeof(arguments[i]) == "number"; i++) {
			command += cmd_unitrans(arguments[i]);
			if (i < length - 1) {
				command += " ";
			}
		}
		return cmd(command, true);
	}
}