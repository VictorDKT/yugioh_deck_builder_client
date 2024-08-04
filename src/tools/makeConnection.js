import axios from "axios"

export async function makeConnection(
    method,
    suffix,
    entityId,
    reqBody,
    otherQueryStrings,
) {
    const api = axios.create({
        baseURL: "http://localhost:3001",
        headers: generateHeader(),
    });
    const url = buildUrl(suffix, entityId, otherQueryStrings);
    const body = reqBody ? reqBody : {};
    let response; 

    try {
        response = await connectToServer(api, url, method, body);
    } catch(err) {
        const error = err;
        console.log("err", err)
        if(error.response.error === "Unauthorized") {
            localStorage.clear();
            window.location.reload();
        } else {
            console.error(error.response.error);
        }    
    }

    return response.data;
}

function generateHeader() {
    const headers = {}
    const token = localStorage.getItem("token")

    if(token) {
        headers.authorization = token
    }

    return headers;
}

function buildUrl(
    suffix,
    entityId,
    otherQueryStrings,
) {
    let url = suffix;
    if(entityId) {
        url = `${url}/${entityId}`
    }
    if(otherQueryStrings){
        url = url+"?"
        Object.keys(otherQueryStrings).forEach((key, index)=>{
            if(Array.isArray(otherQueryStrings[key])) {
                (otherQueryStrings[key]).forEach((param, index)=>{
                    url = `${url}${key}=${param}`
                    if(index+1 <= Object.keys(otherQueryStrings[key]).length-1) {
                        url = url+"&"
                    }
                })
            } else {
                url = `${url}${key}=${otherQueryStrings[key]}`
            }
            if(index+1 <= Object.keys(otherQueryStrings).length-1) {
                url = url+"&"
            }
        })
    }

    return url;
}

async function connectToServer(
    api,
    url, 
    method,
    body,
) {
    let response;
    switch(method) {
        case "get":
            response = await _get(api, url, body)
            break;
        case "post":
            response = await _post(api, url, body)
            break;
        case "put":
            response = await _put(api, url, body)
            break;
        case "delete":
            response = await _delete(api, url, body)
            break;
        default:
            break;
    }

    return response;
}

async function _get(
    api, 
    url,  
    body
) {
    const response = await api.get(url, body);
    return response;
}

async function _post(
    api, 
    url,  
    body
) {
    const response = await api.post(url, body);
    return response;
}

async function _put(
    api, 
    url,  
    body
) {
    const response = await api.put(url, body);
    return response;
}

async function _delete(
    api, 
    url,  
    body
) {
    const response = await api.delete(url, body);
    return response;
}