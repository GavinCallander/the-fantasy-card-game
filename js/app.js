// Card decks
var playerDeck = [
    {
        name: "one",
        image: "",
        atk: 1,
        hp: 1,
    },
    {
        name: "two",
        image: "",
        atk: 1,
        hp: 1,
    },
    {
        name: "three",
        image: "",
        atk: 1,
        hp: 2
    },
    {
        name: "four",
        image: "",
        atk: 2,
        hp: 1
    },
    {
        name: "five",
        image: "",
        atk: 2,
        hp: 3
    },
    {
        name: "six",
        image: "",
        atk: 3,
        hp: 2
    },
    {
        name: "seven",
        image: "",
        atk: 3,
        hp: 4
    },
    {
        name: "eight",
        image: "",
        atk: 4,
        hp: 3
    },
    {
        name: "nine",
        image: "",
        atk: 4,
        hp: 5
    },
    {
        name: "ten",
        image: "",
        atk: 5,
        hp: 4
    }
]
var compDeck = [
    {
        name: "eleven",
        image: "",
        atk: 1,
        hp: 1
    },
    {
        name: "twelve",
        image: "",
        atk: 1,
        hp: 1
    },
    {
        name: "thirteen",
        image: "",
        atk: 1,
        hp: 2
    },
    {
        name: "fourteen",
        image: "",
        atk: 2,
        hp: 1
    },
    {
        name: "fifteen",
        image: "",
        atk: 2,
        hp: 3
    },
    {
        name: "sixteen",
        image: "",
        atk: 3,
        hp: 2
    },
    {
        name: "seventeen",
        image: "",
        atk: 3,
        hp: 4
    },
    {
        name: "eighteen",
        image: "",
        atk: 4,
        hp: 3
    },
    {
        name: "nineteen",
        image: "",
        atk: 4,
        hp: 5
    },
    {
        name: "twenty",
        image: "",
        atk: 5,
        hp: 4
    }
]
// Mandatory variables
var playerHand = [];
var compHand = [];
var playerField = [];
var compField = [];
var playerDisc = [];
var compDisc = [];
var playerLp = 10;
var compLp = 10;
var battleField = [];
var playerCard = [];
var compCard = [];
// Required DOM content
var pHand = document.querySelectorAll(".playerhand");
var cHand = document.querySelectorAll(".comphand");
var pField = document.querySelectorAll(".playerfield");
var cField = document.querySelectorAll(".compfield");
var pLp = document.querySelector("#playerlp");
var cLp = document.querySelector("#complp");
var pDeck = document.querySelector("#playerdeck");
// turn variables
var pTurn = false;
var cTurn = false;
var turnOne = true;
// DOMContentLoaded and game init
document.addEventListener("DOMContentLoaded", function() {
    for (let i = 0; i < 3; i++) {
        playerHand.push(playerDeck.shift());
        compHand.push(compDeck.shift());
    };
    startingPlayer();
    turn();
    showPlayerHandCards();
    showCompHandCards();
    showPlayerFieldCards();
    showCompFieldCards();
    showPlayerLp();
    showCompLp();
});
// Randomize starting player
function startingPlayer() {
    let num = Math.floor(Math.random() * 10);
    let num1 = num%2;
    if (num1 === 0) {
        pTurn = true;
    } else {
        cTurn = true;
    };
};
function turn() {
    if (pTurn === true) {
        playerTurn();
    } else {
        compTurn();
    };
};
// ***Player turn logic***
// set event listener for draw add gameOver************
function playerTurn() {
    if (playerDeck.length > 0) {
        pDeck.style.backgroundColor = "orange";
        pDeck.addEventListener("click", playerDrawCard);
    } else {
        pHand.forEach(function(card) {
            card.addEventListener("click", playerFieldCard)
        });
    };
};
// draw card, set event listener for field card
function playerDrawCard() {
    for (let i = 0; i < 1; i++) {
        playerHand.push(playerDeck.shift(i, 1));
    };
    showPlayerHandCards();
    pDeck.style.backgroundColor = "transparent";
    pDeck.removeEventListener("click", playerDrawCard);
    if (playerHand.length > 0) {
        pHand.forEach(function(card) { 
            card.addEventListener("click", playerFieldCard);
            card.style.backgroundColor = "orange";
        });
    };
};
// field card set event listener for battle
function playerFieldCard() {
    for (let i = 0; i < playerHand.length; i++) {
        if (this.dataset.name === playerHand[i].name) {
            playerField.push(playerHand.splice(i, 1)[0]);
            pHand[i].children[0].textContent = "";
            pHand[i].children[1].textContent = "";
            pHand[i].children[2].textContent = "";
        };
        showPlayerFieldCards();
            pHand.forEach(function(card) {
                card.removeEventListener("click", playerFieldCard);
                card.style.backgroundColor = "transparent";
        });
        if (turnOne === true) {
            pLp.addEventListener("click", endTurn);
            pLp.style.backgroundColor = "orange";
        } else {
            pField.forEach(function(card) {
                card.addEventListener("click", playerAttack);
                card.style.backgroundColor = "orange";
            });
        };
    };
};
// if comp has cards in field, battle, else attack lp directly
function playerAttack() {
    for (let i = 0; i < playerField.length; i++) {
        battleField.push(playerField[i]);
        playerCard = battleField[0];
        pField.forEach(function(card) {
            card.style.backgroundColor = "transparent";
        })
        if (compField.length > 0) {
            cField.forEach(function(card) {
                card.addEventListener("click", playerBattle);
            });
        } else {
        compLp = compLp - battleField[0].atk;
        showCompLp();
        battleField = [];
        endGame();
        pLp.style.backgroundColor = "orange";
        pLp.addEventListener("click", endTurn);
        };
    };
};
// battle logic
function playerBattle() {
    for (let i = 0; i < compField.length; i++) {
        if (this.dataset.name === compField[i].name) {
            battleField.push(compField[i]);
            compCard = battleField[1];
            battleResult();
        };
    };
    cField.forEach(function(card) {
        card.removeEventListener("click", playerBattle);
        card.style.backgroundColor = "transparent";
    });
};
// battle result calculation
function battleResult() {
    let a = compCard.hp - playerCard.atk;
    let b = playerCard.hp - compCard.atk;
    if (a < 1) {
        for (let i = 0; i < compField.length; i++) {
            if (battleField[1].name === compField[i].name) {
                compDisc.push(compField.splice(i, 1));
                cField[i].children[0].textContent = "";
                cField[i].children[1].textContent = "";
                cField[i].children[2].textContent = "";
            };
        };
    };
    if (b < 1) {
        for (let i = 0; i < playerField.length; i++) {
            if (battleField[0].name === playerField[i].name) {
                playerDisc.push(playerField.splice(i, 1));
                pField[i].children[0].textContent = "";
                pField[i].children[1].textContent = "";
                pField[i].children[2].textContent = "";
            };
        };
    };
    if (a < 0) {
        compLp = compLp + a;
        showCompLp();
    };
    if (b < 0) {
        playerLp = playerLp + b;
        showPlayerLp();
    };
    battleField = [];
    endGame();
    endTurn();
};
// ***COMP MOVE LOGIC***
// comp AI
function compTurn() {
    if (compDeck.length > 0) {
        setTimeout(compDrawCard, 2000);
    };
};
// draw card
function compDrawCard() {
    for (let i = 0; i < 1; i++) {
        compHand.push(compDeck.shift());
    };
    showCompHandCards();
    setTimeout(compFieldCard, 2000);
};
// field card
function compFieldCard() {
    let i = Math.floor(Math.random() * compHand.length);
        compField.push(compHand.splice(i, 1)[0]);
        cHand[i].children[0].textContent = "";
        cHand[i].children[1].textContent = "";
        cHand[i].children[2].textContent = "";
    showCompFieldCards();
    if (turnOne === false) {
        setTimeout(compAttack, 2000);
    } else {
        setTimeout(endTurn, 2000);
    };
};
// if player has cards on the field, battle, else attack LP directly
function compAttack() {
    if (playerField.length > 0) {
        compBattle();
    } else {
        compDirect();
    };
};
// battle logic
function compBattle() {
    if (playerField.length > 0) {
        let i = Math.floor(Math.random() * compField.length);
            battleField.push(compField[i]);
        let x = Math.floor(Math.random() * playerField.length);
            battleField.push(playerField[x]);
        let a = (battleField[1].hp - battleField[0].atk);
        let b = (battleField[0].hp - battleField[1].atk);
        if (a < 1) {
            playerDisc.push(playerField.splice(i, 1));
            pField[x].children[0].textContent = "";
            pField[x].children[1].textContent = "";
            pField[x].children[2].textContent = "";
        }
        if (b < 1) {
            compDisc.push(compField.splice(i, 1));
            cField[i].children[0].textContent = "";
            cField[i].children[1].textContent = "";
            cField[i].children[2].textContent = "";
        }
        if (a < 0) {
            playerLp = playerLp + a;
            showPlayerLp();
        };
        if (b < 0) {
            compLp = compLp + b;
            showCompLp();
        };
    };
    battleField = []
    endGame();
    endTurn();
};
// direct logic
function compDirect() {
    let i = Math.floor(Math.random() * compField.length);
        playerLp = playerLp - compField[i].atk;
        battleField = [];
        endGame();
        endTurn();
};
// end turn logic
function endTurn() {
    if (pTurn === true) {
        pTurn = false;
        cTurn = true;
        turnOne = false;
        pLp.style.backgroundColor = "transparent";
        compTurn();
    } else {
        cTurn = false;
        pTurn = true;
        turnOne = false;
        playerTurn();
    };
};
function endGame() {
    if (playerLp < 1) {
    } else if (compLp < 1) {
    };
};
// ***PLAYER DISPLAY LOGIC***
function showPlayerLp() {
    pLp.textContent = playerLp;
    if (playerLp < 0) {
        pLp.textContent = "LOSER!";
    };
};
// display cards in player hand
function showPlayerHandCards() {
    playerHand.forEach(function(card, i) {
        pHand[i].children[0].textContent = card.name;
        pHand[i].children[1].textContent = card.atk;
        pHand[i].children[2].textContent = card.hp;
        pHand[i].setAttribute("data-name", card.name);
        pHand[i].style.border = "1px solid black";
    });
};
// display cards in player field
function showPlayerFieldCards() {
    playerField.forEach(function(card, i) {
        pField[i].children[0].textContent = card.name;
        pField[i].children[1].textContent = card.atk;
        pField[i].children[2].textContent = card.hp;
        pField[i].setAttribute("data-name", card.name);
        pField[i].style.border = "1px solid black";
    });
};
// ***COMP DISPLAY LOGIC***
function showCompLp() {
    cLp.textContent = compLp;
    if (compLp < 0) {
        cLp.textContent = "LOSER!";
    };
};
// display cards in comp hnd
function showCompHandCards() {
    compHand.forEach(function(card, i) {
        cHand[i].children[0].textContent = card.name;
        cHand[i].children[1].textContent = card.atk;
        cHand[i].children[2].textContent = card.hp;
        cHand[i].setAttribute("data-name", card.name);
        cHand[i].style.border = "1px solid white";
    });
};
// display cards in comp field
function showCompFieldCards() {
    compField.forEach(function(card, i) {
        cField[i].children[0].textContent = card.name;
        cField[i].children[1].textContent = card.atk;
        cField[i].children[2].textContent = card.hp;
        cField[i].setAttribute("data-name", card.name);
        cField[i].style.border = "1px solid white";
    });
};