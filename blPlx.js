var _g_ver_blPlx_4_Mp3Player = "xd2: v0.0.55";
var plxUI = blo0.blMDiv(document.body, "id_mv_blMp3Player_plx" , "blPlx: " + _g_ver_blPlx_4_Mp3Player , 0,0,150,50, blGrey[3]);  
plxUI.style.position = "fixed"; 
plxUI.style.width = "30%";
//plxUI.handle.style.display = "none";
//plxUI.main.style.display = "none";
plxUI.d1 = blo0.blDiv(plxUI, plxUI.id + "d1", "d1",blGrey[2]);
plxUI.d1.v = blo0.blMDiv(plxUI.d1, plxUI.d1.id + "v", v_musciPlayer_js , 50,50,150,50, blGrey[3]);  
plxUI.d1.v.style.position = "relative";
plxUI.d1.v.style.float = "right";


plxUI.d1.v1 = blo0.blMDiv(plxUI.d1, plxUI.d1.id + "v1","blPlx.d1.v1" , 50,50,250,50, blColor[4]);  
var _p = bl$("musicEngine"); 
var vLrc = blo0.blDiv(plxUI.d1.v1, "id_vLrc", _p.id ,blGrey[0]); 

var b0 = blo0.blBtn(vLrc, "vLrc.b0","b0",blGrey[1]);
b0.onclick = function(){
	if(this.load){
		var b = this; 		_on_off_div(b,bl$("id_lrcBox"));
		b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
		return;
	}
	this.load = true;
	if(_p.lyricsLink){ 
    	xd2LoadLrc(_p.lyricsLink,bl$("id_lrc_url"),bl$("id_lrcBox"));
	}
	var b = this; 			_on_off_div(b,bl$("id_lrcBox"));
	b.style.background = b.style.background=="red"?blGrey[5]:blColor[4];
}

	function xd2LoadLrc(url,o1,o2){
		o1.innerHTML = url; 
		var lrcArray = [],lrcTimeArray = [];
		var html = "", musicName, singer;

		o2.parseTxt = function(txt){
			//获取歌词内容
            this.lrcVal = txt.replace(/\[\d\d:\d\d.\d\d]/g,"");
            lrcArray = this.lrcVal.split("\n");
            //歌曲名
            lrcArray[0].replace(/\[\w\w\:(.*?)\]/g,function(){
                    musicName = arguments[1] || "暂无";
                });

                //歌手
            lrcArray[1].replace(/\[\w\w\:(.*?)\]/g,function(){
                    singer = arguments[1] || "暂无";
                });

            //获取歌曲名和歌手名
            html += "<p class=\"lrc-line\" data-timeLine=\"0\"><span class=\"mr15\">歌曲：";
            html += musicName + "</span> <br>歌手：" + singer + "</p>";

			//只保留歌词部分
            lrcArray.splice(0,2);

            //获取歌词时间轴
            txt.replace(/\[(\d*):(\d*)([\.|\:]\d*)\]/g,function(){

                    var min = arguments[1] | 0, //分
                        sec = arguments[2] | 0, //秒
                        realMin = min * 60 + sec; //计算总秒数

                    lrcTimeArray.push(realMin);
            });

            //将歌词装入容器
            for(var i=0;i<lrcTimeArray.length;i++){
            	html += lrcTimeArray[i];
            	html += "::";
                    html += "<p class=\"lrc-line\" data-timeLine=\"";
                    html += lrcTimeArray[i] + "\">" + lrcArray[i] + "</p>";
            }
             
			this.innerHTML = html;
		}
		o2._2do = function(txt){
			this.parseTxt(txt);
		} 
		blo0.blAjx(o2,url);
	}
 

function xdMoveLyrics(timeall,ct, id){ 
    var _lrcBox = bl$(id),
        domList = _lrcBox.getElementsByTagName("p"),         
        s 		= 0,
        m 		= parseInt(_lrcBox.style.marginTop.split("-")[1]) || 0;

	var d = bl$("id_lrcBoxMove");
    for(var i=0;i<domList.length;i++){ 
        var tl = parseInt(domList[i].attributes["data-timeLine"].nodeValue);
        if(ct>tl){
        	s=i;
        }
    }
	d.innerHTML =  s +  ":" + domList[s].innerHTML + ":"+ ct;
	var v1 = blo0.blDiv(plxUI.d1.v1, "v1", "v1",blGrey[3]);   
	v1.innerHTML = domList[s+1].innerHTML;    
}
var b2 = blo0.blBtn(vLrc, "vLrc.b2","start",blGrey[1]);
b2.onclick = function(){
	if(this.innerHTML==="start"){
		this.innerHTML = "stop"; 
		this.timer = setInterval(function(){
            var mPlayer = document.getElementById("musicEngine");
            //获取歌曲总时间
            var ta = timeAll();
            //获取歌曲当前播放时间
            ct = currentTime();
            //计算歌词滚动  
            xdMoveLyrics(ta , ct, "id_lrcBox");
        },100);
	}
	else if(this.innerHTML==="stop"){
		this.innerHTML = "start";
		clearInterval(this.timer);
		id_lrcBoxMove.innerHTML= "stop";
	}
}
var id_lrc_url = blo0.blDiv(plxUI.d1.v1, "id_lrc_url", "id_lrc_url",blColor[6]); 
var vLrc = blo0.blDiv(plxUI.d1.v1, "id_lrcBox", "id_lrcBox",blGrey[5]); 
var id_lrcBoxMove = blo0.blDiv(plxUI.d1.v1, "id_lrcBoxMove", "id_lrcBoxMove",blColor[7]); 

