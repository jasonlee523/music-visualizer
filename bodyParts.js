function update(time) {
    let phase = time;

    //Draw Torso
    let torsoLength = 0.25;
    m.save();
    m.translate(0, 2, 0);
    m.rotateX(Math.PI / 2);
    m.scale(torsoLength, torsoLength, torsoLength);
    mCylinder();
    m.restore();

    //Draw Head
    let headSize = .185;
    m.save();
    m.scale(headSize, headSize, headSize);
    m.translate(0, torsoLength + .085, 0.075);
    mSphere(1, 1, 1);
    m.restore();

    //Draw Eyes
    let eyeSize = .02;
    m.save();
    m.scale(eyeSize, eyeSize, eyeSize);
    drawEyes();
    m.restore();

    //Draw Arms
    let armLength = 0.12;
    m.save();
    m.translate(3, 0, 0);
    m.rotateZ(Math.PI / 2);
    m.rotateX(Math.PI / 2);
    m.rotateY(Math.PI * Math.sin(time))
    m.scale(armLength / 2, armLength, armLength / 2);
    drawArms();
    m.restore();

    //Draw legs
    let legLength = 0.12;
    m.save();
    m.translate(0, 0.75, 0);
    m.scale(legLength, legLength / 2, legLength / 2);
    drawLegs();
    m.restore();
}

function drawEyes() {
    m.save();
    m.translate(0.235, 0.38, 0.05);
    mSphere(0, 1, 1);
    m.restore();
    m.save();
    m.translate(0.235, 0.38, -0.05);
    mSphere(0, 1, 1);
    m.restore();
}

function drawLegs() {
    m.rotateZ(Math.PI / 2);
    m.rotateY(Math.PI / 2);
    m.save();
    m.translate(.085, -.35, .025);
    mCube();
    m.restore();
    m.save();
    m.translate(-.085, -.35, .025);
    mCube();
    m.restore();
}
function drawArms() {

    m.save();
    m.translate(0.35, 0.075, 0.025);

    mCube();
    m.restore();
    m.save();
    m.translate(-0.35, 0.075, 0.025);

    mCube();
    m.restore();
}