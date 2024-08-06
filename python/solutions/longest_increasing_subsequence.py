def longest_increasing_subsequence_ref(array, i = None):
    if i is None:
        i = len(array)

    if i == 0:
        return 0

    max_ending_here = 1

    for j in range(1, i):
        lis_ending_here = longest_increasing_subsequence_ref(array, j)

        if (array[i - 1] > array[j - 1]):
            max_ending_here = max(max_ending_here, 1 + lis_ending_here)

    return max_ending_here

def longest_increasing_subsequence(array):
    lengths = [1] * (len(array) + 1)

    for i in range(0, len(array) + 1):
        if i == 0:
            lengths[i] = 0
            continue

        for j in range(1, i):
            if (array[i - 1] > array[j - 1]):
                lengths[i] = max(lengths[i], 1 + lengths[j])

    return max(lengths)

def lis(arr):
    if len(arr) == 0:
        return 0

    # Either the last element is part of the longest increasing
    # subsequence or it's not.

    # Last element
    last = arr[-1]

    # All-but-last element
    prefix = arr[0:-1]

    # Every value that could come before `last` in an increasing subsequence
    prevLast = [val for val in prefix if val < last]

    return max(
        lis(prefix),      # last is not part of optimal solution
        1 + lis(prevLast) # last is part of optimal solution
    )


def longest_increasing_subsequence_bottom_up(arr):
    """
    Find the length of the longest increasing subsequence in the given array using bottom-up dynamic programming.

    :param arr: Input array
    :return: Length of the longest increasing subsequence
    """
    n = len(arr)

    if n == 0:
        return 0

    lengths = [1] * n

    for i in range(1, n):
        for j in range(0, i):
            if arr[i] > arr[j]:
                lengths[i] = max(lengths[i], 1 + lengths[j])

    return max(lengths)

if __name__ == "__main__":
    print("Running sanity checks...")

    print("longest_increasing_subsequence:")
    print(longest_increasing_subsequence([1, 4, 2, 3]) == 3)
    print(longest_increasing_subsequence([1, 2, 3, 4]) == 4)
    print(longest_increasing_subsequence([4, 3, 2, 1]) == 1)
    print(longest_increasing_subsequence([1, 4, 2, 3, 7, 5]) == 4)
    print(longest_increasing_subsequence([]) == 0)
    print("")


    print("longest_increasing_subsequence_bottom_up:")
    print(longest_increasing_subsequence_bottom_up([1, 4, 2, 3]) == 3)
    print(longest_increasing_subsequence_bottom_up([1, 2, 3, 4]) == 4)
    print(longest_increasing_subsequence_bottom_up([4, 3, 2, 1]) == 1)
    print(longest_increasing_subsequence_bottom_up([1, 4, 2, 3, 7, 5]) == 4)
    print(longest_increasing_subsequence_bottom_up([]) == 0)
    print("")

    print("longest_increasing_subsequence_ref:")
    print(longest_increasing_subsequence_ref([1, 4, 2, 3]) == 3)
    print(longest_increasing_subsequence_ref([1, 2, 3, 4]) == 4)
    print(longest_increasing_subsequence_ref([4, 3, 2, 1]) == 1)
    print(longest_increasing_subsequence_ref([1, 4, 2, 3, 7, 5]) == 4)
    print(longest_increasing_subsequence_ref([]) == 0)
