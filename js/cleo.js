//  Widths and Heights
var GAME_WIDTH = 450;
var GAME_HEIGHT = 500;

var PLAYER_WIDTH = 50;
var PLAYER_HEIGHT = 100;

var ENEMY_WIDTH = 75;
var ENEMY_HEIGHT = 75;
var MAX_ENEMIES = 1;

var BOUFFE_WIDTH = 75;
var BOUFFE_HEIGHT = 100;


//  Start and Finish
var BARN_WIDTH = 450;
var BARN_HEIGHT = 125;
var PARADISE_WIDTH = 450;
var PARADISE_HEIGHT = 300;

var barnStart = false;
var paradiseStart = false;

var didPlayerWinGame = false;


//  Levels
var level0 = true;
var level1 = true;


//  Player Movement
var playerMoveLeft = false;
var playerMoveRight = false;

const MOVE_LEFT = 'left';
const MOVE_RIGHT = 'right';

var LEFT_ARROW_CODE = 37;
var RIGHT_ARROW_CODE = 39;


//  Preload game images
var images = {};
[
    "level.png", "barn.png", "paradise.png",

    "player.png",

    "bouffe-parachute.png",

    "boule-neige.png",

].forEach(imgName => {
    var img = document.createElement('img');
    img.src = 'images/' + imgName;
    images[imgName] = img;
});



// This section is where you will be doing most of your coding
class Player {
    constructor() {
        this.x = 4 * PLAYER_WIDTH;
        this.y = GAME_HEIGHT - PLAYER_HEIGHT - 5;
        this.sprite = images['player.png'];
        this.speed = 0.2;
    }

    // This method is called by the game engine when left/right arrows are pressed
    move(direction) {
        if (direction === MOVE_LEFT) {
            playerMoveLeft = true;
        }
        else if (direction === MOVE_RIGHT) {
            playerMoveRight = true;
        }
    }
    update(timeDiff) {
        this.x = this.x + timeDiff * this.speed;
    }

    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}
class Enemy {
    constructor(xPos) {
        this.x = xPos;
        this.y = -ENEMY_HEIGHT;
        this.sprite = images['boule-neige.png'];

        // Each enemy should have a different speed
        this.speed = Math.random() / 2 + 0.25;
    }

    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }

    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}

class Bouffe {
    constructor(xPos) {
        this.x = xPos;
        this.y = -ENEMY_HEIGHT;
        this.sprite = images['bouffe-parachute.png'];

        // Each enemy should have a different speed
        this.speed = 2 + 0.25;
    }

    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }

    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}


class Barn {
    constructor() {
        this.x = 0;
        this.y = GAME_HEIGHT - BARN_HEIGHT;
        this.sprite = images['barn.png'];
        this.speed = 0.05;
    }

    // This method is called by the game engine when left/right arrows are pressed

    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }

    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}
class Paradise {
    constructor() {
        this.x = 0;
        this.y = 0 - PARADISE_HEIGHT;
        this.sprite = images['paradise.png'];
        this.speed = 0.1;
    }

    // This method is called by the game engine when left/right arrows are pressed

    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }

    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}



/*
This section is a tiny game engine.
This engine will use your Enemy and Player classes to create the behavior of the game.
The engine will try to draw your game at 60 frames per second using the requestAnimationFrame function
*/
class Engine {
    constructor(element) {
        // Setup the player
        this.player = new Player();
        this.barn = new Barn();
        this.paradise = new Paradise();

        // Setup enemies, making sure there are always three
        this.setupEnemies();

        // Setup the <canvas> element where we will be drawing
        var canvas = document.createElement('canvas');
        canvas.width = GAME_WIDTH;
        canvas.height = GAME_HEIGHT;
        element.appendChild(canvas);

        this.ctx = canvas.getContext('2d');

        // Since gameLoop will be called out of context, bind it once here.
        this.gameLoop = this.gameLoop.bind(this);
    }

    /*
     The game allows for 5 horizontal slots where an enemy can be present.
     At any point in time there can be at most MAX_ENEMIES enemies otherwise the game would be impossible
     */
    setupEnemies() {
        if (!this.enemies) {
            this.enemies = [];
        }

        while (this.enemies.filter(e => !!e).length < MAX_ENEMIES) {
            this.addEnemy();
        }
    }

