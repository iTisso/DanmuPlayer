function d_select(query) {
	if ((typeof arguments[0]) != "string" && arguments[0] != null) {
		return arguments[0].querySelector(arguments[1]);
	} else {
		return document.querySelector(query);
	}

}
function d_selectall(query) {
	if ((typeof arguments[0]) != "string" && arguments[0] != null) {
		return arguments[0].querySelectorAll(arguments[1]);
	} else {
		return document.querySelectorAll(query);
	}
}
function c_ele(tag) {
	return document.createElement(tag);
}

var _string_ = {
	removesidespace: function(string) {
		if (typeof string == "string") {
			var s = string.replace(/\s+$/, "");
			s = s.replace(/^\s+/, "");
			return s;
		} else {
			return false;
		}

	}
};
function aEL(dom, e, fun) { //添加事件监听
	if (dom.addEventListener) dom.addEventListener(e, fun, false);
	else if (dom.attachEvent) dom.attachEvent("on" + e, fun);
	else {
		dom["on" + e] = fun;
	}
}
function guessmime(url) { //猜测媒体mime类型
	var mimelist = {
		"mp4": "video/mp4",
		"mp3": "audio/mp3",
		"wav": "audio/x-wav",
		"webm": "video/webm"
	};
	var ext = getext(url);
	if (mimelist[ext]) {
		return mimelist[ext];
	} else {
		return false;
	}
}
function getext(url) { //获取后缀
	if (typeof url == "string") {
		ext = _string_.removesidespace(url);
		if (ext == "") return false;
		ext = ext.match(/(\.([0-9a-zA-Z]+))$/i);
		if (ext) {
			return ext[2].toLowerCase();
		} else {
			return false;
		}
	}
}
function getMin_Sec(time) {
	var t = {};
	t.min = Math.floor(time / 60);
	t.sec = Math.floor(time - t.min * 60);
	return t;
}
function getMin_Sec_By_Million(time) {
	time /= 1000;
	var t = {};
	t.min = Math.floor(time / 60);
	t.sec = Math.floor(time - t.min * 60);
	return t;
}
function setOption(name, value) {
	if ((typeof name != "string") || (typeof value != "string")) {
		console.log("错误的设置参数");
		return false;
	}
	if (localstoragesupport) {
		window.localStorage["playeroption:" + name] = value;
	} else {
		setCookie("playeroption:" + name, value);
	}
}

function getOption(name) {
	if (localstoragesupport) {
		var re = window.localStorage["playeroption:" + name];
		if (re) {
			return window.localStorage["playeroption:" + name];
		} else {
			return false;
		}

	} else {
		var re;
		if (re = getCookie("playeroption:" + name)) {
			return re;
		} else {
			return false;
		}

	}
}

function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return ""
}
function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "": ";expires=" + exdate.toGMTString())
}

