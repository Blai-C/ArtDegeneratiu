/*

Interaccions:
            Ma Dreta: Index: Vista 1 Mig: Vista 2 Anular: Vista 3
            
            Ma Esquerre Mig: Fons negre opac ( Interessant en vista 2 i 3)

Notes:

Detecció d'anular no va gaire bé.




*/




let num = 60;
let sizeC = 500;
let cercles= [];
let quadrats=[];
let count=0;
let segCount=0;

let estat=0;


function setup() {
  
  let R=random(100,255);
  let G=random(0,50);
  let B=random(0,255);
  
  
  sketch=createCanvas(1800, 1000);
  for(let i=0; i<num; i++){
    cercles[i] = new Cercle(0, random(0, width), random(0, height), random(2, 4), random(-2, 2), sizeC,R,G,random(0,255),false);
    quadrats[i] = new Quadrat(0,random(0, width), 0, 80,200,R,G,250,false);
  }
  capture = createCapture(VIDEO);
  capture.hide();

  // Colors for each fingertip
  colorMap = [
    // Left fingertips
    [
      color(0, 0, 0),
      color(255, 0, 255),
      color(0, 0, 255),
      color(255, 255, 255),
    ],
    // Right fingertips
    [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255), color(255, 255, 0)],
  ];

  // #1 Turn on some models (hand tracking) and the show debugger
  // @see https://handsfree.js.org/#quickstart-workflow
  handsfree = new Handsfree({
    showDebug: true, // Comment this out to hide the default webcam feed with landmarks
    hands: true,
    setup: {
      video: {
        $el: capture.elt,
      },
    },
  });

  // Add webcam buttons under the canvas
  // Handsfree.js comes with a bunch of classes to simplify hiding/showing things when things are loading
  // @see https://handsfree.js.org/ref/util/classes.html#started-loading-and-stopped-states
  buttonStart = createButton("Start Webcam");
  buttonStart.class("handsfree-show-when-stopped");
  buttonStart.class("handsfree-hide-when-loading");
  buttonStart.mousePressed(() => handsfree.start());

  // Create a "loading..." button
  buttonLoading = createButton("...loading...");
  buttonLoading.class("handsfree-show-when-loading");

  // Create a stop button
  buttonStop = createButton("Stop Webcam");
  buttonStop.class("handsfree-show-when-started");
  buttonStop.mousePressed(() => handsfree.stop());
}

function mydrawCaptureCameraEffect(){
  //Draw camera centered with a semi transparect rect over
  /*push();
  imageMode(CENTER);
  translate(width, 0);
  scale(-1, 1);
  image(capture, width * 0.5, height * 0.5, width, height);
  noStroke();
  fill(10, 10, 10, 200);
  rect(0, 0, width, height);
  pop();*/
}

function draw() {
  noStroke();
  fill(255);

  count++;
  if(estat==0){
    vistaA();
    
  }
  else if(estat==1){
    vistaB();
  }
  else if(estat==2){
    vistaC();
  }
  mydrawCaptureCameraEffect(); //added to original code

  fingerPaint();
}


function fingerPaint() {// AQUI VA LA COSA
  // Check for pinches and create dots if something is pinched
  const hands = handsfree.data?.hands;
  if (hands?.pinchState) {
    // Loop through each hand
    hands.pinchState.forEach((hand, handIndex) => {
      // Loop through each finger
      hand.forEach((state, finger) => {
        // Other states are "start" and "released" and HELD
        if (state === "released") {
          
          if(handIndex===0 && finger===1){
            background(0);
            
          }
          if(handIndex===1 && finger===0){
            reGen(0);
            estat=0;
            
          }
          if(handIndex===1 && finger===1){
            reGen(1);
            estat=1;
            
          }
          if(handIndex===1 && finger===3){
            reGen(2);
            estat=2;
            
          }
          
        }
        
      });
    });
  }
}




function keyPressed(){
  
  if (keyCode === RIGHT_ARROW) {
    reGen(0);
    estat=0;
    background(0);
  }
  if (keyCode === LEFT_ARROW) {
    reGen(1);
    estat=1;
    background(0);
  }
  if (keyCode === UP_ARROW) {
    reGen(2);
    estat=2;
    background(0);
  }
}

function vistaA(){
for (let i=0; i<num; i++) {
    cercles[i].setPosX(cercles[i].getPosX()+cercles[i].getVelX());
    ;
    cercles[i].setPosY(cercles[i].getPosY()+cercles[i].getVelY());
    ;
    if (!cercles[i].getInc()){
      if (cercles[i].getRad()>20) {
      cercles[i].decRad(1);
      }else{cercles[i].setInc(true);}
    }
    if (cercles[i].getPosX()>width || cercles[i].getPosX()<0) {
      cercles[i].setVelX(cercles[i].getVelX()*-1);
    }
    if (cercles[i].getPosY()>height || cercles[i].getPosY()<0) {
      cercles[i].setVelY(cercles[i].getVelY()*-1);
    }
    if(count>=420){
    count=0;
    cercles[i].setColorB(random(0,255));
    }
    
    cercles[i].display();
  }
}

