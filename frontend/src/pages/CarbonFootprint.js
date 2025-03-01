import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Link } from 'react-router-dom';
import apiService from '../services/api';

const CarbonFootprint = () => {
  const { connected } = useWallet();
  const [result, setResult] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    transportation: { car: 0, publicTransport: 0, flights: [] },
    home: { electricity: 0, heating: 0, cooling: 0 },
    food: { meatConsumption: 'medium', localFood: 'sometimes' },
    lifestyle: { shopping: 'medium' }
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Handle input change
  const handleInputChange = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };
  
  // Handle flight input change
  const handleFlightChange = (index, field, value) => {
    setFormData(prev => {
      const updatedFlights = [...prev.transportation.flights];
      updatedFlights[index] = {
        ...updatedFlights[index],
        [field]: value
      };
      return {
        ...prev,
        transportation: {
          ...prev.transportation,
          flights: updatedFlights
        }
      };
    });
  };
  
  // Add new flight
  const addFlight = () => {
    setFormData(prev => ({
      ...prev,
      transportation: {
        ...prev.transportation,
        flights: [...prev.transportation.flights, { distance: 0, frequency: 1 }]
      }
    }));
  };
  
  // Remove flight
  const removeFlight = (index) => {
    setFormData(prev => {
      const updatedFlights = [...prev.transportation.flights];
      updatedFlights.splice(index, 1);
      return {
        ...prev,
        transportation: {
          ...prev.transportation,
          flights: updatedFlights
        }
      };
    });
  };
  
  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Validate form data
    if (formData.transportation.car < 0 || formData.home.electricity < 0) {
      setError('Please enter valid positive numbers');
      setLoading(false);
      return;
    }
    
    // Call API
    try {
      const response = await apiService.calculateFootprint(formData);
      
      if (response.status === 'error') {
        setError(response.message || 'Error calculating carbon footprint');
        setLoading(false);
        return;
      }
      
      setResult(response.data);
    } catch (error) {
      setError('Error calculating carbon footprint: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };
  
  // Reset form
  const resetForm = () => {
    setFormData({
      transportation: { car: 0, publicTransport: 0, flights: [] },
      home: { electricity: 0, heating: 0, cooling: 0 },
      food: { meatConsumption: 'medium', localFood: 'sometimes' },
      lifestyle: { shopping: 'medium' }
    });
    setResult(null);
    setError(null);
  };
  
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6">Carbon Footprint Calculator</h1>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <p className="text-green-800">
          Calculate your carbon footprint to understand the environmental impact of your daily activities, and explore how you can offset these emissions through our platform.
        </p>
      </div>
      
      {!connected && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <p className="text-yellow-700 mb-4">
            Connect your wallet to offset your carbon footprint using VCU tokens after calculation.
          </p>
          <WalletMultiButton className="bg-green-500 hover:bg-green-600" />
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      {result ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-green-600 text-white p-6">
            <h2 className="text-2xl font-bold mb-2">Your Carbon Footprint Results</h2>
            <p>Based on the information you provided, here's an estimate of your annual carbon footprint.</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <h3 className="text-lg font-bold mb-2">Total Annual Emissions</h3>
                <p className="text-4xl font-bold text-green-600">{result.totalEmissions.toFixed(2)}</p>
                <p className="text-gray-600">tons CO₂e per year</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <h3 className="text-lg font-bold mb-2">Compared to Average</h3>
                <p className={`text-4xl font-bold ${result.comparedToAverage < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {result.comparedToAverage > 0 ? '+' : ''}{result.comparedToAverage.toFixed(2)}%
                </p>
                <p className="text-gray-600">vs. national average</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <h3 className="text-lg font-bold mb-2">To Offset</h3>
                <p className="text-4xl font-bold text-blue-600">{result.vcuToOffset.toFixed(2)}</p>
                <p className="text-gray-600">VCU tokens needed</p>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-4">Emissions Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span>Transportation</span>
                    <span>{result.breakdown.transportation.toFixed(2)} tons CO₂e ({(result.breakdown.transportation / result.totalEmissions * 100).toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(result.breakdown.transportation / result.totalEmissions * 100)}%` }}></div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span>Home Energy</span>
                    <span>{result.breakdown.home.toFixed(2)} tons CO₂e ({(result.breakdown.home / result.totalEmissions * 100).toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${(result.breakdown.home / result.totalEmissions * 100)}%` }}></div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span>Food</span>
                    <span>{result.breakdown.food.toFixed(2)} tons CO₂e ({(result.breakdown.food / result.totalEmissions * 100).toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(result.breakdown.food / result.totalEmissions * 100)}%` }}></div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span>Lifestyle & Consumption</span>
                    <span>{result.breakdown.lifestyle.toFixed(2)} tons CO₂e ({(result.breakdown.lifestyle / result.totalEmissions * 100).toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${(result.breakdown.lifestyle / result.totalEmissions * 100)}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-4">Reduction Recommendations</h3>
            <ul className="list-disc pl-5 mb-8 space-y-2">
              {result.recommendations.map((recommendation, index) => (
                <li key={index} className="text-gray-700">{recommendation}</li>
              ))}
            </ul>
            
            <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
              <button 
                onClick={resetForm}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
              >
                Recalculate
              </button>
              
              {connected ? (
                <Link 
                  to="/projects"
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded text-center"
                >
                  Offset Your Emissions
                </Link>
              ) : (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Connect wallet to offset:</span>
                  <WalletMultiButton className="bg-green-500 hover:bg-green-600" />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-blue-600 text-white p-6">
            <h2 className="text-2xl font-bold mb-2">Calculate Your Carbon Footprint</h2>
            <p>Please provide information about your lifestyle to estimate your carbon footprint.</p>
          </div>
          
          <div className="p-6">
            {/* Transportation Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Transportation</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Car Travel (miles/week)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.transportation.car}
                    onChange={(e) => handleInputChange('transportation', 'car', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">
                    Public Transport (miles/week)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.transportation.publicTransport}
                    onChange={(e) => handleInputChange('transportation', 'publicTransport', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-700">Flights</label>
                  <button
                    type="button"
                    onClick={addFlight}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    + Add Flight
                  </button>
                </div>
                
                {formData.transportation.flights.length === 0 ? (
                  <p className="text-gray-500 text-sm mb-2">No flights added. Click "Add Flight" to include air travel.</p>
                ) : (
                  formData.transportation.flights.map((flight, index) => (
                    <div key={index} className="flex items-center space-x-4 mb-2">
                      <div className="flex-grow grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 text-sm mb-1">
                            Flight Distance (miles)
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={flight.distance}
                            onChange={(e) => handleFlightChange(index, 'distance', Number(e.target.value))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm mb-1">
                            Flights per Year
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={flight.frequency}
                            onChange={(e) => handleFlightChange(index, 'frequency', Number(e.target.value))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFlight(index)}
                        className="text-red-600 hover:text-red-800 mt-6"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            {/* Home Energy Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Home Energy</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Electricity (kWh/month)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.home.electricity}
                    onChange={(e) => handleInputChange('home', 'electricity', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">
                    Heating (therms/month)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.home.heating}
                    onChange={(e) => handleInputChange('home', 'heating', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">
                    Cooling (hours/week)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.home.cooling}
                    onChange={(e) => handleInputChange('home', 'cooling', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Food Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Food</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Meat Consumption
                  </label>
                  <select
                    value={formData.food.meatConsumption}
                    onChange={(e) => handleInputChange('food', 'meatConsumption', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="none">None (Vegetarian/Vegan)</option>
                    <option value="low">Low (1-2 times per week)</option>
                    <option value="medium">Medium (3-5 times per week)</option>
                    <option value="high">High (Daily)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">
                    Local Food Consumption
                  </label>
                  <select
                    value={formData.food.localFood}
                    onChange={(e) => handleInputChange('food', 'localFood', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="rarely">Rarely</option>
                    <option value="sometimes">Sometimes</option>
                    <option value="mostly">Mostly</option>
                    <option value="always">Always</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Lifestyle Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Lifestyle & Consumption</h3>
              
              <div>
                <label className="block text-gray-700 mb-2">
                  Shopping Habits
                </label>
                <select
                  value={formData.lifestyle.shopping}
                  onChange={(e) => handleInputChange('lifestyle', 'shopping', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="minimal">Minimal (Only essentials)</option>
                  <option value="low">Low (Occasional non-essential purchases)</option>
                  <option value="medium">Medium (Regular shopping)</option>
                  <option value="high">High (Frequent shopping)</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium"
              >
                {loading ? 'Calculating...' : 'Calculate Footprint'}
              </button>
            </div>
          </div>
        </form>
      )}
      
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">About Carbon Footprints</h2>
        <p className="text-gray-700 mb-4">
          A carbon footprint is the total amount of greenhouse gases (including carbon dioxide and methane) that are generated by our actions. The average carbon footprint for a person in the United States is 16 tons, one of the highest rates in the world.
        </p>
        <p className="text-gray-700 mb-4">
          Globally, the average carbon footprint is closer to 4 tons. To have the best chance of avoiding a 2℃ rise in global temperatures, the average global carbon footprint per person needs to drop to under 2 tons by 2050.
        </p>
        <p className="text-gray-700">
          By understanding and measuring your carbon footprint, you can take steps to reduce your impact and offset the emissions you can't avoid through carbon credit purchases.
        </p>
      </div>
    </div>
  );
};

export default CarbonFootprint; 