
var shooter1,a,b,bullets_group,zom,bul, g_img,gameStates, z,a,zombies_Group,heart1_img,heart2_img,heart3_img ,heart, c,bullet, bg_img, shooter, shooter_img1, zombie, zombie_img,start, start_img, bullet, bullet_img,  shooter_img2, lose_sound, exp_sound, welcomeScreen, welcomeScreen_img;

function preload(){
bg_img = loadImage("assets/bg.jpeg")
shooter_img1 = loadImage("assets/shooter_2.png")
shooter_img2 = loadImage("assets/shooter_3.png")
zombie_img = loadImage("assets/zombie.png")
lose_sound = loadSound("assets/lose.mp3")
exp_sound = loadSound("assets/explosion.mp3")
welcomeScreen_img = loadImage("assets/welcome.png")
start_img = loadImage("assets/start.png")
heart1_img = loadImage("assets/heart_1.png")
heart2_img = loadImage("assets/heart_2.png")
heart3_img = loadImage("assets/heart_3.png")
g_img= loadImage("assets/g.png")

}

function setup(){
  createCanvas(1000,700);
  gameStates = 1
  if (gameStates===1){
  
  c = 10
  
  start = createSprite(500,650,170,50)
  start.addImage(start_img)
  start.scale=0.5
  }

  a=3
  b=1
  shooter = createSprite(100,500,50,100)
  shooter.addImage(shooter_img1)
  
  shooter.scale=0.5
  shooter.visible=false;
  shooter.debug=true;

  heart = createSprite( 100,100)
  
  heart.addImage(heart3_img)
  heart.scale=0.3
  
  heart.visible=false;

  zombies_Group = new Group();
  bullets_Group = new Group();
  
}

function draw(){
if(gameStates===1){
  background(welcomeScreen_img)
}
if(mousePressedOver(start)){
  gameStates = 2;
  start.destroy();
  shooter.visible=true;
  heart.visible=true;
}
  if(gameStates === 2){
  
background(bg_img)

if(keyDown(UP_ARROW) && shooter.y>=360){
  shooter.y = shooter.y-10
}
if(keyDown(DOWN_ARROW) && shooter.y<=500){
  shooter.y = shooter.y+10
}
if(keyDown(RIGHT_ARROW) && shooter.x<=600){
  shooter.x = shooter.x+10
}
if(keyDown(LEFT_ARROW) && shooter.x>=100){
  shooter.x = shooter.x-10
}



for(var i=0; i<zombies_Group.length; i++){
  z = zombies_Group[i];
  if(z.isTouching(shooter) && a===3){
    heart.addImage(heart2_img)
    a=2;
    z.destroy();

  }
  if(a===2){
    if(z.isTouching(shooter)){
      heart.addImage(heart1_img);
      z.destroy();
      a=1;
    }
  }

  if(a===1){
    if(z.isTouching(shooter)){
      z.destroy();
      heart.visible=false;
      shooter.visible=false;
      gameStates=3;

      
    }
  }

  
  for(var b=0; b<bullets_Group.length; b++){
    bul = bullets_Group[b]
    if( c>=0 && z.isTouching(bul)){
      z.destroy();
      bul.destroy();
    }
  }

}



spawnZombies()
spawnBullets()


fill("white")
textSize(25)
text("Bullets Left: "+c,30,50)
  




  
 if(gameStates!=2){
  background("black")
  shooter1 = createSprite(shooter.x,shooter.y,50,100)
 shooter1.addImage(zombie_img)
 
 shooter1.scale=0.25
 shooter1.velocityX=-6
 }
 

  }




drawSprites()

}


function spawnZombies(){
  if(frameCount%100===0 && gameStates===2){
    zombie = createSprite(1050,random(360,250),50,100)
    zombie.addImage(zombie_img)
    zombie.velocityX = -6
    zombie.scale = 0.25
    zombies_Group.add(zombie)
    zombie.debug = true;
    zombie.setCollider("rectangle",0,0,200,zombie.height-100)
  }
}

function spawnBullets(){
  if(c>0 && keyWentDown("enter") && gameStates===2){
  
    shooter.addImage(shooter_img2)
    bullet = createSprite(shooter.x+50,shooter.y-42,22,5)
    bullet.velocityX = 12
    bullets_Group.add(bullet)
    c=c-1
    bullet.debug=true;
    
  }
  else if(keyWentUp("enter")){
    
    shooter.addImage(shooter_img1)
    
  }
}






