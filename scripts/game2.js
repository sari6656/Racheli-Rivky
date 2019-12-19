
var games=0;
var time;
var bonusOrNumber = [ "number", "number", "number", "number","number", "number","number","קבל 2 מהיריב", "השלם ל-10", "השלם ל-10"];

var honey = ["../resources/images/תמונות לפרויקט/D1.png", "../resources/images/תמונות לפרויקט/D3.png", "../resources/images/תמונות לפרויקט/D5.png", "../resources/images/תמונות לפרויקט/D7.png", "../resources/images/תמונות לפרויקט/D9.png", "../resources/images/תמונות לפרויקט/D11.png", "../resources/images/תמונות לפרויקט/D13.png", "../resources/images/תמונות לפרויקט/D15.png", "../resources/images/תמונות לפרויקט/D17.png", "../resources/images/תמונות לפרויקט/D18.png", ];
var players = [
    { name: data.player1Name, num: 1, color: "orange", bee: "../resources/images/תמונות לפרויקט/דבורה 1.png", points: 0, wins: 0, element: document.querySelector('.player1_section')},
{ name: data.player2Name, num: 2, color: "yellow", bee: "../resources/images/תמונות לפרויקט/דבורה 2.png", points: 0, wins: 0, element: document.querySelector('.player2_section')}
];
var questions = data.questions;
var lengthQestion = questions.length;
var currentPlayerIndex = 0;
var currentPlayer = players[currentPlayerIndex];
var press;
var idDiv;
var changehoney;
var choicePlayer;
var path;
var length;


var numHexagon;
// get the length of the path
data.minPoints = parseInt(data.minPoints);
data.maxPoints = parseInt(data.maxPoints);
function getRandomValueForPoints() {
    return Math.round(Math.random() * (data.maxPoints - data.minPoints)) + parseInt(data.minPoints);
}

function load()
{
    document.getElementById("bee1").classList.add('beeJump');
    path = document.getElementById('animated-path');
    length = path.getTotalLength();
    numHexagon = document.getElementsByClassName("hexagon").length;
    console.log(length);
    document.getElementById("point1").innerHTML = players[0].points;
    document.getElementById("point2").innerHTML = players[1].points;
    for(var i = 0; i < players.length; i ++) {
        players[i].element.querySelector('h1').innerHTML = players[i].name;
    }

}
function deleteIndexFromQuestions(index) {
    for (var i = index; i < lengthQestion; i++) {
        questions[i] = questions[i + 1];

    }

}

function getNextPlayerIndex(index) {
    var nextIndex = 0;
    if (index == 0)
        nextIndex = 1;
    return nextIndex;
}

//function changePicture()
//{
//    document.getElementById("player").setAttribute("class", 'picturePlayer');
////הסרה
//document.getElementById("player").classList.remove("className")
var x;
var rnd;
var timeSetTimeOut = 5010;
var listQuestions;
var rand;
var honeyWiner;
var timerElement = document.getElementById('timer');
function wrong(message) {
    console.log("שגוי");

    setTimeout(function () {wait(); }, 1000);
    showResultMessage(message || data.wrongAnswerMessage, next);
}
function question(idButton) {

    press = 0;
    idDiv = document.getElementById("b" + idButton);
    ///TODO remove question from array
    //TODO randomaly
    document.getElementById("listQuestions").innerHTML = "";
    rnd = Math.floor(Math.random() * (lengthQestion));
    document.getElementById("custom-alert").classList.add( "show");
    // document.getElementById("question").setAttribute("style", "z-index:3");
    //setTimeout(function () {

    //    document.getElementById("question").style.width = '20vw';
    //    //document.getElementById("question").style.height = '20vh';
    //    document.getElementById("question").style.marginTop = '20%';
    //    document.getElementById("question").style.marginLeft = '-45%';
    //    document.getElementById("question").style.display = "block";

    //}, 2000);
    for (var i = 0; i < document.getElementsByClassName("hexagon").length; i++) {
        document.getElementsByClassName("hexagon")[i].removeAttribute("onclick");
    }
    listQuestions = document.getElementById("listQuestions");
    //document.getElementById("listQuestions").setAttribute("class",'questionMove')
    //<p class="form__question">¿Cual es tu fruta favorita?</p>
    var p = document.createElement('p');
    setTimeout(function () {
        p.setAttribute('class', "form__question");
        p.innerHTML = questions[rnd].question;
        listQuestions.appendChild(p);
        var qua1 = document.createElement("div");
        qua1.setAttribute("class", "form__input");
        qua1.innerHTML = '<input type="radio" id="manzana" name="fruta" onclick="onAnswerClick(1)"/><label for="manzana" value= "manzana" class="form__label" ><svg class="radio"><use xlink:href="#radio" class="radio-use" /></svg><span>' + questions[rnd].answer1 + '</span></label>';
        listQuestions.appendChild(qua1);
        var qua2 = document.createElement("div");
        qua2.setAttribute("class", "form__input");
        qua2.innerHTML = '<input type="radio" id="Pera" name="fruta" onclick="onAnswerClick(2)"/><label for="Pera" value= "Pera" class="form__label" ><svg class="radio"><use xlink:href="#radio" class="radio-use" /></svg><span>' + questions[rnd].answer2 + '</span></label>';
        listQuestions.appendChild(qua2);
        var qua3 = document.createElement("div");
        qua3.setAttribute("class", "form__input");
        qua3.innerHTML = '<input type="radio" id="Naranja" name="fruta" onclick="onAnswerClick(3)"/><label for="Naranja" value= "Naranja" class="form__label" ><svg class="radio"><use xlink:href="#radio" class="radio-use" /></svg><span>' + questions[rnd].answer3 + '</span></label>';
        listQuestions.appendChild(qua3);
        var leftSeconds = data.questionTimer;
        timerElement.innerHTML = leftSeconds;
        time = setInterval(function () {
            leftSeconds --;
            timerElement.innerHTML = leftSeconds;
        
            if(leftSeconds <= 0) {
                // timerElement.innerHTML = '';
                wait();
                if (press == 0)
                    wrong(data.timeEndMessage);
            }
        }, 1000);
    }, 1000);
    listQuestions.removeAttribute("hidden")
}

