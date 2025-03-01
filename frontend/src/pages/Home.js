import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Home = () => {
  const { connected } = useWallet();

  return (
    <div>
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Carbon Trading Meets <span className="text-green-600">Blockchain</span> & <span className="text-blue-600">AI</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              CarbonSol AI DEX is a decentralized exchange platform that combines carbon credit trading with cryptocurrency on the Solana blockchain, powered by artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {connected ? (
                <Link to="/dashboard" className="btn-primary text-center">
                  Go to Dashboard
                </Link>
              ) : (
                <WalletMultiButton className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" />
              )}
              <Link to="/about" className="btn-secondary text-center">
                Learn More
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <img 
              src="/hero-image.svg" 
              alt="Carbon Trading Illustration" 
              className="max-w-full h-auto rounded-lg shadow-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/600x400?text=Carbon+Trading';
              }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Key Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines the best of blockchain technology, AI, and carbon markets to create a seamless trading experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card">
            <div className="text-green-600 text-4xl mb-4">
              <i className="fas fa-exchange-alt"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Decentralized Exchange</h3>
            <p className="text-gray-600">
              Trade carbon credits (VCU) and CarbonSol Tokens (CST) in a secure, transparent, and efficient marketplace.
            </p>
          </div>

          <div className="card">
            <div className="text-blue-600 text-4xl mb-4">
              <i className="fas fa-brain"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">AI-Powered Verification</h3>
            <p className="text-gray-600">
              Our AI systems verify carbon projects, predict emissions, and optimize trading strategies.
            </p>
          </div>

          <div className="card">
            <div className="text-purple-600 text-4xl mb-4">
              <i className="fas fa-leaf"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Real Climate Impact</h3>
            <p className="text-gray-600">
              Every transaction contributes to real-world carbon reduction projects, verified on the blockchain.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join the carbon trading revolution in just a few simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
            <h3 className="text-xl font-bold mb-2">Connect Wallet</h3>
            <p className="text-gray-600">
              Connect your Solana wallet to access the platform.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
            <h3 className="text-xl font-bold mb-2">Get CST Tokens</h3>
            <p className="text-gray-600">
              Purchase or earn CarbonSol Tokens (CST).
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
            <h3 className="text-xl font-bold mb-2">Trade Carbon Credits</h3>
            <p className="text-gray-600">
              Buy and sell Verified Carbon Units (VCU) on our DEX.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
            <h3 className="text-xl font-bold mb-2">Offset Your Footprint</h3>
            <p className="text-gray-600">
              Retire VCUs to offset your carbon footprint.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-green-600 text-white rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join the Green Revolution?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Start trading carbon credits on the blockchain today and be part of the solution to climate change.
          </p>
          <div className="flex justify-center">
            {connected ? (
              <Link to="/trade" className="bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg text-lg">
                Start Trading
              </Link>
            ) : (
              <WalletMultiButton className="bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg text-lg" />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 