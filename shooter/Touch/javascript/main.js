/* getElementsByClassName 兼容处理 */
function getElementsByClassName(node, classname) {
  if (node.getElementsByClassName){
    //使用现有方法
    return node.getElementsByClassName(classname);
  } else {
    var results = new Array();
    var elems = node.getElementsByTagName("*");
    for (var i=0; i<elems.length; i++){
      if (elems[i].className.indexOf(classname) != -1){
        results[results.length] = elems[i];
      }
    }
    return results;
  }
}
//运动方法
function getStyle(obj, sName) {
    return (obj.currentStyle || getComputedStyle(obj, false))[sName];
}
function startMove(obj, json, options) {
    options = options || {};
    options.duration = options.duration || 700;
    options.easing = options.easing || 'linear';

    var start = {};
    var dis = {};
    for (var name in json) {
        start[name] = parseFloat(getStyle(obj, name));
        if (isNaN(start[name])) {
            switch (name) {
                case 'left':
                    start[name] = obj.offsetLeft;
                    break;
                case 'top':
                    start[name] = obj.offsetTop;
                    break;
                case 'width':
                    start[name] = obj.offsetWidth;
                    break;
                case 'height':
                    start[name] = obj.offsetHeight;
                    break;
                case 'opacity':
                    start[name] = 1;
                    break;
                case 'borderWidth':
                    start[name] = 0;
                    break;
            }
        }
        dis[name] = json[name] - start[name];
    }
    var count = Math.floor(options.duration / 30);
    var n = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        n++;
        for (var name in json) {
            switch (options.easing) {
                case 'linear':
                    var cur = start[name] + dis[name] * n / count;
                    break;
                case 'ease-in':
                    var a = n / count;
                    var cur = start[name] + dis[name] * Math.pow(a, 3);
                    break;
                case 'ease-out':
                    var a = 1 - n / count;
                    var cur = start[name] + dis[name] * (1 - Math.pow(a, 3));
                    break;
                default:
                    var a = 1 - n / count;
                    var cur = start[name] + dis[name] * (1 - Math.pow(a, 3));
                    break;
            }
            if (name == 'opacity') {
                obj.style[name] = cur;
                obj.style.filter = 'alpha(opacity:' + cur * 100 + ')';
            } else {
                obj.style[name] = cur + 'px';
            }
        }
        if (n == count) {
            clearInterval(obj.timer);
            options.complete && options.complete();
        }
    }, 30);
}
// 随机数
function thisRond(m,n){
    return parseInt(Math.random()*(n-m)+m);
}
// 数字前补零
function prefixInteger(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}

/*
**传入敌机参数
**{
**    img:'',      //图片地址
**    class:'',    //enemy是敌机 cloud是云朵
**    start:'',    //出发位置
**    time:'',     //走完所用时间
**    cubic:''     //运动曲线
**}
*/
// 全局对象，用于存放数组
function barrageMain(obj) {
    // 修整参数
    if(!obj) {
        obj = {
            "img":"../images/cloud.png",
            "class":"cloud",
            "start":"top",
            "time":"3000",
            "cubic":"linear"
        }
    }
    obj.img = obj.img || "../images/cloud.png";
    obj.class = obj.class || "cloud";
    obj.start = obj.start || "top";
    obj.time = obj.time || "5000";
    obj.cubic = obj.cubic || "linear";


    var battleField = document.getElementById('battle-field');  // 获取战场
    var enemy = document.createElement('div');           // 创建子弹，也可能是云朵
    enemy.className = obj.class;
    enemy.innerHTML = '<img src="' + obj.img + '" alt="">';
    battleField.appendChild(enemy);
    switch (obj.start) {
        case 'right':
            enemy.style.top = thisRond(0,battleField.offsetHeight - enemy.offsetHeight) + 'px';
            enemy.style.right = -enemy.offsetWidth+'px';
            startMove(enemy,{right:battleField.offsetWidth},{duration: obj.time},{easing:obj.cubic});
            break;
        case 'top':
            enemy.style.left = thisRond(0,battleField.offsetWidth - enemy.offsetWidth) + 'px';
            enemy.style.top = -enemy.offsetHeight+'px';
            startMove(enemy,{top:battleField.offsetHeight},{duration: obj.time},{easing:obj.cubic});
            break;
        case 'left':
            enemy.style.top = thisRond(0,battleField.offsetHeight - enemy.offsetHeight) + 'px';
            enemy.style.left = -enemy.offsetWidth+'px';
            startMove(enemy,{left:battleField.offsetWidth},{duration: obj.time},{easing:obj.cubic});
            break;
        case 'bottom':
            enemy.style.left = thisRond(0,battleField.offsetWidth - enemy.offsetWidth) + 'px';
            enemy.style.bottom = -enemy.offsetHeight+'px';
            startMove(enemy,{bottom:battleField.offsetHeight},{duration: obj.time},{easing:obj.cubic});
            break;
    }
    enemy.removeTime = setTimeout(function () {
        enemy.parentNode.removeChild(enemy)
    },obj.time);
}

