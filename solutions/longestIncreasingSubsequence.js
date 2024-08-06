/**
 * Given an array of numbers, return the length of
 * the longest increasing subsequence in the array.
 */
function longestIncreasingSubsequence(array) {
  // Create an array of the same length to store the max length of the
  // increasing subsequence ending at each index
  let lengths = new Array(array.length + 1).fill(1);

  for (let i = 0; i <= array.length; i++) {
    if (i === 0) {
      lengths[0] = 0;
      continue;
    }

    for (let j = 1; j < i; j++) {
      if (array[i - 1] > array[j - 1]) {
        lengths[i] = Math.max(lengths[i], lengths[j] + 1);
      }
    }
  }

  // Return the maximum value in the lengths array
  return Math.max(...lengths);
}

function longestIncreasingSubsequenceRef(array, i = array.length) {
  if (i === 0) {
    return 0;
  }

  let maxEndingHere = 1;

  for (let j = 1; j < i; j++) {
    let lisEndingHere = longestIncreasingSubsequenceRef(array, j);

    if (array[i - 1] > array[j - 1]) {
      maxEndingHere = Math.max(maxEndingHere, 1 + lisEndingHere);
    }
  }

  return maxEndingHere;
}

function longestIncreasing(array) {
  let lis = 0;
  for (let i = 0; i <= array.length; i += 1) {
    lis = Math.max(lis, L(array, i));
  }

  return lis;
}

function L(array, prefixLen) {
  if (prefixLen === 0) {
    return 0;
  }

  let curMax = 1;

  for (let j = 1; j < prefixLen; j += 1) {
    if (array[j - 1] < array[prefixLen - 1]) {
      curMax = Math.max(curMax, 1 + L(array, j));
    }
  }

  return curMax;
}

if (require.main === module) {
  console.log('Running sanity checks:');

  // console.log('---');
  // console.log(longestIncreasingSubsequence([1, 4, 2, 3]) === 3);
  // console.log(longestIncreasingSubsequence([1, 2, 3, 4]) === 4);
  // console.log(longestIncreasingSubsequence([4, 3, 2, 1]) === 1);
  // console.log(longestIncreasingSubsequence([1, 4, 2, 3, 7, 5]) === 4);
  // console.log(longestIncreasingSubsequence([]) === 0);
  console.log('---');
  console.log(longestIncreasing([1, 4, 2, 3]) === 3);
  console.log(longestIncreasing([1, 2, 3, 4]) === 4);
  console.log(longestIncreasing([4, 3, 2, 1]) === 1);
  console.log(longestIncreasing([1, 4, 2, 3, 7, 5]) === 4);
  console.log(longestIncreasing([]) === 0);
}

module.exports = {
  longestIncreasingSubsequence,
  longestIncreasingSubsequenceRef,
};
