from typing import List

def knapsack_01(n: int, capacity: int, weights: List[int], values: List[int]) -> int:
    """
    Given a bag with a capacity and a list of items with weights and values,
    return the maximum value that can be carried by the bag. There is only
    one copy of each item.
    
    Args:
        n: Number of items available
        capacity: Maximum weight capacity of the knapsack
        weights: List of item weights
        values: List of item values
        
    Returns:
        Maximum value that can be achieved within the weight capacity
    """
    if n <= 0:
        # If we have no items, there's nothing to take
        return 0
    elif capacity <= 0:
        # If we have no capacity, we can't take anything
        return 0
    elif weights[n - 1] > capacity:
        # If the item weighs more than our capacity, we can't take it
        # It's as if that item wasn't included to begin with
        return knapsack_01(n - 1, capacity, weights, values)
    else:
        # We now have a choice whether to take the item or not
        # If we take then our total value is the value of the item,
        # plus the value in a world where that item didn't exist but we had less capacity
        value_if_we_take = values[n - 1] + knapsack_01(n - 1, capacity - weights[n - 1], weights, values)
        value_if_we_skip = knapsack_01(n - 1, capacity, weights, values)
        
        # Return the maximum value between taking or skipping the current item
        return max(value_if_we_take, value_if_we_skip)

def knapsack_01_bottom_up(n: int, capacity: int, weights: List[int], values: List[int]) -> int:
    """
    Bottom-up dynamic programming solution for the 0/1 knapsack problem.
    
    Args:
        n: Number of items available
        capacity: Maximum weight capacity of the knapsack
        weights: List of item weights
        values: List of item values
        
    Returns:
        Maximum value that can be achieved within the weight capacity
    """
    # Create a 2D array to store results for all subproblems
    results = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    # Build table results[][] in bottom-up manner
    for i in range(n + 1):
        for w in range(capacity + 1):
            if i <= 0:
                results[i][w] = 0
            elif w <= 0:
                results[i][w] = 0
            elif weights[i - 1] > w:
                results[i][w] = results[i - 1][w]
            else:
                value_if_we_take = values[i - 1] + results[i - 1][w - weights[i - 1]]
                value_if_we_skip = results[i - 1][w]
                results[i][w] = max(value_if_we_take, value_if_we_skip)
    
    return results[n][capacity]

if __name__ == "__main__":
    # Run some sanity checks
    weights = [2, 4, 5]
    values = [200, 100, 50]
    n = 3
    capacity = 10
    
    print("Running sanity checks:")
    print(f"Recursive solution: {knapsack_01(n, capacity, weights, values)}")
    print(f"Bottom-up solution: {knapsack_01_bottom_up(n, capacity, weights, values)}")
