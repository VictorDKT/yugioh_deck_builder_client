import protobuf from 'protobufjs';

export async function decodeBufferResponse(data) {
    const buffer = hexStringToArrayBuffer(data);
  
    try {
      const response = await fetch('/message.proto');
      const protoText = await response.text();
      const root = protobuf.parse(protoText).root;
      const ApiResponse = root.lookupType('ApiResponse');
      const message = ApiResponse.decode(new Uint8Array(buffer));
      const object = ApiResponse.toObject(message, {
        longs: String,
        enums: String,
        bytes: String,
        defaults: true,
        arrays: true
      });
  
      return object;
    } catch (error) {
      console.error('Erro ao carregar ou decodificar o proto:', error);
      throw error;
    }
};

function hexStringToArrayBuffer(hexString) {
    hexString = hexString.replace(/\s+/g, '');
  
    if (hexString.length % 2 !== 0) {
      throw new Error('A string hexadecimal deve ter um comprimento par.');
    }
  
    const byteArray = new Uint8Array(hexString.length / 2);
  
    for (let i = 0; i < hexString.length; i += 2) {
      byteArray[i / 2] = parseInt(hexString.substr(i, 2), 16);
    }
  
    return byteArray.buffer;
};