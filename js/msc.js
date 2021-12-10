const startHastighet = 0.55;
const skepp = [];
const oSkott = [];
const skott = [];
const keyNames = [];
const numberOfPlayers = 2;
const numberOfAmmo = 2;
const players = [];
const direction = ["east", "west"];
keyNames[1] = ["d", "a", "w", "s"]; // Styrning player 1
keyNames[0] = ["6", "4", "8", "5"]; // Styrning player 2
keyNames[2] = " "; // Skjut player 1
keyNames[3] = "0"; // Skjut player 2
let bothComingFromRight = false;
let bothComingFromLeft = false;
let bothComingFromTop = false;
let bothComingFromBottom = false;
let zeroLeftOneRight = false;
let oneLeftZeroRight = false;
let zeroTopOneBottom = false;
let oneTopZeroBottom = false;
let krock = false;
let onHold = true;
let round = 1;
let endRound = 3;
let winner = 0;
let fontFaceSet = document.fonts;
const ajust = 10;
// Input objekt för att visa poäng och runda
const numOfInputs = 6;
const inputs = [];
//const textNodes = [];
for (let i = 0; i < numOfInputs; i++) {
  inputs[i] = document.createElement("input");
  inputs[i].setAttribute("type", "text");
  document.body.append(inputs[i]);
}
inputs[0].classList.add("input-right");
inputs[2].classList.add("input-right");
inputs[4].classList.add("input-three");
inputs[0].value = "P1 SCORE:";
inputs[2].value = "P2 SCORE:";
inputs[4].value = "ROUND:";

