var _g_ver_blPlx_4_Mp3Player = "v0.0.24";
var plxUI = blo0.blMDiv(document.body, "id_mv_blMp3Player_plx" , "blPlx: " + _g_ver_blPlx_4_Mp3Player , 0,0,150,50, blGrey[3]);  
plxUI.style.position = "fixed"; 
plxUI.style.width = "30%";
//plxUI.handle.style.display = "none";
//plxUI.main.style.display = "none";
plxUI.d1 = blo0.blDiv(plxUI, plxUI.id + "d1", "d1",blGrey[2]);
plxUI.d1.v = blo0.blMDiv(plxUI.d1, plxUI.d1.id + "v","blPlx.d1.v" , 50,50,150,50, blGrey[3]);  
plxUI.d1.v.style.position = "relative";
plxUI.d1.v.style.float = "right";


plxUI.d1.v1 = blo0.blMDiv(plxUI.d1, plxUI.d1.id + "v1","blPlx.d1.v1" , 50,50,150,50, blColor[4]);  
 