function voice(fileName) {
        var audio = document.createElement("audio");
        audio.src = './sound/'+fileName+'.wav';
        audio.play();
}

function refresh(){
  panic = document.getElementById('panic');
  panic.innerHTML = '';
}
//打字效果
var typeStep = 0;
var typeWord = "";

function createText(name,content,speed,speaker,cb){
  var newText = document.createElement("li");
  newText.setAttribute('class','chatText');
  newText.setAttribute('onmouseenter',"voice('Pickup2')");
  newText.innerHTML = '<span></span>';
  newText.children[0].id = name;
  document.getElementById('chat').appendChild(newText);
  typeIt(content,name,speed,speaker,cb);
};

function typeIt(w_,e_,t_,s_,c_){
  w=w_ + '_',e=document.getElementById(e_),t=t_,speaker = s_,c = c_;
  typing(c);
};
function typing(callback){
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
    setTimeout("typing(c)", t*(0.5+Math.random()));
  }else {
    typeStep = 0;
    typeWord = "";
    /*
    setTimeout(function(){e.innerHTML = w+'&nbsp&nbsp';},t*0.8);
    setTimeout(function(){e.innerHTML = w+'_';},t*1.2);
    setTimeout(function(){e.innerHTML = w+'&nbsp&nbsp';},t*1.4);
    setTimeout(function(){e.innerHTML = w+'&nbsp&nbsp';},t*1.8);
    setTimeout(function(){e.innerHTML = w+'_';},t*1.6);
    */
    e.innerHTML = w.slice(0,-1)+'&nbsp&nbsp';
    e.style.color = "inherit";
    e.style.backgroundColor = "inherit";
    if (callback !== undefined) {
      setTimeout(callback(),100+t*2.5);
      c === undefined;
    }
  };
};


function creatButton(name,content){
    var newB = document.createElement('li');
    newB.id = name;
    newB.setAttribute('class','buttons');
    newB.setAttribute('onmouseenter',"voice('Pickup4')");
    newB.setAttribute('draggable','true');
    newB.ondragstart = function(ev){
      this.className = 'dragButton';
      var reply = document.getElementById("replyContent");
      reply.style.backgroundColor = '#444';
      pH = reply.placeholder
      ev = ev||window.event;
      ev.dataTransfer.setData('Text',this.innerHTML)

    }
    newB.ondrag = function(ev){
      ev = ev||window.event;
      ev.preventDefault();
    }

    newB.ondragend = function(){
      this.className = 'buttons';
      var reply = document.getElementById("replyContent");
      reply.style.backgroundColor = '#333';
      reply.placeholder = pH;
    }
    newB.innerHTML = content;
    document.getElementById('panic').appendChild(newB);
}

//拖放相关函数
function putOn(ev){
  ev = ev||window.event;
  ev.preventDefault();
  console.log(ev.dataTransfer.getData('Text'))
  var reply = document.getElementById('replyContent');
  reply.style.backgroundColor = '#555';
  reply.placeholder = '松开鼠标~';
}
function putOff(ev){
  ev = ev||window.event;
  var reply = document.getElementById('replyContent');
  reply.placeholder = pH;
  reply.style.backgroundColor = '#444';
}
function drop(ev){
  ev = ev||window.event;
  ev.preventDefault();
  var reply = document.getElementById('replyContent');
  reply.value = ev.dataTransfer.getData('Text');
  reply.style.backgroundColor = '#333';
  voice('Hit');
}
//提交
var nextP = [];
var flagP = [];

function submit(){
  voice('Pickup3');
  var reply = document.getElementById('replyContent');
  var replyBox = document.createElement('li');
  replyBox.setAttribute('class','replyText');
  replyBox.innerHTML = "<span></span>";
  theReply = reply.value;
  replyBox.children[0].innerHTML = theReply;
  reply.value = '';
  document.getElementById('chat').appendChild(replyBox);
  for (var x in nextP){
    if (theReply === flagP[x]) {
      setTimeout(function(){nextP[x]()},600);
    }
  }
}

//事件流
var clock = new Date();
window.onload = function(){
  creatButton('startButton','【Start!】');
  nextP[0] = function(){p0a();}
  flagP[0] = '【Start!】';
  title = document.getElementById('title');
}

function p0a(){
  title.innerHTML = 'υ´• ﻌ •`υﾞ';
  voice('Pickup1');
  refresh();
  createText('t0a','汪~ 是没闻过的气味呢！',100,['dog1','dog2','dog3'],p0b);
}

function p0b(){
  setTimeout(function(){
  createText('t0b','我是狗子！ 请问你是谁吖？ 汪~',150,['dog1','dog2','dog3']);
  creatButton('n0a','你好，我是');
  creatButton('n0b','没关系。医生已经帮我看过了，小莓也和我在一起。');
  creatButton('n0c','好事发生大法师大法师');
  creatButton('n0d','好事发生大法师大法师');
  },400);
}
