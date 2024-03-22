/**
 * Given a bag with a capacity and a list of items with weights and values,
 * return the maximum value that can be carried by the bag. There is only
 * one copy of each item.
 */

// Here is an un-memoized top-down solution. To memoize, you'd want
// to cache against the first two arguments. I don't do it here to
// make it clear how similar the top-down and bottom-up solutions are.
function knapsack01(n, capacity, weights, values) {
  if (n <= 0) {
    // If we have no items, there's nothing to take
    return 0;
  } else if (capacity <= 0) {
    // If we have no capacity, we can't take anything
    return 0;
  } else if (weights[n - 1] > capacity) {
    // If the item weighs more than our capacity, we can't take it
    // It's as if that item wasn't included to begin with

    return knapsack01(n - 1, capacity, weights, values);
  } else {
    // We now have a choice whether to take the item or not
    // If we take then our total value is the value of the item,
    // plus the value in a world where that item didn't exist but we had less capacity
    let valueIfWeTake = values[n - 1] + knapsack01(n - 1, capacity - weights[n - 1], weights, values);
    let valueIfWeDoNotTake = knapsack01(n - 1, capacity, weights, values);

    // Whichever value is the largest, that was the choice we made in forming the optimal solution
    return Math.max(valueIfWeTake, valueIfWeDoNotTake);
  }
}

// We have to memoize by the first two arguments, which means we need to
// have a way to keep track of all possible (item, capacity) pairs.
// The last two arguments never change / contain static information.
function knapsack01BottomUp(n, capacity, weights, values) {
  // Create an empty number-of-items-by-capacity array
  let results = new Array(n + 1).fill().map(() => new Array(capacity + 1).fill());

  // Bottom-up, where we had return statements we now assign into the results array
  // You can thunk of results[i][w] as being the same as knapsack01(i, w)
  for (let i = 0; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (i <= 0) {
        results[i][w] = 0;
      } else if (w <= 0) {
        results[i][w] = 0;
      } else if (weights[i] > w) {
        results[i][w] = results[i - 1][w];
      } else {
        // recursive case
        let valueIfWeTake = values[i - 1] + results[i - 1][w - weights[i - 1]];
        let valueIfWeDoNotTake = results[i - 1][w];

        results[i][w] = Math.max(valueIfWeTake, valueIfWeDoNotTake);
      }
    }
  }

  return results[n][capacity];
}

if (require.main === module) {
  console.log('Running sanity checks:');
  console.log(knapsack01(3, 10, [2, 4, 5], [200, 100, 50]));
  console.log(knapsack01BottomUp(3, 10, [2, 4, 5], [200, 100, 50]));
  // Add some sanity checks here
}

module.exports = knapsack01;
