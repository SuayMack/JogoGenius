let order = [];
let playerOrder = [];// ordem que o player aperta
let flash;//flashes que irãp aparecer no jogo
let turn;//pontos
let good;// verifica se o player está apertando as teclas certas ou erradas - true ou false
let compTurn;// verifica se foi o player ligou o jogo - boolean - 
let intervalId;//
let strict = false;//Verifica se o botão strict está check
let noise = true;//
let on = false;//Verifica se o botão ligar está check
let win;

//Pegando a referencia do elemento no js
const turnCounter = document.querySelector("#turn");//pontos
const topLeft = document.querySelector("#topleft");//verde
const topRight = document.querySelector("#topright");//vermelho
const bottomLeft = document.querySelector("#bottomleft");//amarelo
const bottomRight = document.querySelector("#bottomright");//azul
const strictButton = document.querySelector("#strict");//botão strict
const onButton = document.querySelector("#on");//ligar
const startButton = document.querySelector("#start");//iniciar

//Verificar quando o botão strict é clicado
strictButton.addEventListener('click', (event) => {
  if (strictButton.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});

//Verificar quando o botão inicio é clicado
onButton.addEventListener('click', (event) => {
  if (onButton.checked == true) {
    on = true;
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();// volta as cores ao estado inicial(sem "luzes")
    clearInterval(intervalId);
  }
});

//Se ligar ou ganhar, joguar
startButton.addEventListener('click', (event) => {
  if (on || win) {
    play();
  }
});

function play() {
  //Reinicia as variaveis
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;//Primeiro round do jogo
  turnCounter.innerHTML = 1;//Escreve no HTML 1 round do jogo
  good = true;
  for (var i = 0; i < 20; i++) {
    //sortear numeros de 1 a 4 
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;

  //flash colors intervalo
  intervalId = setInterval(gameTurn, 800);

 console.log(order)
}

function gameTurn() {
  on = false;

  //se a "luz" estiver acionada
  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }
  //Quando o computador liga
  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one();//green
      if (order[flash] == 2) two();//red
      if (order[flash] == 3) three();//Yellow
      if (order[flash] == 4) four();//Blue
      flash++;
    }, 200);
  }
}

//Função noise - Se fizer barulho
function one() {
  if (noise) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  topLeft.style.backgroundColor = "lightgreen";
}

function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  topRight.style.backgroundColor = "tomato";
}

function three() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = "yellow";
}

function four() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  bottomRight.style.backgroundColor = "lightskyblue";
}

//Retorna aos estados originais das cores
function clearColor() {
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "darkblue";
}
//função para fazer os flashes(cores mais claras)
function flashColor() {
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "yellow";
  bottomRight.style.backgroundColor = "lightskyblue";
}

//Ao clicar nas cores:
topLeft.addEventListener('click', (event) => {
  //se estiver ligado
  if (on) {
    playerOrder.push(1);
    //checar se está certo
    check();
    //Chama a função 1
    one();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

topRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

// Inicio função check
function check() {
  //se o jogador não apertar a mesma sequencia que o computador der
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;
  //se estiver no round 20
  if (playerOrder.length == 20 && good) {
    winGame();
  }
  //se o jogador errou
  if (good == false) {
    //chama a função 
    flashColor();
    //escreve no display
    turnCounter.innerHTML = "Errou!";
    setTimeout(() => {
      //d/a um tempo e desliga o display
      turnCounter.innerHTML = turn;
      //retorna as cores ao estado original
      clearColor();

      //se o strict estiver selecionado..
      if (strict) {
        //repete a função play sempre que errar reinicia       
        play();
        //se nao estiver selecionado
      } else {
        //zera tudo
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);

    noise = false;
  }
  // Se está ligado for igual a 20(total de fases), e se o jogador ganhou, zera tudo
  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }
}//fim check function

//
function winGame() {
  flashColor();
  turnCounter.innerHTML = "Venceu";
  on = false;
  win = true;
}
