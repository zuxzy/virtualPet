var dog, happyDog, deadDog, database, foodS, foodStock;
var doggo, doggo1, doggo2;
var hungerLevel, hungerL;
var dogState = "normal";

function preload(){
    dog = loadImage("images/dogimg.png");
    happyDog = loadImage("images/dogimg1.png");
    deadDog = loadImage("istockphoto-951307888-612x612.jpg");
}

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    doggo = createSprite(250, 250, 10, 10);
    doggo.addImage("normalDog", dog);
    doggo1 = createSprite(250, 250, 10, 10);
    doggo1.addImage("happy", happyDog);
    doggo2 = createSprite(250, 250, 10, 10);
    doggo2.addImage("dead", deadDog);
    doggo.scale = 0.3;
    doggo1.scale = 0.3;
    foodStock=database.ref("food");
    foodStock.on("value", readStock);
    hungerLevel=database.ref("hunger");
    hungerLevel.on("value", readHunger);
}

function draw(){
    background("rgb(46, 139, 87)");

    if(dogState === "normal"){
        if(keyDown(UP_ARROW)){
            if(hungerL <= 900){
                writeStock(foodS);
                hungerL = hungerL + 100;
            }
        }
        doggo.visible = true;
        doggo1.visible = false;
        doggo2.visible = false;
        if(World.frameCount%60 === 0){
            writeHunger(hungerL)
        }
        if(hungerL > 900){
            dogState = "happy";
        }
        if(hungerL === 0){
            dogState = "dead";
        }
    }

    if(dogState === "happy"){
        doggo.visible = false;
        doggo1.visible = true;
        doggo2.visible = false;
        if(World.frameCount%60 === 0){
            writeHunger(hungerL)
        }
        if(hungerL < 900 && hungerL > 0){
            dogState = "normal";
        }
    }

    if(dogState === "dead"){
        doggo.visible = false;
        doggo1.visible = false;
        doggo2.visible = true;
    }

    drawSprites();
    fill("blue");
    text("Food Left: " + foodS, 225, 30);
    text("Hunger: " + hungerL, 225, 470);
}

    
function readStock(data){
   foodS=data.val();
}

function readHunger(data){
   hungerL = data.val();
}

function writeStock(x){

    if(x<=0){
        x=0;
    } else {
        x = x-1;
    }
    database.ref('/').update({
        food:x
    })
}

function writeHunger(y){

    if(y<=0){
        y=0;
    } else {
        y = y-1;
    }
    database.ref('/').update({
        hunger:y
    })
}


function showError(){
    console.log("Error Occurred. Please Fix It You Idiot.");
}


