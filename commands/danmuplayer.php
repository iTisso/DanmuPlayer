<?php
$option = $options;
if (isID($option[0])) {
function optioneles(){
?>
<div>

<?php
}
 ?>
<div  class="playermainbody" allowfullscreen="true" type="danmuplayer" videoid="<?php echo $option[0];?>">
            <div id="videoframe">
                <video id="video"></video>
                <div id="danmuframe">
                    <canvas id="danmulayer"></canvas>
                </div>
            </div>
            <div id="sidebar">
                <div id="ctrlpannel">
                <div id="playcount">播放数:获取中..</div>
                <div id="danmucount">弹幕数:获取中..</div>
                <div id="statboard"></div>
                <div id="danmulistbutton" class="ctrlbutton">弹幕池</div><div id="superdanmubutton" class="ctrlbutton">高级弹幕</div><div id="optionbutton" class="ctrlbutton">设置</div>
                </div>
                <div id="tabpages">
                   <div id="danmupool" class="tabpage"  onselectstart="return false" >
                       <div id="tabletop">
                           <span class="danmutime">时间</span> <span class="danmucontent">内容</span> <span class="danmudate">日期</span>
                       </div>
                       <div id="danmus"></div>
                   </div>
                   <div id="superdanmueditor" class="tabpage"></div>
                 <div id="optionpannel" class="tabpage">
                 <div>
                     <h3> 播放器设置</h3>
                      <span>默认隐藏边栏:<div switch name="DefaultHideSideBar"></div></span>
                 </div>
                 <div>
                     <h3> 效果</h3>
                      <span>弹幕实时渲染:<div switch name="RealtimeVary"></div></span>
                 </div>
                 <div>
                      <h3>开发</h3>
                      <span>弹幕层Debug:<div switch name="Debug"></div></span>
                 </div>
                 </div>
                </div>
                
            </div>
            <div id="sendbox">
                <input id="danmuinput" />
                <div id="fontstylebutton">₣<div id="fontpannel">
                    <div id="danmuType">
                        <span>奇行</span>
                        <div id="fromtop" title="顶部">⿵</div>
                        <div id="frombottom" title="底部">⿶</div>
                        <div id="fromright" title="向左" class="selected">←</div>
                        <div id="fromleft" title="向右">→</div>
                    </div>
                    <div id="fontSize">
                        <span>大小</span>
                        <div id="Sizesmall" title="小">C</div>
                        <div id="Sizemiddle" title="中" class="selected">D</div>
                        <div id="Sizebig" title="大">E</div>
                    </div>
                    <div id="fontColor">
                        <span>颜色</span>
                        <input id="colorinput" placeholder="FFFFFF"/>
                        <div id="colorview"></div>
                    </div>
                </div>
                </div>
                <div id="sendbutton">发射</div>
                <div id="sendboxcover"></div>
            </div>
            <div id="controler" onselectstart="return false" >
                <div id="play_pause">
                    <div id="pause" title="暂停">
                        <span type="1"></span>
                        <span type="2"></span>
                    </div>
                    <div id="play" title="播放">
                        <div></div>
                    </div>
                </div>
                <div id="progress">
                    <canvas id="loadinfo"></canvas>
                </div>
                <div id="time"></div>
                <div id="danmuctrl" title="显示/隐藏弹幕">⊙</div>
                <div id="sidebarctrl" title="显示/隐藏侧栏">ￅ</div>
                <div id="volume" title="音量">
                    <div id="stat">Д</div>
                    <div id="range">
                        <div></div>
                    </div>
                    <span>100</span>
                </div>
                <div id="loop" title="循环">∞</div>
                <div id="fullscreen" title="全屏">全<div id="fullpage" title="填满页面">页</div></div>
            </div>
        </div><?php
} else {
    echo "Error";
}

?>
