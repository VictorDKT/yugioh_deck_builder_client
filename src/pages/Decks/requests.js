import { decodeXmlResponse } from "../../tools/decodeXmlResponse";
import { makeConnection } from "../../tools/makeConnection";

export async function getUserDecks(offset, limit) {
    const response_format = localStorage.getItem("data_format") ? localStorage.getItem("data_format") : "json";
    const response = await makeConnection("get", "deck", null, null, { response_format, offset, limit });

    return response_format === "json" ? response : decodeXmlResponse(response);
}