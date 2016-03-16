function helloWorld(){
  function hereDoc(f) {　
    return f.toString().replace(/^[^\/]+\/\*!?\s?/, '').replace(/\*\/[^\/]+$/, '');
  }
  play_console = hereDoc(function(){/*

 _      _   _________   _           _            ______      _          _    ______    ________    _           _______
| |    | | |  _______| | |         | |          / ____ \    | |        | |  / ____ \  |  _____ \  | |         |  ____ \
| |    | | | |         | |         | |         / /    \ \   | |        | | / /    \ \ | |     | | | |         | |    | |
| |____| | | |_____    | |         | |         | |    | |   | |        | | | |    | | | |_____| | | |         | |    | |
|  ____  | |  _____|   | |         | |         | |    | |   | |   __   | | | |    | | |  ___  _/  | |         | |    | |
| |    | | | |         | |         | |         | |    | |   \ \  /  \  | | | |    | | | |   \ \   | |         | |    | |
| |    | | | |_______  | |_______  | |_______  \ \____/ /    \ \/ /\ \/ /  \ \____/ / | |    \ \  | |_______  | |___/ /
|_|    |_| |_________| |_________| |_________|  \______/      \__/  \__/    \______/  |_|     \_\ |_________| |______/

换一种写法

 ___________
|____   ____|
     | |    
 ____| |____
|___________|
 ___________
|  __   __  |
| |  | |  | |
| |  |_|  | |
|_|       |_|
 ___________
|  _________|
| |
| |
|_|
 ___________
|  _________|
| |
| |
|_|
  _________
 / _______ \
| |       | |
| |_______| |
 \_________/
  __________
/ __________|
\ \ 
/ /_________
\___________|
  _________
 / _______ \
| |       | |
| |_______| |
 \_________/
 ___________
|____   __  |
   /   |  | |
 _/ /| |__| |
|__/  \____/
 ___________
|  _________|
| |
| |
|_|
 ___________
|  _______  |
| |       | |
| |_______| |
 \_________/
*/});
  console.log(play_console);
}

function htmlHelloWorld(){
  document.getElementById("effect").innerHTML="Hello World!";
}
function cssHelloWorld(){
  document.getElementById("effect").innerHTML="<div class='H'></div><div class='E'></div><div class='L'></div><div class='L'></div><div class='O'></div><div style='clear:both;'></div><div class='W'></div><div class='O'></div><div class='R'></div><div class='L'></div><div class='D'></div>";
}
function jsHelloWorld(){
  document.getElementById("effect").innerHTML="你没发现这个弹出就是js实现的吗？";
  helloWorld();
}
