<template>
  <div id="head" class="clearfix">
    <ul>
      <li v-bind:inde="hehe">{{ inde }}<a href="index.html">首页</a></li>
      <li><a href="list.html">列表页</a></li>
      <li><a href="about.html">关于我们</a></li>
      <!-- <li><a href="content.html">内容</a></li> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'vhead',
  data () {
    return {
      props: ['inde']
    }
  }
  // props: ['inde']
  // props: ['inde']
}

</script>

<style>
#head {
  width: 600px;
  margin: 10px auto;
  padding: 10px;
  border: 1px solid #888;
  background: #99f;
}
#head ul li{
  float: left;
  width: 100px;
  border: 1px solid #999;
  margin: 0 5px;
  text-align: center;
  padding: 5px;
}
.checked{
  border-color: #9f9;
}
</style>
