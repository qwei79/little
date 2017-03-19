/* onload追加处理 */
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    }
    else {
        window.onload = function () {
            oldonload;
            func();
        };
    }
}
// 获取对象样式
function getStyle(obj, styleName) {
    var oStyle = obj.currentStyle ? obj.currentStyle : window.getComputedStyle(obj, null);
    if (oStyle.getPropertyValue) {
        return oStyle.getPropertyValue(styleName);
    }
    else {
        return oStyle.getAttrbute(styleName);
    }
}
// 动画方法
function moveTo(obj, json, option) {
    // obj 所选元素对象
    // json 目标位置，left,top,rigth,bottom
    // option 最大速度maxV
    var objOrigin = {}, veloc = {}, objTarget = {};
    // 元素初始位置
    objOrigin = {
        left: parseFloat(getStyle(obj, 'left')),
        top: parseFloat(getStyle(obj, 'top'))
    };
    // 元素目标位置
    objTarget = {
        left: parseFloat(json.left),
        top: parseFloat(json.top)
    };
    // 元素运动速度
    option.time =  Math.sqrt(Math.pow(objTarget.left - objOrigin.left,2) + Math.pow(objOrigin.top - objTarget.top, 2)) / option.maxV;

    veloc = {
        hypotenuse : option.maxV,
        x : (objTarget.left - objOrigin.left) / option.time,
        y : (objTarget.top - objOrigin.top) / option.time
    };

    // clearInterval(obj.timer);
    obj.style.left = parseFloat(getStyle(obj, 'left')) + veloc.x + 'px';
    obj.style.top = parseFloat(getStyle(obj, 'top')) + veloc.y + 'px';

    option.clock = 1;
    obj.timer = setInterval(function () {
        if (option.clock + 1 >= option.time) {
            clearInterval(obj.timer);
            obj.style.left = objTarget.left + 'px';
            obj.style.top = objTarget.top + 'px';
        }
        ;
        option.clock += 1;
        obj.style.left = parseFloat(getStyle(obj, 'left')) + veloc.x + 'px';
        obj.style.top = parseFloat(getStyle(obj, 'top')) + veloc.y + 'px';
    }, 15);
}
// addLoadEvent(function () {
//     var test = document.getElementById('lead');
//     console.log(test);
//     moveTo(test, { left: '100px', top: '50px' },{ time: 1000,maxV: 100 });
// });

window.addEventListener('touchstart' ,_touchstart ,false);
window.addEventListener('touchmove' ,_touchmove ,false);
window.addEventListener('touchend' ,_touchend ,false);

function _touchstart (ev) {
    var ev = event || window.event || arguments.callee.caller.arguments[0];
    var touch = ev.targetTouches[0];
    var movetox,movetoy;
    movetoy = parseFloat(touch.clientY) - (htmlFontSize * 1.5);
    movetox = parseFloat(touch.clientX) - (htmlFontSize * 1);
    moveTo(lead, { left: movetox, top: movetoy },{ maxV: 20 });
}
function _touchmove () {

    clearInterval(lead.timer);

    var ev = event || window.event || arguments.callee.caller.arguments[0];
    var touch = ev.targetTouches[0];
    var movetox,movetoy;
    movetoy = parseFloat(touch.clientY) - (htmlFontSize * 1.5);
    movetox = parseFloat(touch.clientX) - (htmlFontSize * 1);

    moveTo(lead, { left: movetox, top: movetoy },{ maxV: 20 });
    // var objOrigin = {}, veloc = {}, objTarget = {};
    // // 元素初始位置
    // objOrigin = {
    //     left: parseFloat(getStyle(lead, 'left')),
    //     top: parseFloat(getStyle(lead, 'top'))
    // };
    // // 元素目标位置
    // objTarget = {
    //     left: movetox,
    //     top: movetoy
    // };
    // var option = {};
    // // 元素运动速度
    // option.time =  Math.sqrt(Math.pow(objTarget.left - objOrigin.left,2) + Math.pow(objOrigin.top - objTarget.top, 2)) / 20;
    // veloc = {
    //     hypotenuse : 50,
    //     x : (objTarget.left - objOrigin.left) / option.time,
    //     y : (objTarget.top - objOrigin.top) / option.time
    // };
    // lead.style.left = parseFloat(getStyle(lead, 'left')) + veloc.x + 'px';
    // lead.style.top = parseFloat(getStyle(lead, 'top')) + veloc.y + 'px';
}
function _touchend () {
    clearInterval(lead.timer);
}