export function decodeXmlResponse(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");
    return xmlToJson(xmlDoc).root;
}

function xmlToJson(xml) {
    let obj = {};

    if (xml.nodeType === 1) { // elemento
        // Atributos de elementos
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (let j = 0; j < xml.attributes.length; j++) {
                const attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = convertIfNumeric(attribute.nodeValue);
            }
        }
    } else if (xml.nodeType === 3) { // texto
        return convertIfNumeric(xml.nodeValue);
    }

    // Filhos de elementos
    if (xml.hasChildNodes()) {
        let textContent = "";
        for (let i = 0; i < xml.childNodes.length; i++) {
            const item = xml.childNodes.item(i);
            if (item.nodeType === 3) { // texto
                textContent += item.nodeValue;
            } else {
                const nodeName = item.nodeName;
                if (typeof (obj[nodeName]) === "undefined") {
                    obj[nodeName] = xmlToJson(item);
                } else {
                    if (!Array.isArray(obj[nodeName])) {
                        const old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xmlToJson(item));
                }
            }
        }
        if (textContent.trim().length > 0) {
            return convertIfNumeric(textContent);
        }
    }
    return obj;
}

function convertIfNumeric(value) {
    if (!isNaN(value) && value.trim() !== "") {
        return Number(value);
    }
    return value;
}