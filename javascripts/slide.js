var slide=document.getElementById("slide");
var slide_ul=slide.getElementsByTagName("ul")[0];
var slide_li=slide_ul.getElementsByTagName("li");
//设定li的宽度等于盒子宽度
li_width=slide.offsetWidth;
for (var i = slide_li.length - 1; i >= 0; i--) {
  slide_li[i].style.width=li_width + "px";
};
//设定ul的宽度等于所有li宽度相加
slide_ul.style.width=li_width*slide_li.length + "px";
//点击对应标记则显示对应图片
var btn_icon=document.getElementById("slide-icon").getElementsByTagName("a");
for (var i = btn_icon.length - 1; i >= 0; i--) {
  btn_icon[i].onclick = function(num){
    return function(){
      slideMove(num);
      auto_index=num+1;
    }
  }(i);
};
//两侧按钮点击切换
var btn_l=document.getElementById("btnL");
var btn_r=document.getElementById("btnR");
var slide_index=0;
btn_l.onclick = function(){
  slide_index--;
  slideMove(slide_index);
}
btn_r.onclick = function(){
  slide_index++;
  slideMove(slide_index);
}
//自动播放
var auto_index = 0;
var slide_mouse=setInterval(slideAutoMove,500);
slide.onmouseover=function(){clearInterval(slide_mouse)};
slide.onmouseout=function(){slide_mouse=setInterval(slideAutoMove,500)};
function slideAutoMove() {
  if(auto_index == btn_icon.length) {
    auto_index =0;
  }
  slideMove(auto_index);
  auto_index += 1;
}
//图片切换
function slideMove(index){
  if(index>slide_li.length-1) {
    index = 0;
    slide_index = index;
  }
  if(index<0) {
    index = slide_li.length - 1;
    slide_index = index;
  }
  for(var n=0;n<btn_icon.length;n++) {
    btn_icon[n].className = ""; 
  }
  btn_icon[index].className = "active";
  slide_ul.style.left = -index * li_width + "px";
}


/****************
** pro版的来啦 **
****************/
var pro=document.getElementById("slide-pro");
var pro_ul=pro.getElementsByTagName("ul")[0];
var pro_li=pro_ul.getElementsByTagName("li");
console.log("测试li1"+pro_li);
//设定li的宽度等于盒子宽度，并且隐藏起来，仅显示首个li
pro_li_width=pro.offsetWidth;
for (var i = pro_li.length - 1; i >= 0; i--) {
  pro_li[i].style.width=pro_li_width + "px";
  pro_li[i].style.display="none";
};
pro_li[0].style.display="block";
pro_li[0].style.left=pro_li_width + "px";
//设定ul的宽度等于三倍li宽度相加（左右各预留一个空位）
pro_ul.style.width=pro_li_width*3 + "px";
//设定ul始终显示中间位置
pro_ul.style.left = -pro_li_width + "px";

//点击对应标记则显示对应图片
var pro_btn_icon=document.getElementById("slide-icon-pro").getElementsByTagName("a");
for (var i = pro_btn_icon.length - 1; i >= 0; i--) {
  pro_btn_icon[i].onclick = function(num){
    return function(){
      proSlideMove(num);
      auto_index=num+1;
    }
  }(i);
};
//两侧按钮点击切换
var pro_btn_l=document.getElementById("btnL-pro");
var pro_btn_r=document.getElementById("btnR-pro");
var pro_slide_index=0;
pro_btn_l.onclick = function(){
  pro_slide_index--;
  proSlideMove(pro_slide_index);
}
pro_btn_r.onclick = function(){
  pro_slide_index++;
  proSlideMove(pro_slide_index);
}
//自动播放
var pro_auto_index = 0;
var pro_slide_mouse=setInterval(proSlideAutoMove,2000);
pro.onmouseover=function(){clearInterval(pro_slide_mouse)};
pro.onmouseout=function(){pro_slide_mouse=setInterval(proSlideAutoMove,2000)};
function proSlideAutoMove() {
  if(pro_auto_index == pro_btn_icon.length) {
    pro_auto_index =0;
  }
  proSlideMove(pro_auto_index);
  pro_auto_index += 1;
}
//图片切换
function proSlideMove(pro_index){
  var pro_index_now=0;
  for (var i = pro_btn_icon.length - 1; i >= 0; i--) {
    if (pro_btn_icon[i].className=="active") {
      pro_index_now = i;
    };
  };
  if(pro_index<pro_index_now) {
    if (pro_index<0) {pro_index=pro_li.length-1;pro_slide_index=pro_index;};
    //if (pro_index>pro_li.length-1) {pro_index=0;pro_slide_index=pro_index;};
    //pro_li[pro_index].style.left=pro_li_width+"px";
    pro_li[pro_index].style.display="block";
    pro_li[pro_index].style.left=0+"px";
    function rightMove(){
      pro_li[pro_index_now].style.left=pro_li[pro_index_now].offsetLeft+1+"px";
      pro_li[pro_index].style.left=pro_li[pro_index].offsetLeft+1+"px";
    }
    var rightMoveAuto;
    rightMoveAuto=setInterval(rightMove,1);
    if(pro_li[pro_index].offsetLeft==pro_li_width){
      clearInterval(rightMoveAuto);
      for(var n=0;n<pro_li.length;n++) {
        pro_li[n].style.display = (n==pro_index) ? ("block") : ("none");
      }
    };
  }
  if(pro_index>pro_index_now) {
    //if (pro_index<0) {pro_index=pro_li.length-1;pro_slide_index=pro_index;};
    if (pro_index>pro_li.length-1) {pro_index=0;pro_slide_index=pro_index;};
    //pro_li[pro_index].style.left=pro_li_width+"px";
    pro_li[pro_index].style.display="block";
    pro_li[pro_index].style.left=pro_li_width*2+"px";
    function leftMove(){
      pro_li[pro_index_now].style.left=pro_li[pro_index_now].offsetLeft-1+"px";
      pro_li[pro_index].style.left=pro_li[pro_index].offsetLeft-1+"px";
    }
    var leftMoveAuto;
    leftMoveAuto=setInterval(leftMove,1);
    if(pro_li[pro_index].offsetLeft==pro_li_width){
      clearInterval(leftMoveAuto);
      for(var n=0;n<pro_li.length;n++) {
        pro_li[n].style.display = (n==pro_index) ? ("block") : ("none");
      }
    };
  }
  for(var n=0;n<pro_btn_icon.length;n++) {
    pro_btn_icon[n].className = ""; 
  }
  pro_btn_icon[pro_index].className = "active";

}