// Time Complexity - O(n2logn) -- (including sorting)
function threeSumClosest(nums, target) {
  nums.sort(function (lhs, rhs) {
    return lhs - rhs;
  });
  let closestSum = Infinity;
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right];
      if (Math.abs(sum - target) < Math.abs(closestSum - target)) {
        closestSum = sum;
      }
      if (sum > target) {
        right--;
      } else {
        left++;
      }
    }
  }

  return closestSum;
}

console.log(threeSumClosest([-1, 2, 1, -4], 1)); // output is 2
