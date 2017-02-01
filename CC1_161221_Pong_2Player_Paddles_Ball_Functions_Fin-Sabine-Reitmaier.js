   /* 
Simple Pong Game for Two Players 
Sabine Reitmaier @ IMD CC1 16/17 
*/


//Booleans
var GameIntro = true; 
var GameActive = false;
var GameEnd = false;
var GameReset = false;
var ScoreL = false;
var ScoreR = false;

//Integers 
//Check Counter Variables 
var counterR= 0;
var counterL= 0;

//Animate Intro
var xAnimate = 90;
var SpeedAnimate = 5;


//Object
//KeyboardInput
var keysdown = {
    a:65,
    s:83,
    k:75,
    l:76,
    space:32,
    m:77
};  
    
var keyPressed = function(){
    keysdown[keyCode]=true;
};

var keyReleased = function(){
    keysdown[keyCode]=false;
};

/*suggestion for smoother keygrab-rate and keycode-array by Davide Becker*/   
//Properties of the RIGHT Paddle

var PaddleR = function(x,y){
    this.x = x;
    this.y = y;
    this.speed = 7;

    this.move = function (){
        
        if (keysdown[keysdown.l]){
            this.y = this.y + this.speed;
             if (this.y >= 458){
                this.y = 458;
            }
            
        }
        if (keysdown[keysdown.k]){
            this.y = this.y - this.speed;
            if (this.y <= 0){
                this.y = 0;
            }
        }
    };
    
    this.make = function (){
    this.move();
    fill(255);
    noStroke();
    rect(this.x,this.y, 10 ,80);
    };
    
  
};

//Properties of the LEFT Paddle

var PaddleL = function(x,y){
    this.x = x;
    this.y = y;
    this.speed = 7 ;
 
    this.move = function (){
       
        if (keysdown[keysdown.a]){
            this.y = this.y + this.speed;
            if (this.y >= 458){
                this.y = 458;
            }
          
        }
        if (keysdown[keysdown.s]){
            this.y = this.y - this.speed;
             if (this.y <= 0){
                this.y = 0;
            }
           
        }
    };
    
    this.make = function (){
    this.move();
    fill(255);
    noStroke();
    rect(this.x,this.y, 10,80);
    
    };
 


};

// Properties of the Ball
var Ball = function (GamePaddleL, GamePaddleR) {
    this.x = 200;
    this.y = 200;
    this.xdir = -4;
    this.ydir = 2;
  
  
    
    this.move = function() {
    this.x = this.x + this.xdir;
    this.y = this.y + this.ydir;


        if ( ( (this.x >= GamePaddleL.x  && this.y >= GamePaddleL.y) && (this.x <= (GamePaddleL.x + 10)   && this.y  <= (GamePaddleL.y +80)) ) ||  ( this.x <= GamePaddleR.x  && this.y >= GamePaddleR.y) && ( ( this.x >= (GamePaddleR.x - 10)  && this.y <=  (GamePaddleR.y + 80) )))
            
        {
        this.xdir = -this.xdir; 
     
       
        }
        
        if (this.x <= 0){
            counterR = counterR +1;
            this.x = 300;
            this.y =150;
             if (this.ydir > 0){
            this.ydir = this.ydir;
            }
            if (this.ydir < 0){
            this.ydir = - this.ydir;
            }
        }
        
        if ( this.x >= width ){
            counterL = counterL +1;
            this.x =200;
            this.y =200;
            if (this.ydir > 0){
            this.ydir = this.ydir;
            }
            if (this.ydir < 0){
            this.ydir = - this.ydir;
            }
          
        }

        if ( this.y <= 0 || this.y >= height ){
        this.ydir = -this.ydir ;
        }
    };

    this.make = function() {
    rect(this.x,this.y,12,12);
    };
    
   
};  


//Objectify
var pL = new PaddleL(30,250);
var pR = new PaddleR(460,250);
var b = new Ball(pL,pR);




var draw = function (){
   
//Screen 1 "GameCondition Beginning" 

if (GameIntro || GameReset) {
   
    //show intro screen with instructions       
    background(0);
    fill(255);
    textSize(80);
    text("PONG",74,257);
    textSize(15);
    text("Right Player:   A for UP    S for DOWN",80,299);
    text("Left Player:     K for UP    L for DOWN",80,320);
    text("Ready to go ? Hit SPACE!",80,400);
    fill(255);
    noStroke();
    rect(80,79, 10,60);
    rect(400,79, 10,60);

    //animate ball in intro 
    rect(xAnimate,80,12,12);
    xAnimate = xAnimate + SpeedAnimate;

        if (xAnimate >= 394 || xAnimate <= 84) {
        SpeedAnimate = - SpeedAnimate;
        }


    //hit Space to show the gamescreen 
    if (keysdown[keysdown.space]){
    GameActive=true;
    GameIntro=false;
                    
    }
    
}

    

//Screen 2 "Game is ON"  

if (GameActive ){
    
    //set background to black    
    background(0, 0, 0);
    
    //draw middleline
    rect(width/2, 0, 2, 1142);
    
    //draw counter Right and Left
    fill(255);
    textSize(20);
    text(counterR, 264,25);
    text(counterL, 208,25);
    
   //Make Paddle Left Object
    pL.make(); 
    
    //Make Paddle Right Object
    pR.make();
    
    //Make Ball Object
    b.make();
    
    //Move Ball Object
    b.move();
   


    
    if (counterL === 10 ) 
    {
        GameEnd =true;
        GameActive = false;
        ScoreL = true;
        
    }
    
    if (counterR === 10)
     {
        GameEnd =true;
        GameActive = false;
        ScoreR = true;
        
    }
}
    
//GameCondition END 

if (GameEnd && ScoreL){
    background(0, 0, 0);
    fill(255);
    textSize(15);
    text("YOU WIN!", 40,250);
    text ("Wanna play again? Press M!", 155,300);
   
    //hit Space to show the gamescreen 
    if (keysdown[keysdown.m]){
    GameIntro = true;
    GameReset = true;
    GameEnd = false;
    counterR = 0;
    counterL = 0;
    }
    
   }
   
if (GameEnd && ScoreR){
    background(0, 0, 0);
    fill(255);
    textSize(15);
    text(" YOU WIN!", 389,250);
    text ("Wanna play again? Press M!", 155,300);
    
    //hit m to show the gamescreen 
    if (keysdown[keysdown.m]){
    GameIntro = true;
    GameReset = true;
    GameEnd = false;
    counterR=0;
    counterL=0;
    }
    
  
    
   }

  
 };
 

/*Restart Game Button 

If (PlayAgainIsPressed) {
GameEnd = false;
GameIntro= true;
};

//hit Space to show the gamescreen 
    if (keysdown[keysdown.space]){
    GameActive=true;
    GameIntro=false;}
*/









    

