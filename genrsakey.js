const fs = require("fs");
const crypto = require("crypto");

// Generate RSA key pair
const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

// Write private and public keys to files
fs.writeFileSync("private.key", privateKey, { encoding: "utf8" });
fs.writeFileSync("public.key", publicKey, { encoding: "utf8" });

console.log("Private Key saved to private.key");
console.log("Public Key saved to public.key");
