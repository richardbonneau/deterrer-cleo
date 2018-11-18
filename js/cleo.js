//  Widths and Heights
var GAME_WIDTH = 450;
var GAME_HEIGHT = 500;

var disableMobileControls = false;
var canvas;
//  Start Button
var rect;
var displayStartButton = true;

var buttonW = 225;
var buttonH = 40;

var buttonX = 125;
var buttonY = 130;
var restartButtonX = 110;
var restartButtonY = 350;

//  Pause Game
var isGamePaused = false;

var PLAYER_WIDTH = 58;
var PLAYER_HEIGHT = 90;
var PLAYER_X = 0;
var PLAYER_Y = 0;

var destinationX = PLAYER_X
var destinationY = PLAYER_Y;
var oldDestinationX = 0
var oldDestinationY = 0

var ENEMY_WIDTH = 75;
var ENEMY_HEIGHT = 75;
var MAX_ENEMIES = 0;

var ANVIL_WIDTH = 70;
var ANVIL_HEIGHT = 35;
var MAX_ANVILS = 0;

var BOX_WIDTH = 80;
var BOX_HEIGHT = 70;
var MAX_BOXES = 0;

var BONE_WIDTH = 75;
var BONE_HEIGHT = 87;
var MAX_BONES = 0;

var BEANIE_WIDTH = 65;
var BEANIE_HEIGHT = 100;
var MAX_BEANIES = 0;

var PLANE_WIDTH = 140;
var PLANE_HEIGHT = 60;
var MAX_PLANES = 0;

var respawnAmount = 1;

//  Start and Finish
var BARN_WIDTH = 450;
var BARN_HEIGHT = 300;
var PARADISE_WIDTH = 450;
var PARADISE_HEIGHT = 300;

//  Cleo fade in
var stage1 = false;
var stage2 = false;
var stage3 = false;
var stage4 = false;
var stage5 = false;
var stage6 = false;

//  Start and End of level
var barnStart = false;
var paradiseStart = false;
paradiseScrollStart = false
var didPlayerWinGame = false;

var cleo1 = true;
var cleo2 = false;
var cleo3 = false;
var cleo4 = false;
var cleo5 = false;
var cleo6 = false;

var cycle;

var preGameOverBack1 = false;

var preGameOver = false;
var gameOver = false;
var gameOverCycleStarted = false;

//  StartTime
var startTime = 9999999999999999;

//  Levels
var level1 = true;
var level2 = false;
var level3 = false;
var level4 = false;

var areBonesSpawning = false;
var areBeaniesSpawning = false;
var areBoxesSpawning = false;
var arePlanesSpawning = false;
var areAnvilsSpawning = false;

//  Player Movement

var playerFaceLeft = true;
var playerFaceRight = false;

var playerMoveLeft = false;
var playerMoveRight = false;
var playerMoveUp = false;
var playerMoveDown = false;

const MOVE_LEFT = 'left';
const MOVE_RIGHT = 'right';
const MOVE_UP = 'up';
const MOVE_DOWN = 'down';

var LEFT_ARROW_CODE = 37;
var RIGHT_ARROW_CODE = 39;
var UP_ARROW_CODE = 38;
var DOWN_ARROW_CODE = 40;

//  Tuque PowerUp
var isPlayerInPrePowerUp = false;
var isPlayerPoweredUp = false;

var prePowerupStage1 = false;
var prePowerupStage2 = false;

var powerupStage1 = false;
var powerupStage2 = false;
var powerupStage3 = false;
var powerupStage4 = false;


//  Points Display
var displayPoints = false;
var points = 0;
var pointsLocationX = 0;
var pointsLocationY = 0;

//  Coins and Enemies Throttle

//      DEBUG
var timeElapsedDebug = false;
//      Nb of allowed items for this level
var nbAllowedBones = 0;

var amountsAllowedItemsAreSet = false;
var isLevelFreeOfBones = false;

var isPlayerPressing = false;


//  Preload game images
var images = {};
[
    "start-button.png", "title.png", "recommencer.png", "pflogo.png", "acheter-tuque.png", "game-finished.png",

    "level.png", "barn.png", "paradise.png",

    "player-left.png", "player-right.png",
    "player-left-tuque.png", "player-right-tuque.png", "player-left-prepowerup.png", "player-right-prepowerup.png",

    "player-left-powerup1.png", "player-left-powerup2.png", "player-left-powerup3.png", "player-left-powerup4.png",
    "player-right-powerup1.png", "player-right-powerup2.png", "player-right-powerup3.png", "player-right-powerup4.png",

    "cleo-fadein-1.png", "cleo-fadein-2.png", "cleo-fadein-3.png", "cleo-fadein-4.png", "cleo-fadein-5.png",

    "bone-parachute.png", "tuque-parachute.png",

    "anvil.png", "box.png", "plane-right.png",

    "black-screen.png", "gameover1.png", "gameover2.png", "gameover3.png", "gameover4.png", "gameover5.png", "gameover6.png",

].forEach(imgName => {
    var img = document.createElement('img');
    img.src = 'images/' + imgName;
    images[imgName] = img;
});
//var planeFlyBy = new Audio("audio/plane-fly-by.wav");
var music = new Audio("audio/music.wav");
var woofStart = new Audio("audio/woof-woof-start.wav");
var bonePickup = new Audio("audio/bone-pickup.wav");
var loseMusic = new Audio("audio/lose-music.wav");
var powerup = new Audio("audio/powerup.wav")


