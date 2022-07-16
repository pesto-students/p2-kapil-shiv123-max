function spiralOrderMatrix(matrix) {
  let row = matrix.length;
  let col = matrix[0].length;

  let answer = [];
  let rowStart = 0;
  let colStart = 0;
  let rowEnd = row - 1;
  let colEnd = col - 1;
  let total = row * col;
  let count = 0;

  while (count < total) {
    for (let i = colStart; count < total && i <= colEnd; i++) {
      answer.push(matrix[rowStart][i]);
      count++;
    }
    rowStart++;

    for (let i = rowStart; count < total && i <= rowEnd; i++) {
      answer.push(matrix[i][colEnd]);
      count++;
    }
    colEnd--;

    for (let i = colEnd; count < total && i >= colStart; i--) {
      answer.push(matrix[rowEnd][i]);
      count++;
    }
    rowEnd--;

    for (let i = rowEnd; count < total && i >= rowStart; i--) {
      answer.push(matrix[i][colStart]);
      count++;
    }
    colStart++;
  }
  return answer;
}

console.log(
  spiralOrderMatrix([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
);
