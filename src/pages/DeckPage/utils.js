import { alertError } from "../../components/Alert/Alert";

export function generateEmptyDeck() {
    const main = [];
    const extra = [];

    for(let i = 0; i < 60; i++) {
        main.push(null);
        if(i < 15) {
            extra.push(null);
        }
    }

    return { main, extra };
}

export function fillDeck(cards) {
    const {main, extra} = generateEmptyDeck();
    let currentMainSlot = 0;
    let currentExtraSlot = 0;
    const extraTypes = [
        "fusion_pendulum",
        "xyz_pendulum",
        "synchro_pendulum",
        "fusion",
        "xyz",
        "synchro",
        "link",
    ];

    cards.forEach(card=>{
        if(extraTypes.includes(card.frameType)) {
            for(let i = 0; i < card.quantity; i++) {
                extra[currentExtraSlot] = card;
                currentExtraSlot++;
            }
        } else {
            for(let i = 0; i < card.quantity; i++) {
                main[currentMainSlot] = card;
                currentMainSlot++;
            }
        }
    });

    return { main, extra };
}

export function addCardToDeck(cards, card) {
    let newCards = [...cards];
    const cardInDeck = newCards.find(newCard=>newCard.cardCode === card.cardCode);

    if(cardInDeck && cardInDeck.quantity >=3) {
        alertError("Você não pode usar mais de 3 copias da mesma carta no deck.");
        const { main, extra } = fillDeck(cards);

        return { main, extra, cardList: cards }
    } else {
        if(cardInDeck) {
            newCards = newCards.map(newCard=>{
                if(newCard.cardCode === cardInDeck.cardCode) {
                    return ({
                        ...newCard,
                        quantity: newCard.quantity+1,
                    })
                } else {
                    return newCard;
                }
            })
        } else {
            newCards.push({...card, quantity: 1});
        }

        const { main, extra } = fillDeck(newCards);

        return { main, extra, cardList: newCards }
    }
}

export function removeCardFromDeck(cards, card) {
    let newCards = [];

    cards.forEach(cardInDeck=>{
        if(cardInDeck.cardCode === card.cardCode) {
            if(cardInDeck.quantity > 1) {
                newCards.push({ ...cardInDeck, quantity: cardInDeck.quantity-1 }); 
            }
        } else {
            newCards.push(cardInDeck);        
        }
    })

    const { main, extra } = fillDeck(newCards);

    return { main, extra, cardList: newCards }
}

export function splitArrayIntoChunks(array) {
    let result = [];

    for (let i = 0; i < array.length; i += 10) {
      let chunk = array.slice(i, i + 10);
      result.push(chunk);
    }
   
    return result;
}