import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

/**
 * Custom hook for fetching and monitoring wallet balances
 * @param {string} rpcEndpoint - Solana RPC endpoint
 * @returns {Object} - Object containing SOL balance and token balances
 */
const useWalletBalance = (rpcEndpoint = 'https://api.devnet.solana.com') => {
  const { connected, publicKey } = useWallet();
  const [solBalance, setSolBalance] = useState(0);
  const [tokenBalances, setTokenBalances] = useState({
    cst: 0,
    vcu: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const connection = new Connection(rpcEndpoint);
    
    const fetchSolBalance = async () => {
      if (!connected || !publicKey) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch SOL balance
        const balance = await connection.getBalance(publicKey);
        if (isMounted) {
          setSolBalance(balance / LAMPORTS_PER_SOL);
        }
        
        // In a real application, you would fetch token balances here
        // This is a simplified version that uses mock data
        if (isMounted) {
          // Mock data for demonstration
          setTokenBalances({
            cst: 1250.75,
            vcu: 45.5
          });
        }
        
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching wallet balance:', err);
          setError(err.message || 'Failed to fetch wallet balance');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchSolBalance();
    
    // Set up interval to refresh balances
    const intervalId = setInterval(fetchSolBalance, 30000); // Refresh every 30 seconds
    
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [connected, publicKey, rpcEndpoint]);

  return {
    solBalance,
    tokenBalances,
    isLoading,
    error,
    refresh: () => {
      setIsLoading(true);
      // In a real application, this would trigger a refresh of the balances
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };
};

export default useWalletBalance;