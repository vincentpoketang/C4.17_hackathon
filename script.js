var row = 6; // takes input from character select page and sets row amount
var col = row+1; // sets column amount based on row amount
var how_many_player = 3; //update this variable based on landing page selection
var board = []; // initializes empty array for game board
var current_player = 1; // can be player 1, 2, or 3
var player_img_class = {}; // object that contains 3 properties with class names we will use to determine coin types
var character_map ={
    mario: 'mario_hover',
    yoshi: 'yoshi_hover',
    pikachu: 'pikachu_hover',
    peach: 'peach_hover',
    samus: 'samus_hover',
    kirby: 'kirby_hover'
};
var level_selected = "";
// function for game board page
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
            div = $('<div>').addClass("row_"+x); // adding a class of "row_x" to a new div each time
            div = div.addClass('col_'+y); // add additional class of "col_y" to the same div
            $('.container').append(div); // append the new div to container
        }
        $('.container').append('<br>'); // create a line break to give to start a new row
    }
}
function hover(){ // when we hover over something, we add a class that takes the current_player number,
    $(this).addClass(character_map[player_img_class[current_player]]);  // then uses that number to select a property in the player_img_class object, and then returns it's value
}
function not_hover(){ // when we mouseaway from a div we remove the class we added on hover
    $(this).removeClass(character_map[player_img_class[current_player]]);
}
function click_coin(){
    var col_number_class = $(this).attr('class').split(' ')[0]; // selecting a div, taking it's classes (ex. col_0, top_row),
    // converting them into separate strings based on space separation, pushing those values into an array, and then grabbing the value of the first item in the array
    var col_number = col_number_class[col_number_class.length-1]; // creating a variable and setting it to the value of the col_number_class at index [length of the string -1]
    for(var i = row-1; i >= 0; i--){ // use this for loop to check if divs in column are equal to zero starting at the index 5 of board
        if(board[i][col_number]===0){ // on first loop, check if board index 5 at column 0 is equal to value 0 (meaning if it's empty)
            $(this).removeClass(character_map[player_img_class[current_player]]); // if it is empty, we remove the class for the image,
            board[i][col_number] = current_player; // if the div selected is equal to 0 (empty), set the value to the current player
            var div_id_string = "."+ col_number_class + ".row_"+i; // creating a div id string, first case = ".col_0.row_5"
            $(div_id_string).addClass(character_map[player_img_class[current_player]]); // We are searching for an item with class col_0 and row_5 and adding the kirby class
            win_check(i,col_number); // calling win check with parameter 5, and 0
            toggle_player(); // Calling toggle player function
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
    var coin_counter = 0; // coin counter checks to see if we have 4 coins in a row
    for(var y = 0; y < col; y++){  // y represents column number
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
function vertical_check(col_number){ // checks from top to bottom for 4 in a row
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
    return false; // returns false if condition is never met (returned true)
}
function left_diagonal_check(row_number,col_number){ // checking diagonals from left to right, top to bottom for 4 in a row
    var coin_counter = 0;
    var start_row_number = row_number;
    var start_col_number = col_number;
    while(start_row_number !== 0 && start_col_number !== 0){ // while loop we are going to move to a position where
        start_row_number--; // we would be able to perform our check from top to bottom, right to left
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
function hide_div(hide,remove){
    $(hide).addClass('hidden');
    $(remove).removeClass('hidden');
}
// function for home page
function set_player(){
    if($(this).attr('class')==='home_button_2'){
        how_many_player = 2;
    }
    else{
        how_many_player = 3;
    }
    hide_div('#home','#character_select');
}
//function for character select page
function select_player(){
    if(player_img_class[1]===undefined){
        player_img_class[1]=$(this).attr('id');
    }
    else if(player_img_class[2]===undefined){
        player_img_class[2]=$(this).attr('id');
        if(how_many_player===2){
            hide_div('#character_select','#level_select');
        }
    }
    else if(player_img_class[3]===undefined){
        player_img_class[3]=$(this).attr('id');
        hide_div('#character_select','#level_select');
    }

}
// function for level select

function select_level(){
    level_selected = $(this).attr("id");
    hide_div("#level_select", "#game_page");
    initialize();
    $('.top_row').click(click_coin).mouseover(hover).mouseout(not_hover);
}

function toggle_background(){
    var background_img = "url('images/" + $(this).attr("id") + ".jpg')";
    $('body').css("background", background_img);
}


$(document).ready(function(){
    $('.home_button_2').click(set_player);
    $('.home_button_3').click(set_player);
    $('.character').click(select_player);
    $('.ls_level').click(select_level).mouseover(toggle_background);
    //initialize();
});