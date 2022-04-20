song="";
leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
function setup(){
    canvas=createCanvas(500,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("poseNet is initalized");
}
function draw()
{
    image(video,0,0,500,500);
    fill("pink");
    stroke("purple");

    circle(rightWristx-50, rightWristy,40);
    if(rightWristy>0&&rightWristy<=100)
    {
      document.getElementById("speed").innerHTML="speed:0.5x ";
      song.rate(0.5);
    }
    else if(rightWristy>100&&rightWristy<=200)
    {
        document.getElementById("speed").innerHTML="speed: 1x";
        song.rate(1);
    }
    else if(rightWristy>200&&rightWristy<=300)
    {
        document.getElementById("speed").innerHTML="speed: 1.5x";
        song.rate(1.5);
    }
    else if(rightWristy>300&&rightWristy<=400)
    {
        document.getElementById("speed").innerHTML="speed: 2x";
        song.rate(2);
    }
    else if(rightWristy>400&&rightWristy<=500)
    {
        document.getElementById("speed").innerHTML="speed: 2.5x";
        song.rate(2.5);
    }
    circle(leftWristx-50,leftWristy,40);
    inNumber=Number(leftWristy);
    removedecimal=floor(inNumber);
    volume=removedecimal/500;
    document.getElementById("volume").innerHTML="volume: "+volume;
    song.setVolume(volume);
}
function preload(){
    song=loadSound("music.mp3");
}
function play(){
song.play();
song.setVolume(1);
song.rate(1);
}
function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log("leftWristx="+leftWristx,"leftWristy="+leftWristy );
        console.log("rightWristx="+rightWristx,"rightWristy="+rightWristy );
        }
}