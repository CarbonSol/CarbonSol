import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Link } from 'react-router-dom';

const MyWallet = () => {
  const { connected, publicKey } = useWallet();
  const [activeTab, setActiveTab] = useState('tokens');
  const [loading, setLoading] = useState(true);
  
  // Simulated data - in a real application, this would be fetched from the blockchain
  const [tokens, setTokens] = useState([
    {
      symbol: 'CST',
      name: 'Carbon Stable Token',
      balance: 1250.75,
      price: 1.02,
      change: 0.5,
      logo: 'https://via.placeholder.com/40?text=CST'
    },
    {
      symbol: 'VCU',
      name: 'Verified Carbon Unit',
      balance: 75.25,
      price: 15.80,
      change: 2.3,
      logo: 'https://via.placeholder.com/40?text=VCU'
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      balance: 5.32,
      price: 120.45,
      change: -1.2,
      logo: 'https://via.placeholder.com/40?text=SOL'
    }
  ]);
  
  const [transactions, setTransactions] = useState([
    {
      id: 'tx1',
      type: 'Buy',
      token: 'VCU',
      amount: 25.5,
      price: 15.20,
      total: 387.60,
      date: '2023-05-15T14:32:21Z',
      status: 'Completed',
      hash: '5xGh7Uw9pZvK2qLmN8F3tR6yD4E1oP...'
    },
    {
      id: 'tx2',
      type: 'Sell',
      token: 'CST',
      amount: 100,
      price: 1.01,
      total: 101.00,
      date: '2023-05-10T09:15:43Z',
      status: 'Completed',
      hash: '7Jk9L2pRmN5sT8vB3xQ6wZ1yF7G4hD...'
    },
    {
      id: 'tx3',
      type: 'Offset',
      token: 'VCU',
      amount: 10,
      price: 15.50,
      total: 155.00,
      date: '2023-05-05T16:48:12Z',
      status: 'Completed',
      hash: '2Rt6Y9xK7mL4pZ8sN1vB5jW3cF6gH5...'
    },
    {
      id: 'tx4',
      type: 'Buy',
      token: 'CST',
      amount: 500,
      price: 1.00,
      total: 500.00,
      date: '2023-04-28T11:23:05Z',
      status: 'Completed',
      hash: '9Nm2K7pL4jR8sT5vB6xZ3cF1gH7yD9...'
    }
  ]);
  
  const [offsets, setOffsets] = useState([
    {
      id: 'of1',
      date: '2023-05-05T16:48:12Z',
      amount: 10,
      project: 'Amazon Rainforest Protection',
      certificate: 'VCU-2023-05-001',
      status: 'Verified'
    },
    {
      id: 'of2',
      date: '2023-04-15T13:22:45Z',
      amount: 5,
      project: 'Solar Power Generation Project',
      certificate: 'VCU-2023-04-015',
      status: 'Verified'
    },
    {
      id: 'of3',
      date: '2023-03-20T09:11:32Z',
      amount: 8,
      project: 'Wind Farm Project',
      certificate: 'VCU-2023-03-022',
      status: 'Verified'
    }
  ]);
  
  // Calculate total asset value
  const calculateTotalAssetValue = () => {
    return tokens.reduce((total, token) => {
      return total + (token.balance * token.price);
    }, 0);
  };
  
  // Simulate data loading
  useEffect(() => {
    if (connected) {
      setLoading(true);
      // In a real application, this would fetch data from the blockchain
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [connected]);
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  // Format wallet address
  const formatAddress = (address) => {
    if (!address) return '';
    const addressStr = address.toString();
    return addressStr.substring(0, 6) + '...' + addressStr.substring(addressStr.length - 4);
  };
  
  // Render wallet not connected message
  if (!connected) {
    return (
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6">My Wallet</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-6">
            Connect your wallet to view your tokens, transaction history, and carbon offset records.
          </p>
          <WalletMultiButton className="bg-green-500 hover:bg-green-600" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6">My Wallet</h1>
      
      {/* Wallet Info */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div>
            <div className="text-gray-500 mb-1">Wallet Address</div>
            <div className="font-mono">{formatAddress(publicKey)}</div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-gray-500 mb-1">Total Asset Value</div>
            <div className="text-2xl font-bold">${calculateTotalAssetValue().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
          <div className="mt-4 md:mt-0">
            <WalletMultiButton className="bg-green-500 hover:bg-green-600" />
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'tokens' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('tokens')}
        >
          Tokens
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'transactions' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('transactions')}
        >
          Transaction History
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'offsets' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('offsets')}
        >
          Carbon Offsets
        </button>
      </div>
      
      {/* Loading State */}
      {loading ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">Loading wallet data...</p>
        </div>
      ) : (
        <>
          {/* Tokens Tab */}
          {activeTab === 'tokens' && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Token</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">24h Change</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tokens.map((token) => (
                    <tr key={token.symbol}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={token.logo} alt={token.symbol} />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{token.symbol}</div>
                            <div className="text-gray-500">{token.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900">{token.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900">${token.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900">${(token.balance * token.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`${token.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {token.change >= 0 ? '+' : ''}{token.change}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to="/trade" className="text-blue-600 hover:text-blue-900 mr-4">Trade</Link>
                        {token.symbol === 'VCU' && (
                          <button 
                            className="text-green-600 hover:text-green-900"
                            onClick={() => setShowOffsetModal(true)}
                          >
                            Offset
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Token</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Hash</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((tx) => (
                    <tr key={tx.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(tx.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          tx.type === 'Buy' ? 'bg-green-100 text-green-800' : 
                          tx.type === 'Sell' ? 'bg-red-100 text-red-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tx.token}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${tx.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${tx.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                        {tx.hash}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Carbon Offsets Tab */}
          {activeTab === 'offsets' && (
            <div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (tons CO₂)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {offsets.map((offset) => (
                      <tr key={offset.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(offset.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {offset.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {offset.project}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                          {offset.certificate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {offset.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-green-800 mb-2">Why Carbon Offsetting Matters</h3>
                <p className="text-green-700 mb-4">
                  Carbon offsetting allows you to compensate for your carbon emissions by funding projects that reduce greenhouse gas emissions elsewhere. By offsetting your carbon footprint, you're taking responsibility for your impact on the environment and supporting sustainable development around the world.
                </p>
                <div className="flex justify-end">
                  <Link 
                    to="/footprint" 
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                  >
                    Calculate Your Carbon Footprint
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyWallet; 