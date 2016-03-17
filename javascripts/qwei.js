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

/* 瀑布流效果 */
function pubuliu(){
  /* 使用for in运算返回数组中某一值的对应项数(比如算出最小的高度值是数组里面的第几个) */
  function getarraykey(s, v) {for(k in s) {if(s[k] == v) {return k;}}}
  var margin = 10;
  var pubuliu=document.getElementsByClassName("pubuliu");
  for(var pbl=0; pbl<pubuliu.length; pbl++){
    var pblLi=pubuliu[pbl].getElementsByTagName("li");
    var pblLiWidth = pblLi[0].offsetWidth + margin;
    var h = new Array;
    var n = (pubuliu[pbl].offsetWidth + margin)/pblLiWidth|0;
    for(var i = 0;i < pblLi.length;i++) {
      var pblLiHeight = pblLi[i].offsetHeight;
      if(i < n) {
        h[i]=pblLiHeight;
        pblLi[i].style.top= 0;
        pblLi[i].style.left=i * pblLiWidth + "px";
        max_H = Math.max.apply(null,h);//取数组中的最大值，区块中高度最大的那个
        maxKey = getarraykey(h, max_H);//最大的值对应的指针
        pblHeight = h[maxKey];
      } else {
        min_H = Math.min.apply(null,h) ;//取得数组中的最小值，区块中高度值最小的那个
        minKey = getarraykey(h, min_H);//最小的值对应的指针
        h[minKey] += pblLiHeight + margin ;//加上新高度后更新高度值
        pblLi[i].style.top=min_H+margin + "px";//先得到高度最小的Li，然后把接下来的li放到它的下面
        pblLi[i].style.left=minKey * pblLiWidth + "px"; //第i个li的左坐标就是i*li的宽度
        max_H = Math.max.apply(null,h);
        maxKey = getarraykey(h, max_H);
        pblHeight = h[maxKey];
      }
    }
    pubuliu[pbl].style.height = pblHeight + "px";
  }
}/* pubuliu end */

/* 元素置底 */
function eleBottom() { 
  var footerHeight = 0, footerTop = 0;
  var footer = document.getElementsByClassName("ele-bottom");
  positionFooter(); 
  //定义positionFooter function 
  function positionFooter() { 
    for (var i = footer.length - 1; i >= 0; i--) {
      //取到对应元素高度 
      footerHeight = footer[i].offsetHeight;
      //如果页面内容高度小于屏幕高度，元素将绝对定位到屏幕底部，否则保留它的正常静态定位 
      if ( document.body.offsetHeight - footerHeight < window.screen.availHeight) {
        footer[i].style.position = "fixed";
        footer[i].style.bottom = 0;
      }
    }
  }
}


window.onresize = function(){
  pubuliu();
}/* window.onresize end */
/*
window.onload = function(){
  pubuliu();
  eleBottom();
} window.onload end */
var onloadPoll = new Array;
onloadPoll[onloadPoll.length]=pubuliu();
onloadPoll[onloadPoll.length]=eleBottom();
window.onload = function(){
  for (var i = onloadPoll.length - 1; i >= 0; i--) {
    onloadPoll[i];
  };
}/* window.onload end */
