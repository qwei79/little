// 获取需要的各种对象
var oModelBox = document.getElementById('model-box'),  // 贺卡区域
    oModelRem = document.getElementById('model-rem'),  // 添加删除按钮区域
    oModelSet = document.getElementById('model-set'),  // 控制按钮区域
    addB = document.getElementById('addButton'),
    removeB = document.getElementById('removeButton'), // 删除按钮
    modelNo = 0,  // 设置model的计数id
    targetNow,    // 设置一个被选中model
    oTarP = new Object;        // 设置一个全局对象，用于保存所有添加的P标签的私有属性

// 把控制按钮放在一个对象包里
var setting = new Object;
setting = {
    fontSize : document.getElementById('font-size'),
    fontColor : document.getElementById('font-color'),
    modelBold : document.getElementById('model-b'),
    modelItalic : document.getElementById('model-i'),
    modelUnder : document.getElementById('model-u'),
    // modelWidth : document.getElementById('model-w'),
    // modelHeigth : document.getElementById('model-h'),
    modelX : document.getElementById('model-x'),
    modelY : document.getElementById('model-y'),
    modelText : document.getElementById('model-text')
}

// model属性对象包
function createTeam(oP) {// 传入被选中的p标签对应的模块组信息
    var objDefault = {// 定义一个新增p标签所对应的全部数据的存储空间--默认的数据
        fontSize: "12",// 字号,默认12px
        color: "#000",//字体颜色,默认#000
        bold: false,// 加粗,默认不加粗
        italics: false,// 斜体,默认非斜体
        underline: false,// 下划线,默认无下划线
        X: "0",// left值
        Y: "0",// top值
        text: ""
    };
    if (oP.obj) {
        // 如果传入的标签带了相关的参数,那么就用传入标签的参数
    } else {
        // 如果传入的标签,没有相关的参数,那么就用默认的数据objDefault
        oP.obj = objDefault;
        // 添加对应样式
        oP.style.fontFamily = '楷体';
        oP.style.fontSize = '12px';
        oP.style.color = '#000';
        oP.style.textAlign = 'left';
        oP.style.left = 0;
        oP.style.top = 0;
    }
}

// 添加model
function addModel(ev) {
    ev = ev || window.event;  // 处理事件兼容
    target = ev.target || ev.srcElement;  // 处理获取点击对象兼容
    // 判断如果已经添加到内容中一次之后就不能再添加了
    if (target.getAttribute("disabled") === "true") {
        return;
    } else {
        // 创建一个model
        var oP = document.createElement('p');
        // 添加默认内容
        oP.innerHTML = target.value + modelNo;
        // 添加唯一id
        oP.id = 'modelNo' + modelNo;
        modelNo++;
        // 存入全局对象
        oTarP[oP.id] = oTarP[oP.id] ? oTarP[oP.id] : oP;
        // 添加默认属性
        // createTeam(oP);
        createTeam(oTarP[oP.id]);
        // 把创建的p标签添加到编辑区域
        oModelBox.appendChild(oP);
    }
}
// 选中model
function targetModel(ev) {
    ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    // 父级ul点击不触发
    if(target.nodeName.toLowerCase() === 'div' || target.nodeName.toLowerCase() === 'input'){
        // 点击编辑区域空白处释放被选中的model
        missModel();
        return;
    } else {
        // 设置删除按钮可用
        removeB.removeAttribute('disabled');
        // 设置“设置按钮组”可用
        setting.fontSize.removeAttribute('disabled');
        setting.fontColor.removeAttribute('disabled');
        setting.modelBold.removeAttribute('disabled');
        setting.modelItalic.removeAttribute('disabled');
        setting.modelUnder.removeAttribute('disabled');
        // setting.modelWidth.removeAttribute('disabled');
        // setting.modelHeigth.removeAttribute('disabled');
        setting.modelX.removeAttribute('disabled');
        setting.modelY.removeAttribute('disabled');
        setting.modelText.removeAttribute('disabled');

        // 控制字号按钮处于哪个选项
        var fontSizeOption = oTarP[target.id].obj.fontSize;
        for (var i = 0; i < setting.fontSize.options.length; i++) {
            if (setting.fontSize.options[i].text == fontSizeOption) setting.fontSize.selectedIndex = i;
        }
        // 控制字体颜色按钮处于哪个选项
        var fontColorOption = oTarP[target.id].obj.color;
        for (var i = 0; i < setting.fontColor.options.length; i++) {
            if (setting.fontColor.options[i].text == fontColorOption) setting.fontColor.selectedIndex = i;
        }

        // 更新X值
        setting.modelX.value = parseFloat(target.style.left);
        // 更新Y值
        setting.modelY.value = parseFloat(target.style.top);

        // 更新内容
        setting.modelText.value = target.innerHTML;

        // 把被选中的model存入全局变量
        targetNow = target;
        return targetNow;
    }
}
// 释放当前model
function missModel() {
    // 设置删除按钮实效
    removeB.setAttribute('disabled', true);
    // 清空X与Y的值
    // setting.modelX.removeAttribute('value');
    // setting.modelX.removeAttribute('value');
    // 设置“设置按钮组”失效
    setting.fontSize.setAttribute('disabled', true);
    setting.fontColor.setAttribute('disabled', true);
    setting.modelBold.setAttribute('disabled', true);
    setting.modelItalic.setAttribute('disabled', true);
    setting.modelUnder.setAttribute('disabled', true);
    // setting.modelWidth.setAttribute('disabled', true);
    // setting.modelHeigth.setAttribute('disabled', true);
    setting.modelX.setAttribute('disabled', true);
    setting.modelY.setAttribute('disabled', true);
    setting.modelText.setAttribute('disabled', true);
    // 释放变量
    targetNow = null;
}
// 删除model
function removeModel() {
    targetNow.parentNode.removeChild(targetNow);
    // 释放当前model
    missModel();
}
// 拖动model
function drag(ev) {
    ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    // 父级点击不触发
    if(target.nodeName.toLowerCase() === 'div'){
        return;
    } else {
            // 获取鼠标点击位置
        var mouseLeft = ev.clientX - oModelBox.offsetLeft - parseFloat(targetNow.style.left),
            mouseTop = ev.clientY - oModelBox.offsetTop - parseFloat(targetNow.style.top),
            // 获取被拖动对象基础宽高
            modelWidth = targetNow.offsetWidth,
            modelHeight = targetNow.offsetHeight;
        // 绑定拖动事件
        $(oModelBox).on('mousemove', function (ev) {
            ev = ev || window.event;
            if (ev.clientX - oModelBox.offsetLeft < mouseLeft) {
                // 如果超过左侧，则设置model在最左侧
                targetNow.style.left = 0;
            } else if (ev.clientX - oModelBox.offsetLeft + 3 > oModelBox.offsetWidth + mouseLeft - modelWidth) {
                // 如果超过右侧，则设置model在最右侧
                targetNow.style.left = oModelBox.offsetWidth - modelWidth - 3 + 'px';
            } else {
                // 正常拖动
                targetNow.style.left = ev.clientX - oModelBox.offsetLeft - mouseLeft + 'px';
            }

            if (ev.clientY - oModelBox.offsetTop < mouseTop) {
                // 如果超过顶部，则设置model在最上
                targetNow.style.top = 0;
            } else if (ev.clientY - oModelBox.offsetTop + 3 > oModelBox.offsetHeight + mouseTop - modelHeight) {
                // 如果超过底部，则设置model在最下
                targetNow.style.top = oModelBox.offsetHeight - modelHeight - 3 + 'px';
            } else {
                // 正常拖动
                targetNow.style.top = ev.clientY - oModelBox.offsetTop - mouseTop + 'px';
            }

            // 更新X值
            setting.modelX.value = parseFloat(targetNow.style.left);
            // 更新Y值
            setting.modelY.value = parseFloat(targetNow.style.top);
        })
    }
}

