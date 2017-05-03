/**
 * Created by regis on 5/2/17.
 */
var row = 6; // takes input from character select page and sets row amount
var col = row+1; // sets column amount based on row amount
var how_many_player = 3; //update this variable based landing page selection
var board = []; // initializes empty array for game board
var current_player = 1; // can be player 1, 2, or 3
var player_img_class = { // object that creates 3 key val
    1:"kirby_hover",
    2:"peach_hover",
    3:"mario_hover"
};

function initialize(){
    for(var y = 0; y < col; y++){ // create divs for hover area based on col variable (in this case 7)
        var div = $('<div>').addClass("col_"+y); // create a variable div = dom creation element with and "col_" + whatever y is - doing this to create divs in hover area with unique identifiers
        div = $(div).addClass("top_row"); // taking div from above, targeting the div, and adding a class top row so we can target specific columns and style them in css
        $('.container').append(div); // appends div to container element until loop condition is false
    }
    $('.container').append('<br>', '<br>'); // append two line breaks to give us space between hover area and board
    for (var x = 0; x < row; x++){ // start of for loop that creates rows based on user input on landing page
        board.push([]); // pushing an empty array into the board array - each empty array represents a new column and has index
        for(y = 0; y < col; y++){ // create a column and push into empty array in board array at index 0 (initially )
            board[x][y] = 0; // selecting the board array at [0] index and then the [0] index inside of the empty array
            console.log(board);
            div = $('<div>').addClass("row_"+x); // adding a class of "row_x" to a new div each time
            div = div.addClass('col_'+y); // add additional class of "col_y" to the same div
            $('.container').append(div); // append the new div to container
        }
        $('.container').append('<br>'); // create a line break to give to start a new row
    }
}
function hover(){
    $(this).addClass(player_img_class[current_player]);
}
function not_hover(){
    $(this).removeClass(player_img_class[current_player]);
}
function click_coin(){
    var col_number_class = $(this).attr('class').split(' ')[0];
    var col_number = col_number_class[col_number_class.length-1];
    for(var i = row-1; i >= 0; i--){
        if(board[i][col_number]===0){
            $(this).removeClass(player_img_class[current_player]);
            board[i][col_number] = current_player;
            var stuff = "."+ col_number_class + ".row_"+i; // .col_0.row_4
            $(stuff).addClass(player_img_class[current_player]);
            win_check(i,col_number);
            toggle_player();
            break;
        }
    }
}
function toggle_player(){
    if(current_player === how_many_player){
        current_player = 1;
    }
    else{
        current_player++;
    }
    return current_player;
}
function win_check(row_number, col_number){
    if(horizontal_check(row_number) || vertical_check(col_number) || left_diagonal_check(row_number,col_number) || right_diagonal_check(row_number,col_number)){
        console.log("win");
    }
}
function horizontal_check(row_number){
    var coin_counter = 0;
    for(var y = 0; y < col; y++){
        if(board[row_number][y] === current_player){
            coin_counter++;
            if(coin_counter >= 4){
                return true;
            }
        }
        else{
            coin_counter = 0;
        }
    }
    return false;
}
function vertical_check(col_number){
    var coin_counter = 0;
    for(var x = 0; x < row; x++){
        if(board[x][col_number] === current_player){
            coin_counter++;
            if(coin_counter >= 4){
                return true;
            }
        }
        else{
            coin_counter = 0;
        }
    }
    return false;
}
function left_diagonal_check(row_number,col_number){
    var coin_counter = 0;
    var start_row_number = row_number;
    var start_col_number = col_number;
    while(start_row_number !== 0 && start_col_number !== 0){
        start_row_number--;
        start_col_number--;
    }
    for(var x = start_row_number,y = start_col_number; x < row && y < col; x++, y++){
        if(board[x][y] === current_player){
            coin_counter++;
            if(coin_counter >= 4){
                return true;
            }
        }
        else{
            coin_counter = 0;
        }
    }
    return false;
}
function right_diagonal_check(row_number,col_number){
    var coin_counter = 0;
    var start_row_number = row_number;
    var start_col_number = col_number;
    while(start_row_number !== 0 && start_col_number !== col){
        start_row_number--;
        start_col_number++;
    }
    for(var x = start_row_number,y = start_col_number; x < row && y >= 0; x++, y--){
        if(board[x][y] === current_player){
            coin_counter++;
            if(coin_counter >= 4){
                return true;
            }
        }
        else{
            coin_counter = 0;
        }
    }
    return false;
}
$(document).ready(function(){
    initialize();
    $('.top_row').mouseover(hover).mouseout(not_hover).click(click_coin);
});