function requestFullscreen(dom) {
	if (dom.requestFullscreen) {
		dom.requestFullscreen();
	} else if (dom.mozRequestFullScreen) {
		dom.mozRequestFullScreen();
	} else if (dom.webkitRequestFullScreen) {
		dom.webkitRequestFullScreen(dom['ALLOW_KEYBOARD_INPUT']);
	} else if (dom.msRequestFullScreen) {
		dom.msRequestFullScreen();
	}

}
function exitFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.webkitCancelFullScreen) {
		document.webkitCancelFullScreen();
	} else if (document.msExitFullScreen) {
		document.msExitFullScreen();
	}
}
function isFullscreen() {
	if (document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen || document.msFullscreenElement) return true;
}
function removeEleClass(e, classname) {
	if (classname != "" && classname != " " && e) e.classList.remove(classname);
}
function addEleClass(e, classname) {
	if (classname != "" && classname != " " && e) {
		e.classList.add(classname);
	}
}
function createswitch(in_name, in_bool, in_colorleft, in_colorright, out_object) {
	if (out_object) {
		var e = out_object;
	} else {
		var e = c_ele("div");
	}
	if (in_name) {
		e.name = in_name;
	}
	e.setAttribute("type", "switch");
	e.event = new Object();
	e.event.on = function() {
		e.event.bool = true;
		e.getElementsByTagName("div")[0].style.left = e.offsetWidth - 15 + "px";
	}
	e.event.off = function() {
		e.event.bool = false;
		e.getElementsByTagName("div")[0].style.left = "0px";
	}
	if (in_bool || in_bool == "true") {
		e.event.bool = true;
	} else {
		e.event.bool = false;
	}
	if (!in_colorleft) {
		in_colorleft = "#17B85E";
	}
	if (!in_colorright) {
		in_colorright = "#616161";
	}
	e.onclick = function() {
		if (e.event.bool) {
			e.event.off();
		} else {
			e.event.on();
		}
	}
	if (!e.style.position) e.style.position = "relative";
	/*e.style.width = "70px";
	e.style.height = "20px";*/
	//e.style.overflow = "hidden";
	e.innerHTML = '<div class="switch_center" style="left:' + (e.event.bool ? "55px": "0px") + '""><div class="switch_left" style="background-color:' + in_colorleft + '"></div><div class="switch_right" style="background-color:' + in_colorright + '"></div></div>';
	if (!out_object) {
		return e;
	}
}
function createRange(in_name, min, max, value, out_object) {
	if (out_object) {
		var e = out_object;
	} else {
		var e = c_ele("div");
	}
	if (in_name) {
		e.name = in_name;
	}
	e.setAttribute("type", "range");
	var bg = c_ele("div");
	e.appendChild(bg);
	e.appendChild(e.point = c_ele("div"));
	e.appendChild(e.cover = c_ele("div"));
	e.point.className = "rangePoint";
	e.cover.className = "rangeCover";
	bg.className = "rangebg";
	e.min = (min || min === 0) ? min: 0;
	e.max = (max || max === 0) ? max: 1;
	e.title = e.value = ((value || value === 0) ? value: (max + min) / 2);
	e.point.style.left = (e.value - e.min) / (e.max - e.min) * 251 + "px";
	e.
default = e.value;
	e.onmousedown = function(e) {
		e.preventDefault();
		if (e.button === 0) {
			this.ranging = true;
			var x = e.offsetX || e.layerX;
			this.point.style.left = x + "px";
			var va = this.min + (x / this.offsetWidth) * (this.max - this.min);
			//this.title=Math.round((this.value=va)*100)/100;
			this.sendValue(this.name, va);
		} else if (e.button == 2) {
			var x = this.offsetWidth * (this.
		default - this.min) / (this.max - this.min);
			this.point.style.left = x + "px";
			this.sendValue(this.name, this.
		default);
		}

	}
	e.oncontextmenu = function(e) {
		e.preventDefault();
	}
	e.onmousemove = function(e) {
		e.preventDefault();
		var x = e.offsetX || e.layerX;
		if (this.ranging) {

			this.point.style.left = x + "px";
			var va = this.min + (x / this.offsetWidth) * (this.max - this.min);
			//this.title=Math.round((this.value=va)*100)/100;
			this.sendValue(this.name, va);
		}
		this.title =(this.min + (x / this.offsetWidth) * (this.max - this.min)).toFixed(3);
	}
	e.onmouseleave = function() {
		this.ranging = false;
	}
	e.onmouseup = function() {
		this.ranging = false;
	}
	/*e.ondrag=function(e){
		e.preventDefault();
		var x=e.layerX||e.x||offsetX;
			this.point.style.left=x+"px";
			var va=this.min+(x/this.offsetWidth)*(this.max-this.min);
			this.title=Math.round((this.value=va)*100)/100;
			this.sendValue(this.name,va);
	}*/
	e.sendValue = function() {};
	if (!e.style.position) e.style.position = "relative";
	if (!out_object) {
		return e;
	}
}
function replaceCommonVideo(videodom) {
	var id;
	if ((id = Number(videodom.getAttribute("videoid"))) >= 0) {
		autocmd("danmuplayer", id,
		function(html) {
			videodom.outerHTML = html;
			initPlayer(id);
		})
	}

}
function UseDanmuPlayer() {
	var videos = d_selectall('video[type="danmuplayer"]');
	for (var i = 0; i < videos.length; i++) {
		replaceCommonVideo(videos[i]);
	}
}
function isHexColor(color) {
	if (color) {
		if (color.match(/[\w\d]{6}/i)) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}
function toHexColor(colorString) {
	var c = colorString.match(/(\d+)/g);
	if (!c || c.length != 3) return false;
	var cs = "";
	for (var i = 0; i < c.length; i++) {
		if (c[i] <= 16) cs += "0";
		cs += Number(c[i]).toString(16);
	}
	return cs;
}
function initPlayer(_in_videoid) {
	var videoid = _in_videoid;
	var width, height;
	var player = {},
	interval = {},
	intervalfuns = {},
	controlfuns = {};
	localstoragesupport = window.localStorage ? true: false;

	var danmulist = [],
	danmufuns = {},
	danmuobjlist = [],
	danmuarray = [],
	danmutunnel = {
		right: [],
		left: [],
		bottom: [],
		top: []
	},
	//moverInterval = 1000 / 61,
	moveTime = 5000,
	tunnelheight = 0,
	onshowdanmulist = [],
	timeline = [],
	danmucount,
	timepoint = 0,
	danmucontainer;
	var danmufirer, superdanmu;

	player.assvar = {};
	var danmuStyle = {
		fontsize: 30,
		color: null,
		type: 0
	};
	var COL, Glib, AnimationFrame;

	function setdom() {
		player.displaystat = "normal";
		player.mainbody = d_select(".playermainbody[videoid='" + videoid + "']");
		player.controler = d_select(player.mainbody, "#controler");
		player.colorinput = d_select(player.mainbody, "#colorinput");
		player.colorview = d_select(player.mainbody, "#colorview");
		player.sendcover = d_select(player.mainbody, "#sendbox #sendboxcover");
		player.danmuframe = d_select(player.mainbody, "#videoframe #danmuframe");
		player.danmulayer = d_select(player.mainbody, "#danmuframe #danmulayer");
		player.danmuctrl = d_select(player.mainbody, "#controler #danmuctrl");
		player.danmucount = d_select(player.mainbody, "#sidebar #ctrlpannel #danmucount");
		player.danmuinput = d_select(player.mainbody, "#sendbox #danmuinput");
		player.danmucontantor = d_select(player.mainbody, "#danmus");
		player.danmulistbutton = d_select(player.mainbody, "#sidebar #ctrlpannel #danmulistbutton");
		player.fullscreen = d_select(player.mainbody, "#controler #fullscreen");
		player.loadinfo = d_select(player.mainbody, "#progress #loadinfo");
		player.loop = d_select(player.mainbody, "#controler #loop");
		player.optionbutton = d_select(player.mainbody, "#optionbutton");
		player.optionpannel = d_select(player.mainbody, "#optionpannel");
		player.play_pause = d_select(player.mainbody, "#play_pause");
		player.playcount = d_select(player.mainbody, "#playcount");
		player.progress = d_select(player.mainbody, "#progress");
		player.playbutton = d_select(player.mainbody, "#play_pause #play");
		player.pausebutton = d_select(player.mainbody, "#play_pause #pause");
		player.timepoint = d_select(player.mainbody, "#controler #progress #timepoint");
		player.time = d_select(player.mainbody, "#controler #time");
		player.tabpages = d_selectall(player.mainbody, ".tabpage");
		player.ctrlbuttons = d_selectall(player.mainbody, ".ctrlbutton");
		player.sidebarSwitch = d_select(player.mainbody, "#controler #sidebarctrl");
		player.sidebar = d_select(player.mainbody, "#sidebar");
		player.sendbox = d_select(player.mainbody, "#sendbox");
		player.statboard = d_select(player.mainbody, "#sidebar #ctrlpannel #statboard");
		player.superdanmubutton = d_select(player.mainbody, "#sidebar #ctrlpannel #superdanmubutton");
		player.video = d_select(player.mainbody, "#videoframe #video");
		player.videoframe = d_select(player.mainbody, "#videoframe");
		player.volume = d_select(player.mainbody, "#controler #volume");
		player.volumerange = d_select(player.mainbody, "#controler #volume #range");
		player.volumevalue = d_select(player.mainbody, "#controler #volume #range div");
		player.volumepercentage = d_select(player.mainbody, "#controler #volume span");
		player.volumestat = d_select(player.mainbody, "#controler #volume #stat");
		player.loadinfo.ctx = player.loadinfo.getContext("2d");

		player.loadinfo.height = player.progress.offsetHeight;
		COL = newC_GUI();
		COL.font.color = "#ffffff";
		COL.font.fontFamily = "'黑体'";
		COL.setCanvas(player.danmulayer);
		COL.autoClear = true;
		Glib = getGraphlib(COL);
		//window.doc = COL.document;
		initTextDanmuContainer();
		
	}
	function initTextDanmuContainer() {
		/*window.ctt = */
		danmucontainer = COL.Graph.New();
		COL.Graph.Eventable(danmucontainer);
		danmucontainer.name = "danmucontainer";
		danmucontainer.needsort = false;
		COL.document.addChild(danmucontainer);
	}
	function changetab(tab) {
		for (var i = 0; i < player.ctrlbuttons.length; i++) {
			if (player.ctrlbuttons[i].id == tab) {
				player.tabpages[i].style.display = "block";
			} else {
				player.tabpages[i].style.display = "none";
			}

		}
	}
	function setPlayOption() {
		player.o.recycle = false;

		//player.o.playspeed = 1;
	}
	function setDefaultOption() {
		if (getOption("DefaultSetted") != "true") {
			setOption("TwoDCodeDanmu", "true");
			setOption("ThreeDCodeDanmu", "true");
			setOption("PlaySpeed", "1");
			setOption("DefaultSetted", "true");
			setOption("ProgressDanmumark", "false");
		}
	}
	function loadoption() {
		//console.log("加载设置");
		newstat("加载设置");
		setDefaultOption();
		player.o = {},
		player.assvar = {},
		player.switchs = {};
		player.assvar.danmufeng=0;
		player.assvar.danmumark=COL.Graph.New({drawtype:"image"});
		player.assvar.danmumark.drawfunction=function(ct){
			var Xw = player.loadinfo.width,
			d = player.o.totaltime;
			ct.clearRect(0,0,Xw,25);
				ct.beginPath();
				var left=0,color,cutnum;
				for(var time in danmuarray){
					ct.save();
					left=time/1000/ d * Xw;
					cutnum=danmuarray[time].length;
					if(cutnum>player.assvar.danmufeng)player.assvar.danmufeng=cutnum;
					//color=(cutnum/player.assvar.danmufeng*255).toFixed();
					ct.beginPath();
					//ct.strokeStyle="rgba("+color+","+color+","+color+",1)";
					ct.strokeStyle="rgba(125, 156, 156,"+(cutnum/player.assvar.danmufeng+0.5)+")";
					ct.moveTo(left,0);
					ct.lineTo(left,6);
					ct.stroke();
					ct.restore();
				}
				//ct.stroke();
		}
		controlfuns.sidebar_show();
		if (getOption("Debug") == "true") {
			COL.Debug.on();
		}
		if (getOption("DefaultHideSideBar") == "true") {
			controlfuns.sidebar_hide();
		}
		if(getOption("ProgressDanmumark") == "true"){
			player.o.ProgressDanmumark=true;
		}
		player.o.RealtimeVary = getOption("RealtimeVary") == "true" ? true: false;
		fitdanmulayer();
	}
	function loadvideo() {
		//console.log("加载视频");
		newstat("获取视频地址");
		cmd("getVideoAddress " + videoid, false,
		function(a) {
			if (a == "Error") {
				newstat("地址获取错误");
				player.playcount.innerHTML = "视频错误";
				return;
			}
			try {
				var json = eval('(' + a + ')');
			} catch(e) {
				newstat("地址获取错误");
				player.playcount.innerHTML = "视频错误";
				return;
			}
			var videosrc = json.url,
			count = json.count;
			if ((count = Number(count)) >= 0) {
				player.playcount.innerHTML = "播放数:" + count;
			}
			console.log("得到视频地址:" + videosrc);
			player.video.preload = "metadata";
			for (var i = 0; i < videosrc.length; i++) {
				if (typeof videosrc[i] == "string") {
					var s = c_ele("source");
					videosrc[i] = _string_.removesidespace(videosrc[i]);
					s.src = videosrc[i];
					var mime = guessmime(videosrc[i]);
					if (mime) {
						s.type = mime;
						/*var ifsupport=player.video.canPlayType(mime);
						if(ifsupport=="maybe"){newstat("可能不支持此视频");}
						else if(ifsupport==""){newstat("浏览器不支持此视频");}*/
					}
					player.video.appendChild(s);
					console.log("指定视频地址:" + videosrc[i]);
				}
			}
		});
	}

	function createDanmuDiv(obj) {
		var danmudiv = c_ele("div");
		danmudiv.className = "danmudiv";
		danmudiv.danmuid = obj.id;
		danmudiv.time = obj.t;
		danmudiv.type = obj.ty;
		var time = getMin_Sec_By_Million(obj.t);
		danmudiv.innerHTML = '<span class="danmutime">' + (time.min < 10 ? "0" + time.min: time.min) + ":" + (time.sec < 10 ? "0" + time.sec: time.sec) + '</span> <span class="danmucontent" title="' + obj.c + '">' + obj.c + '</span> <span class="danmudate">' + obj.d + '</span>';
		if (obj.ty == 4) { //高级弹幕
			danmudiv.style.backgroundColor = "#CCC";
		}
		if (obj.ty == 5) { //字幕
			danmudiv.style.backgroundColor = "green";
		}
		player.danmucontantor.appendChild(danmudiv);
	}
	function listdanmu(danmuobj) {
		if (danmuobj) {
			createDanmuDiv(danmuobj);
		} else {
			for (var i = 0; i < danmulist.length; i++) {
				createDanmuDiv(danmulist[i]);
			}
		}
	}

	function loaddanmu() {
		//console.log("加载弹幕");
		newstat("加载弹幕");
		danmufuns.show();
		cmd("getDanmu " + videoid, false,
		function(a) {
			if (a == "Error") {
				newstat("弹幕加载失败");
				player.danmucount.innerHTML = "弹幕错误";
				return;
			}
			try {
				var danmuarr = JSON.parse(a);
			} catch(e) {
				//newstat("弹幕错误");
				danmucount = 0;
				//player.danmucount.innerHTML = "弹幕错误";
			};
			if (typeof danmuarr == "object") {
				for (var i = 0; i < danmuarr.length; i++) {
					try {
						danmuarr[i] = eval("(" + danmuarr[i] + ")");
						//danmuarr[i].c=danmuarr[i].c.replace(/\n/m,"\n");
					} catch(e) {
						newstat("弹幕错误");
						//console.log(e)
					}
				}
				danmulist = danmuarr;
				danmucount = danmuarr.length;
				listdanmu();
				danmufuns.setTimeline();
				danmufuns.initFirer();
				danmufuns.refreshnumber();
				//danmuListener();
				/*if (!danmufirer) {
					if (window.Worker) {
						danmufirer = new Worker("danmufirer.js");
						
					} else {
						newstat("无法显示弹幕");
						return;
					}
				}*/
			}
		});
	}
	function setAllIntervals() {
		/*interval.movedanmufun = function() {
			if (interval.movedanmu) clearInterval(interval.movedanmu);
			interval.movedanmu = setInterval(function() {
				danmufuns.mover();
			},
			moverInterval);
		}
		interval.movedanmufun();*/
		//interval.
	}
	function fitdanmulayer() {
		width = COL.document.width = player.danmulayer.width = player.video.offsetWidth;
		tunnelheight = COL.document.height = player.danmulayer.height = player.video.offsetHeight;
		player.loadinfo.width = player.loadinfo.offsetWidth;
		controlfuns.refreshprogresscanvas();
		for (var i in danmucontainer.childNode) {
			if (danmucontainer.childNode[i].type == 2) {
				danmucontainer.childNode[i].set({
					x: width / 2,
					y: tunnelheight - danmucontainer.childNode[i].tunnelobj[2]
				});
			} else if (danmucontainer.childNode[i].type == 3) {
				danmucontainer.childNode[i].set({
					x: width / 2,
					y: danmucontainer.childNode[i].tunnelobj[2]
				});
			}
		}
		controlfuns.refreshDanmuMark();
	}
	function initSwitch() {
		var switchs = d_selectall(player.optionpannel, "div[switch]");
		for (var i = 0; i < switchs.length; i++) {
			var sw = switchs[i];
			var name = sw.getAttribute("name");
			var bool = (getOption(name) == "true") ? true: false;
			createswitch(name, bool, null, null, sw);
			player.switchs[name] = sw;
		}
	}
	function initRange() {
		var ranges = d_selectall(player.optionpannel, "div[range]");
		player.ranges = {};
		for (var i = 0; i < ranges.length; i++) {
			var rg = ranges[i];
			var name = rg.getAttribute("name");
			var min = Number(rg.getAttribute("min"));
			var max = Number(rg.getAttribute("max"));
			var value = Number(getOption(name));
			createRange(name, min, max, value, rg);
			rg.sendValue = function(name, value) {
				if (rangeCenter[name]) {
					rangeCenter[name](value);
				}
			}
			player.ranges[name] = rg;
		}
	}
	function newTimePiece(t) {
		if (interval.timer) {
			clearInterval(interval.timer);
			interval.timer = 0;
		}
		if (!player.assvar.isPlaying||player.video.paused) return;
		if (t >= timepoint) {
			for (var i = timepoint; i <= t; i += 10) {
				if (timeline[i]) danmufuns.fire(i);
			}
		} else {
			return;
		}
		timepoint = t + 10;
		interval.timer = setInterval(function() {
			if (!player.assvar.isPlaying||player.video.paused) return;
			if (timeline[timepoint]) {
				danmufuns.fire(timepoint);
			}
			timepoint += 10;
			if (i == 25 || player.video.paused) {
				clearInterval(interval.timer);
			}
		},
		10 * player.video.playbackRate);
	}
	function newstat(stat) {
		if (typeof stat == "string") {
			player.statboard.innerHTML = "&nbsp;" + stat + "<br>" + player.statboard.innerHTML;
		}
	}
	function getVideoMillionSec() {
		return (player.video.currentTime * 100).toFixed() * 10;
	}
	danmufuns = {
		initContextMenu: function() {
			player.ContextMenu = Glib.getGraphObj("rect", {
				backgroundColor: "rgba(255,255,255,0.8)",
				borderWidth: 0.2,
				borderColor: "rgba(211, 188, 188, 0.91)",
				width: 100,
				height: 70,
				x: 0,
				y: 0,
				display: false
			});
			player.ContextMenu.zindex(20);
			player.ContextMenu.content = COL.Graph.NewTextObj("somethig", 16, {
				autoSize: false,
				width: 100,
				height: 20,
				x: 0,
				y: 0,
				overflow: "hidden",
				color: "rgb(44, 123, 138)"
			});

			player.ContextMenu.plusone = COL.Graph.NewTextObj("         +1", 16, {
				autoSize: false,
				width: 100,
				height: 20,
				x: 0,
				y: 21,
				overflow: "hidden"
			});

			player.ContextMenu.copy = COL.Graph.NewTextObj("       复制",16, {
				autoSize: false,
				width: 100,
				height: 20,
				x: 0,
				y: 41,
				overflow: "hidden"
			});

			COL.Graph.Eventable(player.ContextMenu);
			COL.Graph.Eventable(player.ContextMenu.copy);
			COL.Graph.Eventable(player.ContextMenu.plusone);

			player.ContextMenu.addChild(player.ContextMenu.content);
			player.ContextMenu.addChild(player.ContextMenu.plusone);
			player.ContextMenu.addChild(player.ContextMenu.copy);
			COL.document.addChild(player.ContextMenu);

			player.ContextMenu.addEvent("onmouseover",
			function(e) {
				e.stopPropagation();
				if (e.target != player.ContextMenu) {
					e.target.backgroundColor = "#66ccff";
				}
			});
			player.ContextMenu.addEvent("onmouseout",
			function(e) {
				e.stopPropagation();
				if (e.target != player.ContextMenu) {
					e.target.backgroundColor = null;
				}
			});
			player.ContextMenu.addEvent("onclick",
			function(e) {
				e.stopPropagation();
				if (e.target == player.ContextMenu.plusone) {
					danmufuns.send(player.ContextMenu.danmuobj.c);
					danmufuns.hideContextMenu();
				} else if (e.target == player.ContextMenu.copy) {
					//复制内容到剪贴板
					//window.clipboardData.setData("text/plain",player.ContextMenu.danmuobj.c);
					danmufuns.hideContextMenu();
				}
			});
		},
		showContextMenu: function(textobj, danmuobj) {
			player.ContextMenu.display = true;
			player.ContextMenu.danmuobj = danmuobj;
			player.ContextMenu.content.setText(danmuobj.c);
			var x = COL.mouseX,
			y = COL.mouseY;
			if (x > width - player.ContextMenu.width) x = width - player.ContextMenu.width;
			if (y > tunnelheight - player.ContextMenu.height) y = tunnelheight - player.ContextMenu.height;
			player.ContextMenu.x = x;
			player.ContextMenu.y = y;
		},
		hideContextMenu: function() {
			player.ContextMenu.display = false;
		},
		createCommonDanmu: function(danmuobj) {
			//if (!interval.movedanmu) return;
			if (danmuobj.hasfirstshowed === 0) {
				danmuobj.hasfirstshowed = 1;
			} else if (danmuobj.hasfirstshowed == 1) {
				danmuobj.hasfirstshowed = null;
				return;
			}
			var color = isHexColor(danmuobj.co) ? ("#" + danmuobj.co) : "#fff";
			var bordercolor = (danmuobj.co == "000000") ? "#fff": "#000";
			var TextDanmu = COL.Graph.NewTextObj(danmuobj.c, danmuobj.s , {
				color: color,
				textborderColor: bordercolor,
				textborderWidth: 0.6,
				type: danmuobj.ty,
				time: danmuobj.t,
				fontWeight: 600,
				realtimeVary: player.o.RealtimeVary
			});
			TextDanmu.tunnelobj =danmufuns.getTunnel(danmuobj.ty,TextDanmu.height);
			switch (danmuobj.ty) {
			case 0:
				{
					TextDanmu.set({
						x:
						width,
						y: TextDanmu.tunnelobj[2]
					});
					break;
				}
			case 1:
				{
					TextDanmu.set({
						x:
						-TextDanmu.width,
						y: TextDanmu.tunnelobj[2]
					});
					break;
				}
			case 2:
				{
					TextDanmu.setPositionPoint(TextDanmu.width / 2, TextDanmu.height);
					TextDanmu.set({
						x: width / 2,
						y: tunnelheight - TextDanmu.tunnelobj[2]
					});
					break;
				}
			case 3:
				{
					TextDanmu.setPositionPoint(TextDanmu.width / 2, 0);
					TextDanmu.set({
						x: width / 2,
						y: TextDanmu.tunnelobj[2]
					});
					break;
				}
			default:
				{
					return;
				}
			}
			if (danmuobj.sended) {
				var lineset=TextDanmu.lineHeight*TextDanmu.varylist.length - 5;
				TextDanmu.afterdrawfun =eval('function sendedline(ct) {ct.strokeStyle = "#66ccff";ct.moveTo(0,'+lineset+');ct.lineTo('+TextDanmu.width+', '+lineset+');ct.stroke();}') ;
			}
			TextDanmu.danmuobj = danmuobj;
			COL.Graph.Eventable(TextDanmu);
			TextDanmu.addEvent("onmousedown",
			function(e) {
				switch (e.button) {
				case 0:
					{
						if (player.video.paused) {
							danmufuns.start();
							player.video.play();
						} else {
							player.video.pause();
						}
						break;
					}
				case 2:
					{
						//player.video.pause();
						danmufuns.showContextMenu(TextDanmu, danmuobj);
					}
				}
			});
			danmucontainer.addChild(TextDanmu);
		},
		send: function(content) {
			var c = content ? content: player.danmuinput.value;
			c=c.replace(/\\n/g,"\n");
			console.log(c)
			if (_string_.removesidespace(c) != "") {
				//console.log("发送弹幕:" + player.danmuinput.value);
				if (!content) {
					if (player.assvar.danmusendTimeout) {
						clearTimeout(player.assvar.danmusendTimeout);
						player.assvar.danmusendTimeout = 0;
					}
					player.sendcover.style.display = "block";
					player.danmuinput.blur();
				}

				var time = getVideoMillionSec();
				var type;
				//console.log(danmuStyle.type);
				if (danmuStyle.type >= 0) {
					type = danmuStyle.type;
				} else {
					type = 0;
				}
				var color = player.colorinput.value.replace("#", "");
				if (!isHexColor(color)) {
					color = null;
				}
				var danmuobj = {};
				danmuobj.t = time;
				danmuobj.id = 0;
				danmuobj.c = c;
				danmuobj.co = color;
				danmuobj.s = danmuStyle.fontsize;
				danmuobj.ty = type;
				danmuobj.sended = true;
				danmuobj.hasfirstshowed = 0;
				var date = new Date();
				date.day = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
				date.month = date.getMonth() + 1;
				date.month = (date.month < 10) ? "0" + date.month: date.month;
				danmuobj.d = date.getFullYear() + "-" + date.month + "-" + date.day;
				danmufuns.initnewDanmuObj(danmuobj);
				danmufuns.createCommonDanmu(danmuobj, danmufuns.getTunnel(danmuobj.ty, danmuobj.s));
				autocmd("adddanmu", (videoid), type, c, time, color || "NULL", danmuStyle.fontsize,
				function(response) {
					if (Number(response) >= 0) {
						danmuobj.id = Number(response);
						if (!content) {
							player.danmuinput.value = "";
							player.sendcover.style.display = "none";
						}

						danmufuns.refreshnumber();

					} else {
						console.log(response);
						if (!content) player.sendcover.style.display = "none";
					}
				});
				if (!content) {
					player.assvar.danmusendTimeout = setTimeout(function() {
						if (player.sendcover.style.display != "none") {
							player.sendcover.style.display = "none";
						}
					},
					10000);
				}

			}
		},
		show: function() {
			if (!AnimationFrame) {
				function danmurefresh() {
					if (danmucontainer.drawlist.length == 0) {
						if (danmucontainer.display) danmucontainer.display = false;
					} else if (!danmucontainer.display) {
						danmucontainer.display = true;
					}
					danmufuns.mover();
					COL.draw();
					AnimationFrame = requestAnimationFrame(danmurefresh);
				}
				requestAnimationFrame(danmurefresh);
				player.danmuframe.style.display = "block";
			}
		},
		hide: function() {
			if (AnimationFrame) {
				danmucontainer.display = false;
				cancelAnimationFrame(AnimationFrame);
				AnimationFrame = 0;
				player.danmuframe.style.display = "none";
			}
		},
		getTunnel: function(type, size) {
			var tunnel;
			switch (type) {
			case 0:
				{
					tunnel = danmutunnel.right;
					break;
				}
			case 1:
				{
					tunnel = danmutunnel.left;
					break;
				}
			case 2:
				{
					tunnel = danmutunnel.bottom;
					break;
				}
			case 3:
				{
					tunnel = danmutunnel.top;
					break;
				}
			}
			var tun = 0,
			ind = i = 1;
			if (!tunnel[tun]) tunnel[tun] = [];
			while (ind < (i + size)) {
				if (tunnel[tun][ind]) {
					i = ind + tunnel[tun][ind];
					ind = i;
					if (ind > (tunnelheight - size)) {
						tun++;
						i = ind = 1;
						if (!tunnel[tun]) tunnel[tun] = [];
					}
				} else if (ind == (i + size - 1)) {
					break;
				} else {
					ind++;
				};
			}
			tunnel[tun][i] = size;
			return [type, tun, i]; //轨道类号,分页号，轨道号
		},
		calibrationTime: function() {
			//danmufirer.postMessage(getVideoMillionSec());
		},
		setDanmuArray: function() {
			//danmufirer.postMessage({danmulist:danmulist});
			for (var i = 0; i < danmulist.length; i++) {
				if (!danmuarray[danmulist[i].t]) danmuarray[danmulist[i].t] = [];
				danmuarray[danmulist[i].t].push(danmulist[i]);
			}
		},
		addToDanmuArray: function(danmuobj) {
			if (!danmuarray[danmuobj.t]) danmuarray[danmuobj.t] = [];
			danmuarray[danmuobj.t].push(danmuobj);
		},
		clear: function() {
			for (var i in danmucontainer.childNode) {
				COL.Graph.Delete(danmucontainer.childNode[i]);
			}
			danmutunnel = {
				right: [],
				left: [],
				bottom: [],
				top: []

			};
		},
		start: function() {
			timepoint = getVideoMillionSec();
			newTimePiece(timepoint);
		},
		pause: function() {
			//clearInterval(interval.calibrationTime.i);
			//TODO:暂停所有弹幕
		},
		initFirer: function() {
			danmufuns.setDanmuArray();
			danmufuns.initContextMenu();
			/*danmufirer.addEventListener('message',
			function(e) {
				console.log(e.data);
				if (!player.video.paused) {
					//danmufuns.fire(e.data);
				}
			},
			false);*/
		},
		mover: function() {
			if (player.assvar.isPlaying) {
				var nowtime = Math.floor(player.video.currentTime * 1000);
				for (var i = 0; i < danmucontainer.drawlist.length; i++) {
					var node = danmucontainer.drawlist[i];
					if (!node) continue;
					switch (node.type) {
					case 0:
						{
							var roadLength = width + node.width;
							node.x = roadLength * (1 - (nowtime - node.time) / moveTime) - node.width;
							if (node.tunnelobj && node.x < width - node.width - 150) {
								danmutunnel.right[node.tunnelobj[1]][node.tunnelobj[2]] = null;
								node.tunnelobj = null;
							} else if (node.x < -node.width) {
								COL.Graph.Delete(node);
							}
							break;
						}
					case 1:
						{
							var roadLength = width + node.width;
							node.x = roadLength * (nowtime - node.time) / moveTime - node.width;
							if (node.tunnelobj && node.x > 150) {
								danmutunnel.left[node.tunnelobj[1]][node.tunnelobj[2]] = null;
								node.tunnelobj = null;
							} else if (node.x > width) {
								COL.Graph.Delete(node);
							}
							break;
						}
					case 2:
						{
							if (nowtime - node.time > moveTime) {
								COL.Graph.Delete(node);
								danmutunnel.bottom[node.tunnelobj[1]][node.tunnelobj[2]] = null;
							}
							break;
						}
					case 3:
						{
							if (nowtime - node.time > moveTime) {
								COL.Graph.Delete(node);
								danmutunnel.top[node.tunnelobj[1]][node.tunnelobj[2]] = null;
							}
							break;
						}
					}
				}
			}

		},
		initnewDanmuObj: function(danmuobj) {
			if (typeof danmuobj == "object") {
				danmucount++;
				timeline[danmuobj.t] = true;
				createDanmuDiv(danmuobj);
				danmufuns.addToDanmuArray(danmuobj);
			}
		},
		fire: function(t) {
			if (player.assvar.isPlaying && danmuarray[t]) {
				var sendsanmus = [];
				for (var i = 0; i < danmuarray[t].length; i++) {
					var tmpd = danmuarray[t][i];
					if (tmpd.ty <= 3) {
						danmufuns.createCommonDanmu(tmpd/*, danmufuns.getTunnel(tmpd.ty, tmpd.s)*/);
					} else if (danmuarray[t][i].type == 4) {

}
				}
			}
		},
		addTimepoint: function(t) {
			timeline[t] = true;
		},
		setTimeline: function() {
			var tarr = [];
			for (var i = 0; i < danmulist.length; i++) {
				if (danmulist[i].t >= 0) {
					tarr[danmulist[i].t] = true;
				}
			}
			timeline = tarr;
			controlfuns.refreshDanmuMark();
			//console.log("重置时间轴");
		},
		refreshnumber: function() {
			if (danmucount >= 0) {
				player.danmucount.innerHTML = "弹幕数:" + danmucount;
			} else {
				player.danmucount.innerHTML = "弹幕错误";
			}
			player.assvar.danmumark.drawpic(player.loadinfo.width,25,player.assvar.danmumark.drawfunction);
		}

	}

	controlfuns.play = function() {
		player.playbutton.style.display = "none";
	}
	controlfuns.playing = function() {
		controlfuns.play();
		controlfuns.refreshprogresscanvas();
	}
	controlfuns.pause = function() {
		player.playbutton.style.display = "block";
		danmufuns.pause();
		player.assvar.isPaused = true;
	}
	controlfuns.fullscreen = function() {
		console.log("打开全屏");
		addEleClass(player.sendbox, "sendbox_fullscreen");
		addEleClass(player.videoframe, "videoframe_fullscreen");
		addEleClass(player.controler, "controler_fullscreen");
		//addEleClass(player.sidebar, "sidebar_fullscreen");
		controlfuns.sidebar_hide();
		player.displaystat = "fullscreen";
		fitdanmulayer();
	}
	controlfuns.exitfullscreen = function() {
		console.log("退出全屏");
		removeEleClass(player.sendbox, "sendbox_fullscreen");
		removeEleClass(player.videoframe, "videoframe_fullscreen");
		removeEleClass(player.controler, "controler_fullscreen");
		//removeEleClass(player.sidebar, "sidebar_fullscreen");
		controlfuns.sidebar_show();
		fitdanmulayer();
	}
	controlfuns.fullscreenchange = function() {
		if (isFullscreen()) {
			controlfuns.fullscreen();
		} else {
			controlfuns.exitfullscreen();
		}
	}

	controlfuns.fullpage = function() {
		exitFullscreen();
		addEleClass(player.mainbody, "fullpage");
		addEleClass(player.sendbox, "fullpage_sendbox");
		addEleClass(player.videoframe, "fullpage_videoframe");
		player.displaystat = "fullpage";
		fitdanmulayer();
	}
	controlfuns.exitfullpage = function() {
		removeEleClass(player.mainbody, "fullpage");
		removeEleClass(player.sendbox, "fullpage_sendbox");
		removeEleClass(player.videoframe, "fullpage_videoframe");
		player.displaystat = "normal";
		fitdanmulayer();
	}
	controlfuns.gototime = function() {}
	controlfuns.loading = function() {}
	controlfuns.ended = function() {
		danmutunnel = {
			right: [],
			left: [],
			bottom: [],
			top: []

		}
		//danmufuns.clear();
	}
	controlfuns.volumestatchange = function() {

}
	controlfuns.volumechange = function() {
		player.volumepercentage.innerHTML = Math.round(player.video.volume * 100);
		player.volumevalue.style.height = (1 - player.video.volume) * 100 + "%";
		if (player.video.muted) player.volumestat.innerHTML = "ϖ";
		else {
			player.volumestat.innerHTML = "Д";
		}
	}
	controlfuns.refreshDanmuMark=function(){
		player.assvar.danmumark.drawpic(player.loadinfo.width,25,player.assvar.danmumark.drawfunction);
	}
	controlfuns.refreshprogresscanvas = function() {
		if (player.loadinfo.ctx) {
			var ct = player.loadinfo.ctx;
			var Xw = player.loadinfo.width,
			d = player.video.duration;
			ct.save();
			ct.clearRect(0, 0, Xw, 25);
			//绘制已缓冲区间
			ct.fillStyle = "#C0BBBB";
			var tr = player.video.buffered;
			for (var i = 0; i < tr.length; i++) {
				ct.fillRect(tr.start(i) / d * Xw, 22, (tr.end(i) - tr.start(i)) / d * Xw, 4);
			}

			//绘制已播放区域
			ct.fillStyle = "#ffcc66";
			var tr = player.video.played;
			for (var i = 0; i < tr.length; i++) {
				ct.fillRect(tr.start(i) / d * Xw, 18, (tr.end(i) - tr.start(i)) / d * Xw, 4);
			}

			//绘制普通进度条
			ct.fillStyle = "#66CCFF";
			ct.fillRect(0, 0, player.video.currentTime / d * Xw, 18);

			if(player.o.ProgressDanmumark){
				if(player.assvar.danmumark.imageobj){
					ct.drawImage(player.assvar.danmumark.imageobj, 0, 0);
				}

			}

			//绘制鼠标指着的时间
			if (player.assvar.pointingtime) {
				var t = getMin_Sec(player.assvar.pointingtime),
				x = player.assvar.pointingx;
				if (x < 33) x = 33;
				ct.globalCompositeOperation = "lighter";
				ct.textBaseline = "top";
				ct.font = "14px '微软雅黑'";
				ct.fillText(t.min + ":" + t.sec, x - 33, 1);
				ct.strokeStyle = "#66ccff";
				ct.lineWidth = 1;
				ct.beginPath();
				ct.moveTo(player.assvar.pointingx, 0);
				ct.lineTo(player.assvar.pointingx, 25);
				ct.stroke();
			}
			ct.restore();
		}
	}
	controlfuns.refreshtime = function() {
		var currentTime = getMin_Sec(player.video.currentTime);
		totaltime = getMin_Sec(player.video.duration);
		if (currentTime.min >= 0 && currentTime.sec >= 0 && totaltime.min >= 0 && totaltime.sec >= 0) {
			player.time.innerHTML = currentTime.min + ":" + currentTime.sec + "/" + totaltime.min + ":" + totaltime.sec;
		} else {
			player.time.innerHTML = "视频错误";
		}
	}
	controlfuns.sidebar_hide = function() {
		if (player.videoframe.className.search("sidebarhide_videoframe") == -1) {
			//console.log("隐藏边栏");
			addEleClass(player.videoframe, "sidebarhide_videoframe");
			addEleClass(player.sendbox, "sidebarhide_videoframe");
			addEleClass(player.sidebar, "sidebarhide_sidebar");
			fitdanmulayer();
		}
	}
	controlfuns.sidebar_show = function() {
		//console.log("显示边栏");
		removeEleClass(player.videoframe, "sidebarhide_videoframe");
		removeEleClass(player.sendbox, "sidebarhide_videoframe");
		removeEleClass(player.sidebar, "sidebarhide_sidebar");
		window.danmusidebarstat = true;
		fitdanmulayer();
	}

	switchCenter = {
		RealtimeVary: {
			on: function() {
				player.o.RealtimeVary = true;
				setOption("RealtimeVary", "true");
			},
			off: function() {
				player.o.RealtimeVary = false;
				setOption("RealtimeVary", "false");
			}
		},
		Debug: {
			on: function() {
				COL.Debug.on();
				setOption("Debug", "true");
			},
			off: function() {
				COL.Debug.off();
				setOption("Debug", "false");
			}
		},
		DefaultHideSideBar: {
			on: function() {
				setOption("DefaultHideSideBar", "true");
			},
			off: function() {
				setOption("DefaultHideSideBar", "false");
			}
		},
		TwoDCodeDanmu: {
			on: function() {
				setOption("TwoDCodeDanmu", "true");
			},
			off: function() {
				setOption("TwoDCodeDanmu", "false");
			}
		},
		ThreeDCodeDanmu: {
			on: function() {
				setOption("ThreeDCodeDanmu", "true");
			},
			off: function() {
				setOption("ThreeDCodeDanmu", "false");
			}
		},
		ProgressDanmumark:{
			on:function(){
				player.o.ProgressDanmumark=true;
				controlfuns.refreshprogresscanvas();
				setOption("ProgressDanmumark", "true");
			},
			off:function(){
				player.o.ProgressDanmumark=false;
				controlfuns.refreshprogresscanvas();
				setOption("ProgressDanmumark", "false");
			}
		}
	};
	rangeCenter = {
		PlaySpeed: function(value) {
			if (value > 0) player.video.playbackRate = value;
		}
	};

	function initevents() {
		var video = player.video;
		COL.document.addEvent("onclick",
		function(e) {
			danmufuns.hideContextMenu();
			if (e.target == COL.document) {
				if (video.paused) {
					danmufuns.start();
					video.play();
				} else {
					video.pause();
				}
			}
		});
		danmucontainer.addEvent("onmousedown",
		function(e) {
			if (COL.mouseright) {
				e.stopPropagation();
				//
			}
		});
		aEL(player.colorinput, "input",
		function() {
			if (isHexColor(player.colorinput.value)) {
				var co = player.colorinput.value.replace("#", "");
				player.colorview.style.backgroundColor = "#" + co;
			} else {
				player.colorview.style.backgroundColor = "#ffffff";
			}
		});
		aEL(window, "resize",
		function() {
			if (isFullscreen() || player.displaystat == "fullpage") {
				fitdanmulayer();
			}
		});
		aEL(player.play_pause, "click",
		function(e) {
			e.preventDefault();
			if (video.paused) {
				danmufuns.start();
				video.play();
			} else {
				video.pause();
			}
		});
		var progressmousekey = false,
		volumemousekey = false;
		aEL(player.mainbody, "resize",
		function() {
			fitdanmulayer();
		});
		aEL(player.danmuctrl, "click",
		function() {
			if (player.danmuframe.style.display == "none") {
				danmufuns.show();
				//interval.movedanmufun();
			} else {
				danmufuns.hide();
				//clearInterval(interval.movedanmu);
				//interval.movedanmu = 0;
				danmufuns.clear();
			}
		});
		aEL(player.danmulayer, "resize",
		function() {
			fitdanmulayer();
		});

		aEL(player.danmulayer, "contextmenu",
		function(e) {
			e.preventDefault();
		});
		aEL(player.progress, "contextmenu",
		function(e) {
			e.preventDefault();
		});
		aEL(player.sidebar, "mousedown",
		function(e) {
			switch (e.target.id) {
			case "danmulistbutton":
			case "superdanmubutton":
			case "optionbutton":
				{
					changetab(e.target.id);
					break;
				}
			}
		});
		aEL(player.optionpannel, "click",
		function(e) {
			var ele = e.target.parentNode;
			var name;
			if (ele.parentNode.getAttribute("type") == "switch") {
				name = ele.parentNode.getAttribute("name");
				ele = ele.parentNode;
			} else if (ele.getAttribute("type") == "switch") {
				name = ele.getAttribute("name");
			}
			if (name && switchCenter[name]) {
				if (ele.event.bool) {
					if (switchCenter[name].on) switchCenter[name].on();
				} else {
					if (switchCenter[name].off) switchCenter[name].off();
				}
			}
		});
		aEL(player.danmucontantor, "dblclick",
		function(e) {
			e.preventDefault();
			switch (e.target.className) {
			case "danmutime":
			case "danmucontent":
			case "danmudate":
				{
					var time = e.target.parentNode.time;
					if (time <= 200) {
						player.video.currentTime = time / 1000;
					} else {
						player.video.currentTime = time / 1000 - 0.2;
					}
					break;
				}
			}
		})
		aEL(player.progress, "mousedown",
		function(e) {
			e.preventDefault();
			progressmousekey = true;
			var x = e.offsetX || e.x || e.layerX;
			video.currentTime = x / player.progress.offsetWidth * player.video.duration;
		});
		aEL(document, "mouseup",
		function(e) {
			e.preventDefault();
			progressmousekey = false;
			volumemousekey = false;
		});
		aEL(player.progress, "mousemove",
		function(e) {
			e.preventDefault();
			var x = e.offsetX || e.x || e.layerX;
			var time = x / player.progress.offsetWidth * player.video.duration;
			if (progressmousekey) {
				video.currentTime = time;
			}
			player.assvar.pointingtime = time;
			player.assvar.pointingx = x;
			controlfuns.refreshprogresscanvas();
		});
		aEL(player.progress, "mouseleave",
		function(e) {
			player.assvar.pointingtime = null;
			controlfuns.refreshprogresscanvas();
		});
		aEL(player.volumerange, "mousedown",
		function(e) {
			e.preventDefault();
			volumemousekey = true;
			var y = e.offsetY || e.y || e.layerY;
			if (y > 200) {
				video.volume = 0;
			} else if (y < 0) {
				video.volume = 1;
			} else {
				video.volume = (200 - y) / player.volumerange.offsetHeight;
			}
		});
		aEL(player.volumepercentage, "mousemove",
		function(e) {
			if (volumemousekey) {
				video.volume = 1;
			}
		});
		aEL(player.volumestat, "mousemove",
		function(e) {
			if (volumemousekey) {
				video.volume = 0;
			}
		});
		aEL(player.volumerange, "mousemove",
		function(e) {
			if (volumemousekey) {
				var y = e.offsetY || e.y || e.layerY;
				if (y > 200) {
					video.volume = 0;
				} else if (y < 0) {
					video.volume = 1;
				} else {
					video.volume = (200 - y) / player.volumerange.offsetHeight;
				}
			}
		});
		aEL(player.volume, "mouseleave",
		function(e) {
			volumemousekey = false;
		});
		aEL(player.video, "click",
		function(e) {
			e.preventDefault();
			if (video.paused) {
				video.play();
			} else {
				video.pause();
			}
		});
		aEL(player.sidebarSwitch, "click",
		function(e) {
			if (player.videoframe.className.search("sidebarhide_videoframe") != -1) {
				controlfuns.sidebar_show();
			} else {
				controlfuns.sidebar_hide();
			}
		});
		aEL(player.fullscreen, "click",
		function(e) {
			e.preventDefault();
			if (e.target.id == "fullpage") {
				if (player.displaystat != "fullpage") {
					controlfuns.fullpage();
				} else {
					controlfuns.exitfullpage();
				}
			} else {
				if (isFullscreen()) {
					exitFullscreen();
				} else {
					requestFullscreen(player.mainbody);
				}
			}
		});
		aEL(d_select(player.mainbody, "#sendbox #sendbutton"), "click",
		function(e) {
			danmufuns.send();
		});
		aEL(player.danmuinput, "keydown",
		function(e) {
			if (e.keyCode == 13) {
				danmufuns.send();
			}
		});
		aEL(d_select(player.mainbody, "#fontstylebutton #danmuType"), "click",
		function(e) {
			var selections = d_selectall(player.mainbody, "#fontstylebutton #danmuType div"),
			id = e.target.id;
			if (id == "fromtop" || id == "frombottom" || id == "fromright" || id == "fromleft") {
				for (var i = 0; i < selections.length; i++) {
					removeEleClass(selections[i], "selected");
				}
				addEleClass(e.target, "selected");
				switch (e.target.id) {
				case "fromtop":
					{
						danmuStyle.type = 3;
						console.log(danmuStyle.type);
						break;
					}
				case "frombottom":
					{
						danmuStyle.type = 2;
						console.log(danmuStyle.type);
						break;
					}
				case "fromright":
					{
						danmuStyle.type = 0;
						console.log(danmuStyle.type);
						break;
					}
				case "fromleft":
					{
						danmuStyle.type = 1;
						console.log(danmuStyle.type);
						break;
					}
				}
			}
		});
		aEL(d_select(player.mainbody, "#fontstylebutton #fontSize"), "click",
		function(e) {
			var selections = d_selectall(player.mainbody, "#fontstylebutton #fontSize div"),
			id = e.target.id;
			if (id == "Sizesmall" || id == "Sizemiddle" || id == "Sizebig") {
				for (var i = 0; i < selections.length; i++) {
					removeEleClass(selections[i], "selected");
				}
				addEleClass(e.target, "selected");
				switch (e.target.id) {
				case "Sizesmall":
					{
						danmuStyle.fontsize = 25;
						break;
					}
				case "Sizemiddle":
					{
						danmuStyle.fontsize = 30;
						break;
					}
				case "Sizebig":
					{
						danmuStyle.fontsize = 45;
						break;
					}
				}
			}
		});
		aEL(document, "fullscreenchange",
		function() {
			console.log("事件:全屏状态改变");
			controlfuns.fullscreenchange();
		});
		aEL(document, "mozfullscreenchange",
		function() {
			console.log("事件:moz全屏状态改变");
			controlfuns.fullscreenchange();
		});
		aEL(document, "webkitfullscreenchange",
		function() {
			console.log("事件:webkit全屏状态改变");
			controlfuns.fullscreenchange();
		});
		aEL(document, "MSFullscreenChange",
		function() {
			console.log("事件:MS全屏状态改变");
			controlfuns.fullscreenchange();
		});
		aEL(player.loop, "click",
		function(e) {
			e.preventDefault();
			player.o.loop = !player.o.loop;
			if (player.o.loop) {
				//console.log("循环播放");
				player.video.loop = true;
				player.loop.style.color = "#66ccff";
			} else {
				//console.log("取消循环");
				player.video.loop = false;
				player.loop.style.color = "#000";
			}
		});
		aEL(player.volumestat, "click",
		function(e) {
			e.preventDefault();
			video.muted = !video.muted;
			if (video.muted) {
				console.log("静音");
			} else {
				console.log("取消静音");
			}
		});
		aEL(video, "play",
		function() {
			//console.log("事件:播放");
			controlfuns.refreshprogresscanvas();
			//controlfuns.play();
		});
		aEL(video, "pause",
		function() {
			//console.log("事件:暂停");
			//newstat("暂停");
			player.assvar.isPlaying = false;
			controlfuns.pause();
		});
		aEL(video, "ended",
		function() {
			console.log("事件:播放结束");
			controlfuns.ended();
		});
		aEL(video, "loadedmetadata",
		function() {
			console.log("事件:加载视频元信息");
			player.o.totaltime = video.duration; //获取媒体总时间
			controlfuns.refreshtime();
			controlfuns.refreshDanmuMark();
		});
		aEL(video, "volumechange",
		function() {
			//console.log("事件:音量");
			controlfuns.volumechange();
		});
		//以下两个事件在火狐中持续触发
		/*aEL(video, "canplay",
		function() {
			//console.log("事件:可以播放媒体");
		});
		aEL(video, "canplaythrough",
		function() {
			//console.log("事件:媒体可流畅播放");

		});*/
		/*aEL(video, "durationchange",
		function() {
			console.log("事件:媒体长度改变");

		});*/
		aEL(video, "loadstart",
		function() {
			console.log("事件:开始加载媒体");
			controlfuns.refreshprogresscanvas();
		});
		/*aEL(video, "abort",
		function() {
			console.log("事件:媒体加载中断");
		});*/
		aEL(video, "playing",
		function() {
			controlfuns.playing();
			player.assvar.isPlaying = true;
		});
		aEL(video, "progress",
		function() {
			//console.log("事件:媒体加载中");
			controlfuns.refreshprogresscanvas();
		});
		aEL(video, "seeked",
		function() {
			//console.log("事件:已跳到新位置");
			timepoint = getVideoMillionSec();
			controlfuns.refreshprogresscanvas();
			danmufuns.clear();
		});
		aEL(video, "seeking",
		function() {
			//console.log("事件:正在跳到新位置");
			timepoint = getVideoMillionSec();
		});
		/*aEL(video, "stalled",
		function() {
			console.log("事件:无法获取媒体");

		});*/
		//aEL(video,"suspend",function(){
		//console.log("事件:浏览器故意不加载媒体（ーー；）");
		//});
		aEL(video, "timeupdate",
		function() {
			//console.log("事件:播放时间改变  "+video.currentTime);
			if (!player.video.paused) {
				player.assvar.isPlaying = true;
			}

			controlfuns.refreshprogresscanvas();
			controlfuns.refreshtime();
			newTimePiece(getVideoMillionSec());
		});
		aEL(video, "waiting",
		function() {
			//console.log("事件:媒体缓冲中");
			newstat("缓冲中..");
			player.assvar.isPlaying = false;

		});
		aEL(video, "error",
		function(e) {
			console.log("事件:错误");
			newstat("视频错误");
			console.dir(e)
		});
	}

	setdom();
	loadoption();
	setPlayOption();
	initSwitch();
	initRange();
	initevents();
	loadvideo();
	loaddanmu();
	setAllIntervals();
}
window.onload = function() {
	UseDanmuPlayer();
	/*var r=Glib.getGraphObj("star",{color:"#fff",r:100});
	r.setRotateCenter("center");
	r.x=50;r.y=50;
	COL.document.addChild(r);*/

	/*var inte=COL.tools.Linear.go(0,1000,5000,function(p){r.rotate=p;console.log(inte.c)
		if(inte.c==inte.totlac-10){COL.tools.Linear.setProcess(inte,0);}},60);*/

}

/*
                                              ###              ###
                                      #####################
                                                ##             ##
             #########                                                                   #######
             ##          ##          #################                 #####         ###                   #####
             ##          ##          ##           ##           ##           #####                  ###         ####
             #########          ##           ##           ##                                            ######
                                         #################
                                         ##           ##           ##
                                         ##           ##           ##
                                         #################
*/
