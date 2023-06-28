// 仿iOS下拉效果
(function (window,document) {
    touchScroll = function (option) {
        var that = this;
        if (!option) option = {};
        that.option = {
            // 必选参数
            btn : typeof option.btn == 'object' ? option.btn : document.querySelector(option.btn) || document.querySelector('.ts-btn'),  // 触发按钮
            
            sureBtn : typeof option.sureBtn == 'object' ? option.sureBtn : document.querySelector(option.sureBtn) || document.querySelector('.ts-sure-btn'),  // 确认按钮
            cancelBtn : typeof option.cancelBtn == 'object' ? option.cancelBtn : document.querySelector(option.cancelBtn) || document.querySelector('.ts-cancel-btn'),  // 取消按钮
            box : typeof option.box == 'object' ? option.box : document.querySelector(option.box) || document.querySelector('.ts-fixed'),  // 弹出选择层

            // 可选参数
            val : typeof option.val == 'object' ? option.val : document.querySelector(option.val) || document.querySelector('.ts-val'),  // 赋值区域
            cut : option.cut || ' ',  // 分隔符
            cancelCallback : option.cancelCallback ? option.cancelCallback : null,  // 取消按钮回调
            sureCallback : option.sureCallback ? option.sureCallback : null  // 确认按钮回调
            
        }

        // 抓取数据box
        that.option.scroll = that.option.box.querySelectorAll('.scroll');
        // 可选参数
        for (var i = that.option.scroll.length - 1; i >= 0; i--) {
            that.option.scroll[i].defaultIndex = option.defaultIndex ? option.defaultIndex[i] : 1;  // 初始选中
            that.option.scroll[i].initCallback = option.initCallback ? option.initCallback[i] : null;  // 初始化回调
            that.option.scroll[i].endCallback = option.endCallback ? option.endCallback[i] : null;  // 滚动完成回调
        };
        // 有数据
        if (that.option.scroll[0].getElementsByTagName('p').length > 0) {

            // 高度和最大、最小位移
            that.objHeight = that.option.box.querySelector('.content').clientHeight;  // 可视高度
            that.itemHeight = that.option.scroll[0].getElementsByTagName('p')[0].clientHeight;  // 单个选项高度
            // that.scrollHeight = [];  // 选项总高度
            
            that.minTo = that.objHeight / 2 - that.itemHeight / 2;  //最小到达
            // that.maxTo = [];  //最高到达
            // that.defaultTo = [];  //初始位置
            for (var i = 0; i < that.option.scroll.length; i++) {
                // that.option.scroll[i].scrollHeight = that.option.scroll[i].clientHeight;  // 选项总高度
                that.option.scroll[i].maxTo = that.minTo - that.option.scroll[i].clientHeight;  //最高到达
                if (that.option.scroll[i].defaultIndex) {
                    that.option.scroll[i].defaultTo = that.minTo - that.option.scroll[i].defaultIndex * that.itemHeight;  //初始位置
                } else {
                    that.scroll[i].defaultTo = that.minTo;  //初始位置
                }
            }

            // 执行方法
            that._init();  //初始显示位置
            that._start();  //
            that._move();  //
            that._end();  //
        }
        that._boxClick();  // 点击关闭
        that._cancelClick();  // 点击取消
        that._sureClick();  // 点击确认
    }
    touchScroll.prototype = {

        //缓冲动画
        _Transition: function(option,ev){
            var that = this;
            ev = ev || window.event;  // 处理事件兼容
            if (ev) {
                var target = ev.target || ev.srcElement;  // 处理获取点击对象兼容
                if (target.nodeName.toLowerCase() === 'p' && target.parentNode.className.search(/scroll/) >= 0) {
                    target.parentNode.style.webkitTransform = 'translate3d(0,'+ option.toY +'px,0)';
                } else {
                    option.scroll.style.webkitTransform = 'translate3d(0,'+ option.toY +'px,0)';
                }
            } else {
                option.scroll.style.webkitTransform = 'translate3d(0,'+ option.toY +'px,0)';
            }
            if(option.transCallback && typeof(option.transCallback) === 'function') option.transCallback();
        },

        // 初始化
        _init : function () {
            var that = this;
            for (var i = 0; i < that.option.scroll.length; i++) {
                if (that.option.scroll[i].querySelector('.selected')) {
                    that.option.scroll[i].querySelector('.selected').classList.remove('selected');
                }
                if (that.option.scroll[i].defaultIndex) {
                    that.option.scroll[i].getElementsByTagName('p')[that.option.scroll[i].defaultIndex].classList.add('selected');
                    that._Transition({'toY' : that.option.scroll[i].defaultTo , 'scroll' : that.option.scroll[i] , 'transCallback' : function () {
                        if (that.option.scroll[i].initCallback && typeof(that.option.scroll[i].initCallback) === 'function' && Math.abs(that.newChaY) >= that.itemHeight / 2) {
                            that.option.scroll[i].initCallback();
                        }
                    }});
                } else {
                    that.option.scroll[i].getElementsByTagName('p')[0].classList.add('selected');
                    that._Transition({'toY' : that.option.scroll[i].defaultTo , 'scroll' : that.option.scroll[i] , 'transCallback' : function () {
                        if (that.option.scroll[i].initCallback && typeof(that.option.scroll[i].initCallback) === 'function' && Math.abs(that.newChaY) >= that.itemHeight / 2) {
                            that.option.scroll[i].initCallback();
                        }
                    }});
                }
                that.option.scroll[i].val = that.option.scroll[i].querySelectorAll('p')[that.option.scroll[i].defaultIndex].innerHTML;
            }
        },

        // 触摸时监听
        _start : function () {
            var that = this;
            that.option.box.addEventListener('touchstart', function (ev) {
                ev.preventDefault();
                that.startY = ev.targetTouches[0].pageY;
            }, false);
        },

        // 移动时监听
        _move : function () {
            var that = this;
            that.option.box.addEventListener('touchmove', function (ev) {
                ev.preventDefault();
                var target = ev.targetTouches[0].target;
                if (target.nodeName.toLowerCase() === 'p' && target.parentNode.className.search(/scroll/) >= 0) {
                    // 记录放开手前的时间
                    that.moveTime = Date.now();
                    // 移动实时坐标
                    that.moveY = ev.targetTouches[0].pageY;
                    // console.log(that.startY);
                    // console.log(target.parentNode.defaultTo);
                    //本次移动差距
                    that.nowChaY = (that.moveY - that.startY) + target.parentNode.defaultTo;
                    //执行动画
                    if(that.nowChaY < 0){
                        // 向上滑
                        that.nowChaY = that.nowChaY < (that.minTo - ((target.parentNode.getElementsByTagName('p').length - 1) * target.clientHeight)) ? (that.minTo - ((target.parentNode.getElementsByTagName('p').length - 1) * target.clientHeight)) : that.nowChaY;
                    }else{
                        // 向下滑
                        that.nowChaY = that.nowChaY > that.minTo ? that.minTo : that.nowChaY;
                    }

                    target.parentNode.querySelector('.selected').classList.remove('selected');
                    target.parentNode.getElementsByTagName('p')[Math.round((that.minTo - that.nowChaY) / that.itemHeight)].classList.add('selected');
                    //执行缓冲动画
                    that._Transition({'toY' : that.nowChaY });
                }
            }, false);
        },

        // 结束时监听
        _end : function () {
            var that = this;
            that.option.box.addEventListener('touchend', function (ev) {
                ev.preventDefault();

                ev = ev || window.event;  // 处理事件兼容
                var target = ev.target || ev.srcElement;  // 处理获取点击对象兼容

                // var target = ev.targetTouches[0].target;
                if (target.nodeName.toLowerCase() === 'p' && target.parentNode.className.search(/scroll/) >= 0) {
                    if (that.nowChaY > 0) {
                        that.nowChaY = that.nowChaY + (that.itemHeight / 2) - (that.nowChaY % that.itemHeight);
                    } else if (that.nowChaY <= 0) {
                        that.nowChaY = that.nowChaY - (that.itemHeight / 2) - (that.nowChaY % that.itemHeight);
                    }

                    that.newChaY = that.nowChaY - target.parentNode.defaultTo;
                    target.parentNode.defaultTo = that.nowChaY;
                    target.parentNode.val = target.parentNode.getElementsByTagName('p')[Math.round((that.minTo - that.nowChaY) / that.itemHeight)].innerHTML;
                    that._Transition({'toY' : that.nowChaY , 'transCallback' : function () {
                        if (target.endCallback && typeof(target.endCallback) === 'function' && Math.abs(that.newChaY) >= that.itemHeight / 2) {
                            target.endCallback();
                        }
                    }});
                }
                
            },false);
        },

        // 关闭
        _boxClick : function () {
            var that = this;
            // that.option.box.addEventListener('click', function (ev) {
            //     ev.stopPropagation();
            // });
            that.option.btn.addEventListener('click', function (ev) {
                ev.stopPropagation();
                that.option.box.classList.add('active');
            });
            document.body.addEventListener('click', function (ev) {
                that.option.box.classList.remove('active');
                for (var i = 0; i < that.option.scroll.length; i++) {
                    if (that.option.scroll[i].defaultIndex) {
                        that.option.scroll[i].defaultTo = that.minTo - that.option.scroll[i].defaultIndex * that.itemHeight;  //初始位置
                    } else {
                        that.option.scroll[i].defaultTo = that.minTo;  //初始位置
                    }
                }
                that._init();
            });
        },

        // 点击取消
        _cancelClick : function () {
            var that = this;
            var x,y;
            that.option.cancelBtn.addEventListener('touchstart', function (ev) {
                x = ev.targetTouches[0].pageX;
                y = ev.targetTouches[0].pageY;
            });
            
            that.option.cancelBtn.addEventListener('touchend', function (ev) {
                var tarW = that.option.cancelBtn.offsetWidth, tarH = that.option.cancelBtn.offsetHeight;
                ev.stopPropagation();
                if (Math.abs(ev.changedTouches[0].pageX - x) < tarW && Math.abs(ev.changedTouches[0].pageY - y) < tarH) {

                    that.option.box.classList.remove('active');

                    for (var i = 0; i < that.option.scroll.length; i++) {
                        if (that.option.scroll[i].defaultIndex) {
                            that.option.scroll[i].defaultTo = that.minTo - that.option.scroll[i].defaultIndex * that.itemHeight;  //初始位置
                        } else {
                            that.option.scroll[i].defaultTo = that.minTo;  //初始位置
                        }
                    }
                    that._init();

                    if(that.option.cancelCallback && typeof(that.option.cancelCallback) === "function"){
                        that.option.cancelCallback();
                    }
                }
            })
        },

        // 点击确认
        _sureClick : function () {
            var that = this;
            var x,y;
            that.option.sureBtn.addEventListener('touchstart', function (ev) {
                x = ev.targetTouches[0].pageX;
                y = ev.targetTouches[0].pageY;
            });

            that.option.sureBtn.addEventListener('touchend', function(ev) {
                ev.stopPropagation();
                var tarW = that.option.cancelBtn.offsetWidth, tarH = that.option.cancelBtn.offsetHeight;
                if (Math.abs(ev.changedTouches[0].pageX - x) < tarW && Math.abs(ev.changedTouches[0].pageY - y) < tarH) {
                    that.option.box.classList.remove("active");
                    that.option.val.innerHTML = '';
                    for (var i = 0; i < that.option.scroll.length; i++) {
                        if (i === 0) {
                            that.option.val.innerHTML += that.option.scroll[i].val;
                        } else {
                            that.option.val.innerHTML += that.option.cut + that.option.scroll[i].val;
                        }
                    }
                    if(that.option.sureCallback && typeof(that.option.sureCallback) === "function"){
                        that.option.sureCallback();
                    }
                }
            },false)
        }
    }
})(window,document);
new touchScroll();