import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faExchangeAlt, 
  faChartLine, 
  faHistory, 
  faInfoCircle,
  faArrowDown,
  faArrowUp,
  faSync
} from '@fortawesome/free-solid-svg-icons';
import '../styles/Trade.css';

// Mock token data
const TOKENS = {
  CST: {
    name: 'Carbon Standard Token',
    symbol: 'CST',
    icon: '🌿',
    decimals: 9,
    price: 2.45,
    priceChange: 3.2,
    balance: 125.5
  },
  VCU: {
    name: 'Verified Carbon Unit',
    symbol: 'VCU',
    icon: '🌎',
    decimals: 9,
    price: 18.75,
    priceChange: -1.4,
    balance: 5.25
  },
  SOL: {
    name: 'Solana',
    symbol: 'SOL',
    icon: '◎',
    decimals: 9,
    price: 105.32,
    priceChange: 2.8,
    balance: 2.35
  }
};

// Mock order book data
const ORDER_BOOK = {
  asks: [
    { price: 19.25, size: 10.5, total: 202.13 },
    { price: 19.15, size: 5.2, total: 99.58 },
    { price: 19.05, size: 8.7, total: 165.74 },
    { price: 18.95, size: 12.3, total: 233.09 },
    { price: 18.85, size: 7.8, total: 147.03 },
  ],
  bids: [
    { price: 18.65, size: 9.4, total: 175.31 },
    { price: 18.55, size: 15.2, total: 281.96 },
    { price: 18.45, size: 6.8, total: 125.46 },
    { price: 18.35, size: 11.5, total: 211.03 },
    { price: 18.25, size: 8.3, total: 151.48 },
  ]
};

// Mock trade history
const TRADE_HISTORY = [
  { time: '14:32:15', price: 18.75, size: 2.5, side: 'buy' },
  { time: '14:30:42', price: 18.78, size: 1.2, side: 'sell' },
  { time: '14:28:19', price: 18.75, size: 3.7, side: 'buy' },
  { time: '14:25:51', price: 18.80, size: 0.8, side: 'sell' },
  { time: '14:22:33', price: 18.72, size: 5.1, side: 'buy' },
  { time: '14:20:05', price: 18.70, size: 1.5, side: 'buy' },
  { time: '14:18:47', price: 18.82, size: 2.3, side: 'sell' },
];