// This section is where you will be doing most of your coding
class StartButton {
    constructor() {
        this.sprite = images['start-button.png'];
    }
    render(ctx) {
        if (displayStartButton) {
            ctx.drawImage(this.sprite, (GAME_WIDTH / 2) - 112, buttonY)
        }
    }
}

class Player {
    constructor() {
        this.x = 2.5 * PLAYER_WIDTH;
        this.y = GAME_HEIGHT - PLAYER_HEIGHT - 100;
        this.stage1 = images['cleo-fadein-1.png'];
        this.stage2 = images['cleo-fadein-2.png'];
        this.stage3 = images['cleo-fadein-3.png'];
        this.stage4 = images['cleo-fadein-4.png'];
        this.stage5 = images['cleo-fadein-5.png'];

        this.spriteLeft = images['player-left.png'];
        this.spriteRight = images['player-right.png'];

        // this.spriteLeftTuque = images['player-left-tuque.png']
        // this.spriteLeftPrePowerup = images['player-left-prepowerup.png']
        // this.spriteRightTuque = images['player-right-tuque.png']
        // this.spriteRightPrePowerup = images['player-right-prepowerup.png']

        this.spriteLeftPowerup1 = images['player-left-powerup1.png']
        this.spriteLeftPowerup2 = images['player-left-powerup2.png']
        this.spriteLeftPowerup3 = images['player-left-powerup3.png']
        this.spriteLeftPowerup4 = images['player-left-powerup4.png']
        this.spriteRightPowerup1 = images['player-right-powerup1.png']
        this.spriteRightPowerup2 = images['player-right-powerup2.png']
        this.spriteRightPowerup3 = images['player-right-powerup3.png']
        this.spriteRightPowerup4 = images['player-right-powerup4.png']

        this.speed = 0.25;
    }

    checkIfOutOfBoundsLeft() {
        if (0 < this.x) return true
        else return false
    }
    checkIfOutOfBoundsRight() {
        if (GAME_WIDTH > this.x + PLAYER_WIDTH) return true
        else return false
    }
    checkIfOutOfBoundsTop() {
        if (0 < this.y) return true
        else return false
    }
    checkIfOutOfBoundsBottom() {
        if (GAME_HEIGHT > this.y + PLAYER_HEIGHT) return true
        else return false
    }
    // This method is called by the game engine when left/right arrows are pressed
    move(direction) {
        if (direction === MOVE_LEFT) {
            playerMoveLeft = true;
            playerFaceLeft = true;
            playerFaceRight = false;
        } else if (direction === MOVE_RIGHT) {
            playerMoveRight = true;
            playerFaceLeft = false;
            playerFaceRight = true;
        } else if (direction === MOVE_UP) {
            playerMoveUp = true;
        } else if (direction === MOVE_DOWN) {
            playerMoveDown = true;
        }
    }
    updateHorizontal(timeDiff) {
        this.x = this.x + timeDiff * this.speed;
    }
    updateVertical(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }
    render(ctx) {
        if (barnStart) {
            if (playerFaceLeft) {
                if (isPlayerPoweredUp) {
                    if (powerupStage1) ctx.drawImage(images['player-left-powerup1.png'], this.x, this.y)
                    else if (powerupStage2) ctx.drawImage(images['player-left-powerup2.png'], this.x, this.y)
                    else if (powerupStage3) ctx.drawImage(images['player-left-powerup3.png'], this.x, this.y)
                    else if (powerupStage4) ctx.drawImage(images['player-left-powerup4.png'], this.x, this.y)
                }
                else {
                    ctx.drawImage(this.spriteLeft, this.x, this.y);
                }

            } else if (playerFaceRight) {
                if (isPlayerPoweredUp) {
                    if (powerupStage1) ctx.drawImage(images['player-right-powerup1.png'], this.x, this.y)
                    else if (powerupStage2) ctx.drawImage(images['player-right-powerup2.png'], this.x, this.y)
                    else if (powerupStage3) ctx.drawImage(images['player-right-powerup3.png'], this.x, this.y)
                    else if (powerupStage4) ctx.drawImage(images['player-right-powerup4.png'], this.x, this.y)
                } else {
                    ctx.drawImage(this.spriteRight, this.x, this.y);
                }

            }
        } else {
            if (stage1) {
                ctx.drawImage(this.stage1, this.x, this.y);
            } else if (stage2) {
                ctx.drawImage(this.stage2, this.x, this.y);
            } else if (stage3) {
                ctx.drawImage(this.stage3, this.x, this.y);
            } else if (stage4) {
                ctx.drawImage(this.stage4, this.x, this.y);
            } else if (stage5) {
                ctx.drawImage(this.stage5, this.x, this.y);
            }
        }
    }
}
class Anvil {
    constructor(xPos) {
        this.x = xPos;
        this.y = -ANVIL_HEIGHT;
        this.sprite = images['anvil.png'];

        // Each enemy should have a different speed
        this.speed = (Math.random() * 1 + 5) / 10
    }

    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }
    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}

class Box {
    constructor(xPos) {
        this.x = xPos;
        this.y = -BOX_HEIGHT;
        this.sprite = images['box.png'];
        this.speed = this.randomizeSpeed()
    }

