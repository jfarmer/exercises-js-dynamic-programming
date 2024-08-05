"""
Given two sequences, return the length of the longest subsequence
they have in common. The longest common subsequence is often
abbreviated LCS.

Example:
longest_common_subsequence(
    ['A', 'B', 'C', 'B', 'E', 'C', 'A'],
    ['B', 'D', 'C', 'A', 'E', 'A']
) # => returns 4 because ['B', 'C', 'E', 'A'] is the LCS
"""

def longest_common_subsequence(left, right):
    if len(left) == 0 or len(right) == 0:
        return 0

    last_left = left[-1]
    last_right = right[-1]

    if last_left == last_right:
        return 1 + longest_common_subsequence(left[:-1], right[:-1])
    else:
        return max(
            longest_common_subsequence(left, right[:-1]),
            longest_common_subsequence(left[:-1], right)
        )

def longest_common_subsequence_ref(left, right, n=None, m=None):
    if n is None:
        n = len(left)
    if m is None:
        m = len(right)

    if n == 0 or m == 0:
        return 0

    last_left = left[n - 1]
    last_right = right[m - 1]

    if last_left == last_right:
        return 1 + longest_common_subsequence_ref(left, right, n - 1, m - 1)
    else:
        return max(
            longest_common_subsequence_ref(left, right, n, m - 1),
            longest_common_subsequence_ref(left, right, n - 1, m)
        )

def longest_common_subsequence_bottom_up(left, right):
    # Create an (n+1)-by-(m+1) array
    # The +1 is there to account for the empty subsequence.
    LCS = [[0 for _ in range(len(right) + 1)] for _ in range(len(left) + 1)]

    for n in range(len(left) + 1):
        for m in range(len(right) + 1):
            if n == 0 or m == 0:
                LCS[n][m] = 0
                continue

            last_left = left[n - 1]
            last_right = right[m - 1]

            if last_left == last_right:
                LCS[n][m] = 1 + LCS[n - 1][m - 1]
            else:
                LCS[n][m] = max(
                    LCS[n][m - 1],
                    LCS[n - 1][m]
                )

    return LCS[len(left)][len(right)]

if __name__ == "__main__":
    print('Running sanity checks:')
    
    # Add some sanity checks here
    test_left = ['A', 'B', 'C', 'B', 'E', 'C', 'A']
    test_right = ['B', 'D', 'C', 'A', 'E', 'A']
    
    assert longest_common_subsequence(test_left, test_right) == 4
    assert longest_common_subsequence_ref(test_left, test_right) == 4
    assert longest_common_subsequence_bottom_up(test_left, test_right) == 4
    
    print("All sanity checks passed!")
