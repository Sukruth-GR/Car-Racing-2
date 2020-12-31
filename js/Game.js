class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(300,200);
    car1.addImage(car1img);
    car2 = createSprite(500,200);
    car2.addImage(car2img);
    car3 = createSprite(700,200);
    car3.addImage(car3img);
    car4 = createSprite(900,200);
    car4.addImage(car4img);
    cars = [car1,car2,car3,car4];
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    background("#931D02");
    image(trackimg,0,-displayHeight*4,displayWidth,displayHeight*5);

    if(allPlayers !== undefined){
      //index in the car array
      var index = 0; 
      //x and y positions of cars
      var x = 250;
      var y = 0;
      //var display_position = 130;
      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index+1;
        //positioning the cars with a distance from each other
        x = x+200;
        //using data from database for position y direction
        y = displayHeight-allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        if (index === player.index){
          cars[index-1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
        else{
          cars[index-1].shapeColor = "black";
        }
        console.log(cars[0].x);
        
       // display_position+=20;
        //textSize(15);
       // text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
      drawSprites();
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }

    if(player.distance>4600){
      gameState = 2;
    }
  }
  end(){
    console.log("game ended")
  }
}
