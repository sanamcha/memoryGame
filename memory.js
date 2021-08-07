
let card1 = null;
let card2 = null;
let flips = 0;
let noClick = false;
const game = document.querySelector("#game");
const h2 = document.getElementById('gameOver');
let currentScore = document.getElementById("current-score");
let score = 0;

const colors = [
  "yellow",
  "black",
  "purple",
  "blue",
  "pink",
  "purple",
  "pink",
  "yellow",
  "blue",
  "black",
];
 
function shuffle(arr) {
    let count = arr.length;
    
    while(count > 0){
     let idx = Math.floor(Math.random() * count);
    count--;
     let temp = arr[count];
     arr[count] = arr[idx];
     arr[idx] = temp;
  }
  return arr;
}

function divColors(colorArr) {
  for (let color of colorArr) {
    const div = document.createElement("div");
    div.classList.add(color);
    div.addEventListener("click", cardClick);
    game.append(div);
  }
}

function cardClick(event) {
  if (noClick) return;
  if (event.target.classList.contains("flipping")) return;
  event.target.style.backgroundColor = event.target.classList[0];

  score++;
  currentScore.innerText = score;


  if (!card1 || !card2) {
    event.target.classList.add("flipping");
    card1 = card1 || event.target;
    card2 = event.target === card1 ? null : event.target;
  }

  if (card1 && card2) {
    noClick = true;
    
    if(card1.className === card2.className){
      flips += 2;
      card1.removeEventListener("click", cardClick);
      card2.removeEventListener("click", cardClick);
      card1 = null;
      card2 = null;
      noClick = false;
    } else {
      setTimeout(function() {
        
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipping");
        card2.classList.remove("flipping");
        card1 = null;
        card2 = null;
        noClick = false;
      }, 500);
    }
  }
 
  if(flips === colors.length){
    h2.innerText = "GAME OVER!!!"; 
  } 
}

divColors(shuffle(colors));
