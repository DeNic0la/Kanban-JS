'use strict';

let columnNames = ["TODO", "In Progress", "DONE"];
let target = document.querySelector(".p-2 .row");
let columnTemplate = "<div class=\"col\"><div class=\"col bg-light\"><div class=\"col-body\"><h6 class=\"col-title text-uppercase text-truncate py-2\">%colName%</h6><div id='%colId%' ></div></div></div></div>";
let cardTemplate = "<div class=\"items border border-light\" id='%cardId%'><div class=\"card shadow-sm\"><div class=\"card-body p-2\"><div class=\"card-title\"><h2>%cardText%</h2></div><button class=\"btn btn-primary btn-sm backButton\"><-</button><button class=\"btn btn-primary btn-sm forwButton\">-></button><br><button class=\"btn btn-primary btn-sm deleteButton\">Delete</button></div></div></div>";

document.loadList = async () => {
    const response = await fetch("/api/column/");
    return await response.json();
}

function addCardToCol(card) {
    let col = document.getElementById("col-" + card.col);
    let cardHTML = getCardHTMLFromJson(card);
    col.insertAdjacentHTML('beforeend', cardHTML);
    let cardDom = document.getElementById("card-"+card.id);

    addButtonsToCard(card,cardDom);

}
function addButtonsToCard(card, domCard){

    let forwBtn = domCard.querySelector(".forwButton");
    if (parseInt(card.col) === 3){
        forwBtn.remove();
    }
    else {
        forwBtn.addEventListener("click", async function () {
            await fetch(`/api/card/${card.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: card.name,
                    col: parseInt(card.col) + 1,
                })
            }).then(value => {
                reloadCardsFromApi();
            });

        });
    }
    let backBtn = domCard.querySelector(".backButton");
    if (parseInt(card.col) === 1){
        backBtn.remove();
    }
    else{
        backBtn.addEventListener("click", async function () {
            await fetch(`/api/card/${card.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: card.name,
                    col: parseInt(card.col) -1,
                })
            }).then(value => {
                reloadCardsFromApi();
            });
        });
    }
    domCard.querySelector(".deleteButton").addEventListener("click", async function () {
        await fetch(`/api/card/${card.id}`, {
            method: "DELETE"
        }).then(value => {
            reloadCardsFromApi();
        });
    });
}

function getCardHTMLFromJson(card) {
    return cardTemplate.replace(/%cardId%/g, "card-" + card.id).replace(/%cardText%/g, card.name);
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

document.getElementById("save").addEventListener("click", async function () {
    let col = document.getElementById('selectColumn').value;
    await fetch('/api/card/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                name: document.getElementById("cardDescription").value,
                col: col,
            }),
    }).then(value => {
        reloadCardsFromApi();
    })
});

let count = 0;
columnNames.forEach(function (item) {
    count++;
    target.insertAdjacentHTML("beforeend", columnTemplate.replace(/%colName%/g, item).replace(/%colId%/g, "col-" + count.toString()));
});