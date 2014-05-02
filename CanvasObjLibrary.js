/*
CopyRight(Left) iTisso
member:LuoJia
*/
function newC_GUI() {
	var C_GUI = {
		keys: [],
		/*主canvas*/
		/*The main canvas*/
		canvas: null,
		/*canvas的绘图上下文*/
		/*Canvas' context*/
		context: null,
		buffercanvas: null,
		buffercontext: null,
		font: {
			fontStyle: null,
			fontWeight: null,
			textInput: null,
			fontVariant: null,
			color:"#000",
			lineHeight: null,
			fontSize: "15px",
			fontFamily: "Arial"
		},
		currentcontext: null,
		cct: null,
		mouseleft: false,
		mouseright: false,
		mousecenter: false,
		mouseX: null,
		mouseY: null,
		focus: null,
		canvasonfocus: false,
		document: null,
		onoverElement: null,
		tmpGraphID:0,
		fps:{
			c:0,
			v:0,
			i:null
		},
		eve: {},
		commonevents: ["mouseover", "mouseout", "mousemove", "mousewheel", "mouseup", "click", "centerclick", "rightclick", "mousedown", "keydown", "keyup", "keypress"],
		e: {
			mouseoutcanvas: function() {
				C_GUI.mouseX = null;
				C_GUI.mouseY = null;
				if (C_GUI.onoverElement && C_GUI.onoverElement.mouseout) {
					C_GUI.eve.target = C_GUI.onoverElement;
					C_GUI.onoverElement.mouseout(C_GUI.eve);
				}
				C_GUI.onoverElement = null;
				//C_GUI.canvasonfocus = false;
			}
		},
		tosign: {
			click: false,
			centerclick: false,
			rightcilck: false,
			onmoveele: null,
			drag: false,
			havemousepositioned: false
		},
		event: function() {
			this.stopPropagation = function() {
				this.Propagation = false;
			};
			this.Propagation = true;
		},

		/*在当前基础上新建一个对象*/
		/*Create a new gui obj based on the current obj*/
		New: function() {
			return Object.create(this);
		}
	};
	C_GUI.generateGraphID=function(){
		C_GUI.tmpGraphID++;
		return C_GUI.tmpGraphID;
	};
	C_GUI.imageSmoothing = {
		on: function() {
			if (C_GUI.buffercontext) C_GUI.buffercontext.imageSmoothingEnabled = true;
			C_GUI.context.imageSmoothingEnabled = true;
		},
		off: function() {
			if (C_GUI.buffercontext) C_GUI.buffercontext.imageSmoothingEnabled = false;
			C_GUI.context.imageSmoothingEnabled = false;
		}
	};
	C_GUI.setrelPosition = function() {
		switch (C_GUI.tools.getBrowser()) {
		case "msie":
		case "trident":
		case "opera":
			{
				C_GUI.mousePosition.fun = C_GUI.mousePosition.ie;
				break;
			}
		case "firefox":
			{
				C_GUI.mousePosition.fun = C_GUI.mousePosition.firefox;
				break;
			}
		default:
			{
				C_GUI.mousePosition.fun = C_GUI.mousePosition.chrome;
				break;
			}
		}

	};

	/*创建图形用的画布*/
	/*A canvas to create picture*/
	C_GUI.imagecreater = {
		creatercanvas: null,
		creatercontext: null,
		init: function() {
			C_GUI.imagecreater.creatercanvas = document.createElement("canvas");
			C_GUI.imagecreater.creatercontext = C_GUI.imagecreater.creatercanvas.getContext("2d");
		},
		drawpic: function(_width, _height, _draw) {
			if (!C_GUI.imagecreater.creatercontext) C_GUI.imagecreater.init();
			var ct = C_GUI.imagecreater.creatercontext,
			cv = C_GUI.imagecreater.creatercanvas;
			C_GUI.imagecreater.creatercanvas.width = _width;
			C_GUI.imagecreater.creatercanvas.height = _height;
			_draw(ct);
			var c = document.createElement("canvas");
			c.width = _width;
			c.height = _height;
			c.getContext("2d").drawImage(cv, 0, 0);
			return c;
		}
	};

	/*设置主画布*/
	/*set main canvas*/
	C_GUI.setCanvas = function(canvas_dom) {
		C_GUI.canvas = canvas_dom;
		C_GUI.setrelPosition();
		canvas_dom.width = canvas_dom.offsetWidth;
		canvas_dom.height = canvas_dom.offsetHeight;
		/*Solve events*/
		C_GUI.eve.stopPropagation = function() {
			C_GUI.eve.Propagation = false;
		};
		var aEL = C_GUI.tools.addEventListener;
		aEL(canvas_dom, "mouseover",
		function(e) {
			C_GUI.canvasonfocus = true;
		});
		aEL(canvas_dom, "mousemove",
		function(e) {
			//e.preventDefault();
			C_GUI.eve = new C_GUI.event();
			C_GUI.eve.target = C_GUI.onoverElement;
			C_GUI.mousePosition.fun(e);
			if (C_GUI.onoverElement && C_GUI.onoverElement.mousemove) {
				C_GUI.onoverElement.mousemove(C_GUI.eve);
			}
		});
		aEL(canvas_dom, "mousedown",
		function(e) {
			C_GUI.canvasonfocus = true;
			//e.preventDefault();
			var eve = new C_GUI.event();
			eve.target = C_GUI.onoverElement;
			eve.button = e.button;
			C_GUI.tosign.click = true;
			switch (eve.button) {
			case 0:
				C_GUI.tosign.click = C_GUI.mouseleft = true;
				break;
			case 1:
				C_GUI.tosign.centerclick = C_GUI.mousecenter = true;
				break;
			case 2:
				C_GUI.tosign.rightclick = C_GUI.mouseright = true;
				break;
			}
			if (C_GUI.onoverElement && C_GUI.onoverElement.mousedown) {
				if (C_GUI.onoverElement.mousedown) {
					C_GUI.onoverElement.mousedown(eve);
				}
				C_GUI.focus = C_GUI.onoverElement;
			}
		});
		aEL(document, "mousedown",
		function(e) {
			if (e.target != C_GUI.canvas) {
				C_GUI.canvasonfocus = false;
			}
		});
		aEL(canvas_dom, "mouseout",
		function() {
			C_GUI.e.mouseoutcanvas();
		});
		/*aEL(canvas_dom, "contextmenu",
		function(e) {
			e.preventDefault();
		});*/
		aEL(canvas_dom, "selectstart",
		function(e) {
			e.preventDefault();
		});
		aEL(window, "mouseout",
		function() {
			C_GUI.e.mouseoutcanvas();
		});

		aEL(canvas_dom, "resize",
		function() {
			C_GUI.document.width=canvas_dom.width = C_GUI.width = canvas_dom.offsetWidth;
			C_GUI.document.height=canvas_dom.height = C_GUI.height = canvas_dom.offsetHeight;
			if (C_GUI.buffercanvas) {
				C_GUI.buffercanvas.width = canvas_dom.offsetWidth;
				C_GUI.buffercanvas.height = canvas_dom.offsetHeight;
			}
			//C_GUI.setPosition();

		});

		aEL(canvas_dom, "mouseup",
		function(e) {
			var eve = new C_GUI.event();
			eve.target = C_GUI.onoverElement;
			eve.button = e.button;
			switch (eve.button) {
			case 0:
				C_GUI.mouseleft = false;
				if (C_GUI.tosign.click && eve.target && eve.target.click) {
					eve.target.click(eve);
				}
				break;
			case 1:
				C_GUI.mousecenter = false;
				if (C_GUI.tosign.centerclick && eve.target && eve.target.centerclick) {
					eve.target.centerclick(eve);
				}
				break;
			case 2:
				C_GUI.mouseright = false;
				if (C_GUI.tosign.rightclick && eve.target && eve.target.rightclick) {
					eve.target.rightclick(eve);
				}
				break;
			}
			if (C_GUI.onoverElement && C_GUI.onoverElement.mouseup) {
				C_GUI.onoverElement.mouseup(eve);
			}
		});
		var _mousewheele = (C_GUI.tools.getBrowser() == "firefox") ? "DOMMouseScroll": "mousewheel";
		aEL(canvas_dom, _mousewheele,
		function(e) {
			e = e || window.event;
			var eve = new C_GUI.event();
			eve.target = C_GUI.onoverElement;
			var data = e.wheelDelta ? e.wheelDelta: e.detail;
			if (data == -3 || data == 120) {
				eve.wheel = 0;
			} else if (data == 3 || data == -120) {
				eve.wheel = 1;
			}
			if (C_GUI.onoverElement && C_GUI.onoverElement.mousewheel) {
				C_GUI.onoverElement.mousewheel(eve);
			}

		});

		aEL(window, "keydown",
		function(e) {
			if (C_GUI.canvasonfocus) {

				if (!C_GUI.keys[e.keyCode]) {
					//e.preventDefault();
					var eve = new C_GUI.event();
					eve.keyCode = e.keyCode;
					C_GUI.keys[e.keyCode] = true;
					if (C_GUI.focus && C_GUI.focus.keydown) {
						C_GUI.focus.keydown(eve);
					}
				}
			}
		});
		aEL(window, "keyup",
		function(e) {
			if (C_GUI.canvasonfocus) {
				if (C_GUI.keys[e.keyCode]) {
					var eve = new C_GUI.event();
					eve.keyCode = e.keyCode;
					C_GUI.keys[e.keyCode] = false;
					if (C_GUI.focus && C_GUI.focus.keyup) {
						C_GUI.focus.keyup(eve);
					}
				}
				// e.preventDefault();
			}
		});
		aEL(window, "keypress",
		function(e) {
			if (C_GUI.canvasonfocus) {
				var eve = new C_GUI.event();
				eve.keyCode = e.keyCode;
				C_GUI.keys[e.keyCode] = false;
				if (C_GUI.focus && C_GUI.focus.keypress) {
					C_GUI.focus.keypress(eve);
				}
				// e.preventDefault();
			}
		});
		C_GUI.context = canvas_dom.getContext("2d");
		C_GUI.currentcontext = C_GUI.buffercontext || C_GUI.context;
		C_GUI.cct = C_GUI.currentcontext;
		C_GUI.document = C_GUI.Graph.New();
		C_GUI.Graph.Eventable(C_GUI.document);
		C_GUI.document.drawtype = "image";
		C_GUI.document.width = canvas_dom.width;
		C_GUI.document.height = canvas_dom.height;
		C_GUI.drawlist = [C_GUI.document];
	};

	C_GUI.setBuffCanvas = function(buf) {
		C_GUI.buffercanvas = buf;
		C_GUI.buffercontext = C_GUI.buffercanvas.getContext("2d");
		C_GUI.currentcontext = C_GUI.buffercontext || C_GUI.context;
	};

	C_GUI.Graph = {
		New: function(newname) {
			var g = {
				name: newname,
				GraphID:C_GUI.generateGraphID(),
				y: 0,
				x: 0,
				width: 1,
				height: 1,
				positionpoint: {
					x: 0,
					y: 0
				},
				rotate: 0,
				rotatecenter: {
					x: 0,
					y: 0
				},
				zoom: {
					x: 1,
					y: 1
				},
				display: true,
				opacity: null,
				beforedrawfun: null,
				afterdrawfun: null,
				overflow: null,
				drawtype: "function",
				//function、image、text
				drawfunction: null,
				backgroundColor: null,
				eventable: false,
				imageobj: null,
				needsort:true,
				z_index: null,
				clipBy:"border",
				drawlist: null,
				childNode: [],
				parentNode: null,
				set: function(json) {
					if (json) {
						for (var ob in json) {
							g[ob] = json[ob];
						}
					}
				},
				drawpic: function(width, height, _draw) {
					this.width = width;
					this.height = height;
					this.imageobj = C_GUI.imagecreater.drawpic(width, height, _draw);
				},
				setZoom: function(x, y) {
					if (arguments.length == 1) this.zoom.x = this.zoom.y = x;
					else if (arguments.length == 2) {
						this.zoom.x = x;
						this.zoom.y = y;
					}
				},
				useImage: function(image) {
					if (!this.imageobj) {
						this.imageobj = document.createElement("canvas");
					}
					var _this = this;
					function set() {
						_this.width = _this.imageobj.width = image.width;
						_this.height = _this.imageobj.height = image.height;
						_this.imageobj.getContext("2d").drawImage(image, 0, 0);
					}
					if (!image.complete) {
						image.onload = function() {
							set();
						};
					}
					try {
						set();
					} catch(e) {
						console.log(e);
					}

				},
				borderPathFun:function(ct){
					ct.rect(0, 0, this.width, this.height);
				},
				zindex: function(index) {
					this.z_index = index;
					if (this.parentNode) {
						C_GUI.tools.arraybyZ_index(this.parentNode);
					}
				},
				setRotateCenter: function() {
					if (arguments.length == 2) {
						this.rotatecenter.x = arguments[0];
						this.rotatecenter.y = arguments[1];
					} else if (arguments.length == 1) {
						switch (arguments[0]) {
						case "center":
							{
								this.rotatecenter.x = this.width / 2;
								this.rotatecenter.y = this.height / 2;
								break;
							}
						}
					}
				},
				setPositionPoint: function() {
					if (arguments.length == 2) {
						this.positionpoint.x = arguments[0];
						this.positionpoint.y = arguments[1];
					} else if (arguments.length == 1) {
						switch (arguments[0]) {
						case "center":
							{
								this.positionpoint.x = this.width / 2;
								this.positionpoint.y = this.height / 2;
								break;
							}
						}
					}
				},
				setSize: function(w, h) {
					this.width = w;
					this.height = h;

				},
				New: function() {
					var newobj = Object.create(this);
					newobj.parentNode = null;
					newobj.childNode = [];
					newobj.drawlist = null;
					return newobj;
				},
				clone: function() {
					var newobj = Object.create(this);
					return newobj;
				},
				addChild: function(graph) {
					if (graph.GraphID) {
						//console.log(graph.GraphID)
						//this.childNode.unshift(graph);
						this.childNode[graph.GraphID]=graph;
						graph.parentNode = this;
						if(this.needsort){
							C_GUI.tools.arraybyZ_index(this);
						}else{//var i=0;
							/*for(var eles in this.childNode){
								this.drawlist[i]= this.childNode[eles];
								i++;
							}*/
							this.drawlist.unshift(graph);
						}
						
					}
				},
				removeChild: function(graph) {
					/*for (var i = 0; graph.GraphID !=this.childNode[i].GraphID; i++) {
						if (i == this.childNode.length) break;
					}*/
					if(this.childNode[graph.GraphID]){
						this.childNode[graph.GraphID]=null;
						graph.parentNode = null;
						var i=0;
						for(var eles in this.childNode){
								if(!this.childNode[eles]){
									this.childNode.splice(i, 1);
									var ind=0;
							for(var eles in this.childNode){
								this.drawlist[ind]= this.childNode[eles];
								ind++;
							}
									break;
								}
								i++;
							}
					}
					/*if (graph.GraphID==this.childNode[i].GraphID) {
						this.childNode.splice(i, 1);
						C_GUI.tools.arraybyZ_index(this);
						//graph.parentNode = null;
					}*/
				}
			};
			return g;
		},
		NewImageObj: function(image) {
			var m = C_GUI.Graph.New();
			if (image) {
				m.userImage(image);
			}
		}, 
		NewTextObj: function(text, fontsize,opjson) {
			var t = C_GUI.Graph.New();
			t.drawtype = "text";
			t.realtimeVary=false;
			t.text = text || " ";
			t.baseline = "middle";
			t.fontStyle = null;
			t.fontWeight = null;
			t.textInput = null;
			t.fontVariant = null;
			t.lineHeight = null;
			t.fontSize = fontsize||"15px";
			t.fontFamily = null;
			t.innerX = 0;
			t.innerY = 0;
			t.color = "#000";
			t.autoSize = true;
			t.editable = false;
			t.textborderWidth = 0;
			t.textborderColor = "#fff";
			t.fill = true;
			t.shadowBlur = 0;
			t.shadowColor = "#CCC";
			t.shadowOffset = {
				x: 0,
				y: 0
			};
			t.maxWidth = 0;
			if (opjson) {
						for (var ob in opjson) {
							t[ob] = opjson[ob];
						}
			}
			t.prepareText = function() {
				if (!t.imageobj) {
					t.imageobj = document.createElement("canvas");
				}
				var ct = t.imageobj.getContext("2d");
				//ct.clearRect(0, 0, t.imageobj.width, t.imageobj.height);
				var font = "";
				if (t.fontStyle || C_GUI.font.fontStyle) font += t.fontStyle || C_GUI.font.fontStyle;
				if (t.fontVariant || C_GUI.font.fontVariant) font += (" " + (t.fontVariant || C_GUI.font.fontVariant));
				if (t.fontWeight || C_GUI.font.fontWeight) font += (" " + (t.fontWeight || C_GUI.font.fontWeight));
				font += (" " + (t.fontSize || C_GUI.font.fontSize) || "15px");
				if (t.lineHeight || C_GUI.font.lineHeight) font += (" " + (t.lineHeight || C_GUI.font.lineHeight));
				if (t.fontFamily || C_GUI.font.fontFamily) font += (" " + (t.fontFamily || C_GUI.font.fontFamily));
				else {
					font += (" " + C_GUI.fontFamily);
				}
				ct.font = font;
				t.font = font;
				if (t.autoSize) {
					var w = ct.measureText(t.text).width;
					t.width = t.imageobj.width = (t.maxWidth >= w) ? t.maxWidth: w;
					var fontsize = C_GUI.tools.getnum(t.fontSize) * 1.3;
					if (fontsize === 0) {
						fontsize = 20;
					}
					t.height = t.imageobj.height = fontsize;
				} else {
					t.imageobj.width = t.width || 100;
					t.imageobj.height = t.height || 30;
				}
				ct.translate(0, t.imageobj.height / 2);
				ct.textBaseline = t.baseline;
				ct.lineWidth = t.textborderWidth;
				ct.strokeStyle = t.textborderColor;
				ct.fillStyle = t.color || C_GUI.font.color||"#000";
				ct.save();
				if (t.shadowBlur > 0) {
					ct.font = font;
					ct.shadowBlur = t.shadowBlur;
					ct.shadowColor = t.shadowColor;
					ct.shadowOffsetX = t.shadowOffset.x;
					ct.shadowOffsetY = t.shadowOffset.y;
				}
				ct.font = font;
				if (t.fill) {
					ct.fillText(t.text, t.innerX, t.innerY);
				}
				if (t.textborderWidth) {
					ct.strokeText(t.text, t.innerX, t.innerY);
				}

				ct.restore();
			};
			t.setSize = function(width, height) {
				t.autoSize = false;
				t.width = width;
				t.height = height;
				t.prepareText();
			};
			t.setText = function(text) {
				t.text = text || " ";
				t.prepareText();
			};
			t.prepareText();
			return t;
		},
		Eventable: function(graph) {
			graph.eventable = true;
			graph.overPath = null;
			graph.events = [];
			for (var inde = 0; inde < C_GUI.commonevents.length; inde++) {
				graph.events["on" + C_GUI.commonevents[inde]] = [];
				graph[C_GUI.commonevents[inde]] = eval('(function(e){for(var i=graph.events["on' + C_GUI.commonevents[inde] + '"].length;i--;){if(typeof(graph.events["on' + C_GUI.commonevents[inde] + '"][i])=="function")graph.events["on' + C_GUI.commonevents[inde] + '"][i](e)}if(e.Propagation){if(graph.parentNode){for(var i=graph.parentNode.events["on' + C_GUI.commonevents[inde] + '"].length;i--;){if(typeof(graph.parentNode.events["on' + C_GUI.commonevents[inde] + '"][i])=="function")graph.parentNode.events["on' + C_GUI.commonevents[inde] + '"][i](e)}}}})');
			}
			graph.addEvent = function(name, fun) {
				if (!graph.events[name]) graph.events[name] = [];
				if (typeof(fun) == "function" && graph.events[name]) {
					var i = C_GUI.tools.findEmptyPlace(graph.events[name]);
					graph.events[name][i] = fun;
					var ev = {
						ename: name,
						index: i
					};
					return ev;
				} else {
					return false;
				}
			};
			graph.removeEvent = function(ev) {
				graph.events[ev.ename][ev.index] = null;
				ev = null;
			};
		},
		Delete: function(graph) {
			if (graph) {
				if (graph.parentNode) {
					graph.parentNode.removeChild(graph);
				}
				graph = null;
				return true;
			}
			return false;
		}
	};

	C_GUI.drawElement = function(d, ct) {
		/*for (var i = 0; i < d.length; i++) {*/
			for (var i in d) {
			if (d[i].display) {
				ct.save();
				ct.translate(d[i].x + d[i].rotatecenter.x - d[i].positionpoint.x, d[i].y + d[i].rotatecenter.y - d[i].positionpoint.y);
				ct.beginPath();
				ct.rotate(d[i].rotate * 0.017453);
				ct.scale(d[i].zoom.x, d[i].zoom.y);
				if (d[i].opacity !== null) ct.globalAlpha = d[i].opacity;
				if (d[i].overflow == "hidden") {
					ct.beginPath();
					switch(d[i].clipBy){
						case "border":{
							d[i].borderPathFun?d[i].borderPathFun(ct):C_GUI.tools.defaultPathFun(ct, d[i]);
							break;
						}
						case "drawfunction":{
							d[i].drawfunction?d[i].drawfunction(ct):C_GUI.tools.defaultPathFun(ct, d[i]);
							break;
						}
						default:{
							C_GUI.tools.defaultPathFun(ct, d[i]);
						}
					}
					ct.clip();
				}
				ct.save();
				if (d[i].Composite) ct.globalCompositeOperation = d[i].Composite;
				if (d[i].beforedrawfun) d[i].beforedrawfun(ct);
				if (d[i].backgroundColor) {
					ct.fillStyle = d[i].backgroundColor;
					ct.fillRect( - (d[i].rotatecenter.x), -(d[i].rotatecenter.y), d[i].width, d[i].height);
				}
				switch (d[i].drawtype) {
				case "function":
					{
						ct.translate( - d[i].rotatecenter.x, -d[i].rotatecenter.y);
						if (d[i].drawfunction) d[i].drawfunction(ct);
						break;
					}
				case "image":
				case "text":
					{
						ct.translate( - d[i].rotatecenter.x, -d[i].rotatecenter.y);
						if (d[i].imageobj && d[i].imageobj.width && d[i].imageobj.height) {
							ct.drawImage(d[i].imageobj,0, 0);
						}
						break;
					}
				}
				ct.save();
				if (d[i].eventable) {
					if (C_GUI.mouseX) {
						if (d[i].overPath) {
							d[i].overPath(ct);
						}else if(d[i].drawfunction){
							d[i].drawfunction(ct);
						} else {
							C_GUI.tools.defaultPathFun(ct, d[i]);
						}
						if (ct.isPointInPath(C_GUI.mouseX, C_GUI.mouseY)) {
							C_GUI.newonoverElement = d[i];
							if (C_GUI.Debug.stat) {
								ct.save();
								ct.globalCompositeOperation="lighter";
								ct.fillStyle = "rgba(255,255,255,0.3)";
								ct.fill();
								ct.restore();
							}
						}

					}
				}
					if (C_GUI.Debug.stat) {
						ct.save();
						ct.beginPath();
						ct.strokeRect(0, 0, d[i].width, d[i].height);
						ct.stroke();
						var zx = d[i].zoom.x,
						zy = d[i].zoom.y;
						if (d[i].parentNode) {
							zx *= d[i].parentNode.zoom.x;
							zy *= d[i].parentNode.zoom.y;
						}
						ct.scale(1 / zx, 1 / zy);
						ct.textBaseline = "top";
						ct.fillStyle = "rgba(0,0,0,1)";
						ct.font = "20px Arial";
						switch (d[i].drawtype) {
						case "function":
							{
								ct.fillText("Function", 0, 0);
								break;
							}

						case "image":
							{
								ct.fillText("Image", 0, 0);
								break;
							}
						case "text":
							{
								ct.fillText("Text", 0, 0);
								ct.font = "12px Arial";
								ct.fillText("font:" + d[i].font, 0, -12);
								break;
							}
						}
						if (C_GUI.Debug.eleinfo) {
							ct.font = "10px Arial";
							ct.fillText("X:" + d[i].x + " " + "Y:" + d[i].y, 0, 21);
							ct.fillText("rotate:" + d[i].rotate, 0, 31);
							ct.fillText("zoom:" + d[i].zoom.x + "," + d[i].zoom.y, 0, 41);
							ct.fillText("RotatePotint:" + d[i].rotatecenter.x + " " + d[i].rotatecenter.y, 0, 51);
							ct.fillText("Size:" + d[i].width + "*" + d[i].height, 0, 61);
						}
						ct.restore();
					}
				ct.restore();
				if (d[i].afterdrawfun) d[i].afterdrawfun(ct);
				ct.restore();
				ct.translate( - d[i].rotatecenter.x, -d[i].rotatecenter.y);
				if (d[i].childNode.length) {
					C_GUI.drawElement(d[i].drawlist, ct);
				}
				ct.restore();
			}
		}

	};

	C_GUI.mousePosition = {
		fun: null,
		offsetx: 0,
		offsety: 0,
		chrome: function(e) {
			C_GUI.mouseX = e.offsetX;
			C_GUI.mouseY = e.offsetY;
		},
		ie: function(e) {
			C_GUI.mouseX = e.offsetX;
			C_GUI.mouseY = e.offsetY;
		},
		firefox: function(e) {
			C_GUI.mouseX = e.layerX;
			C_GUI.mouseY = e.layerY;
		}
	};

	/*把队列中的图形按index绘制出来*/
	/*draw all graphs whose [display=true]*/
	// var cct;
	C_GUI.draw = function() {
		C_GUI.newonoverElement = null;
		if (C_GUI.autoClear) {
			C_GUI.context.clearRect(0, 0, C_GUI.canvas.width, C_GUI.canvas.height);
			if (C_GUI.buffercontext) C_GUI.buffercontext.clearRect(0, 0, C_GUI.document.width, C_GUI.document.height);
		}
		C_GUI.drawElement(C_GUI.drawlist, C_GUI.currentcontext);
		if (C_GUI.Debug.stat) {
			C_GUI.cct.save();
			C_GUI.cct.setTransform(1, 0, 0, 1, 0, 0);
			C_GUI.cct.font = "16px Arial";
			C_GUI.cct.textBaseline = "bottom";
			C_GUI.cct.globalCompositeOperation = "lighter";
			C_GUI.cct.fillStyle = "red";
			C_GUI.cct.fillText("mouseX:" + C_GUI.mouseX + " Y:" + C_GUI.mouseY + " mouseL:" + C_GUI.mouseleft + " C:" + C_GUI.mousecenter + " R:" + C_GUI.mouseright+" FPS:"+C_GUI.fps.v, 0, C_GUI.canvas.height);
			C_GUI.cct.strokeStyle = "red";
			C_GUI.cct.globalCompositeOperation = "source-over";
			C_GUI.cct.moveTo(C_GUI.mouseX, C_GUI.mouseY + 6);
			C_GUI.cct.lineTo(C_GUI.mouseX, C_GUI.mouseY - 6);
			C_GUI.cct.moveTo(C_GUI.mouseX - 6, C_GUI.mouseY);
			C_GUI.cct.lineTo(C_GUI.mouseX + 6, C_GUI.mouseY);
			C_GUI.cct.stroke();
			C_GUI.cct.restore();
			C_GUI.fps.c++;
		}
		if (C_GUI.newonoverElement != C_GUI.onoverElement) {
			if (C_GUI.onoverElement && C_GUI.onoverElement.mouseout) {
				var eve = new C_GUI.event();
				eve.target = C_GUI.onoverElement;
				C_GUI.onoverElement.mouseout(eve);
			}
			C_GUI.onoverElement = C_GUI.newonoverElement;
			if (C_GUI.onoverElement && C_GUI.onoverElement.mouseover) {
				var eve = new C_GUI.event();
				eve.target = C_GUI.onoverElement;
				C_GUI.onoverElement.mouseover(eve);
			}
		}
	};

	C_GUI.tools = {
		getnum: function(string) { //提取字符串里首次出现的数字串
			if (!string) return 0;
			else {
				var a = Number(string.match(/\d+/)[0]);
				if (a) return a;
				else return 0;
			}
		},
		findEmptyPlace: function(array) {
			var i = 0;
			while (array[i]) i++;
			return i;
		},
		Linear: {
			go: function(start, end, time, func, _hz) {
				if (!window.linear) window.linear = [];
				var ind = C_GUI.tools.findEmptyPlace(window.linear);
				var linear = window.linear[ind] = {};
				linear.start = start;
				linear.end = end;
				linear.time = time;
				linear.process = linear.c = linear.precentage = 0;
				linear.func = func;
				linear.hz = _hz || 30;
				linear.totalc = time / 1000 * linear.hz;
				linear.part = (end - start) / linear.totalc;
				linear.i = setInterval(function() {
					linear.c++;
					linear.process += linear.part;
					linear.precentage = linear.c / linear.totalc;
					if (linear.c > linear.totalc) {
						clearInterval(linear.i);
						func(linear.end);
						for (var n in linear) {
							delete linear[n];
						}
						linear = null;
						return;
					}
					func(linear.process);
				},
				1000 / linear.hz);
				return linear;
			},
			continue: function(linear) {
				if (!linear.i) {
					linear.i = setInterval(function() {
						linear.c++;
						linear.process += linear.part;
						linear.precentage = linear.c / linear.totalc;
						if (linear.c > linear.totalc) {
							clearInterval(linear.i);
							linear.func(linear.end);
							for (var n in linear) {
								delete linear[n];
							}
							linear = null;
							return;
						}
						linear.func(linear.process);
					},
					1000 / linear.hz);
				}

			},
			pause: function(linear) {
				clearInterval(linear.i);
				linear.i = null;
			},
			stop: function(linear) {
				clearInterval(linear.i);
				for (var n in linear) {
					delete n;
				}
				linear = null;
			},
			setProcess: function(linear, precentage) {
				if (! (linear.func && precentage >= 0 && precentage <= 1)) return;
				linear.c = linear.time * precentage / 1000 * linear.hz;
				linear.precentage = linear.c / linear.totalc;
				linear.process = linear.c * linear.part;
				linear.func(linear.process);
			}
		},
		paixurule: function(a, b) { //index的排序规则
			return a.z_index - b.z_index;
		},
		arraybyZ_index: function(graph) { //让图形的子元素排序
			if (graph.childNode) graph.drawlist = graph.childNode.sort(C_GUI.tools.paixurule);
		},
		defaultPathFun: function(ct, graph) {
			ct.rect(0, 0, graph.width, graph.height);
		},
		addEventListener: function(dom, e, fun) {
			if (dom.addEventListener) dom.addEventListener(e, fun, false);
			else if (dom.attachEvent) dom.attachEvent("on" + e, fun);
			else {
				dom["on" + e] = fun;
			}
		},
		getBrowser: function() { //识别浏览器
			var b = navigator.userAgent.toLowerCase().match(/MSIE|Firefox|Opera|Safari|Chrome|trident/i);
			if (b.length) b = b[0];
			else b = "unknow";
			return b;
		},
		rand: function(min, max) { //范围随机数
			return Math.floor(min + Math.random() * (max - min));
		},
		fpscounter:function(){
			C_GUI.fps.v=C_GUI.fps.c;
			C_GUI.fps.c=0;
		}
	};

	C_GUI.Debug = {
		stat: false,
		eleinfo: false,
		on: function() {
			if(!C_GUI.Debug.stat){
						C_GUI.Debug.stat = true;
						clearInterval(C_GUI.fps.i);
						C_GUI.fps.c=0;
						C_GUI.fps.i=setInterval(C_GUI.tools.fpscounter,1000);}
		},
		off: function() {
			if(C_GUI.Debug.stat){
						C_GUI.Debug.stat = false;
						clearInterval(C_GUI.fps.i);}
		}
	};
	return C_GUI;
}
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelRequestAnimationFrame = window[vendors[x]+
          'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());