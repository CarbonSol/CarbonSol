import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import apiService from '../services/api';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Trade = () => {
  const { connected } = useWallet();
  
  // Trading pair state
  const [selectedPair, setSelectedPair] = useState('CST/USDC');
  const [orderType, setOrderType] = useState('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  
  // Chart state
  const [chartData, setChartData] = useState(null);
  const [timeframe, setTimeframe] = useState('1d');
  
  // Price prediction state
  const [showPrediction, setShowPrediction] = useState(false);
  const [predictionDays, setPredictionDays] = useState(30);
  const [predictionData, setPredictionData] = useState(null);
  const [predictionError, setPredictionError] = useState(null);
  const [isPredictionLoading, setIsPredictionLoading] = useState(false);
  
  // Order book and market data (simulated)
  const [orderBook, setOrderBook] = useState({
    bids: [
      { price: 0.98, amount: 1250, total: 1225 },
      { price: 0.97, amount: 3000, total: 2910 },
      { price: 0.96, amount: 5000, total: 4800 },
      { price: 0.95, amount: 7500, total: 7125 },
      { price: 0.94, amount: 10000, total: 9400 },
    ],
    asks: [
      { price: 1.01, amount: 1500, total: 1515 },
      { price: 1.02, amount: 2800, total: 2856 },
      { price: 1.03, amount: 4200, total: 4326 },
      { price: 1.04, amount: 6500, total: 6760 },
      { price: 1.05, amount: 9000, total: 9450 },
    ]
  });
  
  const [marketData, setMarketData] = useState({
    'CST/USDC': { lastPrice: 1.00, change: 0.5, volume: 125000 },
    'VCU/USDC': { lastPrice: 15.75, change: 2.3, volume: 45000 },
    'CST/VCU': { lastPrice: 0.063, change: -1.2, volume: 35000 },
  });
  
  // Get price prediction data
  const fetchPredictionData = async () => {
    if (!showPrediction) return;
    
    setIsPredictionLoading(true);
    setPredictionError(null);
    
    // Extract token from selected pair
    const token = selectedPair.split('/')[0];
    
    try {
      const response = await apiService.predictPrice({ token, days: predictionDays });
      
      if (response.status === 'error') {
        setPredictionError('Failed to get price prediction');
        setIsPredictionLoading(false);
        return;
      }
      
      // Create chart data
      const predictionChartData = {
        labels: response.data.dates,
        datasets: [
          {
            label: `${token} Price Prediction`,
            data: response.data.prices,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          }
        ]
      };
      
      setPredictionData(predictionChartData);
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setPredictionError('Error getting price prediction: ' + (error.message || 'Unknown error'));
    } finally {
      setIsPredictionLoading(false);
    }
  };
  
  // Set default chart data
  useEffect(() => {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const data = {
      labels,
      datasets: [
        {
          label: 'Price (simulated data)',
          data: [0.95, 0.97, 0.96, 0.98, 1.01, 0.99, 1.00],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };
    
    setChartData(data);
    
    // Initialize price with current market price
    setPrice(marketData[selectedPair].lastPrice.toString());
  }, []);
  
  // When selected pair or prediction days change, fetch new prediction data
  useEffect(() => {
    if (showPrediction) {
      fetchPredictionData();
    }
  }, [selectedPair, predictionDays, showPrediction]);
  
  // Handle order submission
  const handleSubmitOrder = (e) => {
    e.preventDefault();
    
    if (!connected) {
      alert('Please connect your wallet first');
      return;
    }
    
    if (!amount || !price) {
      alert('Please enter both amount and price');
      return;
    }
    
    // In a real application, this would call a smart contract to place the order
    alert(`Order submitted: ${orderType} ${amount} ${selectedPair.split('/')[0]} at ${price} ${selectedPair.split('/')[1]}`);
  };
  
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6">Trade</h1>
      
      {!connected && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <p className="text-yellow-700 mb-4">
            Connect your wallet to start trading carbon credits and tokens.
          </p>
          <WalletMultiButton className="bg-green-500 hover:bg-green-600" />
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Market Overview */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">{selectedPair}</h2>
                <div className="flex items-center mt-1">
                  <span className="text-2xl font-bold mr-2">
                    ${marketData[selectedPair].lastPrice.toFixed(2)}
                  </span>
                  <span className={`${marketData[selectedPair].change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {marketData[selectedPair].change >= 0 ? '+' : ''}{marketData[selectedPair].change}%
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <select
                  value={selectedPair}
                  onChange={(e) => setSelectedPair(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="CST/USDC">CST/USDC</option>
                  <option value="VCU/USDC">VCU/USDC</option>
                  <option value="CST/VCU">CST/VCU</option>
                </select>
                
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1h">1H</option>
                  <option value="4h">4H</option>
                  <option value="1d">1D</option>
                  <option value="1w">1W</option>
                  <option value="1m">1M</option>
                </select>
              </div>
            </div>
            
            {/* Price Chart */}
            <div className="h-80 mb-4">
              {chartData && (
                <Line 
                  data={showPrediction && predictionData ? predictionData : chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: true,
                        text: showPrediction ? 'Price Prediction' : 'Price History',
                      },
                    },
                  }}
                />
              )}
              
              {isPredictionLoading && (
                <div className="flex justify-center items-center h-full">
                  <p>Loading prediction data...</p>
                </div>
              )}
              
              {predictionError && (
                <div className="text-red-600 mt-2">
                  {predictionError}
                </div>
              )}
            </div>
            
            {/* Chart Controls */}
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showPrediction"
                  checked={showPrediction}
                  onChange={(e) => setShowPrediction(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="showPrediction" className="mr-4">
                  Show AI Price Prediction
                </label>
                
                {showPrediction && (
                  <div className="flex items-center">
                    <label htmlFor="predictionDays" className="mr-2">
                      Days:
                    </label>
                    <select
                      id="predictionDays"
                      value={predictionDays}
                      onChange={(e) => setPredictionDays(Number(e.target.value))}
                      className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="7">7</option>
                      <option value="14">14</option>
                      <option value="30">30</option>
                      <option value="60">60</option>
                      <option value="90">90</option>
                    </select>
                  </div>
                )}
              </div>
              
              <button
                onClick={fetchPredictionData}
                disabled={!showPrediction || isPredictionLoading}
                className={`px-4 py-2 rounded ${
                  !showPrediction || isPredictionLoading
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isPredictionLoading ? 'Loading...' : 'Refresh Prediction'}
              </button>
            </div>
          </div>
          
          {/* Order Book */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Order Book</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-green-600 mb-2">Bids</h3>
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderBook.bids.map((bid, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-2 text-green-600">${bid.price.toFixed(2)}</td>
                        <td className="py-2 text-right">{bid.amount.toLocaleString()}</td>
                        <td className="py-2 text-right">${bid.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div>
                <h3 className="font-bold text-red-600 mb-2">Asks</h3>
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderBook.asks.map((ask, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-2 text-red-600">${ask.price.toFixed(2)}</td>
                        <td className="py-2 text-right">{ask.amount.toLocaleString()}</td>
                        <td className="py-2 text-right">${ask.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        {/* Trading Form */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex border-b mb-6">
              <button
                className={`py-2 px-4 font-medium ${
                  orderType === 'buy'
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setOrderType('buy')}
              >
                Buy
              </button>
              <button
                className={`py-2 px-4 font-medium ${
                  orderType === 'sell'
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setOrderType('sell')}
              >
                Sell
              </button>
            </div>
            
            <form onSubmit={handleSubmitOrder}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Price ({selectedPair.split('/')[1]})
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Amount ({selectedPair.split('/')[0]})
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Total ({selectedPair.split('/')[1]})
                </label>
                <input
                  type="text"
                  value={amount && price ? (parseFloat(amount) * parseFloat(price)).toFixed(2) : ''}
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
                  readOnly
                />
              </div>
              
              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-md font-bold ${
                  orderType === 'buy'
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                disabled={!connected}
              >
                {orderType === 'buy' ? 'Buy' : 'Sell'} {selectedPair.split('/')[0]}
              </button>
            </form>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Market Overview</h2>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pair</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider">24h Change</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(marketData).map(([pair, data]) => (
                  <tr 
                    key={pair} 
                    className={`hover:bg-gray-50 cursor-pointer ${selectedPair === pair ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedPair(pair)}
                  >
                    <td className="py-3 font-medium">{pair}</td>
                    <td className="py-3 text-right">${data.lastPrice.toFixed(2)}</td>
                    <td className={`py-3 text-right ${data.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {data.change >= 0 ? '+' : ''}{data.change}%
                    </td>
                    <td className="py-3 text-right">${data.volume.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trade; 
export default Trade; 