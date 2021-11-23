class Cercle {
  
  constructor( c, posX, posY, velX, velY, rad, R, G, B, inc) {
    this.c = c;
    this.posX = posX;
    this.posY = posY;
    this.velX = velX;
    this.velY = velY;
    this.rad= rad;
    this.R=R;
    this.B=B;
    this.G=G;
    this.inc=inc;
  }
  setPosX(x){
    this.posX=x;
  }
  getPosX(){
    return this.posX;
  }
  setPosY(y){
    this.posY=y;
  }
  getPosY(){
    return this.posY;
  }
  setVelX(velx){
    this.velX=velx;
  }
  getVelX(){
    return this.velX;
  }
  setVelY(vely){
    this.velY=vely;
  }
  getVelY(){
    return this.velY;
  }
  incRad(aug){
    this.rad+=aug;
  }
  decRad(dec){
    this.rad-=dec;
  }
  getRad(){
    return this.rad;
  }
  setColor(R,G,B){
    this.R=R;this.G=G;this.B=B;
  }
  setColorB(B){
    this.B=B;
  }
  getColorB(){
    return this.B;
  }
  setInc(i){
    this.inc=i;
  }
  getInc(){
    return this.inc;
  }
  display() {
    fill(this.R,this.G,this.B);
    circle(this.posX,this.posY,this.rad);
  }
  displayT() {
    fill(this.R,this.G,this.B,20);
    circle(this.posX,this.posY,this.rad);
  }
}