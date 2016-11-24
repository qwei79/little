<template>
  <div id="main">
    这里是content的主体部分
    <div>
        {{ items }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'contentmain',
  data () {
    return {
      items: {}
    }
  },
  mounted: function () {
    // console.log(window.location.search)
    if (RegExp('id').test(window.location.search)) {
      console.log(window.location.search.slice(1).split('&'))
      var arr = window.location.search.slice(1).split('&')
      console.log(arr)
      var i, id
      for (i in arr) {
        if (arr[i].substring(0, arr[i].indexOf('=')) === 'id') {
          id = arr[i].substring(arr[i].indexOf('=') + 1)
        }
      };
      console.log(id)
    }
    this.$http.jsonp('https://api.douban.com/v2/movie/' + id, {}, {
      headers: {
      },
      emulateJSON: true
    }).then(function (response) {
      // 这里是处理正确的回调
      this.items = response.data
      // this.articles = response.data["subjects"] 也可以
    }, function (response) {
      // 这里是处理错误的回调
      console.log(response)
    })
  }
}
</script>

<style>
#main {
  width: 600px;
  margin: 0 auto;
}
</style>
