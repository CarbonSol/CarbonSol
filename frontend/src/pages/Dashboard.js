import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { connected } = useWallet();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Simulated data - in a real application, this would be fetched from an API
  const tokenData = {
    cst: {
      balance: 1250.75,
      price: 0.85,
      change: 5.2,
    },
    vcu: {
      balance: 45.5,
      price: 15.20,
      change: 2.8,
    },
    totalOffset: 45.5, // tons of CO2
    projectsSupported: 4,
    totalContribution: 2250.50, // USD
  };
  
  const recentTransactions = [
    { id: 'tx1', type: 'Buy', token: 'CST', amount: 500, price: 0.85, date: '2023-05-15', status: 'Completed' },
    { id: 'tx2', type: 'Offset', token: 'VCU', amount: 10, price: 15.20, date: '2023-05-10', status: 'Completed' },
    { id: 'tx3', type: 'Sell', token: 'CST', amount: 200, price: 0.87, date: '2023-05-05', status: 'Completed' },
    { id: 'tx4', type: 'Buy', token: 'VCU', amount: 5, price: 15.00, date: '2023-04-28', status: 'Completed' },
  ];
  
  // Chart data
  const balanceHistoryData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'CST Balance',
        data: [400, 650, 800, 950, 1100, 1250],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'VCU Balance',
        data: [10, 15, 25, 30, 40, 45],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  
  const carbonDistributionData = {
    labels: ['Energy', 'Transportation', 'Aviation', 'Diet', 'Other'],
    datasets: [
      {
        data: [35, 25, 15, 15, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  if (!connected) {
    return (
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-yellow-700 mb-4">Please Connect Your Wallet</h2>
          <p className="mb-4">
            Connect your wallet to view your token balances, transaction history, and carbon footprint statistics.
          </p>
          <WalletMultiButton className="bg-green-500 hover:bg-green-600" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Token Balances */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">CST Balance</h2>
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl font-bold">{tokenData.cst.balance.toLocaleString()}</span>
            <span className={`px-2 py-1 text-sm rounded-full ${tokenData.cst.change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {tokenData.cst.change >= 0 ? '+' : ''}{tokenData.cst.change}%
            </span>
          </div>
          <p className="text-gray-600 mb-4">Value: ${(tokenData.cst.balance * tokenData.cst.price).toFixed(2)}</p>
          <div className="flex justify-between">
            <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-sm">Buy</button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm">Sell</button>
            <button className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded text-sm">Transfer</button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">VCU Balance</h2>
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl font-bold">{tokenData.vcu.balance.toLocaleString()}</span>
            <span className={`px-2 py-1 text-sm rounded-full ${tokenData.vcu.change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {tokenData.vcu.change >= 0 ? '+' : ''}{tokenData.vcu.change}%
            </span>
          </div>
          <p className="text-gray-600 mb-4">Value: ${(tokenData.vcu.balance * tokenData.vcu.price).toFixed(2)}</p>
          <div className="flex justify-between">
            <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-sm">Buy</button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm">Offset</button>
            <button className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded text-sm">Details</button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Carbon Offset</h2>
          <div className="mb-2">
            <span className="text-3xl font-bold text-green-600">{tokenData.totalOffset.toLocaleString()}</span>
            <span className="text-lg ml-1">tons CO₂</span>
          </div>
          <p className="text-gray-600 mb-4">Projects supported: {tokenData.projectsSupported}</p>
          <p className="text-gray-600 mb-4">Total contribution: ${tokenData.totalContribution.toLocaleString()}</p>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Offset More
          </button>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'overview'
              ? 'text-green-600 border-b-2 border-green-600'
              : 'text-gray-500 hover:text-green-600'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'transactions'
              ? 'text-green-600 border-b-2 border-green-600'
              : 'text-gray-500 hover:text-green-600'
          }`}
          onClick={() => setActiveTab('transactions')}
        >
          Transaction History
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'carbon'
              ? 'text-green-600 border-b-2 border-green-600'
              : 'text-gray-500 hover:text-green-600'
          }`}
          onClick={() => setActiveTab('carbon')}
        >
          Carbon Footprint
        </button>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Balance History</h2>
              <Line 
                data={balanceHistoryData} 
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                }}
              />
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Token</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentTransactions.map((tx) => (
                      <tr key={tx.id}>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            tx.type === 'Buy' ? 'bg-green-100 text-green-800' : 
                            tx.type === 'Sell' ? 'bg-red-100 text-red-800' : 
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {tx.type}
                          </span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">{tx.token}</td>
                        <td className="px-3 py-2 whitespace-nowrap">{tx.amount}</td>
                        <td className="px-3 py-2 whitespace-nowrap">{tx.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <button 
                  className="text-blue-600 hover:text-blue-800 text-sm"
                  onClick={() => setActiveTab('transactions')}
                >
                  View All Transactions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'transactions' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6">Transaction History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Token</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        tx.type === 'Buy' ? 'bg-green-100 text-green-800' : 
                        tx.type === 'Sell' ? 'bg-red-100 text-red-800' : 
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{tx.token}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{tx.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${tx.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{tx.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
            <button className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300">
              Load More
            </button>
          </div>
        </div>
      )}
      
      {activeTab === 'carbon' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Carbon Footprint Distribution</h2>
              <div className="h-64">
                <Doughnut 
                  data={carbonDistributionData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                    },
                  }}
                />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Carbon Offset Statistics</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 mb-1">Total Carbon Footprint</p>
                  <div className="flex items-end">
                    <span className="text-2xl font-bold">75.2</span>
                    <span className="ml-1 text-gray-600">tons CO₂e/year</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Carbon Offset</p>
                  <div className="flex items-end">
                    <span className="text-2xl font-bold text-green-600">{tokenData.totalOffset.toLocaleString()}</span>
                    <span className="ml-1 text-gray-600">tons CO₂e</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Offset Percentage</p>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(tokenData.totalOffset / 75.2) * 100}%` }}></div>
                    </div>
                    <span className="text-sm font-medium">{((tokenData.totalOffset / 75.2) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-bold mb-2">Reduction Suggestions</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Switch to renewable energy sources</li>
                  <li>Reduce air travel or choose direct flights</li>
                  <li>Use public transportation more frequently</li>
                  <li>Reduce meat consumption</li>
                  <li>Improve home energy efficiency</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Carbon Footprint Calculator</h2>
              <button 
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                onClick={() => window.location.href = '/footprint'}
              >
                Recalculate
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Your last carbon footprint calculation was on May 10, 2023. You can recalculate your footprint to get updated results based on your current lifestyle.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 