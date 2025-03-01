import { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { CST_PROGRAM_ID, VCU_PROGRAM_ID } from '../config';

/**
 * Custom hook to fetch wallet balances for SOL, CST, and VCU tokens
 * @returns {Object} Object containing balance information and loading state
 */
const useWalletBalance = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  
  const [balances, setBalances] = useState({
    sol: 0,
    cst: 0,
    vcu: 0,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchBalances = async () => {
      if (!publicKey) {
        setBalances({ sol: 0, cst: 0, vcu: 0 });
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        // Fetch SOL balance
        const solBalance = await connection.getBalance(publicKey);
        
        // Fetch token accounts
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
          publicKey,
          { programId: TOKEN_PROGRAM_ID }
        );
        
        // Find CST and VCU token accounts
        let cstBalance = 0;
        let vcuBalance = 0;
        
        tokenAccounts.value.forEach(tokenAccount => {
          const accountData = tokenAccount.account.data.parsed.info;
          const mintAddress = accountData.mint;
          const tokenBalance = accountData.tokenAmount.uiAmount;
          
          // Check if this is a CST token
          if (mintAddress === CST_PROGRAM_ID) {
            cstBalance = tokenBalance;
          }
          
          // Check if this is a VCU token
          if (mintAddress === VCU_PROGRAM_ID) {
            vcuBalance = tokenBalance;
          }
        });
        
        setBalances({
          sol: solBalance / LAMPORTS_PER_SOL,
          cst: cstBalance,
          vcu: vcuBalance,
        });
      } catch (err) {
        console.error('Error fetching wallet balances:', err);
        setError('Failed to fetch wallet balances');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBalances();
    
    // Set up interval to refresh balances
    const intervalId = setInterval(fetchBalances, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(intervalId);
  }, [publicKey, connection]);
  
  // Function to manually refresh balances
  const refreshBalances = async () => {
    if (!publicKey) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch SOL balance
      const solBalance = await connection.getBalance(publicKey);
      
      // Fetch token accounts
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        { programId: TOKEN_PROGRAM_ID }
      );
      
      // Find CST and VCU token accounts
      let cstBalance = 0;
      let vcuBalance = 0;
      
      tokenAccounts.value.forEach(tokenAccount => {
        const accountData = tokenAccount.account.data.parsed.info;
        const mintAddress = accountData.mint;
        const tokenBalance = accountData.tokenAmount.uiAmount;
        
        // Check if this is a CST token
        if (mintAddress === CST_PROGRAM_ID) {
          cstBalance = tokenBalance;
        }
        
        // Check if this is a VCU token
        if (mintAddress === VCU_PROGRAM_ID) {
          vcuBalance = tokenBalance;
        }
      });
      
      setBalances({
        sol: solBalance / LAMPORTS_PER_SOL,
        cst: cstBalance,
        vcu: vcuBalance,
      });
    } catch (err) {
      console.error('Error refreshing wallet balances:', err);
      setError('Failed to refresh wallet balances');
    } finally {
      setLoading(false);
    }
  };
  
  return {
    balances,
    loading,
    error,
    refreshBalances,
  };
};

export default useWalletBalance; 