var score = 0;
var difficulty = 'normal';
var allEnemies = [];
var enemies = 0;
var enimyPosition = {};

function gameScore(){
    var getScore = $('#score');
    getScore.children().remove();
    getScore.append('<td>Score: </td>');
    getScore.append('<td>'+score+'</td>');
}

//console.log(score);
// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x =x;
    this.y =y;
    this.width= 50;
    this.height = 50;
    this.speed = speed;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >600){

        this.x = -101;
        this.x += this.speed *dt;
        //console.log("My bug position is " + this.x );

    } else {
        this.x += this.speed *dt +1;
        //console.log(" ELSE My bug position is " + this.x );
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.character = 'boy';
    this.sprite = this.setCharacter('boy');
    this.x = x || 200;
    this.y = y || 400;
    this.width =50;
    this.height =50;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
    var allEnemiesLength = allEnemies.length;
    if ( this.y < 10){
        this.x =200;
        this.y = 400;
        //console.log("You touched the water");
        score +=1;
        gameScore();
    }

    for (var i = 0; i < allEnemiesLength; i++) {
        var enemy = allEnemies[i];
        if (this.x < enemy.x + enemy.width && this.x + this.width > enemy.x && this.y < enemy.y + enemy.height && this.height + this.y > enemy.y) {
            //console.log("bang");
            this.x =200;
            this.y = 400;
        }
    }
};

Player.prototype.handleInput = function(key) {
    if ( key ==='right' && this.x < 400) {
        this.x +=100;
        //console.log("current player X position is " + this.x);
    }

    if (key ==='left'&& this.x > 10) {
        this.x -= 100;
        //console.log("current player X position is " + this.x);
    }

    if ( key === 'up' && this.y > 10) {
        this.y -= 85;
        //console.log("up - current player Y position is " + this.y);
    }

    if ( key === 'down' && this.y < 400) {
        this.y += 85;
        //console.log("down - current player down Y position is " + this.y);
    }
};

Player.prototype.setCharacter = function (character){
    //console.log('Characted chosed: '+character);

    var selectedChar ="";

    if (character === undefined || character === '' || character === null){
        character = 'pink-girl';
    }
    //console.log('Characted chosed after checked: '+character);

    switch (character){
        case "boy":
            selectedChar = 'images/char-boy.png';
            break;
        case "cat-girl":
            selectedChar = 'images/char-cat-girl.png';
            break;
        case "horn-girl":
            selectedChar = 'images/char-horn-girl.png';
            break;
        case "pink-girl":
            selectedChar = 'images/char-pink-girl.png';
            break;
        case "princess-girl":
            selectedChar = 'images/char-princess-girl.png';
            break;
    }
    return selectedChar;
}

Player.prototype.updateChar = function (){
    var char = ($('#select-character').val() );

    //console.log(player.character);
    player.sprite = player.setCharacter(char);
    //console.log($('#select-character').val() );
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

/* Set difficulty of the game, for each difficulty the number of enemies will be increased.
 * difficulty available:
 * easy: 2 enemies.
 * normal: 3 enemies.
 * hard: 6 enemies.
 * insane: 8 enemies.
*/
function setDiffilculty(defficulty) {
    var enemies = 0;

    if (defficulty === 'easy') {
        enemies = 2;
    } else if (defficulty === 'normal') {
        enemies = 3;
    } else if (defficulty === 'hard') {
        enemies = 6;
    } else if (defficulty === 'insane') {
        enemies = 8;
    }
    return enemies;
}

function updateEnemies(){

    var updateDif = $('#select-difficulty').val();
    //console.log("Update Difficulty: "+updateDif);
    difficulty = updateDif;

    enemies = setDiffilculty( difficulty );
    allEnemies = [];

    for(var i = 1; i <= enemies; i++){

        var speed = Math.floor(Math.random() * (500 - 100)) + 100;

        if ( i % 3 === 1){
            // first line with the bug
            enimyPosition[i] = 60;
        }else if( i % 3 === 2 ){
            // second line with the bug
            enimyPosition[i] = 140;
        }else if (i % 3 === 0){
            // third line with the bug
            enimyPosition[i] = 220;
        }

        //console.log(speed);
        //console.log('position: '+enimyPosition[i]);
        allEnemies.push(new Enemy(-100,enimyPosition[i],speed));
    }
}

var player = new Player();

updateEnemies();
gameScore();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

$('#select-character').on('mouseleave  click',player.updateChar);
$('#select-difficulty').on('mouseleave  click',updateEnemies);