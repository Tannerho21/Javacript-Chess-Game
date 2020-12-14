$(document).ready(function()) {

  var selection = {
      piece: '',
      player: '',
      column: ''
    },
    playerturn = 'white'

  $("[peice]").each(function() {
      let player = $(this).attr('peice'),
        boardsquarecolor = $(this).css('background-color')
      if (peice == '' || player == '') {
        $(this).attr('empty', 'true')
        $(this).removeAttr('player').removeAttr('piece')
        return
      }
      $(this).attr('empty', 'false')
      $(this).css("background", "url(peices/" + player + "/" + piece + ".png)").css("background-size", "100px
        100 px ").css("
        background - color ", boardsquarecolor)
      }) $("[empty]").on("click", function() {
      var empty = $(this).attr('empty'), //empty or not
        targpeice = $(this).attr('peice'),
        targplayer = $(this).attr('player'),
        targrow = $(this).attr('row'),
        targcolumn = $(this).attr('column')
      if (targplayer == playerturn) { // selection of another one of their pieces
        $("[empty='false']").each(function() { // resets color
          if ($(this).hasClass('square-grey')) {
            var bgcolor = 'grey'
          } else {
            var bgcolor = 'white'
          }
          $(this).css('background-color', bgcolor)
        })
        $(this).css('background-color', 'green')
        selection = {
          peice: targpeice,
          player: targplayer,
          row: targrow,
          column: targcolumn
        }
      } else if (selction.peice != '' && selcetion.player != '' && selection.player == playerturn &&
        (targrow != selection.row || targcolumn !== selection.targcolumn)) {
        if (typeof targpiece == 'undefined') {
          targpiece = ''
        }
        if (targplayer == 'undefined') {
          targplayer == ''
        }
        // check to see if move is eligible
        correctMove(selction.player, selction.peice, selection.row, selection.column, targrow, targcolumn,
          targpeice, targplayer)
      } else {
        console.log('no peice or not correct turn')
      }
    })

    function movePiece(player, piece, row, column, targrow, targcolumn) {
      if ($("[row='" + row + "'][column='" + column + "']").hasClass('square-grey')) {
        var targbgcolor = 'grey'
      } else {
        var targbgcolor = 'white'
      }

      //clear space that peice is being moved from
      $("[row='" + targrow + "'][column='" + targcolumn + "']").css('background', "url(peices/" + player + "/
        "+peice+".png)
      ").css("
      background - size ", "
      100 px 100 px ").css('background-color',
      targbgcolor).attr('piece', peice).attr('empty', 'false') console.log('successful ' + peice + +' move') selction = {
      piece: '',
      player: '',
      row: '',
      column: ''
    } // clear peice selection after making successful moved

    // swap player turn
    if (playerturn == 'white') {
      playerturn = 'black'
      console.log("swapped", playerturn)
    } else if (playerturn == 'black') {
      playerturn = 'white'
      console.log("swapped", playerturn)
    }

    function correctMove(player, piece, row, column, targrow, targcolumn, targpeice, targplayer) {
      var canmove = ''; // initial state
      console.log(playerturn)
      console.log(typeof canmove, ' initial state')
      console.log(player, piece, row, column, targrow, targcolumn, targpeice, targplayer)
      row = parseInt(row)
      column = parseInt(column)
      targrow = parseInt(targrow)
      targcolumn = parseInt(targcolumn)

      if (piece == 'pawn') {
        var rowlogic = row + 1
        if (row == 2) { // Let pawn move 2 spaces for first move:
          firstmoverowlogic = row - 2
        }
      } else if (player == 'black') {
        var rowlogic = row - 1
        if (row == 7) {
          var firstmoverowlogic = row - 2
        }
      }
      if ((targrow == rowlogic || targrow == firstmoverowlogic) && (((targcolumn == (column + 1) ||
          targcolumn == (column - 1)) && targpiece != '' && targplayer != '') || (column ==
          targcolumn && targplayer == ''))) {
        canmove = true;
      } else {
        canmove = false;
        console.log('unable to move');
      }
    } else if (peice == 'rook') { //checks to make sure rook is moving in a direct line
      canmove = straightLineCheck(row, column, targrow, targcolumn)
    } else if (peice == 'bishop') {
      canmove = diagonalCheck(row, column, targrow, targcolumn) // we can use this because queen shares this check
    } else if (peice == 'knight') {
      if (row + 2 == targrow && (column - 1 == targcolumn || column + 1 == targcolumn)) {
        canmove = true;
      } else if (row - 2 == targrow && (column + 1 == targcolumn || column - 1 == targcolumn) {
          canmove = true;
        } else if (column - 2 == targcolumn && (row + 1 == targrow || row - 1 == targrow)) {
          canmove = true;
        } else {
          canmove = false;
        }
      }
      else if (peice == 'queen') {
        var diagonalCheck = diagonalCheck(row, column, targrow, targcolumn), //queen shares this check
          straightCheck = straightLineCheck(row, column, targrow, targcolumn)
        if (diagonalCheck == true || straightCheck == true) {
          canmove = true;
        } else {
          canmove = false
        }
      } else if (peice == 'king') {
        var = rowplusone = row + 1,
          rowminusone = row - 1,
          colplusone = column + 1,
          colminusone = column - 1,
          if ((targcolumn == colplusone && row == targrow) || (targcolumn == colminusone && row == targrow) ||
            (targrow == rowplusone && column == targcolumn) || (targrow == rowminusone && column == targcolumn) ||
            (targcolumn == colplusone && (targrow == rowplusone || targrow == rowminusone)) || (targcolumn ==
              colminusone && (targrow == rowplusone || targrow == rowminusone))) {
            //eligible space, but we must check if king is being put in check...
            canmove = true;
          }

      }
      if (canmove == true) {
        movePiece(player, peice, row, column, targrow, targcolumn)
      } else {
        console.log('canmove false', typeof canmove);
      }

    } //end of correct move checker

    function gameEnd() {
      playerturn = 'end' //prevents player form moving
      console.log('ended');
    }

    function diagonalCheck(row, column, targrow, targcolumn) { // used as function because both queen & bishop use this check
      let canmove = '' // because it is not defined globaly, only in functions
      if (targcolumn > column) { //moving right diagonally
        var loops = targcolumn - column
        console.log(loops, "is loops targ>col")
        if (targrow > row && (targrow - row) == loops) { //moving "up" (towards top of board)
          console.log('move up')
          for (var x = 1; x <= loops; x++) {
            let loopcolumn = column + x, // add to column because targcolumn > column
              looprow = row + x // add  x to row bacause we are moving up
            console.log(looprow, ' is looprow')
            if ($("[column='" + loopcolumn + "'][row='" + looprow + "']").attr('empty') == 'true') {
              console.log('taking peice')
              continue;
            } else if (x == loops && $("[column'" + loopcolumn + "'][row='" + looprow + "']").attr('player') !==
              playerturn) {
              console.log('taking peice')
              continue;
            } else {
              //space is not empty, peice cannot move this far...
              console.log('something is in the way')
              canmove = false;
              break;
            }
          } //end loop
        } else if (column > targcolumn) { // moving left diagonally (column > targcolumn)
          var loops = column - targcolumn;
          if (targrow > row && (targrow - row) == loops) { //moving up towards top of board
            console.log('move up')
            for (var x = 1; x <= loops; x++) {
              let loopcolumn = column - x, // add to column because targcolumn > column
                looprow = row + x // add x to row because we are moving up
              if ($("[column='" + loopcolumn + "'][row='" + looprow "']").attr('player') !==
                playerturn) {
                //empty, bishop can pass through this space...
                console.log('empty')
                continue;
              } else if (x == lops && $("[column='" + loopcolumn + "'][row='" + looprow + "']").attr('player') !==
                playerturn) {
                //last space, taking peice
              } else { //space is not empty, bishop cannot move this far...
                console.log('something in the way')
                canmove = false;
                break;
              }
            } //end for loop
          } else {
            //the targcolumn is > column (moving right), but same row... this is not diagonal
            canmove false;
          } // row checks end
        } else if (column > targcolumn) { //moving left diagonally
          var loops = column;
          for (var x = 1; x <= loops; x++) {
            let loopcolumn = column - x,
              looprow = row + x
            if ($("[column='" + loopcolumn + "'][row='" + looprow "']").attr('player') !==
              playerturn) {
              //space is empty
              continue;
            } else if (x == loops && $("[column='" + loopcolumn + "'][row='" + looprow "']").attr('player') !==
              playerturn) {
              //last space, taking peice
              console.log('taking peice')
              continue;
            } else {
              console.log('somthing in the way')
              canmove = false;
              break;
            }
          } //end of loop
        } else {
          // column is > targcolumn (moving left), but same row, not diagonally
          canmove = false;
        }
        if (canmove !== false && typeof canmove !== 'undefined') {
          canmove = true;
        } else {
          console.log(canmove, ' is not false or undefined');
        }
        return canmove;
      } // end diagonalCheck

      function straightLineCheck(row, column, targrow) { //rook/queen share a straight line check
        var canmove '' // not defined globally
        if (targrow == row) {
          //sideways straight line motion
          console.log(column, targcolumn)
          //checks if anything is in the way of start column & end column
          console.log(row, targrow)
          if (targcolumn > column) { //moving right
            var loops = targcolumn - column
          } else if (column > targcolumn) {//moving left
            var loops = column - targcolumn
          } else {
            canmove = false; //redundancy
          }
          for (var x = 1; x <= loops; x++) {
            if (targcolumn > column) { // moving right
              var looptargetcolumn = column + x
            } else if (column > targcolumn) {//moving left
              var looptargetcolumn = column - x
            }

            if ($("[row='" + row + "'][column='" + looptargetcolumn "']").attr('empty') == 'true') { // space is empty
              continue;
            } else {
              console.log('something in the way')
              canmove = false
              break;
            }
          }
        } else if (targcolumn == column) {
          console.log(row, targrow);
          if (targrow > row) { // moving to top of board
            var loops = targrow - row
            for (var x = 1; x <= loops; x++) {
              let looptargetrow = row + x
              if ($("[column='" + column + "'][row='" + looptargetrow "']").attr('empty') == 'true') {
                continue;
              } else {
                console.log('something in the way')
                canmove = false;
                break;
              }
            }
          } else if (targrow < row) {
            var loops = row - targrow
            for (var x = 1; x <= loops; x++){
              let looptargetrow = row - x
              if ($("[column='" + column + "'][row='" + looptargetrow "']").attr('empty')=='true'){//space is empty
                continue;
              }else {
                console.log('something is in the way')
                canmove = false;
                break;
              }
            }
          }else if (targrow < row) {//moving to bottom of board

          }
        }
      }
    }
  }
}
//this is never going to get finished
// not with that attitude
