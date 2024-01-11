var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img2 = new Image();
img2.src = 'puru.png'

var dino = {
    x : 10,
    y : 200,
    width : 70,
    height : 90 ,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img2, this.x, this.y, this.width, this.height);
    }
}
//dino.x += 1;

var img1 = new Image();
img1.src = 'baeco.png'

class Cactus {
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 100;
        this.height = 100;
    }
    draw(){
        ctx.fillStyle = 'red';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img1, this.x, this.y, this.width, this.height);
    }
}
var cactus = new Cactus();
cactus.draw();

var timer = 0;
var cactusMany = [];
var jumpTimer = 0;
var animation;
function frameAction(){
    animation = requestAnimationFrame(frameAction);
    timer++;
    ctx.clearRect(0,0, canvas.width, canvas.height);

    //dino.x++;
    if (timer % 200 === 0){
        var cactus = new Cactus();
        cactusMany.push(cactus);
    }
    cactusMany.forEach((a, i, o)=>{
        //x좌표가 0미만이면 제거
        if (a.x < 0){
            o.splice(i, 1)
        }
        a.x -= 2;

        collision(dino, a);

        a.draw();
    })

    if (jump == true){
        dino.y -= 3 ;
        jumpTimer++;
    }

    if(jump == false){
        if (dino.y < 200) {
            dino.y += 3;
        }
    }

    if (jumpTimer > 60){
        jump = false;
        jumpTimer = 0;
    }
    dino.draw()
}
frameAction();

//충돌확인
function collision(dino, cactus){
    var xDistance = cactus.x - (dino.x + dino.width);
    var yDistance = cactus.y - (dino.y + dino.height);
    if (xDistance < 0 && yDistance < 0){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation)
    }
}

var jump = false;

document.addEventListener('keydown', function(e){
    if (e.code === 'Space'){
        jump = true;
    }
})