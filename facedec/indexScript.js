let video = document.getElementById('videoElement');
let canvas = document.getElementById("canvas");
let counter = document.getElementById('counter');

let ctx = canvas.getContext("2d");
let imgSrc = new Image;
let count =0;

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err) {
      console.log(err);
    });
}

function stop(e) {
  let stream = video.srcObject;
  let tracks = stream.getTracks();

  for (let i = 0; i < tracks.length; i++) {
    let track = tracks[i];
    track.stop();
  }
  video.srcObject = null;
}

function clickPic() {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  imgSrc.src = canvas.toDataURL("image/jpeg");
}

function sendPic() {
  let img = canvas.toDataURL("image/jpeg");
  let decodedImg = decodeBase64Image(img);
  postData("https://eastus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_04&returnRecognitionModel=false&detectionModel=detection_03&faceIdTimeToLive=86400"
    ,decodedImg).then(res => {
      console.log(res);
      if (res.length>0) {
        if (res[0].faceId) {
          count++;
          counter.innerHTML = "Face count : "+count;
          ctx.clearRect(0,0,canvas.width,canvas.height)
          ctx.beginPath();
          ctx.drawImage(imgSrc, 0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = "red";
          ctx.rect(res[0].faceRectangle.left, res[0].faceRectangle.top, res[0].faceRectangle.width,res[0].faceRectangle.height);
          ctx.stroke();
      }
    }
  });
}

setInterval(function(){ 
  clickPic();
  sendPic();
}, 10000);

async function postData(url="",data){
  const response = await fetch(url,{
    method:'POST',
    headers: {
      "Ocp-Apim-Subscription-Key": "5953517d919b4b6e9b39d6297c97cc89",
      "Content-Type": "application/octet-stream"
    },
    body: data
  });
  return response.json();
}


function decodeBase64Image(dataString) {
  let blobBin = atob(dataString.split(',')[1]);
  let array = [];
  for(let i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
  }
  let file= new Blob([new Uint8Array(array)], {type: 'image/png'});
  
  return file;  
}