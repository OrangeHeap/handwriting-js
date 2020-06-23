// 异步循环打印
function sleep(time, i) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(i);
    }, time)
  })
}

const start = async () => {
  for (let i = 0; i < 6; i++) {
    let result = await sleep(1000, i);
    console.log(result);
  }
}

start();
