aedil_song="";
sonare_song="";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scoreleftWrist=0;
scorerightWrist = 0;
song_aedil = "";
song_sonare = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    aedil_song = loadSound("aedil.mp3");
    sonare_song = loadSound("sonare.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("red");
    stroke("black");

    song_aedil =aedil_song.isPlaying();
    console.log(song_aedil);

    song_sonare = sonare_song.isPlaying();
    console.log(song_sonare);

    if(scoreleftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        sonare_song.stop();
        if(song_aedil == false){
            aedil_song.play();
        }
        else{
            console.log("Song Name: Ae Dil Laya Hai Bahar Song");
            document.getElementById("song_id").innerHTML = "Song Name: O mere Sona Re Song";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWristX,rightWristY,20);
        aedil_song.stop();
        if(song_sonare == false){
            sonare_song.play();
        }
        else{
            console.log("Song Name: O mere Sona Re Song");
            document.getElementById("song_id").innerHTML = "Song Name: Ae Dil Laya Hai Bahar Song";
        }
    }

}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX +" leftWristY = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX+" rightWristY = "+rightWristY);
    }
}