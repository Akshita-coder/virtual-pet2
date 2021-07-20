//Create variables here
var dogImg1, dogImg2;
var database;
var dog;
var foodStock, foodS;

function preload()
{
  dogImg1 = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
	//load images here
}

function setup() {
	createCanvas(800, 700);
  
  database = firebase.database();
  dog = createSprite(400,350,20,20);
  dog.addImage(dogImg1);
  dog.scale = 0.5;

  foodStock = database.ref('foods');
  foodStock.on("value",readStock);

}


function draw() {  

  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg2);
  }

  fill("black");
  text("food remaining :"+foodS,170,200);

  textSize(13);
  text("note : press UP_ARROW key to feed drago milk!",130,10,300,20);
   
  //add styles here
  drawSprites();
}

function writeStock(x){
 
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    foods:x
  })

}

function readStock(data){
  foodS = data.val();

}