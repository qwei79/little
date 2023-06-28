function route(handle, pathname) {
  console.log("向路由请求" + pathname);
  if (typeof handle[pathname] === 'function') {
    return handle[pathname]();
  } else {
    console.log('没找到对应' + pathname + '的请求路由方法');
    return "404 Not found";
  }
}

exports.route = route;