    randomizeSpeed() {

        if (level2) return (Math.random() * 1 + 4) / 10
        if (level1) return (Math.random() * 1 + 3) / 10

    }
    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }
    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}

class Plane {
    constructor(yPos, spawnLeft) {
        this.x = spawnLeft ? -PLANE_WIDTH : GAME_WIDTH + PLANE_WIDTH;
        this.y = yPos;
        this.sprite = spawnLeft ? images['plane-right.png'] : images['plane-left.png'];
        this.horizontalSpeed = .22
        this.verticalSpeed = this.randomizeDirection();


        // this.verticalSpeed = (Math.random() - 0.5) / 10;
    }
    randomizeDirection() {
        let diceRoll = Math.ceil(Math.random() * 3) - 2;

        if (diceRoll === -1) return -0.01
        else if (diceRoll === 0) return 0
        else return 0.01
    }
    update(timeDiff) {
        this.y = this.y + timeDiff * this.verticalSpeed;
        this.x = this.x + timeDiff * this.horizontalSpeed;
    }
    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}

class Bone {
    constructor(xPos) {
        this.x = xPos;
        this.y = -BONE_HEIGHT;
        this.sprite = images['bone-parachute.png'];
        this.speed = Math.random() / 2 + 0.15;
    }
    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }
    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}

class Beanie {
    constructor(xPos) {
        this.x = xPos;
        this.y = -BEANIE_HEIGHT;
        this.sprite = images['tuque-parachute.png'];
        this.speed = 0.1;
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
        this.speed = 0.2;
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
        this.speed = 0.15;
    }

    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }

    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}

class ScoreDisplay {
    constructor(xPos, yPos, score, color, color2) {
        this.x = xPos;
        this.y = yPos;
        this.scoreToDisplay = score
        this.color = color
        this.color2 = color2
        this.speed = 0.155;
    }

    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }

    render(ctx) {

        ctx.beginPath()
        ctx.font = "20px Verdana"
        ctx.fillStyle = this.color
        ctx.fillText("*" + this.scoreToDisplay + "*", this.x, this.y);
        ctx.closePath()
        //ctx.fillText(this.scoreToDisplay, this.x, this.y);
    }
}


/*
This section is a tiny game engine.
This engine will use your Enemy and Player classes to create the behavior of the game.
The engine will try to draw your game at 60 frames per second using the requestAnimationFrame function
*/
//  ENGINECLASS:/
class Engine {
    constructor(element) {
        // Setup the player
        this.player = new Player();
        this.barn = new Barn();
        this.paradise = new Paradise();
        this.startButton = new StartButton();

        // Setup enemies
        this.addStartButton();
        this.setupAnvils();
        this.setupBoxes();
        this.setupPlanes();
        this.setupBones();
        this.setupBeanies();
        this.setupScoresToDisplay()

        // Setup the <canvas> element where we will be drawing
        canvas = document.createElement('canvas');
        canvas.width = GAME_WIDTH;
        canvas.height = GAME_HEIGHT;
        element.appendChild(canvas);
        this.ctx = canvas.getContext('2d');

        //   Mobile Controls

        //  STARTBUTTON:/
        canvas.addEventListener('click', function (event) {
            rect = canvas.getBoundingClientRect()
            if (!barnStart && displayStartButton &&
                event.x - rect.x > buttonX &&
                event.x - rect.x < buttonX + buttonW &&
                event.y - rect.y > buttonY &&
                event.y - rect.y < buttonY + buttonH
            ) {

                // Executes if button was clicked!
                displayStartButton = false;
                startTime = Date.now();
                music.play();
                destinationX = PLAYER_X
                destinationY = PLAYER_Y
            }
            if (gameOver &&
                event.x - rect.x > restartButtonX &&
                event.x - rect.x < restartButtonX + buttonW &&
                event.y - rect.y > restartButtonY &&
                event.y - rect.y < restartButtonY + buttonH) {
                location.reload();
            }
            if (didPlayerWinGame &&
                event.x - rect.x > restartButtonX &&
                event.x - rect.x < restartButtonX + buttonW &&
                event.y - rect.y > restartButtonY &&
                event.y - rect.y < restartButtonY + buttonH) {
                console.log("clicked")
                window.location.href = "http://deterrercleo.com/?utm_source=referral&utm_medium=referral&utm_campaign=deterrer_cleo&utm_content=Cleo_button"
            }
        });

        canvas.addEventListener('mousemove', function (event) {

            rect = canvas.getBoundingClientRect()
            destinationX = event.clientX - rect.x;
            destinationY = event.clientY - rect.y;
            isPlayerPressing = true;
            event.preventDefault()
        })
        // canvas.addEventListener('touchstart', function (event) {
        //     console.log("in touchscreen")
        //     rect = canvas.getBoundingClientRect()
        //     destinationX = event.clientX - rect.x;
        //     destinationY = event.clientY - rect.y;
        //     isPlayerPressing = true;
        //     event.preventDefault()

        // })


        // canvas.addEventListener('touchend', function (event) {
        //     isPlayerPressing = false;
        // })
        // canvas.addEventListener('touchcancel', function (event) {
        //     isPlayerPressing = false;
        // })

        // canvas.addEventListener('mousedown', function (event) {

        //     isPlayerPressing = true;

        // })
        // canvas.addEventListener('mouseup', function (event) {

        //     isPlayerPressing = false;

        // })



        this.gameLoop = this.gameLoop.bind(this);
    }

