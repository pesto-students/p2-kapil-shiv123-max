const hasDuplicate = (arr) => {
  const dupliSet = new Set(arr);
  console.log("Array :", arr);
  console.log(dupliSet);
  return dupliSet.size !== arr.length;
};

console.log(hasDuplicate([1, 1, 2, 4, 6, 6])); // returns true
console.log(hasDuplicate([1, 2, 4, 6])); // returns false
