var _g_ver_blPlx_4_Mp3Player = "v0.0.41";
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
var b1 = blo0.blBtn(vLrc, "vLrc.b1","b1",blGrey[1]);
b1.onclick = function(){
	if(_p.lyricsLink){

    	var lrcBox = document.getElementById("id_lrcBox");
    	lrcBox.style.marginTop = 0; //初始化

    	var xmlhttp,
        	lrcVal,
        	lrcArray = [],
        	lrcTimeArray = [],
        	html = "",
        	musicName,
        	singer;

		xdAjaxGetLrc(_p.lyricsLink);
	}
	function xdAjaxGetLrc(url){
		if(url === ""){
            //没有歌词
            bl$("id_lrcBox").innerHTML = "<div class=\"no-lrc\">暂无歌词</div>";
        }else{
        	bl$("id_lrc_url").innerHTML = url;

        	xmlhttp = null;
            if(window.XMLHttpRequest){
                xmlhttp = new XMLHttpRequest();
            }
            //IE5,6
            else if(window.ActiveXObject){
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            if(xmlhttp != null){
                xmlhttp.onreadystatechange = xdGetLyrData;
                xmlhttp.open("get", url , true);
                xmlhttp.send(null);
            }else{
                alert("您的浏览器不支持 XMLHTTP");
            }
        }
	}

	function xdGetLyrData(){
        if(xmlhttp.readyState === 4){
            if(xmlhttp.status === 0 || xmlhttp.status === 200){
                //获取歌词内容
                lrcVal = xmlhttp.responseText.replace(/\[\d\d:\d\d.\d\d]/g,"");
                lrcArray = lrcVal.split("\n");

                //歌曲名
                lrcArray[0].replace(/\[\w\w\:(.*?)\]/g,function(){
                    musicName = arguments[1] || "暂无";
                });

                //歌手
                lrcArray[1].replace(/\[\w\w\:(.*?)\]/g,function(){
                    singer = arguments[1] || "暂无";
                });

                //获取歌曲名和歌手名
                html += "<p class=\"lrc-line\" data-timeLine=\"0\"><span class=\"mr15\">歌曲：" + musicName + "</span>歌手：" + singer + "</p>";

                //只保留歌词部分
                lrcArray.splice(0,4);

                //获取歌词时间轴
                xmlhttp.responseText.replace(/\[(\d*):(\d*)([\.|\:]\d*)\]/g,function(){

                    var min = arguments[1] | 0, //分
                        sec = arguments[2] | 0, //秒
                        realMin = min * 60 + sec; //计算总秒数

                    lrcTimeArray.push(realMin);
                });

                //将歌词装入容器
                for(var i=0;i<lrcTimeArray.length;i++){
                    html += "<p class=\"lrc-line\" data-timeLine=\"";
                    html += lrcTimeArray[i] + "\">" + lrcArray[i] + "</p>";
                }

                lrcBox.innerHTML = html;

            }else{
                alert("获取歌词出错，请刷新浏览器");
            }
        }
    }
}

function xdMoveLyrics(timeall,currenttime, id){
    //歌曲总时间 timeall
    //当前时间 currenttime
    var _lrcBox = document.getElementById(id),
        domList = _lrcBox.getElementsByTagName("p"),
        timer4Lrc,
        index,
        s,
        m = parseInt(_lrcBox.style.marginTop.split("-")[1]) || 0;

    for(var i=0;i<domList.length;i++){
        //如果当前时间等于遍历的歌词的时间
        var dataTimeLine = parseInt(domList[i].attributes["data-timeLine"].nodeValue);

        //等到唱第一句歌词的时候再滚动
        if(dataTimeLine > 0 && dataTimeLine === parseInt(currenttime)){

            //当前歌词的下标
            index = i;

            //当前下标值和上次记录的下标值不同才滚动，一个下标值只滚动一次
            if(s != i){                
                s = i;//记录下标值
                bl$("id_lrcBoxMove").innerHTML = i + ":" + domList[i].innerHTML;                
            }
        }
    }
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
        },1000);
	}
	else if(this.innerHTML==="stop"){
		this.innerHTML = "start";
		clearInterval(this.timer);
		id_lrcBoxMove.innerHTML= "stop";
	}
}
var id_lrc_url = blo0.blDiv(plxUI.d1.v1, "id_lrc_url", "id_lrc_url",blColor[6]); 
var vLrc = blo0.blDiv(plxUI.d1.v1, "id_lrcBox", "id_lrcBox",blColor[5]); 
var id_lrcBoxMove = blo0.blDiv(plxUI.d1.v1, "id_lrcBoxMove", "id_lrcBoxMove",blColor[7]); 