function missileMain() {

    var battleField = document.getElementById('battle-field');  // 获取战场
    var missile = document.createElement('div');           // 创建导弹
    missile.className = 'missile';
    battleField.appendChild(missile);

    missile.style.left = getStyle(lead,'left');
    missile.style.top = getStyle(lead,'top');
    startMove(missile,{top:(battleField.offsetHeight - parseFloat(getStyle(missile,'top')))},{duration:2000},{easing:'linear'});

    missile.removeTime = setTimeout(function () {
        missile.parentNode.removeChild(missile)
    },2000);
}

// 键盘事件
var lead = document.getElementById('lead'),
    direction = {
        left : false,
        right : false,
        top : false,
        bottom : false
    };

// 重力感应控制
// window.addEventListener('deviceorientation', function () {
//     var ev = event || window.event || arguments.callee.caller.arguments[0];
//     if(!waiterBool){
//         if (ev && ev.gamma < -2) {
//             // 手机向左
//             if (!(parseFloat(getStyle(lead,'left')) <= (0.5 * parseFloat(getStyle(document.getElementsByTagName('html')[0], 'fontSize'))))) {
//                 lead.style.left = Math.abs(Math.pow(ev.gamma,3) * 0.001) > 7.5 ? parseInt(getStyle(lead,'left')) - (parseFloat(getStyle(document.getElementById('battle-field'), 'fontSize')) * 7.5) + 'px' : parseInt(getStyle(lead,'left')) - (parseFloat(getStyle(document.getElementById('battle-field'), 'fontSize')) * Math.abs(Math.pow(ev.gamma,3) * 0.001)) + 'px';
//                 if (parseFloat(getStyle(lead,'left')) <= (0.5 * parseFloat(getStyle(document.getElementsByTagName('html')[0], 'fontSize')))) {
//                     lead.style.left = (0.5 * parseFloat(getStyle(document.getElementsByTagName('html')[0], 'fontSize'))) + 'px';
//                 }
//             }
//         }
//         if (ev && ev.beta < -1) {
//             // 手机向上
//             if (!(parseFloat(getStyle(lead,'top')) / parseFloat(getStyle(document.getElementById('battle-field'), 'fontSize')) < 0.5)) {
//                 lead.style.top = Math.abs(Math.pow(ev.beta,3) * 0.001) > 7.5 ? parseInt(getStyle(lead,'top')) - (parseFloat(getStyle(document.getElementById('battle-field'), 'fontSize')) * 7.5) + 'px' : parseInt(getStyle(lead,'top')) - (parseFloat(getStyle(document.getElementById('battle-field'), 'fontSize')) * Math.abs(Math.pow(ev.beta,3) * 0.001)) + 'px';
//                 if (parseFloat(getStyle(lead,'top')) / parseFloat(getStyle(document.getElementById('battle-field'), 'fontSize')) < 0.5) {
//                     lead.style.top = (0.5 * parseFloat(getStyle(document.getElementById('battle-field'), 'fontSize'))) + 'px';
//                 }
//             }
//         }
//         if (ev && ev.gamma > 2) {
//             // 手机向右
//             if (!(parseFloat(getStyle(lead,'left')) >= parseFloat(getStyle(document.getElementById('battle-field'), 'width')) - parseFloat(getStyle(lead,'width')) - (1 * parseFloat(getStyle(document.getElementsByTagName('html')[0], 'fontSize'))))) {
//                 lead.style.left = Math.pow(ev.gamma,3) * 0.001 > 7.5 ? parseInt(getStyle(lead,'left')) + (parseFloat(getStyle(document.getElementById('battle-field'), 'fontSize')) * 7.5) + 'px' : parseInt(getStyle(lead,'left')) + (parseFloat(getStyle(document.getElementById('battle-field'), 'fontSize')) * Math.pow(ev.gamma,3) * 0.001) + 'px';
//                 if (parseFloat(getStyle(lead,'left')) >= parseFloat(getStyle(document.getElementById('battle-field'), 'width')) - parseFloat(getStyle(lead,'width')) - (1 * parseFloat(getStyle(document.getElementsByTagName('html')[0], 'fontSize')))) {
//                     lead.style.left = parseFloat(getStyle(document.getElementById('battle-field'), 'width')) - parseFloat(getStyle(lead,'width')) - (1 * parseFloat(getStyle(document.getElementsByTagName('html')[0], 'fontSize'))) + 'px';
//                 }
//             }
//         }
//         if (ev && ev.beta > 3) {
//             // 手机向下
//             if (!((parseFloat(getStyle(lead,'top'))) >= (parseFloat(getStyle(document.getElementById('battle-field'),'height')) - (parseFloat(getStyle(document.getElementsByTagName('html')[0], 'fontSize')) * 3)))) {
//                 lead.style.top = Math.pow(ev.beta,3) * 0.001 > 7.5 ? parseInt(getStyle(lead,'top')) + (parseFloat(getStyle(document.getElementById('battle-field'), 'fontSize')) * 7.5) + 'px' : parseInt(getStyle(lead,'top')) + (parseFloat(getStyle(document.getElementById('battle-field'), 'fontSize')) * Math.pow(ev.beta,3) * 0.001) + 'px';
//                 if ((parseFloat(getStyle(lead,'top'))) >= (parseFloat(getStyle(document.getElementById('battle-field'),'height')) - (parseFloat(getStyle(document.getElementsByTagName('html')[0], 'fontSize')) * 3))) {
//                     lead.style.top = (parseFloat(getStyle(document.getElementById('battle-field'),'height')) - (parseFloat(getStyle(document.getElementsByTagName('html')[0], 'fontSize')) * 3)) + 'px';
//                 }
//             }
//         }
//     }
// }, true);


