// Two Pass Solution - Time Complexity - O(n)
function sortZerosOnesTwos(arr) {
  let zeroCount = 0;
  let oneCount = 0;
  let twoCount = 0;

  for (let el of arr) {
    if (el === 0) {
      zeroCount++;
    } else if (el === 1) {
      oneCount++;
    } else {
      twoCount++;
    }
  }

  let arrayIndex = 0;
  while (zeroCount--) {
    arr[arrayIndex++] = 0;
  }
  while (oneCount--) {
    arr[arrayIndex++] = 1;
  }
  while (twoCount--) {
    arr[arrayIndex++] = 2;
  }

  return arr;
}

//One Pass Solution - Time Complexity - O(n)
function sortZerosOnesTwosOnePass(arr) {
  let low = 0;
  let mid = 0;
  let high = arr.length - 1;
  let temp = 0;

  while (mid <= high) {
    if (arr[mid] === 0) {
      temp = arr[mid];
      arr[mid] = arr[low];
      arr[low] = temp;
      low++;
      mid++;
    } else if (arr[mid] === 1) {
      mid++;
    } else {
      temp = arr[mid];
      arr[mid] = arr[high];
      arr[high] = temp;
      high--;
    }
  }

  return arr;
}

console.log(sortZerosOnesTwos([0, 2, 1, 2, 1, 2, 0]));
console.log(sortZerosOnesTwosOnePass([0, 2, 1, 2, 1, 2, 0]));
