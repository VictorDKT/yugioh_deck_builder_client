import { decodeBufferResponse } from "../../tools/decodeBufferResponse";
import { decodeXmlResponse } from "../../tools/decodeXmlResponse";
import { makeConnection } from "../../tools/makeConnection";

export async function getDeck(deckId) {
    const response_format = localStorage.getItem("data_format") ? localStorage.getItem("data_format") : "json";
    const response = await makeConnection("get", "deck", deckId, null, { response_format });

    const result = response_format === "json" ? response : decodeXmlResponse(response);

    result.cards = result.cards.map(card=>{
        return ({
            ...card,
            cardCode: card.card_code,
        })
    })

    return result
}

export async function searchCardsRequest(name, offset, limit) {
    const response = await makeConnection("get", "list", null, null, { name, offset, limit });

    return decodeBufferResponse(response);
}

export async function saveDeck(deckName, cards) {
    const card_list = cards.map(card=>{
        delete card.img;
        card.card_code = card.cardCode;
        return card;
    })
    const response_format = localStorage.getItem("data_format") ? localStorage.getItem("data_format") : "json";
    const response = await makeConnection("post", "deck", null, {card_list, name: deckName}, { response_format });

    return response_format === "json" ? response : decodeXmlResponse(response);
}

export async function editDeck(id, deckName, cards) {
    const card_list = cards.map(card=>{
        delete card.img;
        card.card_code = card.cardCode;
        return card;
    })
    const response_format = localStorage.getItem("data_format") ? localStorage.getItem("data_format") : "json";
    const response = await makeConnection("put", "deck", id, {card_list, name: deckName}, { response_format });

    return response_format === "json" ? response : decodeXmlResponse(response);
}