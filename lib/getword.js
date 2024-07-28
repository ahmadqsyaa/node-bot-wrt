function getClosestWord(input, wordList) {
  let closestWord = '';
  let closestScore = -Infinity;

  for (let word of wordList) {
    const score = fuzzyMatch(input, word);
    if (score > closestScore) {
      closestWord = word;
      closestScore = score;
    }
  }

  return closestWord;
}

function fuzzyMatch(input, word) {
  const m = input.length;
  const n = word.length;
  const dp = [];

  for (let i = 0; i <= m; i++) {
    dp[i] = [0];
  }

  for (let j = 0; j <= n; j++) {
    dp[0][j] = 0;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (input[i - 1] === word[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}

module.exports = getClosestWord;