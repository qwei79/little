var slide = document.getElementById("slide");
var slide_ul = slide.getElementsByTagName("ul")[0];
var slide_li = slide_ul.getElementsByTagName("li");
//规范图片大小，以盒子为标准
li_width = slide.offsetWidth;
for(var i = slide_li.length-1; i >= 0; i--){
  slide_li[i].style.width = li_width +'px';
};
//设定ul的宽度为所有li宽度相加
slide_ul.style.width = li_width*slide_li.length + 'px';

//底部角标
var btn_icon = document.getElementById("slide-icon").getElementsByTagName("a");
for(var i = btn_icon.length - 1; i >= 0; i--){
  btn_icon[i].onclick = function(num){
    return function(){
      slideMove(num);
    }
  }(i);
};
//两侧按钮
var btn_l = document.getElementById("btnL");
var btn_r = document.getElementById("btnR");
btn_l.onclick = function(){
  auto_index--;
  slideMove(auto_index);
}
btn_r.onclick = function(){
  auto_index++;
  slideMove(auto_index);
}
//自动播放
var auto_index = 0;
function slideAutoMove(){
  auto_index += 1;
  slideMove(auto_index);
}
var slide_mouse = setInterval(slideAutoMove,500);
slide.onmouseover = function(){clearInterval(slide_mouse)};
slide.onmouseout = function(){slide_mouse = setInterval(slideAutoMove,500)};

//图片切换函数
function slideMove(index){
  //判断部分
  if(index > slide_li.length-1){
    index = 0;
    auto_index = index;
  }
  if(index < 0){
    index = slide_li.length - 1;
    auto_index = index;
  }
  //角标样式控制
  for(var n = 0; n <btn_icon.length; n++){
    btn_icon[n].className = "";
  }
  btn_icon[index].className = "active";
  //主切换内容
  slide_ul.style.left = -index * li_width + 'px';
}