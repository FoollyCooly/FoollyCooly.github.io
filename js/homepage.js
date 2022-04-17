function voice(fileName) {
        var audio = document.createElement("audio");
        audio.src = './sound/'+fileName+'.wav';
        audio.volume = 0.5;
        audio.play();
}

function refresh(){
  panic = document.getElementById('panic');
  panic.innerHTML = '';
}
//打字效果
var typeStep = 0;
var typeWord = "";
var sameName = 0;

function createText(name,content,speed,speaker,cb){
  if (document.getElementById(name)) {
    name = name+"_" + sameName;
    sameName++;
  }
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
  //console.log(ev.dataTransfer.getData('Text'))
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
  var headPoint = reply.value.search('~');
  if (headPoint !==0) {
    reply.value = reply.value.slice(0,headPoint+1) + ev.dataTransfer.getData('Text');
  }else {
    reply.value = ev.dataTransfer.getData('Text');
  }
  reply.style.backgroundColor = '#333';
  voice('Hit');
}
//提交
var nextP = [];

function tip(tipContent){
  var tipBox = document.createElement('li');
  tipBox.setAttribute('class','tipText');
  tipBox.innerHTML = tipContent;
  document.getElementById('chat').appendChild(tipBox);
}

function submit(){
  var reply = document.getElementById('replyContent');
  if (reply.value.length >0 ) {
    voice('Pickup3');
    var replyBox = document.createElement('li');
    replyBox.setAttribute('class','replyText');
    replyBox.innerHTML = "<span></span>";
    theReply = reply.value;
    replyBox.children[0].innerHTML = theReply;
    reply.value = '';
    document.getElementById('chat').appendChild(replyBox);
    p();
  }
}

function p(){
  for (var x in nextP){
    console.log(x+','+nextP[x]);
    nextP[x]();
  }
}

function clearP(){
  nextP = [function(){console.log('无事发生')}]
}

function restart(tipWhat,backWhere,buttonHow){
  tip(tipWhat);
  if (buttonHow === undefined) {
    buttonHow = "【再试一次】"
  }
  creatButton('b1c1a',buttonHow);
  clearP();
  nextP[0] = function(){
    if (theReply === buttonHow) {
      backWhere();
    }
  }
}

function setPH(phContent){
  if (phContent === undefined) {
    phContent = '可将下方选项拖动至此';
  }
  var reply = document.getElementById('replyContent');
  reply.placeholder = phContent;
}

function setFlag(flagName){
  if(flagName.count === undefined){
    flagName.count = 1;
  }else {
    flagName.count++;
  }
  var flagX = 0;

  for(var x = 1;x < arguments.length;x++){
    if(flagName.count >= arguments[x]){
      flagX = x;
    }
  }
  return flagX;
}

//事件流
var clock = new Date();
window.onload = function(){
  title = document.getElementById('title');
  title.innerHTML = "Ⴚტ◕‿◕ტჂ";
  creatButton('startButton','【Start!】');
  nextP[0] = function(){
    if (theReply === '【Start!】') {
    p0a();
    }
  };
  document.onkeydown = function(ev){
    ev = ev||window.event;
    if (ev.keyCode === 13){
      submit();
    }
  }
}

function p0a(){
  title.innerHTML = 'υ´• ﻌ •`υﾞ';
  voice('Pickup1');
  refresh();
  createText('t0a','汪~ 是没闻过的气味呢！',100,['dog1','dog2','dog3'],p0b);
}

function p0b(){
  setTimeout(function(){
    createText('t0b','汪~ 在下阿狗！你是哪位？',150,['dog1','dog2','dog3']);
  },400);
  setPH('输入你的名称');
  nextP[0] = function(){
    setPH();
    clearP();
    p0c();
  };
}

function p0c(){
  userName = theReply;
  setTimeout(function(){
    if (userName === '阿狗') {
      createText('t0c','汪~ '+userName+'？为什么要取和阿狗一样的名字。',110,['dog1','dog2','dog3'],p0d);
    }else{
      createText('t0c','汪~ '+userName+'？果然是没听过的名字。',110,['dog1','dog2','dog3'],p0d);
    }
  },400);
}

