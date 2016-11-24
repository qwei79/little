<template>
  <div id="foot" class="clearfix">
    <ul>
      <li><a href="index.html">进入首页</a></li>
      <li><a href="list.html">进入列表页</a></li>
      <li><a href="about.html">关于我们</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'vfooter'
  // props: ['inde']
  // props: ['inde']
}
</script>

<style>
#foot {
  width: 600px;
  margin: 10px auto;
  padding: 10px;
  border: 1px solid #888;
  background: #f99;
}
#foot ul li{
  float: left;
  width: 100px;
  border: 1px solid #999;
  margin: 0 5px;
  text-align: center;
  padding: 5px;
}
</style>