function onAnswerClick(value) {
    if(press === 1) {
        return;
    }
    answerChecked(value);
    changePress(1);
}

function wait() {

    // document.getElementById("question").classList.remove("show");
    // document.getElementById("question").setAttribute("style", "z-index:-1");
    clearInterval(time);
    timerElement.innerHTML = '';
    listQuestions.setAttribute("hidden", "hidden");
    for (var i = 0; i < document.getElementsByClassName("hexagon").length; i++) {
        document.getElementsByClassName("hexagon")[i].setAttribute("onclick", "question(" + i + ")");

    }
    listQuestions.setAttribute("hidden", "hidden");
}
function changePress(numPress) {
    press = numPress;
}


function answerChecked(selectedValue) {
    //document.getElementById("question").classList.remove("addToDiv");
    //listQuestions.setAttribute("hidden", "hidden");
    //TODO 
    //1.compare question
    //2.reset time
    //x = 0;
    // timerElement.innerHTML = '';
    if ((questions[rnd].correctAnswer) == selectedValue) {
        lengthQestion--;
        deleteIndexFromQuestions(rnd);
 
        correct();
        numHexagon--;

    }
    else
        wrong();
}

function next() {


    if (numHexagon == 0 || lengthQestion == 0)
        chekWin();
    else {
        currentPlayerIndex = getNextPlayerIndex(currentPlayerIndex);
        currentPlayer = players[currentPlayerIndex];
        currentPlayer.element.querySelector('.honey').appendChild(timerElement);
        if(currentPlayer.num==1)
        {
            //if (games != 0)
            document.getElementById("bee2").classList.remove('beeJump')
            document.getElementById("bee1").classList.add('beeJump');
            games++;

        }
        else {
            document.getElementById("bee1").classList.remove('beeJump')
            document.getElementById("bee2").classList.add('beeJump');
        }
    }
}
function onWin(winners) {
    var winningMessage = '';
    document.body.classList.add('winning');
    if(winners.length > 1) {
        document.body.classList.add('multiple-winners');
    }
        
    players.forEach(function(player) {
        player.element.querySelector('.bee').classList.remove('beeJump');
    });
    winners.forEach(function(winnerPlayer, i) {
        winnerPlayer.element.querySelector('.bee').classList.add('beeJumpWinner');
        winnerPlayer.element.classList.add('winner');
        if(i > 0) {
            winningMessage += 'ו';
        }
        winningMessage += winnerPlayer.name + ' ';
        completeHoneyJar(winnerPlayer);
    });
    winningMessage += winners.length > 1? 'ניצחתן !': 'ניצחה !';
    document.getElementById('winningMessage').innerHTML = winningMessage;
}
function completeHoneyJar(winnerPlayer) {
    var i = winnerPlayer.wins;
    var interval = setInterval(function () {
        if (i == honey.length) {
            clearInterval(interval);
            return;
        }
        changehoney = winnerPlayer.element.querySelector('.honey');
        var f = '<img  id="honey' + winnerPlayer.num + '" src="' + honey[i] + '"/>';
        document.createElement("img");
        changehoney.innerHTML = f;
        i++;
    }, 300);
}

