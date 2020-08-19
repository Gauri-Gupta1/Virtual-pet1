var dog, happyDog, dogImg, happydogImg;
var database;
var foodS, foodStock;

function preload() {
  dogImg = loadImage("images/dogImg1.png");
  happydogImg = loadImage("images/dogImg.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250, 250, 5, 5);
  dog.addImage(dogImg);
  dog.scale = 0.3;
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}

function draw() {  
  background(46,139,87);
  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happydogImg);
  }
  text("NOTE: Press UP_ARROW Key To Feed Drago Milk!" ,100,50)
  text("food remaining: " + foodS, 100, 100);
  textSize(50);
  drawSprites();
}
function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if (x<=0) {
    x=0;
  }else {
    x=x-1;
  }
  database.ref('/').set({
    Food: x
  }) 
}