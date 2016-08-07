//获取需要的各种对象
var oModelBox = document.getElementById('model-box'),  //编辑区域
    oModelRem = document.getElementById('model-rem'),  //添加按钮区域
    oModelSet = document.getElementById('model-set');  //控制按钮区域
//model属性对象包
function createTeam(oP) {//传入被选中的p标签对应的模块组信息
    var objDefault = {//定义一个新增p标签所对应的全部数据的存储空间--默认的数据
        fontFamily: "楷体",//字体,默认楷体
        fontSize: "9",//字号,默认12px
        fontColor: "black",//字体颜色,默认#000
        bold: false,//加粗,默认不加粗
        italics: false,//斜体,默认非斜体
        underline: false,//下划线,默认无下划线
        textAlign: "left",//水平对齐方式,默认居中
        turnLine: true,//自动换行
        narrow: false,//缩小字体一行显示
        X: "0",//left值
        Y: "0"//top值
    };
    if (oP.obj) {
        //如果传入的标签带了相关的参数,那么就用传入标签的参数
    } else {
        //如果传入的标签,没有相关的参数,那么就用默认的数据objDefault
        oP.obj = objDefault;
        //添加对应样式
        oP.style.fontFamily = '楷体';
        oP.style.fontSize = '9px';
        oP.style.fontColor = '#000';
        oP.style.textAlign = 'left';
        oP.style.left = 0;
        oP.style.top = 0;
    }
}

//添加model事件
function addModel(ev){
    ev = ev || window.event;  //处理事件兼容
    target = ev.target || ev.srcElement;  //处理获取点击对象兼容
    //父级ul点击不触发
    if(target.nodeName.toLowerCase() === 'ul'){
        return;
    }
    //判断如果已经添加到内容中一次之后就不能再添加了
    if (target.getAttribute("disabled") === "true") {
        return;
    } else {
        //创建一个model
        var oP = document.createElement('p');
        //添加默认内容
        oP.innerHTML = target.innerHTML;
        //添加默认属性
        createTeam(oP);
        //把创建的p标签添加到编辑区域
        oModelBox.appendChild(oP);
        //设置当前点击按钮失效
        target.setAttribute('disabled', true);
    }
}