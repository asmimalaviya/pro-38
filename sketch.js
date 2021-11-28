/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1;

var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
  
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  

kangaroo = createSprite(150,380,20,50);
  
  kangaroo.addAnimation("running", kangaroo_running);
  kangaroo.addAnimation("collided", kangaroo_collided);
  kangaroo.scale = 0.15;

  invisibleGround = createSprite(400,390,800,10);
  invisibleGround.visible = false;

  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
//kangaroo.x=camera.position.x-270

  score = 0;

}

function draw() {
  background(255);
  kangaroo.collide(invisibleGround);


  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    jungle.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && kangaroo.y >= 259.9) {
      kangaroo.velocityY = -12;
    }
  console.log(kangaroo.y)
    kangaroo.velocityY = kangaroo.velocityY + 0.8
  
    if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
  
    
   
  // spawnClouds();
   spawnObstacles();
  
  //  if(obstaclesGroup.isTouching(trex)){
      //  gameState = END;
    //}
  }

  drawSprites();

}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(800,320,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    obstacle.addImage("stone",obstacle1)
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
   if (frameCount % 60 === 0) {
    shrub = createSprite(600,100,40,10);
    shrub.y = Math.round(random(10,60));
    shrub.addImage(shrub1Image);
    shrub.scale = 0.5;
    shrub.velocityX = -3;
    
     //assign lifetime to the variable
     shrub.lifetime = 134;
    
    //adjust the depth
    shrub.depth = kangaroo.depth;
    kangaroo.depth = kangaroo.depth + 1;
    
    //adding shrub to the group
    shrubGroup.add(shrub);
    }
  }

  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
   shrubGroup.destroyEach();
    
    kangaroo.changeAnimation("running",trex_running);
    
   
    
    score = 0;
    
  }