const info = document.createElement("div");
const main = document.createElement("main");
/// Preloadar bilder ////////////////////////////////////////////////////////////////////
let oImg = [];
oImg[0] = document.createElement("IMG");
oImg[0].src = "img/skepp0_east.gif";
oImg[1] = document.createElement("IMG");
oImg[1].src = "img/skepp1_east.gif";
oImg[2] = document.createElement("IMG");
oImg[2].src = "img/skepp0_west.gif";
oImg[3] = document.createElement("IMG");
oImg[3].src = "img/skepp1_west.gif";
/////// Element för inforutan
const h1 = document.createElement("h1");
const p1 = document.createElement("p");
const p2 = document.createElement("p");
const p3 = document.createElement("h1");
document.body.append(main);
main.append(info);
info.setAttribute("id", "info");
info.append(oImg[0]);
oImg[0].classList.add("p-image");
info.append(oImg[3]);
oImg[3].classList.add("p-image");
info.append(h1);
info.append(p1);
info.append(p2);
info.append(p3);
h1.textContent = `MORTAL SPACE COMBAT`;
p1.textContent = `PLAYER 1: NAVIGATE WITH A W S D, FIRE WITH SPACE`;
p2.textContent = `PLAYER 2: NAVIGATE WITH 4 8 5 6, FIRE WITH 0`;
p3.textContent = `HIT ENTER TO START GAME!`;
info.style.visibility = "visible";
/// Lyssnare efter enter för att starta spelet
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    let i = 3;
    h1.textContent = `GET READY TO RUMBLE`;
    p1.textContent = i;
    p2.style.display = "none";
    p3.textContent = `BEST OF ${endRound} ROUNDS`;
    // Räknar ner innan spelet startar
    let starter = setInterval(() => {
      i--;
      if (i < 1) {
        p1.textContent = "GO!";
        clearInterval(starter);
        startGame();
      } else p1.textContent = i;
      p2.style.display = "none";
    }, 1000);
  }
});
function startGame() {
  for (let i = 0; i < numberOfPlayers; i++) {
    skepp[i].style.display = "block";
    skott[i].style.display = "block";
    onHold = false;
    if (players[i].stegX > 0) players[i].direction = "east";
    bytBild(i, players[i].direction);
    if (players[i].stegX < 0) players[i].direction = "west";
    bytBild(i, players[i].direction);
  }
  info.style.visibility = "hidden";
}
/// Resettar skeppens positioner och gömmer när inforutan visas
function continueGame(a, b) {
  skepp[a].style.display = "none";
  skepp[b].style.display = "none";
  if (players[0].score === endRound - 1 || players[1].score === endRound - 1) {
    if (players[0].score > players[1].score) winner = "2";
    else if (players[1].score > players[0].score) winner = "1";
    info.style.visibility = "visible";
    p1.style.display = "block";
    h1.textContent = `PLAYER ${winner} IS VICTORIOUS`;
    p1.textContent = `RELOAD PAGE TO PLAY AGAIN`;
  } else {
    for (let i = 0; i < numberOfPlayers; i++) {
      skott[i].style.display = "none";
      let randomX2 = Math.round(Math.random() * window.innerWidth) - 50;
      let randomY2 = Math.round(Math.random() * window.innerHeight) - 50;
      players[i].posX = randomX2;
      players[i].posY = randomY2;
    }
    // Inforutan visas och meddelande om score och round visas
    info.style.visibility = "visible";
    h1.textContent = `SCORE FOR PLAYER ${a + 1}`;
    setTimeout(() => {
      if (round < endRound) h1.textContent = `GET READY FOR ROUND ${round}`;
      else h1.textContent = `GET READY FOR THE FINALE ROUND`;
    }, 2000);
    setTimeout(() => {
      startGame();
    }, 4000);
    p1.style.display = "none";
    p2.style.display = "none";
    p3.style.display = "none";
    round++;
  }
}
console.log(fontFaceSet);
for (let i = 0; i < numberOfAmmo; i++) {
  // Skapar objekt med egenskaper för skott
  oSkott[i] = {
    posX: 0,
    posY: 0,
    width: 0,
    height: 0,
    speedX: 5,
    speedY: 0.5,
    accelaration: 10,
    active: false,
    direction: "west",
  };
}
//Loopen körs för varje spelar-objekt "numberOfPlayers"
for (let i = 0; i < numberOfPlayers; i++) {
  // Slumpar värde för startpossition innom tillgänglig bredd och höjd
  let randomX = Math.round(Math.random() * window.innerWidth + 50) - 50;
  let randomY = Math.round(Math.random() * window.innerHeight + 50) - 50;
  // Skapar objekt med egenskaper för players/skepp
  players[i] = {
    posX: randomX,
    posY: randomY,
    width: 50,
    height: 40,
    right: 0,
    bottom: 0,
    stegX: 0.5,
    stegY: 0.5,
    accelaration: 1.2,
    direction: "west",
    hit: false,
    lives: 3,
    score: 0,
  };
  //skapar och appendar html-element
  skepp[i] = document.createElement("IMG");
  skott[i] = document.createElement("div");
  document.body.append(skott[i]);
  document.body.append(skepp[i]);
  skepp[i].src = oImg[i].src;
  //Bredd och höjd css
  skepp[i].style.display = "none";
  skott[i].style.display = "none";
  skepp[i].style.width = players[i].width + "px";
  skepp[i].style.height = players[i].height + "px";
  skott[i].textContent = `*`;
  let down = false;
  // Lyssnar händelser från olika tangenter
  document.addEventListener(
    "keydown",
    (event) => {
      if (down) return;
      down = true;
      // Ökar/miskar hastigheten med accelerationsvärdet beroende på tangent som trycks ned
      if (onHold) return false;
      else {
        if (event.key === keyNames[i][0]) {
          players[i].stegX += players[i].accelaration;
          //Funktion anropas och byter bild på objktet om riktningen är =>
          if (players[i].stegX > 0) players[i].direction = "east";
          bytBild(i, players[i].direction);
        }
        if (event.key === keyNames[i][1]) {
          players[i].stegX -= players[i].accelaration;
          //Funktion anropas och byter bild på objktet om riktningen är <=
          if (players[i].stegX < 0) players[i].direction = "west";
          bytBild(i, players[i].direction);
        }
        //Ökar/miskar värdet på "stegY" med accelaration
        if (event.key === keyNames[i][2]) {
          players[i].stegY -= players[i].accelaration;
        }
        if (event.key === keyNames[i][3]) {
          players[i].stegY += players[i].accelaration;
        }
        // Tangenter för avtryckare
        if (event.key === keyNames[3]) {
          oSkott[0].active = true;
          skott[0].style.display = "block";
        }
        if (event.key === keyNames[2]) {
          oSkott[1].active = true;
          skott[1].style.display = "block";
        }
      }
    },
    false
  );
  //För att förhindra automatisk repetition
  document.addEventListener(
    "keyup",
    function () {
      down = false;
    },
    false
  );
}
function bytBild(obj, bild) {
  //Byter bild på objektet vid riktningsbyte och träff
  skepp[obj].src = `img/skepp${obj}_${bild}.gif`;
}
// Animerar med setInterval. Funktionen ger objekten position utifrån värderna från händelserna
const motor1 = setInterval(() => {
  // Dessa variabler kollar i vilken riktning objekten färdas. Om stegX < 0 färdas obj från höger till vänster
  // stegX > 0 färdas obj från vänster till höger
  // stegY < 0 från bottom till top, stegY > 0 top till bottom
  bothComingFromRight = players[0].stegX < 0 && players[1].stegX < 0;
  bothComingFromLeft = players[0].stegX > 0 && players[1].stegX > 0;
  bothComingFromTop = players[0].stegY > 0 && players[1].stegY > 0;
  bothComingFromBottom = players[0].stegY < 0 && players[1].stegY < 0;
  zeroLeftOneRight = players[0].stegX > 0 && players[1].stegX < 0;
  oneLeftZeroRight = players[0].stegX < 0 && players[1].stegX > 0;
  zeroTopOneBottom = players[0].stegY > 0 && players[1].stegY < 0;
  oneTopZeroBottom = players[0].stegY < 0 && players[1].stegY > 0;
  // Kollar om obj befinner sig på samma ställe, krock blir då true
  krock =
    players[1].right > players[0].posX &&
    players[1].bottom > players[0].posY &&
    players[1].posX < players[0].right &&
    players[1].posY < players[0].bottom;
  //Anropar "fysikmotorn" kollaVar()
  if (krock && !onHold) kollaVar();
  for (let i = 0; i < numberOfPlayers; i++) {
    inputs[1].value = players[1].score;
    inputs[3].value = players[0].score;
    inputs[5].value = round;
    players[i].right = players[i].posX + players[i].width;
    players[i].bottom = players[i].posY + players[i].height;
    // posX ökar för varje anrop med hastighetsvärdet
    // Om objektet kommer utanför tillgänglig höjd/bredd byter det riktning
    if (players[i].right > window.innerWidth) {
      players[i].direction = "west";
      bytBild(i, players[i].direction);
      players[i].stegX = -startHastighet;
    } else if (players[i].posX < 1) {
      players[i].direction = "east";
      bytBild(i, players[i].direction);
      players[i].stegX = startHastighet;
    }
    if (players[i].bottom > window.innerHeight) {
      players[i].stegY = -startHastighet;
    } else if (players[i].posY < 1) {
      players[i].stegY = startHastighet;
    }
    // Här får bilderna sina CSS-värden vilket skapar själva animeringen
    players[i].posX += players[i].stegX;
    players[i].posY += players[i].stegY;

    // style-objektet får ny possition
    skepp[i].style.left = players[i].posX + "px";
    skepp[i].style.top = players[i].posY + "px";
    skott[i].style.left = oSkott[i].posX + "px";
    skott[i].style.top = oSkott[i].posY + "px";

    //Anropar funktionen som kollar om skottet träffar
    if (oSkott[i].active) kollaTraff();
    /////////////
    //Styr och positionerar skotten
    if (
      // Om hamnar utanför bild "laddas" det om
      oSkott[i].posX > window.innerWidth ||
      oSkott[i].posX < 0 ||
      oSkott[i].posY > window.innerHeight ||
      oSkott[i].posY < 0
    ) {
      oSkott[i].active = false;
    }
    // FIRE! Skickas iväg med nya värden
    if (oSkott[i].active) {
      if (oSkott[i].speedX > 0) {
        oSkott[i].posX += oSkott[i].speedX + oSkott[i].accelaration;
      } else if (oSkott[i].speedX < 0) {
        oSkott[i].posX += oSkott[i].speedX - oSkott[i].accelaration;
      }
      oSkott[i].posY += oSkott[i].speedY;
    } else {
      // Ursprungvärden, precis i mitten av skeppet
      oSkott[i].posX = players[i].posX + players[i].width / 2;
      oSkott[i].posY = players[i].posY + players[i].height / 2;
      oSkott[i].speedY = players[i].stegY;
      oSkott[i].speedX = players[i].stegX;
    }
  }
}, 10);

