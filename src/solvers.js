/*

             _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  // create new board of n size
  var newBoard = new Board({n: n});

  // iterate through the rows
  for (var rows = 0; rows < n; rows++) {
    for (var cols = 0; cols < n; cols++) {

      newBoard.togglePiece(rows, cols);

      if( newBoard.hasRowConflictAt(rows) || newBoard.hasColConflictAt(cols)){
        newBoard.togglePiece(rows, cols);
      }
    }
  }

  var solution =  newBoard.rows();

  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};




// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var newBoard = new Board({n: n});

  var recurse = function(board, row){
    if( row === n ){
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if( !board.hasAnyRooksConflicts() ){
        if( recurse(board, row + 1) ){
          return recurse(board, row + 1);
        }
      }
      board.togglePiece(row, i);
    };
  };
  recurse(newBoard, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {


  var newBoard = new Board({n: n});
  var first = true;

  var recurse = function(board, row){
    if( row === n ){
      first = false;
      return newBoard.rows();
    }

    for (var i = 0; i < n && first; i++) {
      board.togglePiece(row, i);
      if( !board.hasAnyQueensConflicts() ){

        if( recurse(board, row + 1) ){
          return recurse(board, row + 1);
        }
      }

      if( first ){
        board.togglePiece(row, i);
      }
    };
  };
  recurse(newBoard, 0);

  console.log('Single solution for ' + n + ' queens:', newBoard.rows());
  return newBoard.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var newBoard = new Board({n: n});

  var recurse = function(board, row){
    if( row === n ){
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if( !board.hasAnyQueensConflicts() ){
        if( recurse(board, row + 1) ){
          return recurse(board, row + 1);
        }
      }
      board.togglePiece(row, i);
    };
  };
  recurse(newBoard, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