function p0d(){
  setTimeout(function(){
    createText('t0d','汪~ 村长说了，千万不能跟陌生动物交谈。抱歉，阿狗必须走了。',110,['dog1','dog2','dog3']);
  },400);
  creatButton('b0d0','好吧，再见阿狗。');
  nextP[0] = function(){
    clearP();
    tip('阿狗摇着尾巴走了<br>去其他地方看看......');
    refresh();
    setTimeout(function(){p1a();},2000);
  };
}

//第二幕

function p1a(){
  refresh();
  title.innerHTML = '🕷';
  createText('t1a','啾啾~ 发现蛛网有异动！',80,['spider1','spider2','spider3','spider4'],p1b);
};

function p1b(){
  createText('t1b','啾啾~ 在下蛛蛛侠，来者何人？！',80,['spider1','spider2','spider3','spider4']);
  creatButton('b1b0','我是'+userName);
  creatButton('b1b1','我是阿狗');

  var p1b_F = setFlag(p1b,3,5,8)
  if(p1b_F === 1){
    setPH('要装的更像一点');
  }else if (p1b_F === 2) {
    setPH('想想阿狗会怎么说');
  }else if (p1b_F === 3) {
    setPH('汪~ 我是阿狗');
  }

  clearP();
  nextP[0] = function(){
    if(theReply === '汪~ 我是阿狗'||theReply === '汪~我是阿狗'){
      clearP();
      setPH();
      setTimeout(function(){p1c0();},350);
    }else if (theReply === '我是阿狗') {
      clearP();
      setTimeout(function(){p1c1();},350);
    }else if (theReply.search('我是') === -1) {
      setTimeout(function(){createText('t1b1','啾啾~ 废话少说，先报上名来！',70,['spider1','spider2','spider3','spider4']);},350);
    }else {
      clearP();
      setTimeout(function(){p1c2();},350);
    }
  };
}

function p1c0(){
  refresh();
  createText('t1c0','啾啾~ 原来是阿狗啊。<br>找蛛蛛侠有什么事吗？阿狗应该闻到了吧，我在喷杀虫剂呢。',50,['spider1','spider2','spider3','spider4'],p1d);
}

function p1c1(){
  refresh();
  createText('t1c1','啾啾~ 骗子！吃蛛蛛侠一记剧毒之咬！！！',80,['spider1','spider2','spider3','spider4'],p1c1a);
}
function p1c1a(){
  restart('蛛蛛侠一招毙命<br>'+userName+'与世长辞',p1a)
}


function p1c2(){
  refresh();
  createText('t1c1','啾啾~ 没听说过你的名字。村长说了，不能跟陌生动物交谈。你还是离我远点吧。',80,['spider1','spider2','spider3','spider4'],p1c2a);
}
function p1c2a(){
  restart('蛛蛛侠不理你了<br>'+userName+'有没有什么办法能跟蛛蛛侠说上话呢？',p1a)
}

function p1d(){
  creatButton('b1d','啊？蛛蛛侠你冷静！干什么要想不开？');
  clearP();
  nextP[0] = function(){
    if (theReply.search('汪~') === -1) {
      clearP();
      setTimeout(function(){p1e2();},350);
    }else if (theReply.search('啊？蛛蛛侠你冷静！干什么要想不开') !== -1) {
      clearP();
      setTimeout(function(){p1e1();},350);
    }else{
      setTimeout(function(){createText('t1d1','啾啾~ 蛛蛛侠听不懂阿狗说的话。',70,['spider1','spider2','spider3','spider4']);},350);
    }
  }
}

