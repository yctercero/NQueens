(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },

    hasRowConflictAt: function(rowIndex) {
      var counter = 0;
      var row = this.rows()[rowIndex];
      for (var i=0; i<row.length; i++) {
        if (row[i]) {
          counter++;
        }
      }
      if (counter > 1) {
        return true;
      }
      return false;

    },

    hasAnyRowConflicts: function() {
      for (var i = 0; i < this.get("n"); i++) {
        if( this.hasRowConflictAt(i) ){
          return true;
        }
      }

      return false;
    },

    hasColConflictAt: function(colIndex) {
      var nValue = this.get('n');
      var counter = 0;

      for (var i=0; i<nValue; i++) {
        if (this.rows()[i][colIndex] === 1) {
          counter++;
          if (counter > 1) {
            return true;
          }
        }
      }
      return false; 
    },

    hasAnyColConflicts: function() {
      var nValue = this.get('n');
      for (var i = 0; i < nValue; i++) {
        if( this.hasColConflictAt(i)){
          return true;
        }
      }

      return false; 
    },


    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var counter = 0;
      var major = majorDiagonalColumnIndexAtFirstRow;

      for (var i = 0; i < this.get("n"); i++) {
        var cellValue = this.rows()[i][major];
        if(cellValue === 1){
          counter++;
        }
        major++;
      }

      return counter > 1;
    },

    hasAnyMajorDiagonalConflicts: function() {
      var nValue = this.get('n');

      for (var i = (-nValue+1); i < nValue; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },


    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var counter = 0;
      var minor = minorDiagonalColumnIndexAtFirstRow;
      var nValue = this.get('n');

      for (var i=0; i<nValue; i++) {
        if (this.rows()[i][minor] === 1) {
          counter++;
        }
        minor--;
      }
      return counter > 1;
    },

    hasAnyMinorDiagonalConflicts: function() {
      var nValue = this.get('n');

      for (var i = nValue * 2 - 2; i >= 0; i--) {
        if(this.hasMinorDiagonalConflictAt(i)){
          return true;
        }
      }
      return false;
    }
  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