function chekWin() {
    var winnerPlayers;
    for (var i = 0; i < document.getElementsByClassName("hexagon").length; i++)
    {
        document.getElementsByClassName("hexagon")[i].removeAttribute("onclick");
    }

    if (players[0].wins > players[1].wins) {
        winnerPlayers = [players[0]];
    }
    else if (players[0].wins < players[1].wins) {
        winnerPlayers = [players[1]];
    }
    else {
        winnerPlayers = players;
    }
    onWin(winnerPlayers);
}
function addHoney() {
    changehoney = document.getElementById("honeyDiv" + currentPlayer.num);
    var f = '<img  id="honey' + currentPlayer.num + '" src="' + honey[currentPlayer.wins] + '"/>';
    document.createElement("img");
    changehoney.innerHTML = f;
}

function correct() {
    setTimeout(
       function () {
           wait();
            var idDivText;
           rand = Math.round(Math.random() * (bonusOrNumber.length - 1));
           console.log("bonusOrNumber[rand]: " + bonusOrNumber[rand]);

           if (bonusOrNumber[rand] == "קבל 2 מהיריב") {
               idDivText = bonusOrNumber[rand];
               var nextPlayer = players[getNextPlayerIndex(currentPlayerIndex)]
               if (nextPlayer.points >= 2) {
                   nextPlayer.points -= 2;
                   currentPlayer.points += 2;
               }
               else {
                   currentPlayer.points += nextPlayer.points;
                   nextPlayer.points = 0;
               }
           }
           else if (bonusOrNumber[rand] == "השלם ל-10") {
               idDivText = bonusOrNumber[rand];
               currentPlayer.points = 10; 
           }
           else if (bonusOrNumber[rand] == "pointsBonus") {
                idDivText = " בונוס" + data.bonusPoints;
                currentPlayer.points += data.bonusPoints;
            }
           else if (bonusOrNumber[rand] == "בחר מספר") {
                showNumberChooser();
           }
           else {
               let randomNumber = getRandomValueForPoints();
               idDivText = randomNumber;
               currentPlayer.points += randomNumber;
           }
           if(bonusOrNumber[rand] !== "בחר מספר") {
               showResultMessage(data.correctAnswerMessage, onCorrectAnswer.bind(null, idDivText));
           }
       }, 1000);
}

function onCorrectAnswer(idDivText){
    idDiv.classList.add(currentPlayer.color);
    idDiv.classList.remove("hexagon1");
    idDiv.children[0].innerHTML = idDivText;


    if (currentPlayer.points >= 10) {
        currentPlayer.wins++;
        addHoney();
        currentPlayer.points = 0;
    //    document.getElementById("point1").innerHTML = players[0].points;
    //    document.getElementById("point2").innerHTML = players[1].points;
        var playerItems = document.getElementsByClassName(currentPlayer.color);
        for (var i = 0; i < playerItems.length; i++) {
            playerItems[i].classList.add("used" + currentPlayer.color);

        }
        for (var i = 0; i < playerItems.length; i++) {
            playerItems[i].classList.remove(currentPlayer.color);
        }
    }
    document.getElementById("point1").innerHTML = /*players[0].points + */players[0].wins * 10;
    document.getElementById("point2").innerHTML = /*players[1].points + */players[1].wins * 10;
    next();
}

var customAlert = document.getElementById('custom-alert');
var questionWrapper = document.getElementById('question');
var questionResult = document.getElementById('question-result');
var numberChooser = document.getElementById('number-chooser');

function showResultMessage(message, callback) {
    
    questionWrapper.style.display = 'none';
    questionResult.style.display = '';
    questionResult.innerHTML = message;
    if(data.showMessageDuration) {
        setTimeout(function(){
            questionWrapper.style.display = '';
            questionResult.style.display = 'none';
            customAlert.classList.remove('show');
            callback();
        }, data.showMessageDuration * 1000);
    }
}

var onNumberChoosenClick = function (event) {
    var choosenNumber = document.querySelector('input[type="number"]').value;
    questionWrapper.style.display = '';
    questionResult.style.display = 'none';
    numberChooser.style.display = 'none';
    customAlert.classList.remove('show');
    console.log(event);
    document.getElementById('number-value');
    currentPlayer.points += parseInt( choosenNumber);
    onCorrectAnswer(choosenNumber)
}

function showNumberChooser(callback) {
    questionWrapper.style.display = 'none';
    questionResult.style.display = '';
    numberChooser.style.display = '';
    questionResult.innerHTML = data.chooseNumberMessage;
}
