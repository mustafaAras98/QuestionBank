function encodeUrlSafeBase64(base64String) {
  return base64String
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function decodeUrlSafeBase64(urlSafeBase64) {
  let base64 = urlSafeBase64.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4 !== 0) {
    base64 += '=';
  }
  return base64;
}

const urlSafeEncode = {
  encodeUrlSafeBase64,
  decodeUrlSafeBase64,
};

export default urlSafeEncode;