    // This method finds a random spot where there is no enemy, and puts one in there
    addEnemy() {
        var enemySpots = GAME_WIDTH / ENEMY_WIDTH;

        var enemySpot;
        // Keep looping until we find a free enemy spot at random
        while (enemySpot === undefined || this.enemies[enemySpot]) {
            enemySpot = Math.floor(Math.random() * enemySpots);
        }

        this.enemies[enemySpot] = new Enemy(enemySpot * ENEMY_WIDTH);
    }

    stopScrollingLevel() {
        document.getElementById("background").style.animationPlayState = "paused"
    }

    // This method kicks off the game
    start() {
        this.score = 0;
        this.lastFrame = Date.now();


        // Listen for keyboard left/right and update the player
        document.addEventListener('keydown', down => {
            if (down.keyCode === LEFT_ARROW_CODE) {
                this.player.move(MOVE_LEFT);
            }
            else if (down.keyCode === RIGHT_ARROW_CODE) {
                this.player.move(MOVE_RIGHT);
            }
        });
        document.addEventListener("keyup", up => {
            if (up.keyCode === LEFT_ARROW_CODE) {
                playerMoveLeft = false;
            } else if (up.keyCode === RIGHT_ARROW_CODE) {
                playerMoveRight = false;
            }
        })
        // Space
        document.addEventListener("keydown", down => {
            if (down.keyCode === 32) {
                barnStart = true;
                document.getElementById("background").classList.remove("background-start")
                document.getElementById("background").classList.add("background")
            }
        })
        // CTRL
        document.addEventListener("keydown", down => {
            if (down.keyCode === 17) {
                paradiseStart = true;
            }
        })


        this.gameLoop();
    }

    /*
    This is the core of the game engine. The `gameLoop` function gets called ~60 times per second
    During each execution of the function, we will update the positions of all game entities
    It's also at this point that we will check for any collisions between the game entities
    Collisions will often indicate either a player death or an enemy kill
 
    In order to allow the game objects to self-determine their behaviors, gameLoop will call the `update` method of each entity
    To account for the fact that we don't always have 60 frames per second, gameLoop will send a time delta argument to `update`
    You should use this parameter to scale your update appropriately
     */
    gameLoop() {
        // Check how long it's been since last frame
        var currentFrame = Date.now();
        var timeDiff = currentFrame - this.lastFrame;

        //  Update the player's positon if needed
        if (playerMoveLeft === true) {
            this.player.update(-timeDiff);

        } else if (playerMoveRight === true) {
            this.player.update(timeDiff);
        }


        //  Checks if we're at the start or end of the level
        if (barnStart === true) {
            this.barn.update(timeDiff);
        }
        if (paradiseStart === true) {

            this.paradise.update(timeDiff);
            console.log(this.paradise.y)
            if (this.paradise.y >= 0) {
                didPlayerWinGame = true;
            }
        }

        // Score
        this.score += timeDiff;

        // Call update on all enemies
        this.enemies.forEach(enemy => enemy.update(timeDiff));

        // Draw everything!
        this.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        this.enemies.forEach(enemy => enemy.render(this.ctx)); // draw the enemies
        this.barn.render(this.ctx); // draw the barn
        this.paradise.render(this.ctx); // draw the barn
        this.player.render(this.ctx); // draw the player


        // Check if any enemies should die
        this.enemies.forEach((enemy, enemyIdx) => {
            if (enemy.y > GAME_HEIGHT || paradiseStart) {
                delete this.enemies[enemyIdx];
            }
        });
        this.setupEnemies();


        // Check if player is dead
        if (this.isPlayerDead()) {
            // If they are dead, then it's game over!
            this.ctx.font = 'bold 30px Impact';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(this.score + ' GAME OVER', 5, 30);
        }
        else if (didPlayerWinGame) {
            this.stopScrollingLevel()
        }
        else {
            // If player is not dead, then draw the score
            this.ctx.font = 'bold 30px Impact';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(this.score, 5, 30);

            // Set the time marker and redraw
            this.lastFrame = Date.now();
            requestAnimationFrame(this.gameLoop);
        }
    }

    isPlayerDead() {
        // TODO: fix this function!
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i] == undefined) continue;
            else if (
                this.enemies[i].x < this.player.x + PLAYER_WIDTH &&
                this.enemies[i].x + ENEMY_WIDTH > this.player.x &&
                this.enemies[i].y < this.player.y + PLAYER_HEIGHT &&
                this.enemies[i].y + ENEMY_HEIGHT > this.player.y) {

                console.log("DEAD")
                this.stopScrollingLevel()
                return true;
            }
        }


        return false;
    }
}





// This section will start the game
var gameEngine = new Engine(document.getElementById('app'));
gameEngine.start();