var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,addFood;
var feed,lastFed ;
var foodObj;

function preload(){
sadDog  =loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(500,500);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(250,350,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(500,150);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(300,150);
  addFood.mousePressed(addFoods);

}

function draw() {
  background("green");
  foodObj.display();

 
//write code to display text lastFed time here
fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

//function to update food stock and last fed time
function feedDog(){
dog.addImage(happyDog);

var foodstockval = foodObj.getfoodstock();
if(foodstockval <= 0){
  foodObj.updateFoodStock(foodstockval *0);
}
else {
  foodObj.updateFoodStock(foodstockval -1);
}
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
  Food:foodS
  })
}
