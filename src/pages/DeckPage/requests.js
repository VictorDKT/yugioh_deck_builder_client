import { decodeBufferResponse } from "../../tools/decodeBufferResponse";
import { decodeXmlResponse } from "../../tools/decodeXmlResponse";
import { makeConnection } from "../../tools/makeConnection";

export async function getDeck(deckId) {
    const response_format = localStorage.getItem("data_format") ? localStorage.getItem("data_format") : "json";
    const response = await makeConnection("get", "deck", deckId, null, { response_format });

    return response_format === "json" ? response : decodeXmlResponse(response);
}

export async function searchCardsRequest(name, offset, limit) {
    const response = await makeConnection("get", "list", null, null, { name, offset, limit });

    return decodeBufferResponse(response);
}