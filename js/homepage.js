function voice(fileName) {
        var audio = document.createElement("audio");
        audio.src = './sound/'+fileName+'.wav';
        audio.play();
}

var typeStep = 0;
var typeWord = "";


function typeIt(w_,e_,t_,s_){
  w=w_,e=document.getElementById(e_),t=t_,speaker = s_;
  typing();
};
function typing(){
  typeWord += w[typeStep];
  typeStep ++;
  //console.log(typeWord);
  e.style.color = "black";
  e.style.backgroundColor = "white";
  if (typeStep%2 === 1) {
    e.innerHTML = typeWord+'_';
  }else {
    e.innerHTML = typeWord+' ';
  }
  if (typeStep<w.length) {
    //console.log(typeStep);
    voice(speaker[Math.floor(Math.random()*speaker.length)])
    setTimeout("typing()", t*(0.5+Math.random()));
  }else {
    typeStep = 0;
    typeWord = "";
    setTimeout(function(){e.innerHTML = w+'&nbsp&nbsp';},t*0.8);
    setTimeout(function(){e.innerHTML = w+'_';},t*1.2);
    setTimeout(function(){e.innerHTML = w+'&nbsp&nbsp';},t*1.4);
    setTimeout(function(){e.innerHTML = w+'_';},t*1.6);
    setTimeout(function(){e.innerHTML = w+'&nbsp&nbsp';},t*1.8);
    e.style.color = "inherit";
    e.style.backgroundColor = "inherit";
    document.getElementsByClassName('buttons').setAttribute(display,'none');
  };
};

function createText(name,content,speed,speaker){
  var newText = document.createElement("li");
  newText.setAttribute('class','chatText');
  newText.setAttribute('onmouseenter',"voice('Pickup2')");
  newText.innerHTML = '<span></span>';
  newText.children[0].id = name;
  document.getElementById('chat').appendChild(newText);
  typeIt(content,name,speed,speaker);
};

function creatButton(name,content){
    var newB = document.createElement('a');
    newB.id = name;
    newB.setAttribute('class','buttons');
    newB.setAttribute('onmouseenter',"voice('Pickup4')");
    newB.innerHTML = content;
    document.getElementById('CyuuOu').appendChild(newB);
}

//事件流
function start(){
  voice('Pickup1');
  sB = document.getElementById('startButton');
  document.getElementById('CyuuOu').removeChild(sB);
  createText('t01','你好，我是一个战斗人员！撒范德萨打发法沙发沙发撒旦阿萨法发是',150,['man1','man2','man3']);
  creatButton('n01','好呀');
}

function submit(){
  voice('Pickup3');
  var reply = document.getElementById('replyContent');
  var replyBox = document.createElement('li');
  replyBox.setAttribute('class','replyText');
  replyBox.innerHTML = "<span></span>";
  replyBox.children[0].innerHTML = reply.value;
  reply.value = '';
  document.getElementById('chat').appendChild(replyBox);
}
