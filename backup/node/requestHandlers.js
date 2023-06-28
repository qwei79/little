function start() {
  console.log("收到‘开始’的请求");
  return "Hello Start";
}

function upload() {
  console.log("收到‘加载’的请求");
  return "Hello Upload";
}
function test() {
    console.log("收到‘不知道是什么的’请求");
    return "不知道是什么"
}

exports.start = start;
exports.upload = upload;
exports.test = test;