function p1e1(){
  clearP();
  refresh();
  createText('t1e1','啾啾~ 阿狗你能不能有点常识。昆虫有6条腿，而蜘蛛有10条腿。',80,['spider1','spider2','spider3','spider4']);
  creatButton('b1e1','啊？蜘蛛难道不是有8条腿吗？');
  creatButton('b1e1','哦哦，原来是这样，吓我一跳。所以你为什么要杀虫啊？');
  nextP[0] = function(){
    if (theReply.search('汪~') === -1) {
      clearP();
      setTimeout(function(){p1f2();},350);
    }else if (theReply.search('啊？蜘蛛难道不是有8条腿吗？') !== -1) {
      clearP();
      setTimeout(function(){p1f3();},350);
    }else if (theReply.search('哦哦，原来是这样，吓我一跳。所以你为什么要杀虫啊？' !== -1)) {
      clearP();
      setTimeout(function(){p1f1();},350);
    }else {
      setTimeout(function(){createText('t1d1','啾啾~ 蛛蛛侠听不懂阿狗说的话。',70,['spider1','spider2','spider3','spider4']);},350);
    }
  }
}

function p1e2(){
  refresh();
  createText('t1e2','啾啾~ 冒充阿狗？！<br>吃我一记12万毒特!!!',80,['spider1','spider2','spider3','spider4'],p1e2a);
}
function p1e2a(){
  restart('蛛蛛侠一招毙命<br>'+userName+'与世长辞',p1c0)
}

function p1f1(){
  clearP();
  refresh();
  createText('t1f1','啾啾~ 村长要在我家开【香蕉展】，我提前清理一下蛛网。<br>待会我还要去小河边把【香蕉】拿过来。村长不放心，非让我亲自去呢。<br>话说，阿狗没听说吗？村长不让我们跟陌生动物说话，好像就是因为【香蕉展】的事呢。',50,['spider1','spider2','spider3','spider4']);
  creatButton('b1e1','这样啊。那我就不打扰了，你先忙吧。');
  nextP[0] = function(){
    if (theReply.search('汪~') === -1) {
      clearP();
      setTimeout(function(){p1f2();},350);
    }else if (theReply.search('这样啊。那我就不打扰了，你先忙吧。') !== -1) {
      clearP();
      setTimeout(function(){p1g();},350);
    }else {
      setTimeout(function(){createText('t1d1','啾啾~ 蛛蛛侠听不懂阿狗说的话。',70,['spider1','spider2','spider3','spider4']);},350);
    }
  }
}

function p1f2(){
  refresh();
  createText('t1f2','啾啾~ 冒充阿狗？！<br>吃我一记12万毒特!!!',80,['spider1','spider2','spider3','spider4'],p1f2a);
}
function p1f2a(){
  restart('蛛蛛侠一招毙命<br>'+userName+'与世长辞',p1e1);
}

function p1f3(){
  refresh();
  createText('t1f3','啾啾~ 猴子？！<br>吃我一记12万毒特!!!',80,['spider1','spider2','spider3','spider4'],p1f2a);
}



function p1g(){
  tip(userName + '告别了蛛蛛侠<br>' + userName + '往小河边走去...');
  refresh();
  setTimeout(function(){p2a();},2000);
}
//第三幕/
function p2a(){
  refresh();
  clearP();
  setPH();
  createText('t2a','忧矣~ 终于来了，我等到花儿都谢了。',30,['man1','man2','man3','man4'],p2a2);
}
function p2a2(){
  createText('t2b','忧矣~ 鄙虫蜉弟，来者可是蛛蛛侠？',80,['man1','man2','man3','man4']);
  creatButton('b2b0','不，我是'+userName);
  creatButton('b2b1','不，我是阿狗');
  creatButton('b2b1','没错，我是蛛蛛侠');

  var p2a_F = setFlag(p2a,3,5,8)
  if(p2a_F === 1){
    setPH('上一关怎么过的你忘了吗？');
  }else if (p2a_F === 2) {
    setPH('想想蛛蛛侠会怎么说');
  }else if (p2a_F === 3) {
    setPH('啾啾~ 没错，我是蛛蛛侠');
  }

  clearP();
  nextP[0] = function(){
    if(theReply === '啾啾~ 没错，我是蛛蛛侠'||theReply === '啾啾~没错，我是蛛蛛侠'){
      clearP();
      setPH();
      setTimeout(function(){p2b();},350);
    }else if (theReply.search('我是阿狗') !== -1 & theReply.search('汪~') === -1) {
      clearP();
      setTimeout(function(){p2b1();},350);
    }else if (theReply.search('我是蛛蛛侠') !== -1 & theReply.search('啾啾~') === -1) {
      clearP();
      setTimeout(function(){p2b1();},350);
    }else if (theReply.search('我是阿狗') !== -1 & theReply.search('汪~') !== -1){
      clearP();
      setTimeout(function(){p2b2();},350);
    }else if (theReply.search('我是') !== -1) {
      clearP();
      setTimeout(function(){p2b3();},350);
    }else {
      setTimeout(function(){createText('t2b1','忧矣~ 戏说不是胡说，请看清问题再回答。',70,['man1','man2','man3','man4']);},350);
    }
  };
}

