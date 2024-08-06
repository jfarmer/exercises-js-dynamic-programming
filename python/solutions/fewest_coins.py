from functools import lru_cache

@lru_cache
def fewest_coins(coins, total):
    if (total <= 0):
        return 0

    overall_min = float('inf')

    for coin in coins:
        overall_min = min(overall_min, 1 + fewest_coins(coins, total - coin))

    return overall_min

print(fewest_coins((5,10,15), 40))
