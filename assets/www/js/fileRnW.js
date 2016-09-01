//写入到文件的规则  json格式 [{attr1:value1,attr2:value2,},{attr1:value1,attr2:value2,}] 读取时eval(String)

document.addEventListener("deviceready", onDeviceReady, false);
// PhoneGap加载完毕
function onDeviceReady() {
	//请求当前持久化的操作系统
	window.requestFileSystem(LocalFileSystem.PRESITENT,0,gotFS,fail);
	
    //按钮事件
    //document.addEventListener("backbutton", eventBackButton, false); //返回键
    //document.addEventListener("menubutton", eventMenuButton, false); //菜单键
    //document.addEventListener("searchbutton", eventSearchButton, false); //搜索键
}

//返回键
function eventBackButton() {
    //confirm("再点击一次退出!");
    //window.plugins.ToastPlugin.show_short('再点击一次退出!');
    document.removeEventListener("backbutton", eventBackButton, false); //注销返回键
    //3秒后重新注册
    var intervalID = window.setInterval(function() {
        window.clearInterval(intervalID);
        document.addEventListener("backbutton", eventBackButton, false); //返回键
    },
    3000);
}

function gotFS(){
	
}