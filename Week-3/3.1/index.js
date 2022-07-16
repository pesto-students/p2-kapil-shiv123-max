// the memoize function used to store cache
function memoize(fn) {
  let cache = new Map(); // to store key value pair in map
  return function (...args) {
    const key = args.toString();
    console.log("fn called with", key);
    console.log("cached data:");
    console.log(cache);
    if (cache.get(key)) {
      return cache.get(key); //return value for corresponding key if it is already present
    }
    cache.set(key, fn(...args)); // set value for key if it was not present
    return cache.get(key);
  };
}

// addNumbers function which takes an unspecified number of inputs
function addNumbers(...args) {
  let sum = 0;
  for (let i of args) {
    sum = sum + i;
  }
  return sum;
}


const addM = memoize(addNumbers);

// a function that tells us how much time that function took to execute completely
function time(fn) {
  console.time();
  fn();
  console.timeEnd();
}

time(() => addM(100, 100)); // returns 200
time(() => addM(100)); // returns 100
time(() => addM(100, 200)); // returns 300
time(() => addM(100, 100)); //returns 200 in lesser time than first operation
