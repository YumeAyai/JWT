// Accroding to the algorithm, select the corresponding module
function selectCryptoAlgorithm(algorithm) {
  if (algorithm === "rsa") {
    return require("./rsa");
  } else if (algorithm === "ecdsa") {
    return require("./ecdsa");
  } else {
    return require("./hmac");
  }
}

function main() {
  // Choose the algorithm
  const selectedAlgorithm = "rsa"; // Could be rsa, ecdsa, or hmac

  // Load the algorithm module
  const auth = selectCryptoAlgorithm(selectedAlgorithm);

  // Email to encode
  const email = "example@example.com";

  // Encode JWT token
  const token = auth.encode(email);

  // Decode JWT token
  auth.decode(token);
}

main();
