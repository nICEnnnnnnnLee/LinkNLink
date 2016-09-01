// JavaScript Document
var minx=0;//边界
var maxx=5;
var miny=0;
var maxy=9;
var total=(maxx-1)*(maxy-1);
var remain=total;//剩余未消除格子数5*8=40
var pic=[];
var line=0;//line的个数
var point1=[];//要连接的点p1->p2->p3->p4
var point2=[];
var point3=[];
var point4=[];
var tableContent="";
$(document).ready(function(e) {
	document.addEventListener("backbutton",quitConfirm,true);
	$("#replay").click(function(e){	
		setGame(maxx,maxy);
	});
	$("#quit").click(function(e){	
		quit();
	});
	setGame(maxx,maxy)
});
jQuery.fn.hideDiv = function() {
    return this.each(function() {
		$(this).find(">div").removeClass("show");
		$(this).html("");
		//$(this).addClass("off");
		$(this).attr("style","");
    });
}

jQuery.fn.setBground = function() {
    return this.each(function() {
		if($(this).hasClass("off")){return;}
		$(this).attr("style","background-image:url(images/pvz/"+$(this).attr("pic")+".png);");
    });
}

//随机产生18个可重复的1~47以内的数  47是因为有47个图片；18是36的一半
function getRandom(){
	for(var i=0;i<total/2;i++){
		pic[i]=parseInt(Math.random()*47+1);
	}
}

//将36个图片与之attr("pic")对应 即随机排序
function randomSort(){
	
	for(var i=0;i<total/2;i++){
		var j=Number(i+total/2);
		pic[j]=pic[i];
	}
	pic.sort(compare);
	for(var i=0;i<total;i++){
		$(".pic[class$='pic']:eq("+i+")").attr("pic",pic[i]);
	}
}

function compare(a,b){
	if(Math.random()*2>1){return 1;}
	else {return -1}
}

function isAbleToLink(x1,y1,x2,y2){//判断两点间是否能用三根线连接
	x1=Number(x1);x2=Number(x2);
	y1=Number(y1);y2=Number(y2);
	if(xFirstStep(x1,y1,x2,y2) || yFirstStep(x1,y1,x2,y2)){
		return true;	
	}else{
		return false;
	}
}

function xFirstStep(x1,y1,x2,y2){//两点间连接的第一步水平走
	//选取第一点(i,y1),那么第二点(i,y2);
	var i;
	for(i=minx;i<=maxx;i++){
		//考虑第一点与x1,y1重合的情况；第二点与x2,y2重合的情况;一二点与x1,y1重合的情况；不重合的情况
		if(i==x1){
			if(y1==y2 && isOK(i,y1,i,y2) && isOK(i,y2,x2,y2)){
				setPoint();
				return true;
			}
			if(!$("[x="+i+"][y="+y2+"] >div").hasClass("show") && isOK(i,y1,i,y2) && isOK(i,y2,x2,y2)){
				setPoint();
				return true;
			}
		}else if(i==x2){
			if(!$("[x="+i+"][y="+y1+"] >div").hasClass("show") && isOK(x1,y1,i,y1) && isOK(i,y1,i,y2)){
				setPoint();
				return true;	
			}
		}else if(!$("[x="+i+"][y="+y1+"] >div").hasClass("show") && !$("[x="+i+"][y="+y2+"] >div").hasClass("show") && isOK(x1,y1,i,y1) && isOK(i,y1,i,y2) && isOK(i,y2,x2,y2)){
			setPoint();
			return true;	
		}
	}
	function setPoint(){
		point1[0]=x1;point1[1]=y1;
		point2[0]=i;point2[1]=y1;
		point3[0]=i;point3[1]=y2;
		point4[0]=x2;point4[1]=y2;	
	}
	return false;
}

