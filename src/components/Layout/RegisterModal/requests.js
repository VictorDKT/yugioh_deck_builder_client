import { decodeXmlResponse } from "../../../tools/decodeXmlResponse";
import { makeConnection } from "../../../tools/makeConnection";


export async function register(entity) {
    const response_format = localStorage.getItem("data_format") ? localStorage.getItem("data_format") : "json";
    const response = await makeConnection("post", "user", null, entity, { response_format });

    return response_format === "json" ? response : decodeXmlResponse(response);
}