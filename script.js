//เริ่มเกม
//ตั้งค่าหน้าจอเกม
let board;
let boardWidth = 800;
let boardHeight = 300;
let context;

//ตั้งค่าตัวละคร
let playerWidth = 90;
let playerHeight = 90;
let playerX = 50;
let playerY = 215. ;
let playerImg;
let player = {
    x: playerX,
    y: playerY,
    width: playerWidth,
    height: playerHeight
}
let gameOver = false;
let score = 0;
let time = 0;

//อุปสรรค_
let boxImg;
let boxWidth = 90;
let boxHeight = 90;
let boxX = 700;
let boxY = 215;

//setting box
let boxsArray = [];
let boxSpeed = -10;

//Gravity & Velocity
let VelocityY = 0;
let Gravity = 0.25;

let maxTime = 60;
let lives = 3;

//การกำหนดเหตุการณ์
window.onload = function() {
    board = document.getElementById('board');
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext('2d');

    playerImg = new Image();
    playerImg.src = "image/nokjed.png";
    playerImg.onload = function() {
        context.drawImage(playerImg, player.x, player.y, player.width, player.height);
    }
    //request Animation Frame
    requestAnimationFrame(update);
    //ดักจับ
    
    document.addEventListener("keydown", movePlayer);
    document.addEventListener("mousedown", movePlayer);
    document.addEventListener("mousedown", refreshing);
    document.addEventListener("keydown",refreshing);
    
    //สร้างbox
    boxImg = new Image();
    boxImg.src = "image/Elephant_Power.png";
    Timelive();
}
let Timelive = () => {
    let timeInterval = Math.floor(Math.random() * (4000 - 500 + 1)+1000); // สุ่มเวลาในช่วง 1.5-5 วินาที 
    // Debugging: แสดงเวลาสุ่มใน console
    console.log("Next box will be created in: " + timeInterval + "ms");

    setTimeout(() => {
        createbox();
        Timelive();
    }, timeInterval);
};

//function Update
function update() {
    requestAnimationFrame(update); //updateตลอดเวลา
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);
    VelocityY += Gravity;

    //create play Object
    player.y = Math.min(player.y + VelocityY, playerY);
    context.drawImage(playerImg, player.x, player.y, player.width, player.height);

    //create Array box
    for (let i = 0; i < boxsArray.length; i++) {
        let box = boxsArray[i];
        box.x += boxSpeed;
        context.drawImage(box.img, box.x , box.y, box.width, box.height)

        //ตรวจสอบเงื่อนไข
        if (onCollision(player, box)) {
            // แจ้งเตือนถ้าชีวิตหมด
            if (lives > 1) {
                lives--;
                context.textAlign = "center";
                context.font = "bold 40px Arial";
                context.fillText("GameOver!!!!!" ,boardWidth / 2, boardHeight/2);
                context.font = "bold 40px Arial";
                context.fillText("Score = " + (score + 1), boardWidth / 2, 200);
                gameOver = true;
            }
            else if(lives == 1){
                lives--;
                if(lives == 0){
                gameOver = true;
                context.fillStyle = "red";
                context.textAlign = "center";
                context.font = "bold 40px Arial";
                context.fillText("GameOver!!!!!" ,boardWidth / 2, boardHeight/2);
                context.font = "bold 40px Arial";
                context.fillText("Score = " + (score + 1), boardWidth / 2, 200);
                }
            }
        }
    }

    //ชีวิต
    context.font = "normal bold 20px Arial";
    context.textAlign = "left";
    context.fillText("Lives : " + lives, 10, 50);
    
    //นับคะแนน
    score++;
    context.font = "normal bold 20px Arial";
    context.textAlign = "left";
    context.fillText("Score : " + score, 10, 30);

    //นับเวลา
    time += 0.01;
    context.font = "normal bold 20px Arial";
    context.textAlign = "right";
    context.fillText("Time : " + (time.toFixed(2)), 765, 30);
    
    if (time >= maxTime) {
        //แจ้งเตือน
        context.font = "bold 40px Arial";
        context.textAlign = "center";
        context.fillStyle = "yellow";
        context.fillText("You Winnnn!!!!", boardWidth / 2, boardHeight / 2);
        context.font = "bold 40px Arial";
        context.fillText("Score = " + (score-1), boardWidth / 2, 200);
        context.font = "bold 40px Arial";
        context.fillText("Live = " + lives, boardWidth / 2, 250);
        gameOver = true;
        }
    
    }


//function เคลื่อนตัวละคร
function movePlayer(e) {
    if (gameOver) {
        return;
    }
    if (player.y == playerY) {
        VelocityY = -10;
    }
    if (e.code == "Space" && player.y == playerY) {
        VelocityY = -10;
    }
}
function createbox() {
    if (gameOver) {
        return;
    }
    let box = {
        img: boxImg,
        x: boxX,
        y: boxY,
        height: boxHeight,
        width: boxWidth
    }

    boxsArray.push(box);
    if (boxsArray.length > 5) {
        boxsArray.shift;
    }
}

function onCollision(obj1, obj2) {
    return obj1.x < (obj2.x + obj2.width) &&
        (obj1.x + obj1.width) > obj2.x //ชนกันในแนวนอน
        &&
        obj1.y < (obj2.y + obj2.height) &&
        (obj1.y + obj1.height) > obj2.y //ชนในแนวตั้ง
}
function refreshing() {
    if (gameOver == true && lives >0){
        boxsArray =[];
        score =0;
        time = 0;
        gameOver = false;
    }
}

//restart
function restartGame() {
    if(lives == 0){
    location.reload();
    }
}