// 触摸控制
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

window.addEventListener('touchstart' ,_touchstart ,false);
window.addEventListener('touchmove' ,_touchmove ,false);
window.addEventListener('touchend' ,_touchend ,false);

function _touchstart (ev) {
    if(!waiterBool){
        var ev = event || window.event || arguments.callee.caller.arguments[0];
        var touch = ev.targetTouches[0];
        var movetox,movetoy;
        movetoy = parseFloat(touch.clientY) - (htmlFontSize * 1.5);
        movetox = parseFloat(touch.clientX) - (htmlFontSize * 1);
        moveTo(lead, { left: movetox, top: movetoy },{ maxV: 10 });
    }
}
function _touchmove () {
    event.preventDefault();
    if(!waiterBool){
        clearInterval(lead.timer);

        var ev = event || window.event || arguments.callee.caller.arguments[0];
        var touch = ev.targetTouches[0];
        var movetox,movetoy;
        movetoy = parseFloat(touch.clientY) - (htmlFontSize * 1.5);
        movetox = parseFloat(touch.clientX) - (htmlFontSize * 1);

        moveTo(lead, { left: movetox, top: movetoy },{ maxV: 10 });
    }
}
function _touchend () {
    clearInterval(lead.timer);
}


var waiterJson = [
        {
            "img":"../images/cloud.png",
            "class":"cloud",
            "start":"top",
            "time":"1000",
            "cubic":"linear"
        },
        {
            "img":"../images/cloud2.png",
            "class":"cloud",
            "start":"top",
            "time":"1500",
            "cubic":"linear"
        },
        {
            "img":"../images/cloud.png",
            "class":"cloud",
            "start":"top",
            "time":"2000",
            "cubic":"linear"
        },
        {
            "img":"../images/cloud2.png",
            "class":"cloud",
            "start":"top",
            "time":"2500",
            "cubic":"linear"
        },
        {
            "img":"../images/enemy.png",
            "class":"enemy",
            "start":"top",
            "time":"2400",
            "cubic":"linear"
        },
        {
            "img":"../images/enemy.png",
            "class":"enemy",
            "start":"top",
            "time":"2000",
            "cubic":"linear"
        },
        {
            "img":"../images/enemy.png",
            "class":"enemy",
            "start":"top",
            "time":"2400",
            "cubic":"linear"
        },
        {
            "img":"../images/enemy.png",
            "class":"enemy",
            "start":"top",
            "time":"1600",
            "cubic":"linear"
        },
        {
            "img":"../images/enemy.png",
            "class":"enemy",
            "start":"top",
            "time":"2400",
            "cubic":"linear"
        },
        {
            "img":"../images/enemy.png",
            "class":"enemy",
            "start":"top",
            "time":"2400",
            "cubic":"linear"
        },
        {
            "img":"../images/enemy.png",
            "class":"enemy",
            "start":"top",
            "time":"2000",
            "cubic":"linear"
        }
    ],
    waiterBool = true,
    overBool = false,
    waiterSet,
    whetherTime,
    missile,
    missileObj,
    score = document.getElementById('score'),
    scoreTime;