function p2b(){
  refresh();
  createText('t2b0','忧矣~ 你是来取香蕉的吧。<br>村长说了，为了以防万一，你要答对一道小学数学题才能拿走香蕉。',80,['man1','man2','man3','man4'],p2c);
}

function p2b1(){
  refresh();
  createText('t2b1','忧矣~ 好拙劣的Cosplay，看来是村长过度小心了...<br>一刻千金，我没功夫跟猴子耽误，请你有多远爬多远。',80,['man1','man2','man3','man4'],p2b_back);
}
function p2b2(){
  refresh();
  createText('t2b2','忧矣~ 阿狗，你来作甚？<br>一刻千金，我没功夫跟你耽误，请你有多远爬多远。',80,['man1','man2','man3','man4'],p2b_back);
}
function p2b3(){
  refresh();
  createText('t2b3','忧矣~ 不认识你，自己一边玩去吧。',80,['man1','man2','man3','man4'],p2b_back);
}
function p2b_back(){
  restart('蜉弟转头就走，消失在水中央<br>'+userName+"应该多多使用它的大脑",p2a);
}

function p2c(){
  refresh();
  var p2c_F = setFlag(p2c,5,10)
  if(p2a_F === 1){
    setPH('蛛蛛侠说它有‘10’条腿');
  }else if (p2a_F === 2) {
    setPH('蛛蛛用的当然是八进制啦');
  }


  var multi1 = Math.floor(Math.random()*3)+5;
  var multi2 = Math.floor(Math.random()*5)+3;
  var answer = (multi1*multi2).toString(8);
  createText('t2c','忧矣~ 请听题：<br>'+ multi1 +' × '+ multi2 +' = ?',80,['man1','man2','man3','man4']);
  setPH('直接在此输入数字');
  nextP[0] = function(){
    if (theReply === answer) {
      setPH();
      clearP();
      p2d();
    }else if (theReply === '数字') {
      setTimeout(function(){createText('t2c1','忧矣~ 脑洞不错。<br>但阅卷老师还是会给你零分。',50,['man1','man2','man3','man4']);},60);
    }else if (theReply === (multi1*multi2).toString(10)) {
      clearP();
      p2d1();
    }else if (theReply.search('\D' !== -1)) {
      setTimeout(function(){createText('t2c1','忧矣~ 请用阿拉伯数字。',50,['man1','man2','man3','man4']);},60);
    }else{
      clearP();
      p2d2();
    }
  }
}

function timer(timeValve){
  seconds = 0;
  setInterval(function(){
    seconds++;
    if (seconds === timeValve) {
      clearInterval();
    }
  },1000)
}

function p2d(){
  refresh();
  createText('t2d','忧矣~ 回答正确！<br>未完待续......',80,['man1','man2','man3','man4']);
}
function p2d1(){
  refresh();
  createText('t2d','忧矣~ 数学挺不错啊...作为一只猴子来说。<br>看来村长的顾虑果然是有道理的。',80,['man1','man2','man3','man4'],p2d1_back);
}
function p2d1_back(){
  restart('到底是哪里暴露了呢？<br>'+userName+"用它的十根手指抓耳挠腮<br>真是百思不得其解",p2c);
}
function p2d2(){
  refresh();
  createText('t2d','忧矣~ 想通过蒙答案过关吗？<br>还是说你的数学真有这么差劲？',80,['man1','man2','man3','man4'],p2d2_back);
}
function p2d2_back(){
  restart('到底是哪里出错了呢？<br>'+userName+"用它的十根手指抓耳挠腮<br>真是百思不得其解",p2c);
}
