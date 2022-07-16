function binarySearch(arr, start, end, target) {
  let mid = Math.floor((start + end) / 2);

  while (start <= end) {
    if (arr[mid] === target) {
      return true;
    } else if (arr[mid] > target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
    mid = Math.floor((start + end) / 2);
  }

  return false;
}

// Time Complexity - O(nlogn)
function findPairWithDifference(arr, target) {
  arr.sort(function (lhs, rhs) {
    return lhs - rhs;
  });

  for (let i = 0; i < arr.length; i++) {
    let firstValue = arr[i];
    let secondValue = target + firstValue;
    let ans = binarySearch(arr, i + 1, arr.length - 1, secondValue);
    if (ans === true) {
      console.log("The Pair is:", firstValue, secondValue);
      return 1;
    }
  }

  console.log("Pair not found");
  return 0;
}

findPairWithDifference([5, 20, 3, 2, 50, 80], 78);
findPairWithDifference([90, 70, 20, 80, 50], 45);

//Using hashmaps - Time Complexity - O(n) - Space Complexity - O(n)
function findPairWithDifferenceMaps(arr, target) {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    map.set(arr[i], i);
  }

  for (let i = 0; i < arr.length; i++) {
    let value = map.get(arr[i] + target);
    if (value !== undefined) {
      console.log("The Pair is:", arr[i], arr[i] + target);
      return 1;
    }
  }

  console.log("Pair not found");
  return 0;
}

findPairWithDifferenceMaps([5, 20, 3, 2, 50, 80], 78);
findPairWithDifferenceMaps([90, 70, 20, 80, 50], 45);
