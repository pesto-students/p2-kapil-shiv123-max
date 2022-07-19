// Array Solution
// Time Complexity - O(n), Space Complexity - O(n)
function townJudge(n, trust) {
  // make a trustedArray which will keep count of which person is trusted by how many people.
  const trustedArray = new Array(n + 1).fill(0);

  // we iterate over the trusted array and if i trusts j then we decrement i's count as he cannot be the judge
  // and incerement j's count as he is trusted by j.
  for (let [i, j] of trust) {
    trustedArray[i] -= 1;
    trustedArray[j] += 1;
  }

  // at last, we traverse the array and check if any i has n-1 people who trusts him, if yes we return thet person.
  for (let i = 1; i < trustedArray.length; i++) {
    if (n - 1 === trustedArray[i]) {
      return i;
    }
  }

  // if not returned till now, there is no town judge, we return -1.
  return -1;
}

// Directed Graph Solution
// Time Complexity - O(n), Space Compleixty - O(n)
function townJudgeGraph(n, trust) {
  // we take 2 arrays to maintain indegree and outdegree for each person
  let inDegree = new Array(n + 1).fill(0);
  let outDegree = new Array(n + 1).fill(0);

  // we iterate over the trust array and incerement outdegree of giver and indegree of receiver
  for (let [giver, receiver] of trust) {
    outDegree[giver]++;
    inDegree[receiver]++;
  }

  /* then, we iterate over the array, and check if indegree of any i is n-1 and outdegree is 0
    This is based on theory that town judge is trusted by everybody that is indegree is n-1 and 
    he does't trust anybody i.e. outdegree is 0.
  */
  for (let i = 1; i <= n; i++) {
    if (inDegree[i] === n - 1 && outDegree[i] === 0) {
      return i;
    }
  }

  // if there is no such i, we return -1.
  return -1;
}

console.log(
  townJudge(3, [
    [1, 3],
    [2, 3],
  ])
); // 3

console.log(
  townJudgeGraph(3, [
    [1, 3],
    [2, 3],
  ])
); // 3

console.log(
  townJudge(3, [
    [1, 3],
    [2, 3],
    [3, 1],
  ])
); // -1

console.log(
  townJudgeGraph(3, [
    [1, 3],
    [2, 3],
    [3, 1],
  ])
); // -1
