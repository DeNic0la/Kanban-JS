'use strict'
import { helpers, Router } from 'https://deno.land/x/oak/mod.ts';
const backendRouter = new Router({prefix:'/api'});
let columns = {
    1:{
        id:1,
        name: "TODO",
        cards:[],
    },
    2:{
        id:2,
        name: "Work in Progress",
        cards:[],
    },
    3:{
        id:3,
        name: "Done",
        cards:[],
    }
};
let cardCount = 0;
function getGeneratedCard(colid){
    return {id:cardCount++,name:"MeiVeryCoolCard",col:colid}
}
for (let columnsKey in columns) {
    let cardi = [];
    cardi.push(getGeneratedCard(columnsKey));
    cardi.push(getGeneratedCard(columnsKey));
    cardi.push(getGeneratedCard(columnsKey));
    columns[columnsKey].cards = cardi
}
function getCards(){
    let cards = {};
    for (let columnsKey in columns) {
        let leCards = columns[columnsKey].cards;
        for (let leCardsKey in leCards) {
            let leCard = leCards[leCardsKey];
            cards[leCard.id] = leCard;
        }
    }
    return cards;
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
backendRouter.update("/card/:cardId", (context)=> {
    const { cardId } = helpers.getQuery(context, { mergeParams: true });

    let cards = getCards();
    if (cards.hasOwnProperty(cardId)) {
        let body = context.request.body({ type: 'form-data '});
        let data = body.value.read();
        let savedCard = cards[cardId];
        savedCard.name = data.get('name');
        savedCard.col = data.get('col');
        columns[savedCard.col].cards.push(savedCard);
    }
    else {
        context.response.code = 404;
    }
});
backendRouter.put("/card/", (context)=> {
    let body = context.request.body({ type: 'form-data '});
    let data = body.value.read();

    let col = data.get('col');
    if (col === null){
        context.response.code = 404;
    }
    let card = getGeneratedCard(col);
    card.name = data.get('name');
});

export {backendRouter};