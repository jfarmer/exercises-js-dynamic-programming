/**
 * Given two arrays, return the length of the longest subsequence
 * they have in common. The longest common subsequence is often
 * abbreviated LCS.
 *
 * @example
 * longestCommonSubsequence(
 *  ['A', 'B', 'C', 'B', 'E', 'C', 'A'],
 *  ['B', 'D', 'C', 'A', 'E', 'A']
 * ); // => returns 4 because ['B', 'C', 'E', 'A'] is the LCS
 */
function longestCommonSubsequence(left, right) {
  if (left.length === 0 || right.length === 0) {
    return 0;
  }

  let lastLeft = left.at(-1);
  let lastRight = right.at(-1);

  if (lastLeft === lastRight) {
    return 1 + longestCommonSubsequence(left.slice(0, -1), right.slice(0, -1));
  } else {
    return Math.max(
      longestCommonSubsequence(left, right.slice(0, -1)),
      longestCommonSubsequence(left.slice(0, -1), right),
    );
  }
}

// Memoize each (n,m) pair and this works
function longestCommonSubsequenceRef(left, right, n = left.length, m = right.length) {
  if (n === 0 || m === 0) {
    return 0;
  }

  let lastLeft = left.at(n - 1);
  let lastRight = right.at(m - 1);

  if (lastLeft === lastRight) {
    return 1 + longestCommonSubsequenceRef(left, right, n - 1, m - 1);
  } else {
    return Math.max(
      longestCommonSubsequenceRef(left, right, n, m - 1),
      longestCommonSubsequenceRef(left, right, n - 1, m),
    );
  }
}

function longestCommonSubsequenceBottomUp(left, right) {
  // Create an (n+1)-by-(m+1) array
  // The +1 is there to account for the empty subsequence.
  let LCS = Array(left.length + 1).fill().map(() => Array(right.length + 1).fill(0));

  for (let n = 0; n <= left.length; n++) {
    for (let m = 0; m <= right.length; m++) {
      if (n === 0 || m === 0) {
        LCS[n][m] = 0;
        continue;
      }

      let lastLeft = left.at(n - 1);
      let lastRight = right.at(m - 1);

      if (lastLeft === lastRight) {
        LCS[n][m] = 1 + LCS[n - 1][m - 1];
      } else {
        LCS[n][m] = Math.max(
          LCS[n][m - 1],
          LCS[n - 1][m],
        );
      }
    }
  }

  return LCS[left.length][right.length];
}

if (require.main === module) {
  console.log('Running sanity checks:');

  // Add some sanity checks here
}

module.exports = {
  longestCommonSubsequence,
  longestCommonSubsequenceRef,
  longestCommonSubsequenceBottomUp,
};
