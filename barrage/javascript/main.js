//运动方法
function getStyle(obj, sName) {
    return (obj.currentStyle || getComputedStyle(obj, false))[sName];
}
function startMove(obj, json, options) {
    options = options || {};
    options.duration = options.duration || 700;
    options.easing = options.easing || 'ease-out';

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
function thisRond(m,n){
    return parseInt(Math.random()*(n-m)+m);
}

/*
**传入弹幕子弹参数
**{
**    img:'',      //图片地址
**    centent:'',  //内容
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
            "img":"../images/userhead.jpg",
            "centent":"没有内容",
            "start":"right",
            "time":"5000",
            "cubic":"linear"
        }
    }
    obj.img = obj.img || "../images/userhead.jpg";
    obj.centent = obj.centent || "没有内容";
    obj.start = obj.start || "right";
    obj.time = obj.time || "5000";
    obj.cubic = obj.cubic || "linear";


    var stage = document.getElementById('barrage-show');  // 获取舞台
    var bullet = document.createElement('div');           // 创建子弹
    bullet.className = 'bullet';
    bullet.innerHTML = '<img src="' + obj.img + '" alt=""><p>' + obj.centent + '</p>';
    stage.appendChild(bullet);
    switch (obj.start) {
        case 'right':
            bullet.style.top = thisRond(0,stage.offsetHeight - bullet.offsetHeight) + 'px';
            bullet.style.right = -bullet.offsetWidth+'px';
            startMove(bullet,{right:stage.offsetWidth},{duration: obj.time},{easing:obj.cubic});
            break;
        case 'top':
            bullet.style.left = thisRond(0,stage.offsetWidth - bullet.offsetWidth) + 'px';
            bullet.style.top = -bullet.offsetHeight+'px';
            startMove(bullet,{top:stage.offsetHeight},{duration: obj.time},{easing:obj.cubic});
            break;
        case 'left':
            bullet.style.top = thisRond(0,stage.offsetHeight - bullet.offsetHeight) + 'px';
            bullet.style.left = -bullet.offsetWidth+'px';
            startMove(bullet,{left:stage.offsetWidth},{duration: obj.time},{easing:obj.cubic});
            break;
        case 'bottom':
            bullet.style.left = thisRond(0,stage.offsetWidth - bullet.offsetWidth) + 'px';
            bullet.style.bottom = -bullet.offsetHeight+'px';
            startMove(bullet,{bottom:stage.offsetHeight},{duration: obj.time},{easing:obj.cubic});
            break;
    }
    setTimeout(function () {
        bullet.parentNode.removeChild(bullet)
    },obj.time);
}

// 按钮事件
document.getElementById('button').onclick = function () {
    var obj = {};
    obj.centent = document.getElementById('text-box').value;
    obj.img = document.getElementById('head-img').getAttribute('src');
    barrageMain(obj);
    document.getElementById('text-box').value = '';
}
