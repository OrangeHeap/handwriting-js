// 实现一个斐波那契数列
function fibonacci01(n) {
  let dp = []
  dp[0] = 0
  dp[1] = 1
  dp[2] = 1

  if (n <=2) return dp[n];

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-2] + dp[i-1]
  }

  return dp[n]
}

function fibonacci02 (n) {
  let sum = 0;

  if (n <= 1) return n

  let a = 0; b = 1;

  while (n-- > 1) {
    sum = a + b
    a = b;
    b = sum;
  }

  return sum;
}
