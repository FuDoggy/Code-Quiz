var quizQuestions = document.querySelector("#quizContent");
var highscoreDiv = document.getElementById("highscoreDiv");
var quizAnswerEl = document.getElementById("displayAnswer");
var questions = [
    {
    question:  "What planet is Maz Kanata from?",
    answers:  ['Takodana', 'Yavin', 'Utapau', 'Bespin'],
    correct:  'Takodana',
    },
    {
    question:  "In A New Hope, at the Mos Eisley spaceport, at which number bay was the Millennium Falcon docked?",
    answers:  ['27', '66', '94', '170'],
    correct:  '94',
    },
    {
    question:  "In the Battle of Yavin, what was Luke Skywalker's call sign in the assault?",
    answers:  ['Red 3', 'Red 5', 'Red 7', 'Red 9'],
    correct:  'Red 5'
    },
    {
    question:  "What is Count Dooku's Sith name?",
    answers:  ['Darth Tenebraus', 'Darth Plaguies', 'Darth Sidius', 'Darth Tyranus'],
    correct:  'Darth Tyranus',
    },
    {
    question:  "Which planet is Han Solo from?",
    answers:  ['Kashyyk' , 'Yemin' , 'Corellia', 'Coruscant'],
    correct:  'Corellia',
    },
    {
    question:  "On what level of the Death Star was Princess Leia being held?",
    answers:  ['Level 3' , 'Level 4' , 'Level 5', 'Level 6'],
    correct:  'Level 5',
    },
    {
    question:  "What did Han Solo ask Chewbacca to bring him when he was trying to repair the hyperdrive motivator?",
    answers:  ['coupling' , 'hydrospanner' , 'negative ionizer', 'dampening axis'],
    correct:  'hydrospanner',
    },
    {
    question:  "What did the Rebel Alliance use on Hoth to allow its transports to get past the Imperial blockade?",
    answers:  ['cloaking device' , 'plasma cannon' , 'ion cannon', 'turbolaser'],
    correct:  'ion cannon',
    },
    {
    question:  "Which podracer is the first to explode in the big race in Phantom Menace?",
    answers:  ['Neva Kee' , 'Sebulba' , 'Ratts Tyrell', 'Ben Quadrinaros'],
    correct:  'Ben Quadrinaros',
    },
    {
    question:  "Where were Luke and Leia born?",
    answers:  ['Tatooine' , 'Polis Massa' , 'Rhen Var', 'Zonama Sekot'],
    correct:  'Polis Massa',
    },
]
var currentQuestion = 0;
var score = 0;
var timeleft = 60;
var timer;
var clicked = false;
var downloadTimer;
quizQuestions.innerHTML = "";

function start(){
    document.querySelector("#start").style.display = "none";
     downloadTimer = setInterval(function(){
        timeleft--;
        document.getElementById("countdownTimer").textContent = timeleft;
        if(timeleft === 0)       
            //call endgame function;
            endGame()
        }, 1000);

        generateQuestions();
    };   
function endGame() {
    clearInterval(downloadTimer);
    highscoreDiv.setAttribute("style", "display:block")
}
function generateQuestions() {
    //check if on last question, if past last question, call this endgame function
    if (currentQuestion === 10) {
        endGame();
        return;
    }
    document.getElementById("warning").textContent = ""
    quizQuestions.innerHTML = "";
    quizAnswerEl.textContent = "";
    var h2 = document.createElement("h2");
    h2.textContent = questions[currentQuestion].question;
    quizQuestions.appendChild(h2);

for (var i = 0; i < questions[currentQuestion].answers.length; i++) {
    var buttons = document.createElement("button")
    buttons.textContent = questions[currentQuestion].answers[i];
    buttons.addEventListener("click", checkAnswer) 
    quizQuestions.appendChild(buttons)
    }
    
}
quizAnswerEl = document.getElementById('displayAnswer');
function checkAnswer(){
    if (this.textContent === questions[currentQuestion].correct) {
        quizAnswerEl.textContent = "THE FORCE IS STRONG WITH YOU!";
        score++;
    }   
        
    else {
        quizAnswerEl.textContent = "YOU NEED MORE TRAINING, PADAWAN!";
    }

    currentQuestion++;
    setTimeout(generateQuestions, 1500)
}
var saveScoreArr = [];
saveScore()
var submitInitials = document.getElementById("highscore").value;
var saveHighScore = {
    Initials: submitInitials, Score: score
};

function saveScore(){
    saveHighScore = JSON.parse(localStorage.getItem('saveHighScore'));
    saveScoreArr.push(saveHighScore)
    //take the final score
    //take the initials from the input w id highscore
    //store it in localstorage
    //localStorage.setItem
    localStorage.setItem("saveHighScore", JSON.stringify(saveScoreArr))
    console.log(saveScoreArr)
}


// = highscores.name

document.getElementById("start").addEventListener("click", start);
document.getElementById("submitHighscore").addEventListener("click", saveScore);
