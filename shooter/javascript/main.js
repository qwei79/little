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

// 键盘事件
var lead = document.getElementById('lead'),
    direction = {
        left : false,
        right : false
    };
setInterval(function () {
    if (direction.left) {
        if (parseInt(getStyle(lead,'left')) < 10) {
            return;
        }
        lead.style.left = parseInt(getStyle(lead,'left')) - 30 + 'px';
    }
    if (direction.right) {
        if (parseInt(getStyle(lead,'left')) > 560) {
            return;
        }
        lead.style.left = parseInt(getStyle(lead,'left')) + 30 + 'px';
    }
},50);
document.onkeydown = function () {
    var ev = event || window.event || arguments.callee.caller.arguments[0];
    if (ev && ev.keyCode == 39) {
        // 按右方向键
        direction.right = true;
    } else if (ev && ev.keyCode == 37) {
        // 按左方向键
        direction.left = true;
    }
}
document.onkeyup = function () {
    var ev = event || window.event || arguments.callee.caller.arguments[0];
    direction = {
        left : false,
        right : false
    };
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
        }
        waiterBool = false;
        this.value = '朕想静静';
        waiterSet = setInterval('barrageMain(waiterJson[thisRond(0,11)])',thisRond(500,800));
        scoreTime = setInterval(function () {
            score.innerHTML = prefixInteger(parseInt(score.innerHTML) + 1,9);
        },100);
        whetherTime = setInterval('whetherOver()',50);
    } else {
        waiterBool = true;
        clearInterval(waiterSet);
        clearInterval(scoreTime);
        clearInterval(whetherTime);
        this.value = '来吧！';
    }
}
function whetherOver() {
    var enemy = getElementsByClassName(document,'enemy');
    if (enemy.length === 0) {
        return;
    }
    for (var i = enemy.length - 1; i >= 0; i--) {
        if (parseInt(getStyle(enemy[i], 'left')) - parseInt(getStyle(lead, 'left')) >= -30 && parseInt(getStyle(enemy[i], 'left')) - parseInt(getStyle(lead, 'left')) <= 30 && parseInt(getStyle(enemy[i], 'top')) >= 544) {
            gameOver();
        }
    };
}
function gameOver() {
    clearInterval(whetherTime);
    waiterBool = true;
    overBool = true;
    clearInterval(waiterSet);
    clearInterval(scoreTime);
    clearInterval(whetherTime);
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
    direction = {
        left : false,
        right : false
    };
    alert('你个菜鸡！');
}
