import { decodeXmlResponse } from "../../../tools/decodeXmlResponse";
import { makeConnection } from "../../../tools/makeConnection";


export async function login(entity) {
    const response_format = localStorage.getItem("data_format") ? localStorage.getItem("data_format") : "json";
    const response = await makeConnection("post", "login", null, entity, { response_format });

    return response_format === "json" ? response : decodeXmlResponse(response);
}