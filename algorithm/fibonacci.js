// 实现一个斐波那契数列
function fibonacci(n) {
  let dp = []
  dp[0] = 0
  dp[1] = 1
  dp[2] = 1

  if (n <=2) return dp[n];

  for (let i = 2; i < n; i++) {
    dp[i] = dp[n-2] + dp[n-1]
  }

  return dp[n]
}
