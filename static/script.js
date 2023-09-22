const BUTTONS = document.getElementsByClassName("answer-btn");

const START_BUTTON = document.getElementById("start-btn");
const END_BUTTON = document.getElementById("end-btn");

const QUESTION_FIELD = document.getElementById("question");
const POINTS = document.getElementById("player-points");
const MISTAKES = document.getElementById("player-mistakes");

const MAIN_SCREEN = document.getElementById("main-screen");
const START_SCREEN = document.getElementById("start-screen");
const END_SCREEN = document.getElementById("end-screen");

const END_MESSAGE = document.getElementById("end-message");

let db = {
    apple: "jablko",
    pear: "gruszka",
    computer: "komputer",
    fucking: "jebanko",
    tv: "tv",
    banana: "banan",
    fuckton: "duzo",
    heygay: "hejgej",
    food: "papu",
    salto: "salto",
    flower: "kwiatek",
    lamp: "lampa",
    picture: "obrazel",
    acceptere: "accept",
    adskille: "separate",
    advare: "warn",
    afbryde: "interrupt",
    afgive: "give",
    afgøre: "decide",
    aflevere: "hand in",
    aflyse: "cancel",
    afløse: "replace",
    afskaffe: "abolish",
    afslutte: "quit",
    afvise: "reject",
    anbefale: "recommend",
    anbringe: "put",
    anerkende: "recognize",
    angive: "indicate",
    angå: "concern",
    anholde: "arrest",
    ankomme: "arrive",
    anmelde: "Report",
    anse: "ASSEMPT",
    ansætte: "hire",
    anvende: "apply",
    arbejde: "occupation",
    arrangere: "arrange",
    arrestere: "arrest",
    bage: "bake",
    banke: "Banke",
    bede: "pray",
    befinde: "find",
    begrave: "bury",
    begrænse: "limit",
    begynde: "begin",
    begå: "commit",
    behandle: "treat",
    beholde: "retain",
    behøve: "require",
    beklage: "complain",
    bekræfte: "confirm",
    bemærke: "note",
    benytte: "use",
    beskrive: "describe",
    beskytte: "protect",
    beslutte: "decide",
    bestemme: "decide",
    bestille: "order",
    bestå: "graduate",
    besætte: "occupy",
    besøge: "visit",
    betale: "pay",
};

// Game logic

function generateRandomKey() {
    const keysArray = Object.keys(db);
    const randomIndex = Math.floor(Math.random() * keysArray.length);
    const randomKey = keysArray[randomIndex];
    return randomKey;
}

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

function getRandomInt(max) {
    return Math.floor(Math.random * max);
}

function generate(gameContent) {
    const randomKey = generateRandomKey();
    let unshuffledAnswers = [];

    /*  
        Assign the question. RandomKey is a question, 
        due to questions and answers being stores as an object, 
        where keys relate to its values.
    */

    gameContent.question = randomKey;

    unshuffledAnswers.push(db[randomKey]);
    unshuffledAnswers.push(db[generateRandomKey()]);
    unshuffledAnswers.push(db[generateRandomKey()]);
    unshuffledAnswers.push(db[generateRandomKey()]);

    /*
        Removes previously "pushed" values and assigns shuffled answers.
        Shuffling provides randomness to a positions of the corrent answer
    */

    gameContent.answers = [];
    gameContent.answers = shuffle(unshuffledAnswers);

    QUESTION_FIELD.textContent = gameContent.question;

    // Assign answers from the array to buttons

    let i = 0;
    for (const button of BUTTONS) {
        button.textContent = gameContent.answers[i++];
    }

    console.log(gameContent);

    return gameContent;
}

// function populate(gameContent) {
//     QUESTION_FIELD.textContent = gameContent.question;
//     let i = 0;
//     for (const button of BUTTONS) {
//         button.textContent = gameContent.answers[i++];
//     }
// }

function checkAnswer(buttons, db, gameState) {
    let answer = false;

    for (const button of buttons) {
        button.addEventListener("click", function () {
            //console.log(button.textContent + " " + db[gameState.question]);
            if (button.textContent === db[gameState.question]) {
                gameState.playerPoints++;
                POINTS.textContent = gameState.playerPoints;

                if (gameState.playerPoints >= 10) {
                    showScreen(END_SCREEN, "Brawo kurwa");
                    gameState.playerMistakes = 0;
                    gameState.playerPoints = 0;
                    MISTAKES.textContent = gameState.playerMistakes;
                    POINTS.textContent = gameState.playerMistakes;
                }

                generate(gameState);
            } else {
                gameState.playerMistakes++;
                MISTAKES.textContent = gameState.playerMistakes;

                if (gameState.playerMistakes >= 10) {
                    showScreen(END_SCREEN, "Cipcius");
                    gameState.playerMistakes = 0;
                    gameState.playerPoints = 0;
                    MISTAKES.textContent = gameState.playerMistakes;
                    POINTS.textContent = gameState.playerMistakes;
                }
            }
        });
    }

    return answer;
}

// Multiple screens logic

function hideAllScreens() {
    START_SCREEN.style.display = "none";
    MAIN_SCREEN.style.display = "none";
    END_SCREEN.style.display = "none";

    // START_SCREEN.classList.add("fade-out");
    // MAIN_SCREEN.classList.add("fade-out");

    // setTimeout(() => {
    //     START_SCREEN.style.display = "none";
    //     MAIN_SCREEN.style.display = "none";

    //     // Remove the fade-out class to prepare for the next screen
    //     START_SCREEN.classList.remove("fade-out");
    //     MAIN_SCREEN.classList.remove("fade-out");
    // }, 300);
}

// Function to show the specified screen

function showScreen(screen, message) {
    hideAllScreens();
    //START_SCREEN.style.display = "none";
    if (screen == MAIN_SCREEN) screen.style.display = "block";
    if (screen == START_SCREEN) screen.style.display = "flex";
    if (screen == END_SCREEN) {
        screen.style.display = "block";
        END_MESSAGE.textContent = message;
    }
    // setTimeout(() => {
    //     screen.style.display = "block";
    //     screen.classList.add("fade-in");

    //     setTimeout(() => {
    //         // Remove the fade-in class to complete the transition
    //         screen.classList.remove("fade-in");
    //     }, 1000); // Adjust the duration to match your CSS transition duration
    // }, 1000); // Delay the screen change to match your CSS transition duration
}

function main(db) {
    let initGameState = {
        question: "",
        answers: [],
        playerPoints: 0,
        playerMistakes: 0,
    };

    let gameState = generate(initGameState);

    let check = checkAnswer(BUTTONS, db, gameState);
}

function startGame(db) {
    hideAllScreens();
    showScreen(START_SCREEN, null);
    main(db);
}

START_BUTTON.addEventListener("click", function () {
    showScreen(MAIN_SCREEN, null);
});

END_BUTTON.addEventListener("click", function () {
    showScreen(MAIN_SCREEN, null);
});

startGame(db);