// 样式修改
// 点击类按钮
// 加粗
setting.modelBold.onclick = function () {
    // 更改对应样式
    targetNow.style.fontWeight == 'bold' ? targetNow.style.fontWeight = 'normal' : targetNow.style.fontWeight = 'bold';
}
// 倾斜
setting.modelItalic.onclick = function () {
    targetNow.style.fontStyle == 'itallic' ? targetNow.style.fontStyle = 'normal' : targetNow.style.fontStyle = 'itallic';
}
// 下划线
setting.modelUnder.onclick = function () {
    targetNow.style.textDecoration == 'underline' ? targetNow.style.textDecoration = 'normal' : targetNow.style.textDecoration = 'underline';
}

// 状态更新
function updateState (nowSelete) {
    if (!targetNow) {return;};
    if(nowSelete){
        // 删除选中状态
        for (var i = nowSelete.options.length - 1; i >= 0; i--) {
            nowSelete.options[i].removeAttribute('selected');
        };
        // 给对应选项已选中状态
        nowSelete.options[nowSelete.selectedIndex].setAttribute('selected', 'selected');
    }
    
    // 更新全局对象中P元素的私有属性
    // 字号
    oTarP[targetNow.id].obj.fontSize = fontSelect(setting.fontSize);
    // 字体颜色
    oTarP[targetNow.id].obj.Color = fontSelect(setting.fontColor);
    // X值
    oTarP[targetNow.id].obj.X = setting.modelX.value;
    // Y值
    oTarP[targetNow.id].obj.Y = setting.modelY.value;
    // 内容
    oTarP[targetNow.id].obj.text = setting.modelText.value;
}
// 选择类按钮
// 获取下拉菜单返回值
function fontSelect (sObj) {
    var oSelect = sObj;
    // createTeam(oSelect);
    return oSelect.options[oSelect.selectedIndex].value;
}
// 字号
setting.fontSize.onchange = function () {
    // 设置字号
    targetNow.style.fontSize = fontSelect(setting.fontSize) + 'px';
    // 更新状态
    updateState(this);
}
// 字色
setting.fontColor.onchange = function () {
    // 设置字体颜色
    targetNow.style.color = fontSelect(setting.fontColor);
    // 更新按钮状态
    updateState(this);
}
// 输入框类
// X的值
setting.modelX.onkeydown = setting.modelX.onkeyup = function () {
    targetNow.style.left = setting.modelX.value + 'px';
    // 更新input状态
    updateState();
}
// setting.modelX.onchange = function () {
//     targetNow.style.left = setting.modelX.value;
// }
// Y的值
setting.modelY.onkeydown = setting.modelY.onkeyup = function () {
    targetNow.style.top = setting.modelY.value + 'px';
    // 更新input状态
    updateState();
}
// 内容
setting.modelText.onkeydown = setting.modelText.onkeyup = function () {
    targetNow.innerHTML = setting.modelText.value;
    // 更新input状态
    updateState();
}

// 添加model绑定
$(addB).on('click', addModel);
// 选中model绑定
$(oModelBox).on('mousedown', targetModel);
// 未删除按钮绑定删除
$(removeB).on('click', removeModel);
// 拖动model绑定
$(oModelBox).on('mousedown', drag);
// 当鼠标抬起时，解除拖动事件绑定
$(oModelBox).on('mouseup', function () {
    $(oModelBox).off('mousemove');
})

