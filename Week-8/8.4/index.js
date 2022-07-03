// Time Complexity - O(E), Space Complexity - O(V+E)
function validPath(n, edges, start, end) {
  const adjList = new Map();

  /* 
    create our adjacency list, as it is a bidirectional graph we push a into
    adjacency list of b and vice versa.
  */
  edges.forEach(([a, b]) => {
    if (!adjList.has(a)) {
      adjList.set(a, []);
    }
    if (!adjList.has(b)) {
      adjList.set(b, []);
    }
    adjList.get(a).push(b);
    adjList.get(b).push(a);
  });

  //   console.log(adjList);

  // prevent revisiting nodes by making visited array
  const visited = new Array(n);
  const queue = [];
  queue.push(start);
  while (queue.length > 0) {
    const node = queue.shift();

    // if we reach the end node, it means a valid path exists, so we return true.
    if (node === end) {
      return true;
    }

    // mark the node which is being visited as true
    visited[node] = true;

    // we take all the neighbours of that node and if they are not visited, push them into the queue
    adjList.get(node).forEach((neighbor) => {
      if (!visited[neighbor]) {
        queue.push(neighbor);
      }
    });
  }

  // if not returned till now, there is no valid path and we return false
  return false;
}

console.log(
  validPath(
    3,
    [
      [0, 1],
      [1, 2],
      [2, 0],
    ],
    0,
    2
  )
); // true

console.log(
  validPath(
    6,
    [
      [0, 1],
      [0, 2],
      [3, 5],
      [5, 4],
      [4, 3],
    ],
    0,
    5
  )
); // false