function vistaB(){
for (let i=0; i<num; i++) {
    cercles[i].setPosX(cercles[i].getPosX()+cercles[i].getVelX());
    ;
    cercles[i].setPosY(cercles[i].getPosY()+cercles[i].getVelY());
    ;
    if (!cercles[i].getInc()){
      if (cercles[i].getRad()>50) {
      cercles[i].decRad(1*int(cercles[i].getVelX()));
      }else{cercles[i].setInc(true);}
    }
    if (cercles[i].getInc()){
      if (cercles[i].getRad()<500) {
      cercles[i].incRad(1*int(cercles[i].getVelX()));
      }else{cercles[i].setInc(false);}
    }
    if (cercles[i].getPosX()>width || cercles[i].getPosX()<0) {
      cercles[i].setVelX(cercles[i].getVelX()*-1);
    }
    if (cercles[i].getPosY()>height || cercles[i].getPosY()<0) {
      cercles[i].setVelY(cercles[i].getVelY()*-1);
      if(cercles[i].getPosY()>height){
        quadrats[i].setPosX(cercles[i].getPosX());
        quadrats[i].setPosY(0);
        quadrats[i].setInc(true);
        quadrats[i].setColorB(cercles[i].getColorB());
        quadrats[i].setSizeY(abs(quadrats[i].getSizeY()*cercles[i].getVelY()));

      }
      if(cercles[i].getPosY()<0){
        quadrats[i].setPosX(cercles[i].getPosX());
        quadrats[i].setPosY(height);
        quadrats[i].setInc(true);
        quadrats[i].setColorB(cercles[i].getColorB());
        quadrats[i].setSizeY(quadrats[i].getSizeY()*cercles[i].getVelY()*-1);

      }
      }
    if(count>=420){
    count=0;
    cercles[i].setColorB(random(0,255));
    }
    
    cercles[i].displayT();
    if(quadrats[i].getInc()){
        quadrats[i].display();
    }
}
}

function vistaC(){
for (let i=0; i<num; i++) {
    cercles[i].setPosX(cercles[i].getPosX()+cercles[i].getVelX());
    ;
    cercles[i].setPosY(cercles[i].getPosY()+cercles[i].getVelY());
    ;
    if (!cercles[i].getInc()){
      if (cercles[i].getRad()>50) {
      cercles[i].decRad(1*int(cercles[i].getVelX()));
      }else{cercles[i].setInc(true);}
    }
    if (cercles[i].getInc()){
      if (cercles[i].getRad()<500) {
      cercles[i].incRad(1*int(cercles[i].getVelX()));
      }else{cercles[i].setInc(false);}
    }
    if (cercles[i].getPosX()>width || cercles[i].getPosX()<0) {
      cercles[i].setVelX(cercles[i].getVelX()*-1);
    }
    if (cercles[i].getPosY()>height || cercles[i].getPosY()<0) {
      cercles[i].setVelY(cercles[i].getVelY()*-1);
      if(cercles[i].getPosY()>height){
        quadrats[i].setPosX(cercles[i].getPosX());
        quadrats[i].setPosY(0);
        quadrats[i].setInc(true);
        quadrats[i].setColorB(cercles[i].getColorB());
        quadrats[i].setSizeY(abs(quadrats[i].getSizeY()*cercles[i].getVelY()));

      }
      if(cercles[i].getPosY()<0){
        quadrats[i].setPosX(cercles[i].getPosX());
        quadrats[i].setPosY(height);
        quadrats[i].setInc(true);
        quadrats[i].setColorB(cercles[i].getColorB());
        quadrats[i].setSizeY(quadrats[i].getSizeY()*cercles[i].getVelY()*-1);

      }
      }
    if(count>=420){
    count=0;
    cercles[i].setColorB(random(0,255));
    }
    
    cercles[i].displayT();
    if(quadrats[i].getInc()){
      if(quadrats[i].getSizeY()>0){
        quadrats[i].setSizeY(quadrats[i].getSizeY()-1);        
      }else{
      quadrats[i].setSizeY(quadrats[i].getSizeY()+1);
      }
      quadrats[i].display();
    }
}
}

function reGen(state){
  
  if (state==0){
    R=random(100,255);
    G=random(0,50);
    B=random(0,255);
    
  }
  if (state==1){
    R=random(50,100);
    G=random(200,250);
    B=random(0,255);
  }
  if (state==2){
    R=random(50,100);
    G=random(0,50);
    B=random(0,255);
  }
  background(0)
  for (let i=0; i<num; i++) {
    cercles[i] = new Cercle(0, random(0, width), random(0, height),random(2, 4), random(-2, 2), sizeC,R,G,random(0,255),false);
    quadrats[i] = new Quadrat(0,random(0, width), 0, 80,200,R,G,250,false);
  }
}


