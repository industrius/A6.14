// объявление переменных
// максимум попаданий
const maxHits = 10;
// счетчик попаданий
let Hits = 1;
// счетчик промахов
let Miss = 0;
// время начала игры
let firstHitTime = 0;
// класс предыдущей ячейки
let prevDiv = "";

// Сброс всех переменных и отображаемых элементов
function reset(){
    // сброс переменных
    Hits = 1;
    Miss = 0;
    prevDiv = "";
    // сохранение времени начала игры
    startTime = Date.now();
    // Сброс всех ячеек 
    document.querySelectorAll(".grid-item").forEach(function(item){
        item.classList.remove("target");
        item.classList.remove("miss");
        item.textContent = "";
    });
    // сброс отображаемого в отчете времени
    document.querySelector(".time-played").textContent = "";
    // прячем отчет и огровое поле
    document.querySelector(".message").classList.add("hide");
    document.querySelector(".grid").classList.remove("hide");
    // смена текста на кнопке
    document.querySelector(".btn-start").textContent = "Начать заново";
    // Запуск игры
    game(true);
};

// Разбор попаданий и промахов
// инкремент счетчиков
function handleClick(){
    if (event.target.classList.contains("target")){
        // если ячейка имеет класс targer - значит попадание
        Hits += 1;
        game(false);
    }else{
        // промах
        Miss += 1;
        game(true);
    };
    // Отсчет попаданий до максимального значения
    if(Hits === maxHits){score()};
};

// функция отображения ячеек попал/не попал в зависимости от boolean параметра miss
function game(miss){
    // удаление классов ячеек перед новой итерацией
    if(prevDiv != ""){
        document.querySelector(prevDiv).classList.remove("target");
        document.querySelector(prevDiv).textContent = "";
    };
    // если не попал то добавить класс miss
    if(miss && prevDiv != ""){document.querySelector(prevDiv).classList.add("miss")};
    // генерация нового случайного поля и добавление ему класса target и цифры
    let divSelector = randomDivId();
    document.querySelector(divSelector).classList.add("target");
    document.querySelector(divSelector).textContent = Hits;
    // сохранение предыдущего поля для очистки на следующей итерации
    prevDiv = divSelector;
};

// вывод счета по окончании игры
function score(){
    // скрыть игровое поле
    document.querySelector(".grid").classList.add("hide");
    // вычисление и отображение времени игры
    let totalPlayedMillis = Date.now() - startTime;
    let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toString();
    document.querySelector(".time-played").textContent = totalPlayedSeconds;
    // вывод количества промахов
    document.querySelector(".miss-count").textContent = Miss;
    // вывод счета попадания - промахи
    document.querySelector(".total-score").textContent = 10 - Miss;
    // показать счет 
    document.querySelector(".message").classList.remove("hide");
    // смена текста на кнопке
    document.querySelector(".btn-start").textContent = "Играть заново";
};

// Генерация класса случайной ячейки
function randomDivId(){
    let d = Math.floor(Math.random() * 6) + 1;
    let n = Math.floor(Math.random() * 6) + 1;
    return `.slot-${d}${n}`;
}

// функция генерации ячеек 6х6
function createGameField(){
    for (let d = 1; d <= 6; d++){
        for (let n=1; n <= 6; n++){
            // установка родителя html
            let gwrapper = document.querySelector(".grid");
            // создание div и добавление ему классов
            let htmlString = document.createElement("div");
            htmlString.classList.add("grid-item");
            htmlString.classList.add(`slot-${d}${n}`)
            // добавление ячейки в html
            gwrapper.appendChild(htmlString);
        };
    };
};

// подключение к элементам html слушателя событий
function init(){
    document.querySelector(".grid").addEventListener("click", handleClick);
    document.querySelector(".btn-start").addEventListener("click", reset);
};

// запуск игры после полной загрузки скрипта
document.addEventListener("DOMContentLoaded", function(event){
    createGameField();
    init();
});

