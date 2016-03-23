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

