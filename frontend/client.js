'use strict';

document.loadList = async () => {
    const response = await fetch("/api/column/");
    return await response.json();
}

function addCardToCol(card) {
    let col = document.getElementById("col-" + card.col);
    let cardHTML = getCardHTMLFromJson(card);
    col.insertAdjacentHTML('beforeend', cardHTML);
}

function getCardHTMLFromJson(card) {
    return cardTemplate.replace(/%cardId%/g, "card-" + card.id).replace(/%cardText%/g, card.name);
}

function removeCardFromCol(cardId) {
    let cardToRemove = document.getElementById("card-" + cardId);
    if (cardToRemove === null) {
        return
    }
    cardToRemove.remove();
}

function clearColumn(colId) {
    let col = document.getElementById("col-" + colId);
    if (col === null) {
        return;
    }
    col.innerHTML = "";
}

async function getAllCardsFromApi() {
    const response = await fetch("/api/card/");
    return await response.json();
}

function addCardsFromApi(cards) {
    Object.entries(cards).forEach(([key, value]) => {
        addCardToCol(value);
    });
}
async function reloadCardsFromApi() {
    let allCardsFromApi = await getAllCardsFromApi();
    for (let i = 1; i <= 3; i++) {
        clearColumn(i)
    }
    addCardsFromApi(allCardsFromApi);
}


setInterval(async function () {
    await reloadCardsFromApi()
}, 10000);//Updating from Backend every 10s

reloadCardsFromApi();
//TODO Initial loadings

//TODO Continous loading

//TODO Button Actions
//add card
let columnTODO = document.querySelector(".TODO");
let cardTemplate = "<div class=\"items border border-light\" id='%cardId%'><div class=\"card shadow-sm\"><div class=\"card-body p-2\"><div class=\"card-title\"><h2>%cardText%</h2></div><button class=\"btn btn-primary btn-sm\"><-</button><button class=\"btn btn-primary btn-sm\">-></button><br><button class=\"btn btn-primary btn-sm delete\">Delete</button></div></div></div>";
document.getElementById("save").addEventListener("click", async function () {


    const putRequest = await fetch('/api/card/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                name: document.getElementById("cardDescription").value,
                col: 1,
            }),
    }).then(value => {
        reloadCardsFromApi();
    })

    //TODO reload
    // columnTODO.insertAdjacentHTML("beforeend", cardTemplate.replace(/%cardText%/g, document.getElementById("cardDescription").value).replace(/%cardId%/g, "card2"))
    // console.log( document.getElementById("cardDescription").value)
});

//Delete Button

// left and right


let columnNames = ["TODO", "In Progress", "DONE"];
let target = document.querySelector(".p-2 .row");
let template2 = "<div class=\"col\"><div class=\"col bg-light\"><div class=\"col-body\"><h6 class=\"col-title text-uppercase text-truncate py-2\">%colName%</h6><div id='%colId%' ></div></div></div></div>";

let count = 0;
columnNames.forEach(function (item) {
    count++;
    target.insertAdjacentHTML("beforeend", template2.replace(/%colName%/g, item).replace(/%colId%/g, "col-" + count.toString()));
});

//repalce %cardId%, %cardText%
//columnTODO.insertAdjacentHTML("beforeend", cardTemplate.replace(/%cardId%/g, "1"));


//delete card


// drag and drop/moving the card