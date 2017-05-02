/**
 * Created by regis on 5/2/17.
 */
var row = 6;
var col = row+1;
var board = [];

function initialize(){
    for(var y = 0; y < col; y++){
        var div = $('<div>').addClass("top_row_"+y);

        $('.container').append(div);

    }
    $('.container').append('<br>','<br>');
    for (var x = 0; x < row; x++){
        board.push([]);
        for(var y = 0; y < col; y++){
            board[x][y] = 0;
            var div = $('<div>').addClass("row_"+x);
            div = div.addClass('col_'+y);
            $('.container').append(div);
        }
        $('.container').append('<br>');
    }
}

$(document).ready(function(){
    initialize();
});