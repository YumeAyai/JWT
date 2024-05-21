const crypto = require("crypto");
const secret = "$ÂuÕ%ºaLxÕ.bÅ^«â$K.ù¦T#YÙiË;9f.~û\¿8.±î";

function encode(email) {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  // Encode header
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString(
    "base64url",
  );

  const payload = {
    email: email,
    exp: Date.now() + 24 * 60 * 60 * 1000,
  };

  // Encode payload
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64url",
  );

  // Create a signature using HMAC
  const signature = crypto.createHmac("sha256", secret).update(
    encodedHeader + "." + encodedPayload,
  )
    .digest("base64url");

  console.log(encodedHeader + "." + encodedPayload + "." + signature);
  return encodedHeader + "." + encodedPayload + "." + signature;
}

function decode(token) {
  // Split the token into its components
  const parts = token.split(".");
  const encodedHeader = parts[0];
  const encodedPayload = parts[1];
  const signature = parts[2];

  // Decode header and payload
  const header = JSON.parse(Buffer.from(encodedHeader, "base64url").toString());
  const payload = JSON.parse(
    Buffer.from(encodedPayload, "base64url").toString(),
  );

  // Verify signature using HMAC
  const expectedSignature = crypto.createHmac("sha256", secret)
    .update(encodedHeader + "." + encodedPayload)
    .digest("base64url");

  if (payload.exp < Date.now()) {
    console.log("JWT Token has expired!");
    return false;
  } else if (signature === expectedSignature) {
    console.log("JWT Signature is valid.");
    console.log("Header:", header);
    console.log("Payload:", payload);
    return true;
  } else {
    console.log("JWT Signature is invalid!");
    return false;
  }
}

module.exports = {
  encode,
  decode,
};
