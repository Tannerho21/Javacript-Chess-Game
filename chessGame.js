$(document).ready(function()){

    var selectiom = {peice:'', player:'', column:''},
    playerturn = 'white'

    $("[peice]").each(function(){
      let player = $(this).attr('peice'),
      boardsquarecolor = $(this).css('background-color')
      if(peice == '' || player == ''){
        $(this).attr('empty', 'true')
        $(this).removeAttr('player').removeAttr('piece')
        return
      }
        $(this).attr('empty', 'false')
          $(this).css("background", "url(peices/"+player+"/"+piece+".png)").css("background-size", "100px
          100px").css("background-color", boardsquarecolor)
    })
    $("[empty]").on("click", function(){
      var empty = $(this).attr('empty'), //empty or not
      targpeice = $(this).attr('peice'),
      targplayer = $(this).attr('player'),
      targrow = $(this).attr('row'),
      targcolumn = $(this).attr('column')
      if(targplayer == playerturn){ // selection of another one of their pieces
        $("[empty='false']").each(function(){ // resets color
          if($(this).hasClass('square-grey')){
            var bgcolor = 'grey'
          }else{
             var bgcolor = 'white'
          }
          $(this).css('background-color', bgcolor)
        })
      }
    })
}
