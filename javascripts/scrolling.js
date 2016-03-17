window.onload=function(){
  var sScrolling=document.getElementsByClassName("sscrolling"),i;
  for(i=0; i<sScrolling.length; i++){
    var sUl=sScrolling[i].getElementsByTagName("ul")[0];
    var sLi=sUl.getElementsByTagName("li");
    startMove(i,sLi[0].offsetHeight);
  }
}
function startMove(i,sSheight){
  var sScrolling=document.getElementsByClassName("sscrolling")[i];
  var sUl,sLi,sUlw=0;
  sUl=sScrolling.getElementsByTagName("ul")[0];
  sLi=sUl.getElementsByTagName('li');
  var Wc=sUl.innerHTML;
  sUl.innerHTML+=sUl.innerHTML;
  for(var ii=0; ii<sLi.length; ii++){
    sLi[ii].style.height = sSheight;
    sUlw+=sLi[ii].offsetWidth + 10;
  }
  sUl.style.width=sUlw;
  var Wd=sScrolling.offsetWidth*2-sUl.offsetWidth;
  for(Wd; Wd>0; Wd=Wd-sUl.offsetWidth){
    sUl.innerHTML=sUl.innerHTML + Wc;
  }
  
  for(var ii=0; ii<sLi.length; ii++){
    sLi[ii].style.height = sSheight;
    sUlw+=sLi[ii].offsetWidth + 10;
  }
  sUl.style.width=sUlw;
  
  sScrolling.style.height=sSheight + 10;
  function timer(){
    if(sUl.offsetLeft<-sUl.offsetWidth/2){
      sUl.style.left=10;
    }
    sUl.style.left=sUl.offsetLeft-1+'px';
  }
  var timeri;
  timeri=setInterval(timer,10);
  sScrolling.onmouseover=function(){clearInterval(timeri)};
  sScrolling.onmouseout=function(){timeri=setInterval(timer,10)};
}
