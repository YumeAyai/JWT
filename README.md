## JET based on Crypto Documentation

### Introduction
The project crypto module provides functionality for encoding and decoding JWT tokens using various cryptographic algorithms. This document outlines the usage and implementation details of the crypto module.

### Usage
To use the project crypto module, ensure that Node.js is installed on your system.

**Select Crypto Algorithm**: Use the `selectCryptoAlgorithm` function to choose the desired cryptographic algorithm. This function takes one parameter: `algorithm`, which specifies the algorithm to be used. The available options are "rsa", "ecdsa", or "hmac".

**Encode JWT Token**: Call the `encode` function on the selected algorithm object to encode a JWT token. This function takes one parameter: `email`, which is the email to be encoded.

```javascript
const email = "example@example.com";
const token = auth.encode(email);
```

**Decode JWT Token**: Call the `decode` function on the selected algorithm object to decode a JWT token. This function takes one parameter: `token`, which is the JWT token to be decoded.

```javascript
auth.decode(token);
```

### Implementation Details
The project crypto module is implemented using Node.js and follows a modular architecture. Each cryptographic algorithm (RSA, ECDSA, HMAC) is implemented in separate modules (`rsa.js`, `ecdsa.js`, `hmac.js`). The `selectCryptoAlgorithm` function dynamically loads the appropriate module based on the selected algorithm.

### Conclusion
The project crypto module provides a convenient way to encode and decode JWT tokens using various cryptographic algorithms. By following the usage guidelines outlined in this document, you can easily integrate cryptographic functionality into your Node.js projects.
