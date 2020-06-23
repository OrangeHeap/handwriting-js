(function (window, document) {
  'use strict';

  var jsonp = function (url, data, callback, prefix = 'my_json_cb_') {
    // 1、将传入的data转化为url字符串的形式
    // 检查url内有没有?的参数，如果没有?则按照?开头拼接，如果有?则直接用&开头拼接
    var dataString = url.indexOf('?') === -1 ? '?' : '&'

    // 循环传入data的值，拼接为字符串
    for (var key in data) {
      dataString += key + '=' + data[key] + '&';
    }

    // 2、处理url中的回调函数
    // cbFuncName回调函数的名字 ：my_json_cb_名字的前缀 + 随机数（把小数点去掉）
    var cbFuncName = prefix + Math.random().toString().replace('.', '');
    dataString += 'callback' + cbFuncName;

    // 3.创建一个script标签并插入到页面中
    var scriptElement = document.createElement('script');
    scriptElement.src = url + dataString;

    // 4.挂载回调函数
    window[cbFuncName] = function (data) {
      callback(data);
      // 处理完回调函数的数据之后，删除jsonp的script标签
      document.body.removeChild(scriptElement);
    }

    document.body.appendChild(scriptElement);
  }

  window.$jsonp = jsonp;
})(window, document)
