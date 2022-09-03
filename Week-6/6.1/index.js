// Brute Force - Time Complexity - O(n2)
function maxSumSubarray(arr) {
  let maxSum = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    let currSum = 0;
    for (let j = i; j < arr.length; j++) {
      currSum += arr[j];
      maxSum = Math.max(currSum, maxSum);
    }
  }

  return maxSum;
}

// Optimised Approach - Using Kadane's Algorithm - Time Complexity - O(n)
function maxSumSubarrayKadane(arr) {
  let maxSum = -Infinity;
  let currSum = 0;
  for (let i = 0; i < arr.length; i++) {
    currSum += arr[i];
    maxSum = Math.max(currSum, maxSum);
    if (currSum < 0) {
      currSum = 0;
    }
  }

  return maxSum;
}

console.log(maxSumSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // returns 6
console.log(maxSumSubarrayKadane([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // returns 6
