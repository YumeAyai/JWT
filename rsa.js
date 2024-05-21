const crypto = require("crypto");
const { readFileSync } = require("fs");

// Load RSA private and public keys
const privateKey = readFileSync("private.key", "utf8");
const publicKey = readFileSync("public.key", "utf8");

function encode(email) {
  const header = {
    alg: "RS256",
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

  // Create a signature using RSA
  const signature = crypto.sign(
    "sha256",
    Buffer.from(encodedHeader + "." + encodedPayload),
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    },
  ).toString("base64url");

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

  // Verify signature using RSA
  const isVerified = crypto.verify(
    "sha256",
    Buffer.from(encodedHeader + "." + encodedPayload),
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    },
    Buffer.from(signature, "base64url"),
  );

  if (payload.exp < Date.now()) {
    console.log("JWT Token has expired!");
    return false;
  } else if (isVerified) {
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
