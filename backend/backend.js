'use strict'
import {helpers, Router} from '../deps.js';

const backendRouter = new Router({prefix:'/api'});
let columns = {
    1:{
        id:1,
        name: "TODO",
        cards:{},
    },
    2:{
        id:2,
        name: "Work in Progress",
        cards:{},
    },
    3:{
        id:3,
        name: "Done",
        cards:{},
    }
};
let cardCount = 0;
function getGeneratedCard(colid){
    return {id:cardCount++,name:"MeiVeryCoolCard",col:colid}
}
for (let columnsKey in columns) {
    let cardi = {};
    for (let i = 0; i < 3; i++) {
        let generatedCard = getGeneratedCard(columnsKey);
        cardi[generatedCard.id] = generatedCard;
    }
    columns[columnsKey].cards = cardi
}
removeCard(4,2)
function getCards(){
    return {...columns["1"].cards, ...columns["2"].cards, ...columns["3"].cards};
}
function removeCard(cardId,colId){
    let cards = columns[colId].cards;
    delete cards[cardId];
}
function addCard(cardId,colId,card){
    columns[colId].cards[cardId] = card;
}

backendRouter.get("/",(context)=>{
    context.response.body = "Hallo BackEnd";
});
backendRouter.get("/column/", (context)=> {
    context.response.body = columns;
});
backendRouter.get("/column/:columnId", (context)=> {
    const { columnId } = helpers.getQuery(context, { mergeParams: true });
    if (columns.hasOwnProperty(columnId)){
        context.response.body = columns[columnId];
    }
    else {
        context.response.code = 404;
    }
});
backendRouter.get("/card/", (context)=> {
    context.response.body = getCards();
});
backendRouter.get("/card/:cardId", (context)=> {
    const { cardId } = helpers.getQuery(context, { mergeParams: true });
    let cards = getCards();
    if (cards.hasOwnProperty(cardId)) {
        context.response.body = cards[cardId]
    }
    else {
        context.response.code = 404;
    }
});
backendRouter.put("/card/:cardId", async (context) => {
    const {cardId} = helpers.getQuery(context, {mergeParams: true});

    let cards = getCards();
    if (cards.hasOwnProperty(cardId)) {
        const {col, name} = await context.request.body().value;

        let oldCol = cards[cardId].col;

        let newCard = {id: cardId, name: name, col: col};

        removeCard(cardId, oldCol);
        addCard(cardId, col, newCard);
    } else {
        context.response.code = 404;
        return;
    }
});
backendRouter.put("/card/", async (context) => {
    const { col, name } = await context.request.body().value;
    if (col === null || name === null) {
        context.response.code = 404;
        return;
    }
    let newCard = {id: cardCount++, name: name, col: parseInt(col)};
    addCard(newCard.id, col, newCard);
});
backendRouter.delete("/card/:cardId", (context)=> {
    console.log("delete");
    const { cardId } = helpers.getQuery(context, { mergeParams: true });
    let cards = getCards();
    if (cards.hasOwnProperty(cardId)) {
        let cardCol = cards[cardId].col;
        removeCard(cardId,cardCol);
    }
    else {
        context.response.code = 404;
        return;
    }
});

export {backendRouter};