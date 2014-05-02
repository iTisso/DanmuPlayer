var interval, danmulist=[],tunnel=[],height;
/*function newTimePiece(t) {
	//self.postMessage(t);
	if (timeline[t]) {
		timeline[t] = false;
		self.postMessage(t);
	}
	t += 10;
	//self.postMessage(t);
	var i = 0;
	var val = setInterval(function() {
		//self.postMessage(t);
		if (timeline[t]) {
				timeline[t] = false;
				self.postMessage(t);
		}
		t += 10;
		if (i ==30) {
			clearInterval(val);
		}
		i++;
	},
	10);
}
function refresh() {
	for (var point in timeline) {
		timeline[point] = true;
	}
}*/
function getEmptytunnel(size){

}
self.addEventListener('message',
function(e) {
	var json=e.data;
	if(json.time){//准备弹幕
		/*if(danmulist[json.time]){
			var sendsanmus=[];
			for()
		}
*/	}else if(json.danmulist){//重置弹幕表
		for(var i=0;i<json.danmulist.length;i++){
			danmulist[json.danmulist[i].t].push(json.danmulist[i]);
		}
	}else if(json.add){

	}else if(json.setheight){
		height=json.setheight;
	}
	/*if (e.data >= 0) {
		newTimePiece(e.data);
	} else {
		try {
			var json = e.data;
			if (json.timeline) {
				timeline = [];
				for (var tp in json.timeline) {
					timeline[tp] = true;
				}
			} else if (json.cmd) {
				switch (json.cmd) {
				case "seek":
					{
						//refresh();
						for (var point in timeline) {
							timeline[point] = true;
						}
						break;
					}
				}
			} else if (json.timepoint) {
				timeline[json.timepoint] = true;
			}
		} catch(err) {}
	}*/
},
false);
