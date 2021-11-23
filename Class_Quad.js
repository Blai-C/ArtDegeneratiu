class Quadrat {
  
  constructor(c,posX,posY,sizeX,sizeY,R,G,B,inc) {
    this.c = c;
    this.posX = posX;
    this.posY = posY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
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
  setSizeX(sizex){
    this.sizeX=sizex;
  }
  getSizeX(){
    return this.sizeX;
  }
  setSizeY(sizey){
    this.sizeY=sizey;
  }
  getSizeY(){
    return this.sizeY;
  }
  setColor(R,G,B){
    this.R=R;this.G=G;this.B=B;
  }
  setColorB(B){
    this.B=B;
  }
  setInc(i){
    this.inc=i;
  }
  getInc(){
    return this.inc;
  }
  display() {
    fill(this.R,this.G,this.B);
    rect(this.posX,this.posY,this.sizeX,this.sizeY);
  }displayT() {
    fill(this.R,this.G,this.B,20);
    rect(this.posX,this.posY,this.sizeX,this.sizeY);
  }
}