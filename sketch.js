var bananaImage,banana,bananaGroup;
var obstacleImage,obstacleGroup,stone;

var score=0;

var backgroundImage,gound,invisibleGround,backGround;
var monkey,monkeyImage;

var PLAY=1,END=0,gameState=PLAY;

function preload() { 
 createCanvas(400,400);
  
  monkeyImage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  backgroundImage=loadImage("jungle2.jpg");
  
  bananaImage=loadImage("Banana.png");
  obstacleImage=loadImage("stone.png");
  
}

function setup() {
  
  backGround=createSprite(200,200,400,400);
  backGround.addImage(backgroundImage);
  
  monkey=createSprite(70,350,20,30);
  monkey.addAnimation("monkey",monkeyImage);
  monkey.scale=0.2;
  
  invisibleGround=createSprite(200,380,800,10);
  invisibleGround.visible=false;
  invisibleGround.velocityX=-4;

  
  bananaGroup = new Group();

  obstacleGroup=new Group();
}



function draw() {
   
  if(gameState===PLAY) {
        
    if(keyDown("space")) {
      monkey.velocityY = -9;
       }
    
      monkey.velocityY=monkey.velocityY+0.8;

    
  if(invisibleGround.x<0) {
     invisibleGround.x=invisibleGround.width/2;
     }
  
  if(bananaGroup.isTouching(monkey)) {
      score=score+2;
      bananaGroup.destroyEach();
     }
    
      spawnBananas();
  
      spawnStones();
    
     if(obstacleGroup.isTouching(monkey)) {
      gameState=END;
      
    }
    
  }
  
  else if(gameState===END) {
          
    invisibleGround.velocityX=0;
    
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);

    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    
    score=0;
    
    gameState=PLAY;
    
    if(keyDown("r")) {
       reset();
    }
  
}
          
  monkey.collide(invisibleGround);
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("score:"+ score,310,40);
  
}

function spawnBananas() {
 
  if(frameCount% 60===0) {
      var banana=createSprite(400,200,20,10);
      banana.addImage(bananaImage);
      banana.y=Math.round(random(120,200));
      banana.scale=0.07;
      banana.velocityX=-6;
    
      banana.lifetime=80;
    
      bananaGroup.add(banana);
    
     }
}

function spawnStones() {

  if(frameCount%150===0) {
   
    var stone=createSprite(400,370,20,10);
    stone.addImage(obstacleImage);
    stone.velocityX=-6;
    
    stone.scale=0.19;
    
    stone.lifetime=90;
    
    obstacleGroup.add(stone);
    
    }

}

function reset() {
  
  gameState=PLAY;
  
 ground.velocityX=0;
  
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  
  score=0;
}