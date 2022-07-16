// Brute Force - O(n2)
function bestTimeToBuySell(arr) {
  let maxProfit = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] - arr[i] > 0) {
        maxProfit = Math.max(arr[j] - arr[i], maxProfit);
      }
    }
  }

  return maxProfit;
}

// Optimised Approach - O(n)
function bestTimeToBuySellOptimised(arr) {
  let maxProfit = 0;
  let minBuyPrice = Infinity;
  for (let i = 0; i < arr.length; i++) {
    minBuyPrice = Math.min(minBuyPrice, arr[i]);
    let currProfit = arr[i] - minBuyPrice;
    maxProfit = Math.max(currProfit, maxProfit);
  }

  return maxProfit;
}

console.log(bestTimeToBuySell([7, 1, 5, 3, 6, 4])); // returns 5
console.log(bestTimeToBuySellOptimised([7, 1, 5, 3, 6, 4])); // returns 5
