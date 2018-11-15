//  Widths and Heights
var GAME_WIDTH = 450;
var GAME_HEIGHT = 500;

//  Start Button
var displayStartButton = true;
var buttonX = 125;
var buttonY = 130;
var buttonW = 225;
var buttonH = 40;

//  Pause Game
var isGamePaused = false;

var PLAYER_WIDTH = 58;
var PLAYER_HEIGHT = 90;

var ENEMY_WIDTH = 75;
var ENEMY_HEIGHT = 75;
var MAX_ENEMIES = 0;

var ANVIL_WIDTH = 75;
var ANVIL_HEIGHT = 35;
var MAX_ANVILS = 0;

var BOX_WIDTH = 80;
var BOX_HEIGHT = 80;
var MAX_BOXES = 0;

var BONE_WIDTH = 75;
var BONE_HEIGHT = 87;
var MAX_BONES = 0;

var PLANE_WIDTH = 150;
var PLANE_HEIGHT = 80;
var MAX_PLANES = 0;

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
var didPlayerWinGame = false;

var gameOver = true;
var cleo1 = true;
var cleo2 = false;
var cleo3 = false;
var cleo4 = false;
var cleo5 = false;
var cleo6 = false;


var gameOverCycleStarted = false;

//  StartTime
var startTime = 9999999999999999;


//  Levels

var level1 = true;
var level2 = false;
var level3 = false;
var level4 = false;

var areBonesSpawning = false;
var areBoxesSpawning = false;
var arePlanesSpawning = false;
var areAnvilsSpawning = false;

//  Player Movement
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


//  Preload game images
var images = {};
[
    "start-button.png",

    "level.png", "barn.png", "paradise.png",

    "player.png", "cleo-fadein-1.png", "cleo-fadein-2.png", "cleo-fadein-3.png", "cleo-fadein-4.png", "cleo-fadein-5.png",

    "bouffe-parachute.png", "bone-parachute.png", "tuque-parachute.png",

    "bombe-parachute.png", "spike-parachute.png", "anvil.png", "box.png",

    "boule-neige.png", "plane-right.png", "plane-left.png",

    "black-screen.png", "gameover1.png", "gameover2.png", "gameover3.png", "gameover4.png", "gameover5.png", "gameover6.png",

].forEach(imgName => {
    var img = document.createElement('img');
    img.src = 'images/' + imgName;
    images[imgName] = img;
});

var music = new Audio("audio/music.wav");
var woofStart = new Audio("audio/woof-woof-start.wav");
var planeFlyBy = new Audio("audio/plane-fly-by.wav");
var bonePickup = new Audio("audio/bone-pickup.wav");
var die = new Audio("audio/die.wav");