const Trade = () => {
  const { connected } = useWallet();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('swap');
  const [fromToken, setFromToken] = useState('CST');
  const [toToken, setToToken] = useState('VCU');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [orderType, setOrderType] = useState('market');
  const [orderSide, setOrderSide] = useState('buy');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect if wallet not connected
  useEffect(() => {
    if (!connected) {
      navigate('/');
    }
  }, [connected, navigate]);
  
  // Calculate to amount based on from amount
  useEffect(() => {
    if (fromAmount && fromAmount > 0) {
      const rate = TOKENS[toToken].price / TOKENS[fromToken].price;
      const calculated = parseFloat(fromAmount) * rate;
      setToAmount(calculated.toFixed(4));
    } else {
      setToAmount('');
    }
  }, [fromAmount, fromToken, toToken]);
  
  // Calculate total based on price and amount
  useEffect(() => {
    if (price && amount) {
      const calculatedTotal = parseFloat(price) * parseFloat(amount);
      setTotal(calculatedTotal.toFixed(4));
    } else {
      setTotal('');
    }
  }, [price, amount]);
  
  // Swap tokens
  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount('');
    setToAmount('');
  };
  
  // Handle swap
  const handleSwap = () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Reset form
      setFromAmount('');
      setToAmount('');
      // Show success message (in a real app)
    }, 1500);
  };
  
  // Handle order placement
  const handlePlaceOrder = () => {
    if (!price || !amount || parseFloat(price) <= 0 || parseFloat(amount) <= 0) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Reset form
      setPrice('');
      setAmount('');
      setTotal('');
      // Show success message (in a real app)
    }, 1500);
  };
  
  // Format price change with color and sign
  const formatPriceChange = (change) => {
    const sign = change > 0 ? '+' : '';
    return (
      <span className={`price-change ${change > 0 ? 'positive' : 'negative'}`}>
        {sign}{change}%
      </span>
    );
  };
  
  return (
    <div className="trade-container">
      <div className="trade-header">
        <h1>Carbon Credit Trading</h1>
        <p>Trade carbon credits and offset your carbon footprint</p>
      </div>
      
      <div className="trade-tabs">
        <button 
          className={`tab-button ${activeTab === 'swap' ? 'active' : ''}`}
          onClick={() => setActiveTab('swap')}
        >
          <FontAwesomeIcon icon={faExchangeAlt} /> Swap
        </button>
        <button 
          className={`tab-button ${activeTab === 'order' ? 'active' : ''}`}
          onClick={() => setActiveTab('order')}
        >
          <FontAwesomeIcon icon={faChartLine} /> Order Book
        </button>
        <button 
          className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <FontAwesomeIcon icon={faHistory} /> Trade History
        </button>
      </div>
      
      <div className="trade-content">
        {activeTab === 'swap' && (
          <div className="swap-container">
            <div className="swap-form">
              <div className="form-group">
                <label>From</label>
                <div className="token-input">
                  <select 
                    value={fromToken}
                    onChange={(e) => setFromToken(e.target.value)}
                  >
                    {Object.keys(TOKENS).map(symbol => (
                      <option key={symbol} value={symbol}>
                        {TOKENS[symbol].icon} {symbol}
                      </option>
                    ))}
                  </select>
                  <input 
                    type="number"
                    placeholder="0.00"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                  />
                </div>
                <div className="token-balance">
                  Balance: {TOKENS[fromToken].balance} {fromToken}
                </div>
              </div>
              
              <button className="swap-button" onClick={handleSwapTokens}>
                <FontAwesomeIcon icon={faArrowDown} />
              </button>
              
              <div className="form-group">
                <label>To</label>
                <div className="token-input">
                  <select 
                    value={toToken}
                    onChange={(e) => setToToken(e.target.value)}
                  >
                    {Object.keys(TOKENS).map(symbol => (
                      <option key={symbol} value={symbol}>
                        {TOKENS[symbol].icon} {symbol}
                      </option>
                    ))}
                  </select>
                  <input 
                    type="number"
                    placeholder="0.00"
                    value={toAmount}
                    readOnly
                  />
                </div>
                <div className="token-balance">
                  Balance: {TOKENS[toToken].balance} {toToken}
                </div>
              </div>
              
              <div className="swap-details">
                <div className="detail-item">
                  <span>Exchange Rate</span>
                  <span>1 {fromToken} = {(TOKENS[toToken].price / TOKENS[fromToken].price).toFixed(4)} {toToken}</span>
                </div>
                <div className="detail-item">
                  <span>Slippage Tolerance</span>
                  <div className="slippage-options">
                    {[0.1, 0.5, 1.0].map(value => (
                      <button 
                        key={value}
                        className={slippage === value ? 'active' : ''}
                        onClick={() => setSlippage(value)}
                      >
                        {value}%
                      </button>
                    ))}
                  </div>
                </div>
                <div className="detail-item">
                  <span>Minimum Received</span>
                  <span>
                    {toAmount ? (parseFloat(toAmount) * (1 - slippage / 100)).toFixed(4) : '0.00'} {toToken}
                  </span>
                </div>
              </div>
              
              <button 
                className="primary-button"
                disabled={!fromAmount || parseFloat(fromAmount) <= 0 || isLoading}
                onClick={handleSwap}
              >
                {isLoading ? (
                  <FontAwesomeIcon icon={faSync} spin />
                ) : (
                  'Swap Tokens'
                )}
              </button>
            </div>
            
            <div className="token-info">
              <div className="token-card">
                <div className="token-header">
                  <div className="token-icon">{TOKENS[fromToken].icon}</div>
                  <div className="token-name">
                    <h3>{TOKENS[fromToken].name}</h3>
                    <span>{fromToken}</span>
                  </div>
                </div>
                <div className="token-price">
                  <div className="price-value">${TOKENS[fromToken].price.toFixed(2)}</div>
                  <div className="price-change">
                    {formatPriceChange(TOKENS[fromToken].priceChange)}
                  </div>
                </div>
                <div className="token-description">
                  <p>
                    {fromToken === 'CST' ? 
                      'Carbon Standard Tokens represent standardized carbon credits on the blockchain.' :
                      fromToken === 'VCU' ?
                      'Verified Carbon Units are verified emissions reductions from carbon projects.' :
                      'Solana is the native token of the Solana blockchain.'
                    }
                  </p>
                </div>
              </div>
              
              <div className="token-card">
                <div className="token-header">
                  <div className="token-icon">{TOKENS[toToken].icon}</div>
                  <div className="token-name">
                    <h3>{TOKENS[toToken].name}</h3>
                    <span>{toToken}</span>
                  </div>
                </div>
                <div className="token-price">
                  <div className="price-value">${TOKENS[toToken].price.toFixed(2)}</div>
                  <div className="price-change">
                    {formatPriceChange(TOKENS[toToken].priceChange)}
                  </div>
                </div>
                <div className="token-description">
                  <p>
                    {toToken === 'CST' ? 
                      'Carbon Standard Tokens represent standardized carbon credits on the blockchain.' :
                      toToken === 'VCU' ?
                      'Verified Carbon Units are verified emissions reductions from carbon projects.' :
                      'Solana is the native token of the Solana blockchain.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'order' && (
          <div className="order-book-container">
            <div className="order-form">
              <div className="order-type-tabs">
                <button 
                  className={`order-type-tab ${orderSide === 'buy' ? 'active' : ''}`}
                  onClick={() => setOrderSide('buy')}
                >
                  Buy
                </button>
                <button 
                  className={`order-type-tab ${orderSide === 'sell' ? 'active' : ''}`}
                  onClick={() => setOrderSide('sell')}
                >
                  Sell
                </button>
              </div>
              
              <div className="order-type-selector">
                <button 
                  className={`order-type-button ${orderType === 'market' ? 'active' : ''}`}
                  onClick={() => setOrderType('market')}
                >
                  Market
                </button>
                <button 
                  className={`order-type-button ${orderType === 'limit' ? 'active' : ''}`}
                  onClick={() => setOrderType('limit')}
                >
                  Limit
                </button>
              </div>
              
              <div className="form-group">
                <label>Price (USDC)</label>
                <input 
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  readOnly={orderType === 'market'}
                />
              </div>
              
              <div className="form-group">
                <label>Amount (VCU)</label>
                <input 
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label>Total (USDC)</label>
                <input 
                  type="number"
                  placeholder="0.00"
                  value={total}
                  onChange={(e) => setTotal(e.target.value)}
                  readOnly={orderType === 'limit'}
                />
              </div>
              
              <div className="order-percentage">
                {[25, 50, 75, 100].map(percent => (
                  <button 
                    key={percent}
                    onClick={() => {
                      if (orderSide === 'buy') {
                        // Calculate amount based on balance and percentage
                        const maxAmount = TOKENS.SOL.balance * TOKENS.SOL.price / TOKENS.VCU.price * (percent / 100);
                        setAmount(maxAmount.toFixed(4));
                      } else {
                        // Use percentage of VCU balance
                        const maxAmount = TOKENS.VCU.balance * (percent / 100);
                        setAmount(maxAmount.toFixed(4));
                      }
                    }}
                  >
                    {percent}%
                  </button>
                ))}
              </div>
              
              <button 
                className={`primary-button ${orderSide === 'buy' ? 'buy-button' : 'sell-button'}`}
                disabled={!amount || parseFloat(amount) <= 0 || (orderType === 'limit' && (!price || parseFloat(price) <= 0)) || isLoading}
                onClick={handlePlaceOrder}
              >
                {isLoading ? (
                  <FontAwesomeIcon icon={faSync} spin />
                ) : (
                  `${orderSide === 'buy' ? 'Buy' : 'Sell'} VCU`
                )}
              </button>
            </div>
            
            <div className="order-book">
              <h3>Order Book <FontAwesomeIcon icon={faInfoCircle} className="info-icon" /></h3>
              
              <div className="order-book-header">
                <span>Price (USDC)</span>
                <span>Size (VCU)</span>
                <span>Total (USDC)</span>
              </div>
              
              <div className="asks">
                {ORDER_BOOK.asks.map((ask, index) => (
                  <div key={index} className="order-row ask">
                    <span className="price">{ask.price.toFixed(2)}</span>
                    <span className="size">{ask.size.toFixed(2)}</span>
                    <span className="total">{ask.total.toFixed(2)}</span>
                    <div 
                      className="depth-visualization" 
                      style={{ width: `${(ask.size / Math.max(...ORDER_BOOK.asks.map(a => a.size))) * 100}%` }}
                    ></div>
                  </div>
                ))}
              </div>
              
              <div className="spread">
                <span>Spread: {(ORDER_BOOK.asks[ORDER_BOOK.asks.length - 1].price - ORDER_BOOK.bids[0].price).toFixed(2)} ({((ORDER_BOOK.asks[ORDER_BOOK.asks.length - 1].price - ORDER_BOOK.bids[0].price) / ORDER_BOOK.asks[ORDER_BOOK.asks.length - 1].price * 100).toFixed(2)}%)</span>
              </div>
              
              <div className="bids">
                {ORDER_BOOK.bids.map((bid, index) => (
                  <div key={index} className="order-row bid">
                    <span className="price">{bid.price.toFixed(2)}</span>
                    <span className="size">{bid.size.toFixed(2)}</span>
                    <span className="total">{bid.total.toFixed(2)}</span>
                    <div 
                      className="depth-visualization" 
                      style={{ width: `${(bid.size / Math.max(...ORDER_BOOK.bids.map(b => b.size))) * 100}%` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'history' && (
          <div className="trade-history-container">
            <h3>Recent Trades</h3>
            
            <div className="trade-history-header">
              <span>Time</span>
              <span>Price (USDC)</span>
              <span>Size (VCU)</span>
              <span>Side</span>
            </div>
            
            <div className="trade-history-list">
              {TRADE_HISTORY.map((trade, index) => (
                <div key={index} className={`trade-row ${trade.side}`}>
                  <span>{trade.time}</span>
                  <span>{trade.price.toFixed(2)}</span>
                  <span>{trade.size.toFixed(2)}</span>
                  <span className="trade-side">
                    <FontAwesomeIcon 
                      icon={trade.side === 'buy' ? faArrowUp : faArrowDown} 
                    />
                    {trade.side}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trade;