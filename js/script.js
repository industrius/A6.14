const maxHits = 10;
let Hits = 1;
let Miss = 0;
let firstHitTime = 0;
let prevDiv = "";

function reset(){
    Hits = 1;
    Miss = 0;
    prevDiv = "";
    startTime = Date.now();
    document.querySelectorAll(".grid-item").forEach(function(item){
        item.classList.remove("target");
        item.classList.remove("miss");
        item.textContent = "";
    });
    document.querySelector(".time-played").textContent = "";
    document.querySelector(".message").classList.add("hide");
    document.querySelector(".grid").classList.remove("hide");
    document.querySelector(".btn-start").textContent = "Начать заново";
    game(true);
};

function handleClick(){
    if (event.target.classList.contains("target")){
        Hits += 1;
        game(false);
    }else{
        Miss += 1;
        game(true);
    };
    if(Hits === maxHits){score()};
};

function game(miss){
    if(prevDiv != ""){
        document.querySelector(prevDiv).classList.remove("target");
        document.querySelector(prevDiv).textContent = "";
    };
    if(miss && prevDiv != ""){document.querySelector(prevDiv).classList.add("miss")};
    let divSelector = randomDivId();
    document.querySelector(divSelector).classList.add("target");
    document.querySelector(divSelector).textContent = Hits;
    prevDiv = divSelector;
};

function score(){
    document.querySelector(".grid").classList.add("hide");
    let totalPlayedMillis = Date.now() - startTime;
    let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toString();
    document.querySelector(".time-played").textContent = totalPlayedSeconds;
    document.querySelector(".miss-count").textContent = Miss;
    document.querySelector(".total-score").textContent = 10 - Miss;
    document.querySelector(".message").classList.remove("hide");
    document.querySelector(".btn-start").textContent = "Играть заново";
};

function randomDivId(){
    let d = Math.floor(Math.random() * 6) + 1;
    let n = Math.floor(Math.random() * 6) + 1;
    return `.slot-${d}${n}`;
}

function createGameField(){
    for (let d = 1; d <= 6; d++){
        for (let n=1; n <= 6; n++){
            let gwrapper = document.querySelector(".grid");
            let htmlString = document.createElement("div");
            htmlString.classList.add("grid-item");
            htmlString.classList.add(`slot-${d}${n}`)
            gwrapper.appendChild(htmlString);
        };
    };
};

function init(){
    document.querySelector(".grid").addEventListener("click", handleClick);
    document.querySelector(".btn-start").addEventListener("click", reset);
};

document.addEventListener("DOMContentLoaded", function(event){
    createGameField();
    init();
});

