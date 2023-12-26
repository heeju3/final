let doorbell;
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
let recognition = new SpeechRecognition();
let currentTxt = "이곳에 대화 내용이 표시됩니다";
let isRecord = false; 

let speech;
var voice = new p5.Speech(); 

let cam;
let canvas;
let graphics;

function preload() {
  doorbell = loadSound('doorbell.mp3');
}

function setup() {
  canvas = createCanvas(displayWidth, displayHeight);
  canvas.position(0,0);
  graphics = createGraphics(960,540);
  cam = createCapture(VIDEO);
  cam.size(960,540);
  cam.hide();
  rotate(90);
  
  textSize(20);
  text(currentTxt, 30, 600);
  
  let button_1 = createButton('Vâng, em biết rồi.'); //네 알겠습니다
  button_1.position(1000, 70);
  let button_2 = createButton('Không, không sao.'); //아니요 괜찮습니다
  button_2.position(1000, 130);
  let button_3 = createButton('Chờ một chút nhé'); //잠시만 기다려주세요
  button_3.position(1000, 190);
  
  button_1.mousePressed(Speak_1);
  button_2.mousePressed(Speak_2);
  button_3.mousePressed(Speak_3);  
  
  speech = new p5.Speech(voiceReady);
  speech.started(startSpeaking);
  
  function startSpeaking() {
    background(0,255,0);
  }
  
  function voiceReady() {
    console.log(speech.voices);
  }
}

function draw() {
  background(245);
  
  image(cam,0,0,960,540);
  graphics.image(cam,0,0,960,540);
  
  if(isRecord) text("인식중", 30, 630);
  text(currentTxt, 30, 600);
}

function keyPressed() { 
  doorbell.play();
  isRecord = true;
  recognition.start();
}
  recognition.onresult = function(event) {
  currentTxt = event.results[0][0].transcript;
  isRecord = false;
    
  if (currentTxt == '안녕하세요') {
    currentTxt = 'Xin chào.';
  }
  if (currentTxt == '택배입니다') {
    currentTxt = 'Đây là bưu phẩm.';
  }
  if (currentTxt == '계세요?') {
    currentTxt = 'Có ai không?.';
  }
  if (currentTxt == '안녕하세요 택배입니다') {
    currentTxt = 'Xin chào. Đây là bưu phẩm.';
  }
}

function Speak_1() {
  speech.setVoice('SpeechSynthesisVoice');
  speech.speak('네, 알겠습니다.');
}
function Speak_2() {
  speech.setVoice('SpeechSynthesisVoice');
  speech.speak('아니요, 괜찮습니다.');
}
function Speak_3() {
  speech.setVoice('SpeechSynthesisVoice');
  speech.speak('잠시만 기다려주세요.');
}

//function mousePressed() {
//  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
//    let fs = fullscreen();
//    fullscreen(!fs);
//  }
//}