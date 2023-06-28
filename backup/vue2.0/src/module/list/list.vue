<template>
  <div id="main">
    这里是list的主体部分
    <ul>
        <li v-for="item in items">
            <a v-bind={href:item.url}>
                {{ item.title }}
            </a>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'listmain',
  data () {
    return {
      items: []
    }
  },
  mounted: function () {
    this.$http.jsonp('https://api.douban.com/v2/movie/top250', {}, {
      headers: {

      },
      emulateJSON: true
    }).then(function (response) {
      // 这里是处理正确的回调
      this.items = response.data.subjects
      for (var i = this.items.length - 1; i >= 0; i--) {
        this.items[i].url = './content.html?id=' + this.items[i].id
      };
      // this.articles = response.data["subjects"] 也可以
    }, function (response) {
      // 这里是处理错误的回调
      console.log(response)
    })
  }
}
// function ajaxLogin(url, param){
//         $.ajax({
//             url : url,
//             type : 'post',
//             data : param,
//             async : false,
//             success : function(result){
//                 if(result.state==0){
//                     location.reload();
//                 }else{
//                     $("#login .red").html(result.message);
//                 }
//             },
//             dataType:'json'
//         });
//     };
// var d="{'account':'18600444789','password':'823364sq','loginType':'1','auto_login':'auto'}";
// var u="www.isggame.com/drilllogin/drilllogin";
// ajaxLogin(u,d);
</script>

<style>
#main {
  width: 600px;
  margin: 0 auto;
}
</style>