// This section is where you will be doing most of your coding
class StartButton {
    constructor() {
        this.sprite = images['start-button.png'];
    }
    render(ctx) {
        if (displayStartButton) {
            ctx.drawImage(this.sprite, buttonX, buttonY)
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
        this.sprite = images['player.png'];

        this.speed = 0.25;
    }
    // This method is called by the game engine when left/right arrows are pressed
    move(direction) {
        if (direction === MOVE_LEFT) {
            playerMoveLeft = true;
        } else if (direction === MOVE_RIGHT) {
            playerMoveRight = true;
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
            ctx.drawImage(this.sprite, this.x, this.y);
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
        this.speed = Math.random() / 2 + 0.2;
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
        this.speed = Math.random() / 2 + 0.15;
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
        this.horizontalSpeed = Math.random() / 4 + 0.02;
        this.verticalSpeed = (Math.random() - 0.5) / 10;
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

        // Setup the <canvas> element where we will be drawing
        var canvas = document.createElement('canvas');
        canvas.width = GAME_WIDTH;
        canvas.height = GAME_HEIGHT;
        element.appendChild(canvas);
        this.ctx = canvas.getContext('2d');

        //  STARTBUTTON:/
        canvas.addEventListener('click', function (event) {
            // NOTE: This assumes canvas element is positioned at top left corner 
            if (
                event.x > buttonX &&
                event.x < buttonX + buttonW &&
                event.y > buttonY &&
                event.y < buttonY + buttonH
            ) {
                // Executes if button was clicked!
                displayStartButton = false;
                startTime = Date.now();
                music.play();
            }
        });


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
        //  TODO: ajouter right planes fait crasher le jeu
        // if (!this.rightPlanes) {
        //     this.rightPlanes = [];
        // }

        while (this.leftPlanes.filter(e => !!e).length < MAX_PLANES) {
            this.addPlane();
        }
        // while (this.rightPlanes.filter(e => !!e).length < MAX_PLANES) {
        //     this.addPlane();
        // }
    }

    setupBones() {
        if (!this.bones) {
            this.bones = [];
        }

        while (this.bones.filter(e => !!e).length < MAX_BONES) {
            this.addBone();
        }
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
        planeFlyBy.play();

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
    stopSpawningEverything() {
        MAX_ANVILS = 0;
        MAX_BOXES = 0;
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


        // Listen for keyboard left/right and update the player
        document.addEventListener('keydown', down => {
            if (down.keyCode === LEFT_ARROW_CODE) {
                this.player.move(MOVE_LEFT);
            } else if (down.keyCode === RIGHT_ARROW_CODE) {
                this.player.move(MOVE_RIGHT);
            } else if (down.keyCode === UP_ARROW_CODE) {
                this.player.move(MOVE_UP);
            } else if (down.keyCode === DOWN_ARROW_CODE) {
                this.player.move(MOVE_DOWN);
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
                barnStart = true;
                MAX_BONES = 2;
                MAX_BOXES = 2;
                document.getElementById("background").classList.remove("background-start")
                document.getElementById("background").classList.add("background")
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
        console.log(MAX_PLANES)

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
        if (timeElapsed < 10000) {
        } else if (timeElapsed < 15000) {
            if (!areBonesSpawning) {
                areBonesSpawning = true;
                MAX_BONES = 1;
            }
        } else if (timeElapsed < 30000) {
            if (!areBoxesSpawning) {
                areBoxesSpawning = true;
                MAX_BOXES = 1;
            }
        } else if (timeElapsed < 60000) {
            if (!arePlanesSpawning) {
                arePlanesSpawning = true;
                MAX_PLANES = 1;
            }
        } else if (timeElapsed < 90000) {
            if (!areAnvilsSpawning) {
                areAnvilsSpawning = true;
                MAX_ANVILS = 1;
            }
        } else if (timeElapsed < 120000) {
            paradiseStart = true;
        }


        //  Update the player's positon if needed
        if (playerMoveLeft === true) {
            this.player.updateHorizontal(-timeDiff);
        } else if (playerMoveRight === true) {
            this.player.updateHorizontal(timeDiff);
        }
        if (playerMoveUp === true) {
            if (playerMoveLeft || playerMoveRight) this.player.updateVertical(-timeDiff / 1.5);
            else this.player.updateVertical(-timeDiff);
        } else if (playerMoveDown === true) {
            if (playerMoveLeft || playerMoveRight) this.player.updateVertical(timeDiff / 1.5);
            else this.player.updateVertical(timeDiff);
        }


        //  Checks if we're at the start or end of the level
        if (barnStart === true) {
            this.barn.update(timeDiff);
        }
        if (paradiseStart === true) {
            this.stopSpawningEverything();
            this.paradise.update(timeDiff);
            if (this.paradise.y >= 0) {
                didPlayerWinGame = true;
            }
        }


        this.pointDisplay()

        // Call update on all game elements
        if (!isGamePaused) {
            this.anvils.forEach(anvil => anvil.update(timeDiff));
            this.boxes.forEach(box => box.update(timeDiff));
            this.leftPlanes.forEach(plane => plane.update(timeDiff));
            this.bones.forEach(bone => bone.update(timeDiff));
        }

        // Draw everything!
        this.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        this.anvils.forEach(anvil => anvil.render(this.ctx));
        this.boxes.forEach(box => box.render(this.ctx));
        this.leftPlanes.forEach(plane => plane.render(this.ctx));
        this.bones.forEach(bone => bone.render(this.ctx));
        this.barn.render(this.ctx);
        this.paradise.render(this.ctx);
        this.player.render(this.ctx);
        this.startButton.render(this.ctx);
        if (gameOver) {
            this.ctx.drawImage(images['black-screen.png'], 0, 0)
            if (cleo1) this.ctx.drawImage(images['gameover1.png'], GAME_WIDTH / 2 - 150, 20)
            else if (cleo2) this.ctx.drawImage(images['gameover2.png'], GAME_WIDTH / 2 - 150, 20)
            else if (cleo3) this.ctx.drawImage(images['gameover3.png'], GAME_WIDTH / 2 - 150, 20)
            else if (cleo4) this.ctx.drawImage(images['gameover4.png'], GAME_WIDTH / 2 - 150, 20)
            else if (cleo5) this.ctx.drawImage(images['gameover5.png'], GAME_WIDTH / 2 - 150, 20)
            else if (cleo6) this.ctx.drawImage(images['gameover6.png'], GAME_WIDTH / 2 - 150, 20)

            if (!gameOverCycleStarted) {
                var cycle = setInterval(function () {
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
                }, 250)
                gameOverCycleStarted = true;
            }
        }



        // REACHBOTTOM:/
        this.anvils.forEach((anvil, anvilIdx) => {
            if (anvil.y > GAME_HEIGHT || paradiseStart) {
                delete this.anvils[anvilIdx];
                if (level1) {
                    setTimeout(() => MAX_ANVILS = 1, Math.floor(Math.random() * 5000 + 5000))
                }
            }
        });
        this.boxes.forEach((box, boxIdx) => {
            if (box.y > GAME_HEIGHT || paradiseStart) {
                delete this.boxes[boxIdx];
            }
        });
        this.leftPlanes.forEach((plane, planeIdx) => {
            if (plane.x > GAME_WIDTH || paradiseStart) {
                delete this.leftPlanes[planeIdx];
                if (level1) {
                    MAX_PLANES = 0;
                    setTimeout(() => MAX_PLANES = 1, Math.floor(Math.random() * 5000 + 5000))
                }
            }
        });
        this.bones.forEach((bone, boneIdx) => {
            if (bone.y > GAME_HEIGHT || paradiseStart) {
                delete this.bones[boneIdx];
                if (level1) {
                    MAX_BONES = 0;
                    setTimeout(() => MAX_BONES = 1, Math.floor(Math.random() * 5000 + 5000))
                }
            }
        });
        this.setupAnvils();
        this.setupBoxes();
        this.setupPlanes();
        this.setupBones();

        //  Check if the player picked up bones
        if (this.didPlayerPickUpFood()) {
            console.log("animation points++")
        }


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

    //  PLAYER HIT ITEMS? :/
    didPlayerPickUpFood() {
        for (let i = 0; i < this.bones.length; i++) {
            if (this.bones[i] == undefined) continue;

            else if (
                this.bones[i].x < this.player.x + PLAYER_WIDTH &&
                this.bones[i].x + BONE_WIDTH > this.player.x &&
                this.bones[i].y < this.player.y + PLAYER_HEIGHT &&
                this.bones[i].y + BONE_HEIGHT > this.player.y) {

                this.score += 1000
                bonePickup.play();

                pointsLocationX = this.bones[i].x;
                pointsLocationY = this.bones[i].y;
                points = 1000;
                displayPoints = true;

                MAX_BONES = 0;

                if (level1) {
                    setTimeout(() => MAX_BONES = 1, Math.floor(Math.random() * 5000 + 5000))
                }


                delete this.bones[i]

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

                console.log("DEAD")
                // this.stopScrollingLevel()
                // return true;
            }
        }
        //  Planes
        for (let i = 0; i < this.leftPlanes.length; i++) {
            if (this.leftPlanes[i] == undefined) continue;
            else if (
                this.leftPlanes[i].x < this.player.x + PLANE_WIDTH &&
                this.leftPlanes[i].x + PLANE_WIDTH > this.player.x &&
                this.leftPlanes[i].y < this.player.y + PLANE_HEIGHT &&
                this.leftPlanes[i].y + PLANE_HEIGHT > this.player.y) {

                console.log("DEAD")
                // this.stopScrollingLevel()
                // return true;
            }
        }
        //  Box
        for (let i = 0; i < this.boxes.length; i++) {
            if (this.boxes[i] == undefined) continue;
            else if (
                this.boxes[i].x < this.player.x + BOX_WIDTH &&
                this.boxes[i].x + BOX_WIDTH > this.player.x &&
                this.boxes[i].y < this.player.y + BOX_HEIGHT &&
                this.boxes[i].y + BOX_HEIGHT > this.player.y) {

                console.log("DEAD")
                die.play();
                // this.stopScrollingLevel()
                // return true;
            }
        }
        return false;
    }
}


// This section will start the game
var gameEngine = new Engine(document.getElementById('app'));
gameEngine.start();