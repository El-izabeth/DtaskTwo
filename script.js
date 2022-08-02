const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = innerWidth-20;
canvas.height = innerHeight-20;
var k = 1;
var score = 0;
var highscore = 0;
var q = 3;
//var z = 0;
//var g = false;
//document.getElementById("play").style.display = "none";



class Platform{
    constructor(x,y,v){
        this.x = x;
        this.y = y;
        this.v = v;
    }
    draw(){
        c.beginPath();
        c.rect(this.x,this.y,200,17);
        c.strokeStyle="orange";
        c.stroke();
        c.fillStyle = "orange";
        c.fill();
    }
    moveUp(){
        this.y = this.y - this.v;
    }
}

class Player{
    constructor(x,y,v){
        this.x=x;
        this.y=y;
        this.v=v;
        
    }
    
    draw(){
        c.beginPath();
        c.arc(this.x,this.y,25,0,Math.PI*2);
        c.strokeStyle="yellow";
        c.stroke();
        c.fillStyle = "yellow";
        c.fill();
    }
    
    update(){
        var l = 0;
        for(l=0; l<platforms.length;l++){

        
            if(this.y<(platforms[l].y-25)){
                this.x = this.x + this.v.x;
                this.y = this.y + this.v.y;
                this.v.y+=0.05;
            }
            else{
                
                if(this.x>platforms[l].x&&this.x<(platforms[l].x+200)&&this.y<=platforms[l].y){
                    this.v.y=0;
                    this.y = platforms[l].y-25;                  
                
                }
            }
        }
    }
}
   

//player creation
var x = canvas.width/2;
var y = 100;
const player = new Player(x,y,{x: 0, y: 0});

//platforms creation

const platform = new Platform(canvas.width/2-100,700,1.5);
var platforms = new Array();
platforms[0] = platform;



function createPlatform(){
    
    var x = Math.floor(Math.random() * (canvas.width-200));
    var y = canvas.height;
    const platform1 = new Platform(x,y,1.5);
    platforms.push(platform1);
}
function checkKeypress(code){
    
    if(code=="ArrowRight"){
        player.v.x = 1;
    }
    else if(code=="ArrowLeft"){
        player.v.x=-1;
    }
    

}
function gameOver(score){
    c.clearRect(0,0,canvas.width,canvas.height);
    c.font = "50px Comic Sans MS";
    c.fillStyle = "red";
    c.textAlign = "center";
    c.fillText("GAME OVER",canvas.width/2,250);
    c.font = "20px Comic Sans MS";
    c.fillStyle = "blue";
    c.textAlign = "center";
    c.fillText("Score:"+score,canvas.width/2,300);
    c.font = "30px Comic Sans MS";
    
    
    
}


function animate1(){
    
   // result.classList.add('hide');
    
    requestAnimationFrame(animate1);
    c.clearRect(0,0,canvas.width,canvas.height);
    player.update();
    
    player.draw();
    
    
    for(i = 0; i < canvas.width; i+=20){
        c.beginPath();
        c.moveTo(i,0);
        c.lineTo(i+20,0);
        c.lineTo(i+10,25);
        c.closePath();
        c.strokeStyle="red";
        c.stroke();
        c.fillStyle="red";
        c.fill();
    }
    for(p=0;p<k;p++){
        platforms[p].moveUp();
        platforms[p].draw();

    }
   
    
    if((platforms[k-1].y<(canvas.height-100))){
        createPlatform();
        k++;
        
    }
    
    document.addEventListener('keydown', (event) => {
        var name = event.key;
        var code = event.code;
        
        checkKeypress(code);
      }, false);
    
    if(player.y>=canvas.height-30||player.y<=50){
        q--;     
        player.y = 100;
        player.x = canvas.width/2;
        player.v.y = -1;
        player.v.x = 0;
    }

    if(q<=0){
        gameOver(score);
      
        window.cancelAnimationFrame();
    }

    
    score+=0.05;
    
   
    c.font = "20px Comic Sans MS";
    c.fillStyle = "red";
    c.textAlign = "center";
    c.fillText(`${'	\u2764'.repeat(q)}`,50,50)

}



animate1();



