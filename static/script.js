const BUTTONS = document.getElementsByClassName("btn");
const QUESTION_FIELD = document.getElementById("question");

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
/*  
    Generate 4 "key" and 4 corresponding "pretendDB[key]"
    Total of 8 words

    "Question" => "key1"
    "Answer 1" => "pretendDB[key1]"
    "Answer 2" => "pretendDB[key2]"
    "Answer 3" => "pretendDB[key3]"
    "Answer 4" => "pretendDB[key4]"

*/

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

    gameContent.answers = [];
    gameContent.question = randomKey;

    unshuffledAnswers.push(db[randomKey]);
    unshuffledAnswers.push(db[generateRandomKey()]);
    unshuffledAnswers.push(db[generateRandomKey()]);
    unshuffledAnswers.push(db[generateRandomKey()]);

    gameContent.answers = shuffle(unshuffledAnswers);

    QUESTION_FIELD.textContent = gameContent.question;
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
            console.log(button.textContent + " " + db[gameState.question]);

            if (button.textContent === db[gameState.question]) {
                gameState.playerPoints++;
                console.log(gameState);
                generate(gameState);
            } else {
                console.log("los");
            }
        });
    }

    return answer;
}

function main(db) {
    let initGameState = {
        question: "",
        answers: [],
        playerPoints: 0,
    };

    let gameState = generate(initGameState);

    checkAnswer(BUTTONS, db, gameState);
}

main(db);
