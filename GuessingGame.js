var Game = function(){
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
}

function generateWinningNumber(){
    return Math.floor(Math.random()*100 + 1);
}

function newGame(){
    return new Game();
}

Game.prototype.difference = function(){
    return Math.abs(this.playersGuess-this.winningNumber);
}

Game.prototype.isLower = function(){
    if(this.playersGuess<this.winningNumber){
        return true;
    } else {
        return false;
    }
}

Game.prototype.playersGuessSubmission = function(guess){
    if(guess < 1 || guess > 100 || !Number.isInteger(guess)){
        $('#subtitle').text("That is an invalid guess. Please try again.");
        throw("That is an invalid guess. Please try again.");
    } else {
        this.playersGuess = guess;
        return this.checkGuess();
    }
}

Game.prototype.checkGuess = function(){
        if(this.playersGuess === this.winningNumber){
            $('#hint, #submit').prop("disabled",true);
            $('#subtitle').text("Press the Reset button to play again!");
            return 'You Win!';
        } else {
            if(this.pastGuesses.indexOf(this.playersGuess)>-1){
            return 'You have already guessed that number.';
        } else {
            this.pastGuesses.push(this.playersGuess);
            $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);
            if(this.pastGuesses.length === 5) {
                $('#hint, #submit').prop("disabled",true);
                $('#subtitle').text("Press the Reset button to play again!");
                return 'You Lose.';
            } else {
                if(this.isLower()) {
                    $('#subtitle').text("Guess Higher!")
                } else {
                    $('#subtitle').text("Guess Lower!")
                }
                if(Math.abs(this.playersGuess-this.winningNumber)<10){
                    return 'You\'re burning up!';
                } else if(Math.abs(this.playersGuess-this.winningNumber)<25){
                    return 'You\'re lukewarm.';
                } else if(Math.abs(this.playersGuess-this.winningNumber)<50){
                    return 'You\'re a bit chilly.';
                } else {
                    return 'You\'re ice cold!';
                }
            }
        }
    }
}

Game.prototype.provideHint = function(){
    var hint = [];
    hint.push(this.winningNumber, generateWinningNumber() ,generateWinningNumber());
    return shuffle(hint);
}

function shuffle(array){
    var length = array.length;
    while(length){
      var remainingElement = Math.floor(Math.random() * length--);
      var currentElement = array[length];
      array[length] = array[remainingElement];
      array[remainingElement] = currentElement;
    }
    return array;
  }
  
function makeAGuess(game) {
    var guess = $('#player-input').val();
    $('#player-input').val("");
    var output = game.playersGuessSubmission(parseInt(guess,10));
    $('#title').text(output);
}

$(document).ready(function() {
    var game = new Game();

    $('#submit').click(function(e) {
       makeAGuess(game);
    })

    $('#player-input').keypress(function(event) {
        if ( event.which == 13 ) {
           makeAGuess(game);
        }
    })

$('#hint').click(function() {
    var hints = game.provideHint();
    $('#title').text('The winning number is '+hints[0]+', '+hints[1]+', or '+hints[2]);
});

$('#reset').click(function() {
    game = newGame();
    $('#title').text('Play the Guessing Game');
    $('#subtitle').text('Guess a number between 1-100.')
    $('.guess').text('-');
    $('#hint, #submit').prop("disabled",false);
    
    })
})