//"Fysikmotor" som kollar när objekten på olika sätt kolliderar och byter därefter riktning
function kollaVar(obj) {
  if (
    ///////////////////////////////////// X-led
    bothComingFromRight &&
    players[0].posX < players[1].right &&
    players[0].posX > players[1].right - ajust
  ) {
    players[0].stegX = startHastighet / 2;
    players[1].stegX -= startHastighet;
    bytBild(0, "east");
    bytBild(1, "west");
  } else if (
    bothComingFromRight &&
    players[1].posX < players[0].right &&
    players[1].posX > players[0].right - ajust
  ) {
    players[1].stegX = startHastighet / 2;
    players[0].stegX -= startHastighet;
    bytBild(0, "west");
    bytBild(1, "east");
  } else if (
    bothComingFromLeft &&
    players[1].right > players[0].posX &&
    players[1].right < players[0].posX + ajust
  ) {
    players[1].stegX = -startHastighet / 2;
    players[0].stegX += startHastighet;
    bytBild(0, "east");
    bytBild(1, "west");
  } else if (
    bothComingFromLeft &&
    players[0].right > players[1].posX &&
    players[0].right < players[1].posX + ajust
  ) {
    players[0].stegX = -startHastighet / 2;
    players[1].stegX += startHastighet;
    bytBild(0, "west");
    bytBild(1, "east");
  } else if (
    zeroLeftOneRight &&
    players[0].right > players[1].posX &&
    players[0].right < players[1].posX + ajust
  ) {
    players[0].stegX = -startHastighet;
    players[1].stegX = startHastighet;
    bytBild(0, "west");
    bytBild(1, "east");
  } else if (
    oneLeftZeroRight &&
    players[1].right > players[0].posX &&
    players[1].right < players[0].posX + ajust
  ) {
    players[0].stegX = startHastighet;
    players[1].stegX = -startHastighet;
    bytBild(0, "east");
    bytBild(1, "west");
  } ///////////////////////////////////// Y-led
  if (
    bothComingFromBottom &&
    players[0].posY < players[1].bottom &&
    players[0].posY > players[1].bottom - ajust
  ) {
    players[0].stegY = startHastighet / 2;
    players[1].stegY -= startHastighet;
  } else if (
    bothComingFromBottom &&
    players[1].posY < players[0].bottom &&
    players[1].posY > players[0].bottom - ajust
  ) {
    players[1].stegY = startHastighet / 2;
    players[0].stegY -= startHastighet;
  } else if (
    bothComingFromTop &&
    players[1].bottom > players[0].posY &&
    players[1].bottom < players[0].posY + ajust
  ) {
    players[1].stegY = -startHastighet / 2;
    players[0].stegY += startHastighet;
  } else if (
    bothComingFromTop &&
    players[0].bottom > players[1].posY &&
    players[0].bottom < players[1].posY + ajust
  ) {
    players[0].stegY = -startHastighet / 2;
    players[1].stegY += startHastighet;
  } else if (
    zeroTopOneBottom &&
    players[0].bottom > players[1].posY &&
    players[0].bottom < players[1].posY + ajust
  ) {
    players[0].stegY = -startHastighet;
    players[1].stegY = startHastighet;
  } else if (
    oneTopZeroBottom &&
    players[1].bottom > players[0].posY &&
    players[1].bottom < players[0].posY + ajust
  ) {
    players[0].stegY = startHastighet;
    players[1].stegY = -startHastighet;
  }
}
// Funktionen kollar om skott-objekten träffar skeppen
function kollaTraff() {
  function hit(a, b) {
    players[a].hit =
      oSkott[b].posX > players[a].posX &&
      oSkott[b].posX < players[a].right &&
      oSkott[b].posY < players[a].bottom &&
      oSkott[b].posY > players[a].posY - 5;
    if (players[a].hit) {
      skott[a].style.display = "none";
      skott[b].style.display = "none";
      oSkott[b].active = false;
      players[a].lives--;
      bytBild(a, "explosion", "explosion");
      players[a].hit = false;
      onHold = true;
      players[b].score++;
      setTimeout(() => {
        continueGame(a, b);
      }, 1000);
    }
  }
  hit(0, 1);
  hit(1, 0);
}