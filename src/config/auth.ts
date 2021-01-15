export default {
  jwt: {
    privateKey: process.env.PRIVATE_KEY || 'hashMD5',
    publicKey: process.env.PUBLIC_KEY,
    expiresIn: '1d',
  },
};
