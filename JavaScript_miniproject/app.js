let gameSeq = [];
let userSeq = [];

let btns = ["yellow","red","purple","green"];
let started = false;
let level = 0;
let h2=document.querySelector("h2");
let bestScore = 0;
let bestScoreText = document.querySelector("#bestScore");
let startBtn = document.querySelector("#start-btn");
startBtn.addEventListener("click", startGame);
let subtitle = document.querySelector("#subtitle");

function startGame() {
    if (!started) {
        started = true;
        btnContainer.style.display = "flex";
        startBtn.style.display = "none";
         subtitle.style.display = "none";
        levelUp();
    }
}

// document.addEventListener("keypress",function(){
//    if (started == false){
//        console.log("game is started");
//        started = true;
//        levelUp();
//    }
// });

let themeBtn = document.querySelector("#theme-btn");

// Load saved theme
let savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark"){
    document.body.classList.add("dark");
    themeBtn.innerHTML = "☀️ Light Mode";
}
else{
    themeBtn.innerHTML = "🌙 Dark Mode";
}

// Toggle theme
themeBtn.addEventListener("click", function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme", "dark");   // Save theme
        themeBtn.innerHTML = "☀️ Light Mode";
    }
    else{
        localStorage.setItem("theme", "light");  // Save theme
        themeBtn.innerHTML = "🌙 Dark Mode";
    }

});


let btnContainer = document.querySelector(".btn-container");

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  
  //random btn choose
  let randIdx =Math.floor(Math.random()*btns.length);
  let randColor = btns[randIdx];
  let randBtn=document.querySelector(`.${randColor}`);
//   console.log(randIdx);
//   console.log(randColor);
//   console.log(randBtn);

  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
  console.log("Computer sequence:", gameSeq);
}

function checkAns(idx){
  if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
    
           setTimeout(levelUp,1000) ;
        }
        
    }else{
      console.log("Wrong button pressed! Resetting game...");
      if (level > bestScore) {
        bestScore = level;
       }
      updateBestScore();
       btnContainer.style.display = "none";

      h2.innerHTML = `Game over! Your score was <b>${level}</b> <br>Highest Score: <b>${bestScore}</b><br><br> Press <b>Play Again</b> to restart.`;

    //   document.querySelector("body").style.backgroundColor="red";
    //   setTimeout(function(){
    //        document.querySelector("body").style.backgroundColor="white";
    //   },150);
    document.body.classList.add("wrong-flash");

setTimeout(function () {
    document.body.classList.remove("wrong-flash");
}, 150);

      reset();
    }
}
function btnPress() {
    console.log(this);
    let btn =this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    //console.log(userColor);
    userSeq.push(userColor);
    console.log("Player sequence:", userSeq);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function updateBestScore() {
    if (level > bestScore) {
        bestScore = level;
        bestScoreText.innerText = `Highest Score : ${bestScore}`;
    }
}

function reset(){
    started=false;
    gameSeq  = [];
    userSeq=[];
    level = 0;
    
    btnContainer.style.display = "none";

    startBtn.style.display = "inline-block";
    startBtn.innerText = "🔄 Play Again";
   
}
