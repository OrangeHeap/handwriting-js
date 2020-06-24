/** 请实现如下的函数，可以批量请求数据，所有的URL地址在urls参数中，同时可以通过max参数控制请求的并发度，当所有请求结束之后，需要执行callback回掉函数。
 *  发请求的函数可以直接使用fetch即可
 *  function sendRequest(urls: string[], max: number, callback: () => void) {
 *  }
 */

function sendRequest(urls, max, callback) {
  // 记录请求的个数
  const urlsCount = urls.length;
  // 请求队列
  const requestQueue = [];
  // 记录请求结果
  const results = [];
  // 当前的指针
  let current = 0;

  const handleRequest = (url) => {
    const req = fetch(url).then(res => {
      // 记录当前结果的数量
      const length = results.push(res);

      // 如果当前
      if (length < urlsCount && current + 1 < urlsCount) {
        requestQueue.shift();
        handleRequest(urls[++current]);
      } else if (length === urlsCount) {
        typeof callback === 'function' && callback(results)
      }
    }).catch(err => {
      results.push(err)
    });

    // 如果队列中的请求数量小于最大并发数量，向队列内推入新的并发请求
    if (requestQueue.push(req) < max) {
      handleRequest(urls[++current])
    }
  }

  // 从第0个链接开始请求
  handleRequest(urls[current]);
}