document.getElementById('waiter-set').onclick = function () {
    if(waiterBool){
        if (overBool) {
            var enemy = getElementsByClassName(document,'enemy');
            for (var i = enemy.length - 1; i >= 0; i--) {
                enemy[i].parentNode.removeChild(enemy[i]);
            };
            var cloud = getElementsByClassName(document,'cloud');
            for (var i = cloud.length - 1; i >= 0; i--) {
                cloud[i].parentNode.removeChild(cloud[i]);
            };
            var missileEle = getElementsByClassName(document,'missile');
            for (var i = missileEle.length - 1; i >= 0; i--) {
                missileEle[i].parentNode.removeChild(missileEle[i]);
            };
            score.innerHTML = prefixInteger(0,9);
        }
        waiterBool = false;
        document.getElementById('waiter').style.display = 'none';
        this.value = '朕想静静';
        waiterSet = setInterval('barrageMain(waiterJson[thisRond(0,11)])',thisRond(500,800));
        scoreTime = setInterval(function () {
            score.innerHTML = prefixInteger(parseInt(score.innerHTML) + 1,9);
        },100);
        // 子弹方法
        missile = setInterval('missileMain()',1000);
        whetherTime = setInterval('whetherOver()',50);
        whetherHitTime = setInterval('whetherHit()',50);
    } else {
        waiterBool = true;
        clearInterval(waiterSet);
        clearInterval(scoreTime);
        clearInterval(missile);
        clearInterval(whetherTime);
        clearInterval(whetherHitTime);
        this.value = '来吧！';
    }
}
function whetherOver() {
    var enemy = getElementsByClassName(document,'enemy');
    if (enemy.length === 0) {
        return;
    }
    for (var i = enemy.length - 1; i >= 0; i--) {
        if (parseFloat(getStyle(enemy[i], 'left')) - parseFloat(getStyle(lead, 'left')) >= -parseFloat(getStyle(lead, 'width')) && parseFloat(getStyle(enemy[i], 'left')) - parseFloat(getStyle(lead, 'left')) <= parseFloat(getStyle(lead, 'width')) && parseInt(getStyle(enemy[i], 'top')) - parseInt(getStyle(lead, 'top')) >= -parseFloat(getStyle(lead, 'height')) && parseInt(getStyle(enemy[i], 'top')) - parseInt(getStyle(lead, 'top')) <= parseFloat(getStyle(lead, 'height'))) {

            // document.getElementById('testprint').innerHTML = parseFloat(getStyle(enemy[i],'top'));
            // document.getElementById('score').innerHTML = parseFloat(getStyle(lead,'top'));
            gameOver();
        }
    };
}
// 击中判断
function whetherHit() {
    var enemy = getElementsByClassName(document,'enemy');
    if (enemy.length === 0) {
        return;
    }
    var missileEle = getElementsByClassName(document,'missile');
    if (missileEle.length === 0) {
        return;
    }
    for (var i = enemy.length - 1; i >= 0; i--) {
        for (var j = missileEle.length - 1; j >= 0; j--) {
            if (parseFloat(getStyle(enemy[i], 'left')) - parseFloat(getStyle(missileEle[j], 'left')) <= 0 && parseFloat(getStyle(enemy[i], 'left')) - parseFloat(getStyle(missileEle[j], 'left')) >= -parseFloat(getStyle(enemy[i], 'width')) && parseInt(getStyle(enemy[i], 'top')) - parseInt(getStyle(missileEle[j], 'top')) >= -parseFloat(getStyle(enemy[i], 'height')) && parseInt(getStyle(enemy[i], 'top')) - parseInt(getStyle(missileEle[j], 'top')) <= 0) {
                clearInterval(enemy[i].removeTime);
                clearInterval(missileEle[j].removeTime);
                enemy[i].parentNode.removeChild(enemy[i]);
                missileEle[j].parentNode.removeChild(missileEle[j]);
            }
        }
    };
}
function gameOver() {
    waiterBool = true;
    overBool = true;
    clearInterval(waiterSet);
    clearInterval(scoreTime);
    clearInterval(missile);
    clearInterval(whetherTime);
    clearInterval(whetherHitTime);
    document.getElementById('waiter').style.display = 'block';
    document.getElementById('waiter-set').value = '换个姿势，再来一次！';

    var enemy = getElementsByClassName(document,'enemy');
    for (var i = enemy.length - 1; i >= 0; i--) {
        clearInterval(enemy[i].timer);
        clearInterval(enemy[i].removeTime);
    };
    var cloud = getElementsByClassName(document,'cloud');
    for (var i = cloud.length - 1; i >= 0; i--) {
        clearInterval(cloud[i].timer);
        clearInterval(cloud[i].removeTime);
    };
    var missileEle = getElementsByClassName(document,'missile');
    for (var i = missileEle.length - 1; i >= 0; i--) {
        clearInterval(missileEle[i].timer);
        clearInterval(missileEle[i].removeTime);
    };
    direction = {
        left : false,
        right : false
    };
  
    alert('阁下得了' + parseInt(score.innerHTML) + '分～，仍需修炼，来年又是一条好汉');
}
/*
** 忠心感谢赵姑娘(zhaoyiding@jd.com)的技术支持
*/


// touch控制
// function () {
//     battleField.addEventListener('touchstart' ,_touchstart ,false);
//     battleField.addEventListener('touchmove' ,_touchmove ,false);
//     battleField.addEventListener('touchend' ,_touchend ,false);
// }

