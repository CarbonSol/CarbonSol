/**
 * Solana utility functions for blockchain interactions
 */
import { 
  Connection, 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction
} from '@solana/web3.js';
import { SOLANA_RPC_ENDPOINT } from './constants';

/**
 * Create a Solana connection
 * @returns {Connection} Solana connection
 */
export function createConnection() {
  return new Connection(SOLANA_RPC_ENDPOINT);
}

/**
 * Get SOL balance for a wallet
 * @param {string} walletAddress - Wallet address
 * @returns {Promise<number>} - SOL balance
 */
export async function getSolBalance(walletAddress) {
  try {
    const connection = createConnection();
    const publicKey = new PublicKey(walletAddress);
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error('Error getting SOL balance:', error);
    throw error;
  }
}

/**
 * Transfer SOL between wallets
 * @param {Object} wallet - Wallet object with publicKey and signTransaction
 * @param {string} toAddress - Recipient wallet address
 * @param {number} amount - Amount in SOL
 * @returns {Promise<string>} - Transaction signature
 */
export async function transferSol(wallet, toAddress, amount) {
  try {
    const connection = createConnection();
    const fromPubkey = wallet.publicKey;
    const toPubkey = new PublicKey(toAddress);
    
    // Create a transfer instruction
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey,
        toPubkey,
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );
    
    // Set recent blockhash and fee payer
    transaction.recentBlockhash = (
      await connection.getRecentBlockhash()
    ).blockhash;
    transaction.feePayer = fromPubkey;
    
    // Sign and send transaction
    const signedTransaction = await wallet.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(
      signedTransaction.serialize()
    );
    
    // Confirm transaction
    await connection.confirmTransaction(signature);
    
    return signature;
  } catch (error) {
    console.error('Error transferring SOL:', error);
    throw error;
  }
}

/**
 * Get transaction details
 * @param {string} signature - Transaction signature
 * @returns {Promise<Object>} - Transaction details
 */
export async function getTransactionDetails(signature) {
  try {
    const connection = createConnection();
    const transaction = await connection.getTransaction(signature);
    return transaction;
  } catch (error) {
    console.error('Error getting transaction details:', error);
    throw error;
  }
}

/**
 * Get recent transactions for a wallet
 * @param {string} walletAddress - Wallet address
 * @param {number} limit - Number of transactions to fetch
 * @returns {Promise<Array>} - List of transactions
 */
export async function getRecentTransactions(walletAddress, limit = 10) {
  try {
    const connection = createConnection();
    const publicKey = new PublicKey(walletAddress);
    const signatures = await connection.getSignaturesForAddress(
      publicKey,
      { limit }
    );
    
    const transactions = await Promise.all(
      signatures.map(async (sig) => {
        const tx = await connection.getTransaction(sig.signature);
        return {
          signature: sig.signature,
          timestamp: sig.blockTime,
          status: tx?.meta?.err ? 'failed' : 'confirmed',
          ...tx
        };
      })
    );
    
    return transactions;
  } catch (error) {
    console.error('Error getting recent transactions:', error);
    throw error;
  }
}

/**
 * Validate a Solana wallet address
 * @param {string} address - Wallet address to validate
 * @returns {boolean} - Whether the address is valid
 */
export function isValidSolanaAddress(address) {
  try {
    new PublicKey(address);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Airdrop SOL to a wallet (devnet only)
 * @param {string} walletAddress - Wallet address
 * @param {number} amount - Amount in SOL
 * @returns {Promise<string>} - Transaction signature
 */
export async function requestAirdrop(walletAddress, amount = 1) {
  try {
    const connection = createConnection();
    const publicKey = new PublicKey(walletAddress);
    const signature = await connection.requestAirdrop(
      publicKey,
      amount * LAMPORTS_PER_SOL
    );
    
    await connection.confirmTransaction(signature);
    return signature;
  } catch (error) {
    console.error('Error requesting airdrop:', error);
    throw error;
  }
}

export default {
  createConnection,
  getSolBalance,
  transferSol,
  getTransactionDetails,
  getRecentTransactions,
  isValidSolanaAddress,
  requestAirdrop
}; 