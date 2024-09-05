/**
 * Given a rod of length N and an array of prices that tells us the
 * value of rods of length <= N, return the maximum value that we can
 * achieve by cutting the rod and selling the pieces.
 */

function rodCutting(prices, length) {
  if (length <= 0) {
    return 0;
  }

  let maxValue = -Infinity;
  for (let i = 1; i <= length; i++) {
    maxValue = Math.max(maxValue, prices[i - 1] + rodCutting(prices, length - i));
  }

  return maxValue;
}

function rodCuttingMemoized(prices, length, memo = new Map()) {
  if (memo.has(length)) {
    return memo.get(length);
  }

  if (length <= 0) {
    memo.set(length, 0);
    return 0;
  }

  let maxValue = -Infinity;
  for (let i = 1; i <= length; i++) {
    maxValue = Math.max(maxValue, prices[i - 1] + rodCuttingMemoized(prices, length - i, memo));
  }

  memo.set(length, maxValue);
  return maxValue;
}

function rodCuttingBottomUp(prices, length) {
  let maxValues = new Array(length + 1);

  for (let i = 0; i <= length; i++) {
    // Normally we'd pre-fill maxValues with 0 and start
    // the iteration at i=1. Writing it this way to emphasize
    // the similarity between top-down and bottom-up approaches.
    if (i <= 0) {
      maxValues[i] = 0;
      continue;
    }

    let maxValue = -Infinity;

    for (let j = 1; j <= i; j++) {
      maxValue = Math.max(maxValue, prices[j - 1] + maxValues[i - j]);
    }

    maxValues[i] = maxValue;
  }

  return maxValues[length];
}

if (require.main === module) {
  console.log('Running sanity checks:');

  // Sanity checks
  const prices = [1, 5, 8, 9, 10, 17, 17, 20];
  console.assert(rodCutting(prices, 4) === 10, 'rodCutting(prices, 4) should be 10');
  console.assert(rodCuttingMemoized(prices, 4) === 10, 'rodCuttingMemoized(prices, 4) should be 10');
  console.assert(rodCuttingBottomUp(prices, 4) === 10, 'rodCuttingBottomUp(prices, 4) should be 10');

  console.assert(rodCutting(prices, 8) === 22, 'rodCutting(prices, 8) should be 22');
  console.assert(rodCuttingMemoized(prices, 8) === 22, 'rodCuttingMemoized(prices, 8) should be 22');
  console.assert(rodCuttingBottomUp(prices, 8) === 22, 'rodCuttingBottomUp(prices, 8) should be 22');

  console.log('All sanity checks passed!');
}

module.exports = {
  rodCutting,
  rodCuttingMemoized,
  rodCuttingBottomUp,
};
