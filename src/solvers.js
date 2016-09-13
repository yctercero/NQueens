window.findNRooksSolution = function(n) {
  var newBoard = new Board({n: n});

  for (var rows = 0; rows < n; rows++) {
    for (var cols = 0; cols < n; cols++) {

      newBoard.togglePiece(rows, cols);

      if( newBoard.hasRowConflictAt(rows) || newBoard.hasColConflictAt(cols)){
        newBoard.togglePiece(rows, cols);
      }
    }
  }

  var solution =  newBoard.rows();

  return solution;
};




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
