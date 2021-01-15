toolsRemember

###Generate Private key
`openssl genrsa -out private-key.pem 2048`

###Generate Public key
`openssl rsa -in private-key.pem -pubout -out public-key.pem`

