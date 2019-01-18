class matrix {
  constructor(){
    this.stackPointer = 0;
    this.matrixValues = [];
    this.matrixValues.push([
      1,0,0,0,
      0,1,0,0,
      0,0,1,0,
      0,0,0,1,
    ]);
  }
  save() {
    this.matrixValues[this.stackPointer+1] = this.matrixValues[this.stackPointer];
    this.stackPointer = this.stackPointer+1;
  }
  restore() {
    this.stackPointer = this.stackPointer-1;
  }
  getMatrix(){
   return this.matrixValues[this.stackPointer];
 }
  translate(x, y, z) {
    this.matrixValues[this.stackPointer] = multiplyMatrices(this.matrixValues[this.stackPointer], [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      x, y, z, 1,
    ]);
  }
  rotateX(angle) {
    this.matrixValues[this.stackPointer] = multiplyMatrices(this.matrixValues[this.stackPointer], [
      1, 0, 0, 0,
      0, Math.cos(angle), -Math.sin(angle), 0,
      0, Math.sin(angle), Math.cos(angle), 0,
      0, 0, 0, 1,
    ]);
  }
  rotateY(angle) {
    this.matrixValues[this.stackPointer] = multiplyMatrices(this.matrixValues[this.stackPointer], [
      Math.cos(angle), 0, Math.sin(angle), 0,
      0, 1, 0, 0,
      -Math.sin(angle), 0, Math.cos(angle), 0,
      0, 0, 0, 1,
    ]);
  }
  rotateZ(angle) {
    this.matrixValues[this.stackPointer] = multiplyMatrices(this.matrixValues[this.stackPointer], [
      Math.cos(angle), -Math.sin(angle), 0, 0,
      Math.sin(angle), Math.cos(angle), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]);
  }
  scale(x, y, z) {
    this.matrixValues[this.stackPointer] = multiplyMatrices(this.matrixValues[this.stackPointer], [
      x, 0, 0, 0,
      0, y, 0, 0,
      0, 0, z, 0,
      0, 0, 0, 1,
    ]);
  }
  place(x,y,z) {
    this.matrixValues[this.stackPointer] = [
      1,0,0,0,
      0,1,0,0,
      0,0,1,0,
      x,y,z,1,
    ];
  }
}