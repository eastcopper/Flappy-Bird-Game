const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1520;
canvas.height = 600;

let bird = new Image();
let pipe = new Image();
let reversePipe = new Image();
let birdX = 100;
let birdY = 300;
let gravity = 7;
let jump = false;
let wing = 0;
let winging = true;
let game = false;
let pipeX = 1520;
let pipeY = 350;

let birdImg = [
    "../asset/bird1.png",
    "../asset/bird2.png",
    "../asset/bird3.png",
    "../asset/bird4.png"
];
let pipeImg = [
    "../asset/pipe.png",
    "../asset/reversePipe.png"
];

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function oneTimeListener(element, type, callback) {
    element.addEventListener(type, function () {
        element.removeEventListener(type, arguments.callee);
        return callback();
    });
}

oneTimeListener(document.getElementById('playGame'), 'click', function () {
    let num = 0;
    game = true;
    setInterval(function () {
        if (game) {
            if (jump) {
                birdY -= 10;
                num++;
            }
            if (num > 15) {
                num = 0;
                jump = false;
            }
        }
        pipeX -= 5;
    }, 10);

    setInterval(function () {
        if (game) {
            pipe.src = pipeImg[0];
            reversePipe.src = pipeImg[1];
            draw();
            if (!jump) {
                birdY += gravity;
            }
        }
        if (birdY < -10 || birdY > 520) {
            game = false;
            winging = false;
        }
    }, 20);

    setInterval(function () {
        pipeY = getRandomIntInclusive(250, 550);
        if (pipeX < 0) {
            pipeX = 1520;
        }
    }, 3200);
});

setInterval(function () {
    if (winging) {
        bird.src = birdImg[wing];
        draw();
        if (wing < 3) {
            wing++;
        }
        else {
            wing = 0;
        }
    }
}, 100)

function keyEvent(event) {
    if (event.key == 'Escape' && birdY > -10 && birdY < 520) {
        game = false;
    }
    if (event.key == 'Enter' && birdY > -10 && birdY < 520) {
        game = true;
    }
    if (event.key == 'r') {
        location.reload();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bird, birdX, birdY);
    ctx.drawImage(pipe, pipeX, pipeY);
    ctx.drawImage(reversePipe, pipeX, pipeY - 700);
}

function move() {
    jump = true;
}

document.addEventListener("keydown", keyEvent);
document.addEventListener("click", move);