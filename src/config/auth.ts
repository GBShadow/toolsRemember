export default {
  jwt: {
    privateKey: process.env.PRIVATE_KEY as string,
    publicKey: process.env.PUBLIC_KEY as string,
    expiresIn: '1d',
  },
};
