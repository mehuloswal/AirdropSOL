const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  Account,
} = require("@solana/web3.js");

const newPair = new Keypair();
console.log(newPair);
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey;
// console.log("PublicKey: ", publicKey, "\nSecretKey: ", secretKey);

const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed"); //devnet-> replica of mainnet.

    const myWallet = await Keypair.fromSecretKey(secretKey);

    const walletBalance = await connection.getBalance(
      new PublicKey(myWallet.publicKey)
    );

    console.log(`=> For wallet address ${publicKey}`);
    console.log(
      `Wallet Balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`
    );
  } catch (err) {
    console.log(err);
  }
};

const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed"); //devnet-> replica of mainnet.
    const walletKeyPair = await Keypair.fromSecretKey(secretKey);
    console.log("----AirDropping 2 SOL ----");
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(walletKeyPair.publicKey),
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
    console.log(err);
  }
};

const main = async () => {
  await getWalletBalance();
  await airDropSol();
  await getWalletBalance();
};
main();