function yFirstStep(x1,y1,x2,y2){//两点间连接的第一步垂直走
	//选取第一点(x1,i),那么第二点(x2,i);
	var i;
	for(i=miny;i<=maxy;i++){
		//考虑第一点与x1,y1重合的情况；第二点与x2,y2重合的情况;一二点与x1,y1重合的情况；不重合的情况
		if(i==y1){
			if(x1==x2 && isOK(x2,i,x2,y2)){
				setPoint();
				return true;
			}
			if(!$("[x="+x2+"][y="+i+"] >div").hasClass("show") && isOK(x1,i,x2,i) && isOK(x2,i,x2,y2)){
				setPoint();
				return true;
			}
		}else if(i==y2){
			if(!$("[x="+x1+"][y="+i+"] >div").hasClass("show") && isOK(x1,y1,x1,i) && isOK(x1,i,x2,i)){
				setPoint();
				return true;	
			}
		}else if(!$("[x="+x1+"][y="+i+"] >div").hasClass("show") && !$("[x="+x2+"][y="+i+"] >div").hasClass("show") && isOK(x1,y1,x1,i) && isOK(x1,i,x2,i) && isOK(x2,i,x2,y2)){
			setPoint();
			return true;	
		}
	}
	function setPoint(){
		point1[0]=x1;point1[1]=y1;
		point2[0]=x1;point2[1]=i;
		point3[0]=x2;point3[1]=i;
		point4[0]=x2;point4[1]=y2;	
	}
	return false;
}
function isOK(x1,y1,x2,y2){//判断两点之间是否有障碍 俩相同点返回true
	if(x1==x2){
		var ymin=y1<y2?y1:y2;
		var ymax=y1>y2?y1:y2;
		for(var i=ymin+1;i<ymax;i++){
			if($("[x="+x1+"][y="+i+"] >div").hasClass("show"))
			return false;
		}
		return true;
	}else if(y1==y2){
		var xmin=x1<x2?x1:x2;
		var xmax=x1>x2?x1:x2;
		for(var i=xmin+1;i<xmax;i++){
			if($("[x="+i+"][y="+y1+"] >div").hasClass("show")){
				return false;
			}
		}
		return true;
	}else	return false;
}
function linkPoint(point1,point2){
	drawLine(point1[0],point1[1],point2[0],point2[1]);
}
function drawLine(x1,y1,x2,y2){
	if(y1==y2){
		px1=$("[x="+x1+"][y="+y1+"]").offset().left+$("[x="+x1+"][y="+y1+"]").width()/2;
		px2=$("[x="+x2+"][y="+y1+"]").offset().left+$("[x="+x2+"][y="+y1+"]").width()/2;
		y=$("[x="+x2+"][y="+y1+"]").offset().top+$("[x="+x1+"][y="+y1+"]").height()/2;
		drawxLine(px1,px2,y);
	}else if(x1==x2){
		py1=$("[x="+x1+"][y="+y1+"]").offset().top+$("[x="+x1+"][y="+y1+"]").height()/2;
		py2=$("[x="+x1+"][y="+y2+"]").offset().top+$("[x="+x1+"][y="+y2+"]").height()/2;
		x=$("[x="+x1+"][y="+y1+"]").offset().left+$("[x="+x1+"][y="+y1+"]").width()/2;
		drawyLine(py1,py2,x);
	}
}

function drawxLine(x1,x2,y){
	xmin=Number(x1<x2?x1:x2);
	xmax=Number(x1>x2?x1:x2);
	y=Number(y);
	$("#line").append("<div class='top' id='line"+line+"'></div>");
	$("#line"+line).animate({
		top:y,
		left:xmin,
		width:xmax-xmin+3
	},0);
	line++;

}

function drawyLine(y1,y2,x){
	ymin=Number(y1<y2?y1:y2);
	ymax=Number(y1>y2?y1:y2);
	x=Number(x);
	$("#line").append("<div class='left' id='line"+line+"'></div>");
	$("#line"+line).animate({
		top:ymin,
		left:x,
		height:ymax-ymin+3
	},0);
	line++;
}
function dropLines(){
	$("#line").html("");
	line=0;	
}
function writeTrFL(maxx,y){
	var temp="<tr>";
	for(var i=0;i<=maxx;i++){
		temp+="<td><div x='"+i+"' y='"+y+"'></div></td>";
	}
	temp+="</tr>";
	return temp;
}
function writeTr(maxx,y){
	var temp="<tr>";
	temp+="<td><div class='pic off' x='0' y='"+y+"'></div></td>";
	for(var i=1;i<maxx;i++){
		temp+="<td><div class='pic' x='"+i+"' y='"+y+"'><div class='shade show'></div></div></td>";
	}
	temp+="<td><div class='pic off' x='"+maxx+"' y='"+y+"'></div></td>";
	temp+="</tr>";
	return temp;
}
function setGame(maxx,maxy){
	remain=total;
	tableContent=writeTrFL(maxx,0);
	for(var i=1;i<maxy;i++){
		tableContent+=writeTr(maxx,i);
	}
	tableContent+=writeTrFL(maxx,0);
	$("table").html(tableContent);
		getRandom();
	randomSort();
	$(".pic").setBground();
	$(".pic").unbind("click");
    $(".pic").click(function(e){
		if(!$(this).find(">div").hasClass("show") || $(this).find(">div").hasClass("off")){
			return;
		}
		if($(this).hasClass("selected")){
			$(this).removeClass("selected");
			return;
		}else{
			if($(".selected").length>0){
				//如果能够消去这两个,消去
				if($(this).attr("pic")==$(".selected:first").attr("pic") && isAbleToLink( $(this).attr("x"), $(this).attr("y"), $(".selected:first").attr("x"), $(".selected:first").attr("y")) ){
					linkPoint(point1,point2);
					linkPoint(point2,point3);
					linkPoint(point3,point4);
					setTimeout("dropLines()",50);
					$(this).hideDiv();
					$(".selected").hideDiv();
					$(".selected").removeClass("selected");
					remain=remain-2;
					if(remain==0){
						//alert("游戏成功！");
						showConfirm();
						//setGame(maxx,maxy)
					}
				}else{//如果不能消去这两个,将选择都去掉
					$(".selected").removeClass("selected");
					//$(this).addClass("selected")
				}
			}else{
				$(this).addClass("selected");
			}
		}
	});
}


function showConfirm(){
	navigator.notification.confirm(
		'恭喜你，成功过关！',
		onConfirm,	//	回调函数
		'好厉害！',
		'我知道了,退出'
	);
}
function onConfirm(button){
	if(button==2){
		navigator.app.exitApp();	
	}
}
function quit(){
	navigator.app.exitApp();
}
function quitConfirm(){
	navigator.notification.confirm(
		'是否退出？',
		onConfirm,	//	回调函数
		'确认',
		'是,否'
	);
}
