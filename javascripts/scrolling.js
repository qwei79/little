function startMove(){
  var sScrolling=document.getElementsByClassName("sscrolling"),i;
  var sScrollingY = document.getElementsByClassName("sscrolling-y"),j;
  for(j = 0; j<sScrollingY.length; j++){
    startMoveY(j);
  }
  for(i=0; i<sScrolling.length; i++){
    var sUl=sScrolling[i].getElementsByTagName("ul")[0];
    var sLi=sUl.getElementsByTagName("li");
    startMoveX(i,sLi[0].offsetHeight);
  }
}
function startMoveX(i,sSheight){
  var sScrolling=document.getElementsByClassName("sscrolling")[i];
  var sUl,sLi,sUlw=0;
  sUl=sScrolling.getElementsByTagName("ul")[0];
  sLi=sUl.getElementsByTagName('li');
  /* 获取一组内容 */
  var Wc=sUl.innerHTML;
  /* 首次定义ul宽度 */
  sUl.innerHTML+=sUl.innerHTML;
  for(var ii=0; ii<sLi.length; ii++){
    sLi[ii].style.height = sSheight;
    sUlw+=sLi[ii].offsetWidth + 10;
  }
  sUl.style.width=sUlw+'px';
  /* 获取一组宽度 */
  WcW=sUl.offsetWidth/2;
  /* 添加内容以完全覆盖并且有一组完全在显示区域外 */
  var Wd=sScrolling.offsetWidth+WcW-sUl.offsetWidth;
  for(Wd; Wd>0; Wd=Wd-WcW){
    sUl.innerHTML=sUl.innerHTML + Wc;
  }
  /* 计算添加完成后的ul宽度 */
  for(var ii=0; ii<sLi.length; ii++){
    sLi[ii].style.height = sSheight;
    sUlw+=sLi[ii].offsetWidth + 10;
  }
  sUl.style.width=sUlw+'px';
  /* 设置显示区域高度为首个li的高度 */
  sScrolling.style.height=sSheight + 10+'px';
  /* 滚动函数 */
  function timer(){
    /* 当内容滚过一组的宽度的时候，则回到开始位置，为了不卡顿设置为“-1” */
    if(sUl.offsetLeft<-WcW){
      console.log(sUl.offsetLeft);
      console.log(WcW);
      sUl.style.left=-1+'px';
      console.log(sUl.offsetLeft);
    }
    sUl.style.left=sUl.offsetLeft-1+'px';
  }
  var timeri;
  timeri=setInterval(timer,10);
  sScrolling.onmouseover=function(){clearInterval(timeri)};
  sScrolling.onmouseout=function(){timeri=setInterval(timer,10)};
}

/*
* 这里放的是竖版的js
* 实现原理和横板一样，后期看看能不能合并……
*/
function startMoveY(j){
  var sScrolling = document.getElementsByClassName("sscrolling-y")[j];
  var sUl,sLi,sUlh = 0;
  sUl = sScrolling.getElementsByTagName("ul")[0];
  sLi = sUl.getElementsByTagName("li");
  //设定li的宽度统一为第一个li的宽度
  for(var i = 0; i<sLi.length; i++){
    sLi[i].style.width = sLi[0].offsetHeight;
  }
  var rootUl = sUl.innerHTML;
  sUL.innerHTML += sUl.innerHTML;
  for(var i = 0; i<sLi.length; i++){
    sUlh += sLi[i].offsetHeight + 10;
  }
  //首次设定ul的高度，此时的ul是双倍
  sUl.style.height = sUlh + 'px';
  while((sScrolling.offsetHeight + (sUlh/2) - sUl.offsetHeight)>0){
    sUl.innerHTML += rootUl;
  }
  //重新计算ul的高度
  for(var i = 0; i<sLi.length; i++){
    sUlh += sLi[i].offsetHeight + 10;
  }
  sUl.style.height = sUlh + 'px';
  //设置ul的宽度
  sScrolling.style.width = sLi[0].offsetHeight + 10 + 'px';
  //滚动方法
  function timeY(){
    if(sUl.offsetLeft < -(sUlh/2)){
      sUl.style.left = -1 + 'px';
    }
    sUl.style.left = sUl.offsetLeft -1 +'px';
  }
  var timeYauto;
  timeYauto = setInterval(timeY,10);
  sScrolling.onmouseover = function(){clearInterval(timeY)};
  sScrolling.onmouseout = function(){timeYauto = setInterval(timeY,10)};
}