    /*
     The game allows for 5 horizontal slots where an enemy can be present.
     At any point in time there can be at most MAX_ENEMIES enemies otherwise the game would be impossible
     */



    setupAnvils() {
        if (!this.anvils) {
            this.anvils = [];
        }
        while (this.anvils.filter(e => !!e).length < MAX_ANVILS) {
            this.addAnvil();
        }
    }

    setupBoxes() {
        if (!this.boxes) {
            this.boxes = [];
        }
        while (this.boxes.filter(e => !!e).length < MAX_BOXES) {
            this.addBox();
        }
    }

    setupPlanes() {
        if (!this.leftPlanes) {
            this.leftPlanes = [];
        }
        while (this.leftPlanes.filter(e => !!e).length < MAX_PLANES) {
            this.addPlane();
        }

    }

    setupBones() {
        if (!this.bones) {
            this.bones = [];
        }

        while (this.bones.filter(e => !!e).length < MAX_BONES) {
            this.addBone();
        }
    }

    setupBeanies() {
        if (!this.beanies) {
            this.beanies = [];
        }

        while (this.beanies.filter(e => !!e).length < MAX_BEANIES) {
            this.addBeanie();
        }
    }

    setupScoresToDisplay() {
        if (!this.scoresToDisplay) {
            this.scoresToDisplay = [];
        }

        // while (this.scoresToDisplay.filter(e => !!e).length < MAX_BEANIES) {
        //     this.addScoresToDisplay();
        // }
    }

    // This method finds a random spot where there is no enemy, and puts one in there
    addStartButton() {
        this.startButton = new StartButton(buttonW);
    }
    addAnvil() {
        var anvilSpots = GAME_WIDTH / ANVIL_WIDTH;

        var anvilSpot;
        // Keep looping until we find a free enemy spot at random
        while (anvilSpot === undefined || this.anvils[anvilSpot]) {
            anvilSpot = Math.floor(Math.random() * anvilSpots);
        }

        this.anvils[anvilSpot] = new Anvil(anvilSpot * ANVIL_WIDTH);
    }

    addBox() {
        var boxSpots = GAME_WIDTH / BOX_WIDTH;

        var boxSpot;
        // Keep looping until we find a free enemy spot at random
        while (boxSpot === undefined || this.boxes[boxSpot]) {
            boxSpot = Math.floor(Math.random() * boxSpots);
        }

        this.boxes[boxSpot] = new Box(boxSpot * BOX_WIDTH);
    }

    addPlane() {
        var leftPlaneSpots = GAME_HEIGHT / PLANE_HEIGHT;
        var leftPlaneSpot;
        // Keep looping until we find a free spot at random
        while (leftPlaneSpot === undefined || this.leftPlanes[leftPlaneSpot]) {
            leftPlaneSpot = Math.floor(Math.random() * leftPlaneSpots);
        }
        this.leftPlanes[leftPlaneSpot] = new Plane(leftPlaneSpot * PLANE_HEIGHT, true);
        // planeFlyBy.play();

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //  TODO: ajouter right planes fait crasher le jeu
        // var rightPlaneSpots = GAME_HEIGHT / PLANE_HEIGHT;

        // var rightPlaneSpot;
        // // Keep looping until we find a free spot at random
        // while (rightPlaneSpot === undefined || this.rightPlanes[rightPlaneSpot]) {
        //     rightPlaneSpot = Math.floor(Math.random() * rightPlaneSpots);
        // }
        // this.rightPlanes[rightPlaneSpot] = new Plane(rightPlaneSpot * PLANE_HEIGHT, false);
    }

    addBone() {
        var boneSpots = GAME_WIDTH / BONE_WIDTH;

        var boneSpot;
        // Keep looping until we find a free enemy spot at random
        while (boneSpot === undefined || this.bones[boneSpot]) {
            boneSpot = Math.floor(Math.random() * boneSpots);
        }

        this.bones[boneSpot] = new Bone(boneSpot * BONE_WIDTH);
    }

    addBeanie() {
        var beanieSpots = GAME_WIDTH / BEANIE_WIDTH;

        var beanieSpot;
        // Keep looping until we find a free enemy spot at random
        while (beanieSpot === undefined || this.beanies[beanieSpot]) {
            beanieSpot = Math.floor(Math.random() * beanieSpots);
        }
        this.beanies[beanieSpot] = new Beanie(beanieSpot * BEANIE_WIDTH);
    }

    addScoresToDisplay(x, y, score, color, color2) {
        this.scoresToDisplay[this.scoresToDisplay.length] = new ScoreDisplay(x, y, score, color, color2);
    }
    stopSpawningEverything() {
        MAX_ANVILS = 0;
        MAX_BOXES = 0;
        MAX_BEANIES = 0;
        MAX_BONES = 0;
        MAX_PLANES = 0;

    }

    stopScrollingLevel() {
        this.stopSpawningEverything();
        document.getElementById("background").style.animationPlayState = "paused"
    }

    cycleGameOverScreens() {

    }

