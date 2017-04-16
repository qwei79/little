var deviceWidth = window.screen.width > 0 && window.innerWidth >= window.screen.width ? window.screen.width : window.innerWidth,
    htmlFontSize = deviceWidth > 1080 ? 144 : deviceWidth / 7.5;
htmlFontSize = htmlFontSize > 32 ? htmlFontSize : 32;
document.getElementsByTagName('html')[0].style.fontSize = htmlFontSize + 'px';