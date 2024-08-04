import { decodeXmlResponse } from "../../tools/decodeXmlResponse";
import { makeConnection } from "../../tools/makeConnection";

export async function getUserDecks() {
    const response_format = localStorage.getItem("data_format") ? localStorage.getItem("data_format") : "json";
    const response = await makeConnection("get", "user_decks", null, null, { response_format });

    return response_format === "json" ? response : decodeXmlResponse(response);
}