    // This method kicks off the game
    start() {
        this.score = 0;
        this.lastFrame = Date.now();

        music.loop = true;
        music.volume = 0.5;


        function detectmob() {

            if (window.innerWidth >= 800 && window.innerHeight >= 600) {
                disableMobileControls = true;
            }
        }
        detectmob()

        // Movement:/
        document.addEventListener('keydown', (down) => {
            disableMobileControls = true;
            if (barnStart) {
                if (down.keyCode === LEFT_ARROW_CODE) {
                    this.player.move(MOVE_LEFT);
                    down.preventDefault()
                } else if (down.keyCode === RIGHT_ARROW_CODE) {
                    this.player.move(MOVE_RIGHT);
                    down.preventDefault()
                } else if (down.keyCode === UP_ARROW_CODE) {
                    this.player.move(MOVE_UP);
                    down.preventDefault()
                } else if (down.keyCode === DOWN_ARROW_CODE) {
                    this.player.move(MOVE_DOWN);
                    down.preventDefault()
                }
            }



        });
        document.addEventListener("keyup", up => {
            if (up.keyCode === LEFT_ARROW_CODE) {
                playerMoveLeft = false;
            } else if (up.keyCode === RIGHT_ARROW_CODE) {
                playerMoveRight = false;
            } else if (up.keyCode === UP_ARROW_CODE) {
                playerMoveUp = false;
            } else if (up.keyCode === DOWN_ARROW_CODE) {
                playerMoveDown = false;
            }
        })

        // Space
        document.addEventListener("keydown", down => {
            if (down.keyCode === 32) {
                // barnStart = true;
                // MAX_BONES = 2;
                // MAX_BOXES = 2;
                // document.getElementById("background").classList.remove("background-start");
                // document.getElementById("background").classList.add("background");
                gameOver = false;
            }
        })
        // CTRL
        document.addEventListener("keydown", down => {
            if (down.keyCode === 17) {
                // barnStart = false;
                // stage4 = true;
                paradiseStart = true;
            }
        })
        // P
        document.addEventListener("keydown", down => {
            if (down.keyCode === 80) {
                document.getElementById("background").classList.remove("background-start")
                document.getElementById("background").classList.add("fadein")


                // stage4 = false;
                // barnStart = true;

                // if (isGamePaused === false) {
                //     isGamePaused = true;
                // } else isGamePaused = false;

            }
        })

        //  Levels
        document.addEventListener("keydown", down => {
            if (down.keyCode === 48) {
                level0 = true;
                level1 = false;
                level3 = false;
                level4 = false;
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

        this.updatePlayerPosition()
        // Check how long it's been since last frame
        var currentFrame = Date.now();
        var timeDiff = currentFrame - this.lastFrame;
        var timeElapsed = -startTime + currentFrame;



        if (timeElapsed < 500) {
            stage1 = true;
        } else if (timeElapsed < 1000) {
            stage1 = false;
            stage2 = true;
        } else if (timeElapsed < 1500) {
            stage2 = false;
            stage3 = true;
        } else if (timeElapsed < 2000) {
            stage3 = false;
            stage4 = true;
        } else if (timeElapsed < 2500) {
            stage4 = false;
            stage5 = true;
        } else if (timeElapsed < 3000) {
            if (barnStart === false) {
                stage5 = false;
                barnStart = true;
                woofStart.play();
                document.getElementById("background").classList.remove("background-start")
                document.getElementById("background").classList.add("background")
            }
        }

        //  GAMEPLAY:/
        if (timeElapsed < 5000) {

        } else if (timeElapsed < 8000) {
            if (!areBonesSpawning) {
                areBonesSpawning = true;
                MAX_BONES = respawnAmount;
            }
        } else if (timeElapsed < 12000) {
            if (!areBoxesSpawning) {
                areBoxesSpawning = true;
                MAX_BOXES = respawnAmount;
            }

        } else if (timeElapsed < 30000) {
            if (!areBeaniesSpawning) {
                areBeaniesSpawning = true;
                MAX_BEANIES = respawnAmount;
            }

        } else if (timeElapsed < 50000) {
            if (!arePlanesSpawning) {
                level2 = true;
                arePlanesSpawning = true;
                MAX_PLANES = respawnAmount;
            }
        } else if (timeElapsed < 75000) {
            if (!areAnvilsSpawning) {
                areAnvilsSpawning = true;
                MAX_ANVILS = respawnAmount;
            }
        } else if (timeElapsed < 120000) {
            paradiseStart = true;
        }
        //  Update player position (mobile)

        // console.log(destinationX, '>', PLAYER_X)
        // console.log(destinationX, '<', PLAYER_X + PLAYER_WIDTH - 20)
        // console.log("-----------")
        if (barnStart && !disableMobileControls) {


            if (destinationX > PLAYER_X && destinationX < PLAYER_X + PLAYER_WIDTH) {
                playerMoveRight = false;
                playerMoveLeft = false;
            } else if (destinationX > PLAYER_X) {
                playerFaceLeft = false;
                playerFaceRight = true;
                playerMoveRight = true;
                playerMoveLeft = false;
            } else {
                playerFaceLeft = true;
                playerFaceRight = false;
                playerMoveLeft = true;
                playerMoveRight = false;
            }

            if (destinationY > PLAYER_Y && destinationY < PLAYER_Y + PLAYER_HEIGHT) {
                playerMoveDown = false;
                playerMoveUp = false;
            } else if (destinationY > PLAYER_Y) {
                playerMoveDown = true;
                playerMoveUp = false;
            } else {
                playerMoveUp = true;
                playerMoveDown = false;
            }
        }

        // if (barnStart && PLAYER_X + PLAYER_WIDTH < destinationX &&
        //     destinationX > PLAYER_X &&
        //     destinationX < PLAYER_X + PLAYER_WIDTH
        //     //&& event.y - rect.y > buttonY &&
        //     // event.y - rect.y < buttonY + buttonH
        // ) {
        //     playerMoveRight = true;
        //     playerMoveLeft = false;
        //     playerMoveDown = false;
        //     playerMoveUp = false;
        // } else if (PLAYER_X > destinationY) {
        //     playerMoveLeft = true;
        //     playerMoveRight = false;
        //     playerMoveDown = false;
        //     playerMoveUp = false;
        // }

        //  Update the player's positon if needed (pc)
        if (playerMoveLeft === true && this.player.checkIfOutOfBoundsLeft()) {
            this.player.updateHorizontal(-timeDiff);
        } else if (playerMoveRight === true && this.player.checkIfOutOfBoundsRight()) {
            this.player.updateHorizontal(timeDiff);
        }
        if (playerMoveUp === true && this.player.checkIfOutOfBoundsTop()) {
            if (playerMoveLeft || playerMoveRight) this.player.updateVertical(-timeDiff / 1.5);
            else this.player.updateVertical(-timeDiff);
        } else if (playerMoveDown === true && this.player.checkIfOutOfBoundsBottom()) {
            if (playerMoveLeft || playerMoveRight) this.player.updateVertical(timeDiff / 1.5);
            else this.player.updateVertical(timeDiff);
        }

        // if (barnStart) {
        //     if (PLAYER_X + PLAYER_WIDTH < event.clientX - rect.x) {
        //         playerMoveRight = true;
        //         playerMoveLeft = false;
        //         playerMoveDown = false;
        //         playerMoveUp = false;
        //     }
        //     else if (PLAYER_X > event.clientX - rect.x) {
        //         playerMoveLeft = true;
        //         playerMoveRight = false;
        //         playerMoveDown = false;
        //         playerMoveUp = false;
        //     }

        //  Checks if we're at the start or end of the level
        if (barnStart === true) {
            this.barn.update(timeDiff);
        }
        if (paradiseStart === true) {


            setTimeout(function () {
                respawnAmount = 0;

                paradiseScrollStart = true;
            }, 2000)

            if (paradiseScrollStart) {

                this.paradise.update(timeDiff);
                if (this.paradise.y >= 0) {
                    didPlayerWinGame = true;
                }
            }

        }


        this.pointDisplay()

        // Call update on all game elements
        if (!isGamePaused) {
            this.anvils.forEach(anvil => anvil.update(timeDiff));
            this.boxes.forEach(box => box.update(timeDiff));
            this.leftPlanes.forEach(plane => plane.update(timeDiff));
            this.bones.forEach(bone => bone.update(timeDiff));
            this.beanies.forEach(beanie => beanie.update(timeDiff));
            this.scoresToDisplay.forEach(score => score.update(timeDiff));
        }

        // Draw everything! DRAW:/
        this.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        this.anvils.forEach(anvil => anvil.render(this.ctx));
        this.boxes.forEach(box => box.render(this.ctx));
        this.leftPlanes.forEach(plane => plane.render(this.ctx));
        this.bones.forEach(bone => bone.render(this.ctx));
        this.beanies.forEach(beanie => beanie.render(this.ctx));
        this.barn.render(this.ctx);
        this.paradise.render(this.ctx);
        this.player.render(this.ctx);
        this.startButton.render(this.ctx);
        this.scoresToDisplay.forEach(score => score.render(this.ctx))

        if (displayStartButton) {
            this.ctx.drawImage(images["pflogo.png"], GAME_WIDTH / 2 - 225, 0)
            this.ctx.drawImage(images['title.png'], GAME_WIDTH / 2 - 75, 0)
        }
        //this.ctx.drawImage(images['plane-right.png'], 100, 200)


        if (preGameOver) {
            //this.ctx.drawImage(ima)
        }
        if (gameOver) {
            this.ctx.drawImage(images['black-screen.png'], 0, 0)
            if (cleo1) this.ctx.drawImage(images['gameover1.png'], GAME_WIDTH / 2 - 150, 20)
            else if (cleo2) this.ctx.drawImage(images['gameover2.png'], GAME_WIDTH / 2 - 150, 20)
            else if (cleo3) this.ctx.drawImage(images['gameover3.png'], GAME_WIDTH / 2 - 150, 20)
            else if (cleo4) this.ctx.drawImage(images['gameover4.png'], GAME_WIDTH / 2 - 150, 20)
            else if (cleo5) this.ctx.drawImage(images['gameover5.png'], GAME_WIDTH / 2 - 150, 20)
            else if (cleo6) this.ctx.drawImage(images['gameover6.png'], GAME_WIDTH / 2 - 150, 20)

            woofStart.muted = true
            bonePickup.muted = true
            powerup.muted = true

            if (!gameOverCycleStarted) {
                cycle = setInterval(function () {
                    if (cleo1) {
                        cleo2 = true
                        cleo1 = false
                    } else if (cleo2) {
                        cleo2 = false
                        cleo3 = true
                    } else if (cleo3) {
                        cleo3 = false
                        cleo4 = true
                    } else if (cleo4) {
                        cleo4 = false
                        cleo5 = true
                    } else if (cleo5) {
                        cleo5 = false
                        cleo6 = true
                    } else if (cleo6) {
                        cleo6 = false
                        cleo1 = true
                    }
                }, 200)
                gameOverCycleStarted = true;
            }
            this.ctx.drawImage(images["recommencer.png"], restartButtonX, restartButtonY)

        } else if (!gameOver && gameOverCycleStarted) {
            clearInterval(cycle);
            cycle = undefined;
            gameOverCycleStarted = false;
        }



        // REACHBOTTOM:/
        this.anvils.forEach((anvil, anvilIdx) => {
            if (anvil.y > GAME_HEIGHT) {
                delete this.anvils[anvilIdx];
                if (level1) {
                    setTimeout(() => MAX_ANVILS = 1, Math.floor(Math.random() * 1500 + 1500))
                }
            }
        });
        this.boxes.forEach((box, boxIdx) => {
            if (box.y > GAME_HEIGHT) {
                delete this.boxes[boxIdx];
                if (level1) {

                    MAX_BOXES = 0;
                    setTimeout(() => MAX_BOXES = respawnAmount, Math.floor(Math.random() * 100 + 0))

                }

            }
        });
        this.leftPlanes.forEach((plane, planeIdx) => {
            if (plane.x > GAME_WIDTH) {
                delete this.leftPlanes[planeIdx];
                if (level1) {
                    MAX_PLANES = 0;
                    setTimeout(() => MAX_PLANES = respawnAmount, Math.floor(Math.random() * 5000 + 5000))
                }
            }
        });
        this.bones.forEach((bone, boneIdx) => {
            if (bone.y > GAME_HEIGHT) {
                delete this.bones[boneIdx];
                if (level1) {
                    MAX_BONES = 0;
                    setTimeout(() => MAX_BONES = respawnAmount, Math.floor(Math.random() * 100 + 0))
                }
            }
        });
        this.beanies.forEach((beanie, beanieIdx) => {
            if (beanie.y > GAME_HEIGHT) {
                delete this.beanies[beanieIdx];
                if (level1) {
                    MAX_BEANIES = 0;
                    setTimeout(() => MAX_BEANIES = respawnAmount, Math.floor(Math.random() * 20000 + 15000))
                }
            }
        });
        this.scoresToDisplay.forEach((score, scoreIdx) => {
            if (score.y > GAME_HEIGHT) {
                delete this.scoresToDisplay[scoreIdx];
            }
        });
        this.setupAnvils();
        this.setupBoxes();
        this.setupPlanes();
        this.setupBones();
        this.setupBeanies();

        //  Check if the player picked up bones
        if (this.didPlayerPickUpFood()) {

        }
        if (this.didPlayerPickUpBeanie()) {

        }


        // Check if player is dead
        if (this.isPlayerDead()) {
            // If they are dead, then it's game over!
            this.ctx.font = 'bold 30px Verdana';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(this.score + ' GAME OVER', 5, 30);
        }
        else if (didPlayerWinGame) {
            //  gamefinish:/
            this.stopScrollingLevel()
            this.ctx.drawImage(images["game-finished.png"], 0, 0)
            this.ctx.drawImage(images["acheter-tuque.png"], (GAME_WIDTH / 2) - 112, 350)

            let sub = document.getElementsByClassName("subbody")[0]
            console.log(sub)
            sub.setAttribute('href', 'http://www.google.ca');

        }
        else {
            // If player is not dead, then draw the score
            if (!displayStartButton) {
                this.ctx.font = 'bold 30px Verdana';
                this.ctx.fillStyle = '#ffffff';
                this.ctx.fillText(this.score, 5, 30);
            }


            // Set the time marker and redraw
            this.lastFrame = Date.now();
            requestAnimationFrame(this.gameLoop);
        }
    }

    updatePlayerPosition() {
        PLAYER_X = this.player.x
        PLAYER_Y = this.player.y


    }
    //  PLAYER HIT ITEMS? :/
    didPlayerPickUpFood() {
        for (let i = 0; i < this.bones.length; i++) {
            if (this.bones[i] == undefined) continue;

            else if (
                this.bones[i].x < this.player.x + PLAYER_WIDTH &&
                this.bones[i].x + BONE_WIDTH > this.player.x &&
                this.bones[i].y < this.player.y + PLAYER_HEIGHT &&
                this.bones[i].y + BONE_HEIGHT > this.player.y) {

                bonePickup.play();

                pointsLocationX = this.bones[i].x;
                pointsLocationY = this.bones[i].y;
                points = 1000;
                displayPoints = true;

                MAX_BONES = 0;

                if (level1) {
                    setTimeout(() => MAX_BONES = 1, Math.floor(Math.random() * 5000 + 5000))
                }
                this.score += 500
                this.addScoresToDisplay(this.bones[i].x, this.bones[i].y, 500, "#E9FF00", "#04FF00")
                delete this.bones[i]

                //  launch a function that will take the current coordinate and display score++ for a short amount of time

                return true;
            }
        }
        return false;
    }
    didPlayerPickUpBeanie() {
        //console.log(powerupStage1, powerupStage2, powerupStage3, powerupStage4)
        for (let i = 0; i < this.beanies.length; i++) {
            if (this.beanies[i] == undefined) continue;

            else if (
                this.beanies[i].x < this.player.x + PLAYER_WIDTH &&
                this.beanies[i].x + BEANIE_WIDTH > this.player.x &&
                this.beanies[i].y < this.player.y + PLAYER_HEIGHT &&
                this.beanies[i].y + BEANIE_HEIGHT > this.player.y) {


                //beaniePickup.play();
                isPlayerPoweredUp = true;
                powerupStage1 = true;
                powerup.volume = 0.7
                powerup.play();

                let prePowerupInterval = setInterval(function () {

                    if (powerupStage1) {
                        powerupStage1 = false;
                        powerupStage2 = true;
                    } else if (powerupStage2) {
                        powerupStage2 = false;
                        powerupStage3 = true;
                    } else if (powerupStage3) {
                        powerupStage3 = false;
                        powerupStage4 = true;
                    } else if (powerupStage4) {
                        powerupStage4 = false;
                        powerupStage1 = true;
                    }
                }, 100)

                setTimeout(function () {
                    clearInterval(prePowerupInterval);
                    isPlayerPoweredUp = false;

                }, 7400)

                pointsLocationX = this.beanies[i].x;
                pointsLocationY = this.beanies[i].y;
                points = 1000;
                displayPoints = true;

                MAX_BEANIES = 0;

                if (level1) {
                    setTimeout(() => MAX_BEANIES = 1, Math.floor(Math.random() * 20000 + 15000))
                }
                this.score += 2500
                this.addScoresToDisplay(this.beanies[i].x, this.beanies[i].y, 2500, "#E9FF00", "#04FF00")
                delete this.beanies[i]

                //  launch a function that will take the current coordinate and display score++ for a short amount of time

                return true;
            }
        }
        return false;
    }
    //  POINTS:/
    pointDisplay() {
        if (displayPoints) {
            //console.log(points, pointsLocationX, pointsLocationY)
            if (!gameOver) {
                this.ctx.fillText(points, pointsLocationX, pointsLocationY);
            }

        }

    }

    isPlayerDead() {


        //  anvils
        for (let i = 0; i < this.anvils.length; i++) {
            if (this.anvils[i] == undefined) continue;
            else if (
                this.anvils[i].x < this.player.x + PLAYER_WIDTH &&
                this.anvils[i].x + ANVIL_WIDTH > this.player.x &&
                this.anvils[i].y < this.player.y + PLAYER_HEIGHT &&
                this.anvils[i].y + ANVIL_HEIGHT > this.player.y) {

                if (isPlayerPoweredUp) {
                    new Audio("audio/destroy-object.wav").play()
                    MAX_ANVILS = 0
                    setTimeout(() => MAX_ANVILS = 1, Math.floor(Math.random() * 1500 + 2000))
                    this.score += 1500
                    this.addScoresToDisplay(this.anvils[i].x, this.anvils[i].y, 1500, "#E9FF00", "#04FF00")
                    delete this.anvils[i]
                } else {
                    loseMusic.play()

                    gameOver = true;
                    // this.stopScrollingLevel()
                    // return true;
                }

            }
        }
        //  Planes
        for (let i = 0; i < this.leftPlanes.length; i++) {
            if (this.leftPlanes[i] == undefined) continue;
            else if (
                this.leftPlanes[i].x < this.player.x + PLAYER_WIDTH &&
                this.leftPlanes[i].x + PLANE_WIDTH > this.player.x &&
                this.leftPlanes[i].y < this.player.y + PLAYER_HEIGHT &&
                this.leftPlanes[i].y + PLANE_HEIGHT > this.player.y) {

                if (isPlayerPoweredUp) {
                    new Audio("audio/destroy-object.wav").play()
                    MAX_PLANES = 0
                    setTimeout(() => MAX_PLANES = 1, Math.floor(Math.random() * 2500 + 2500))
                    this.score += 2000
                    this.addScoresToDisplay(this.leftPlanes[i].x, this.leftPlanes[i].y, 2000, "#E9FF00", "#04FF00")
                    delete this.leftPlanes[i]
                } else {
                    loseMusic.play()

                    gameOver = true;
                    // this.stopScrollingLevel()
                    // return true;
                }
            }
        }

        //  Box
        for (let i = 0; i < this.boxes.length; i++) {
            if (this.boxes[i] == undefined) continue;
            else if (
                this.boxes[i].x < this.player.x + PLAYER_WIDTH &&
                this.boxes[i].x + BOX_WIDTH > this.player.x &&
                this.boxes[i].y < this.player.y + PLAYER_HEIGHT &&
                this.boxes[i].y + BOX_HEIGHT > this.player.y
            ) {

                if (isPlayerPoweredUp) {
                    new Audio("audio/destroy-object.wav").play()
                    MAX_BOXES = 0
                    setTimeout(() => MAX_BOXES = 1, Math.floor(Math.random() * 100 + 100))
                    this.score += 1000
                    this.addScoresToDisplay(this.boxes[i].x, this.boxes[i].y, 1000, "#E9FF00", "#04FF00")
                    delete this.boxes[i]
                } else {
                    loseMusic.play()

                    gameOver = true;
                    // this.stopScrollingLevel()
                    // return true;
                }
            }
        }
        return false;
    }
}


// This section will start the game
var gameEngine = new Engine(document.getElementById('app'));
gameEngine.start();