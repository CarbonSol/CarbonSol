import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatCarbonAmount } from '../utils/formatters';

// Emission factors (simplified for demonstration)
const EMISSION_FACTORS = {
  transportation: {
    car: 0.12, // kg CO2 per km
    bus: 0.05,
    train: 0.03,
    plane: 0.25
  },
  energy: {
    electricity: 0.5, // kg CO2 per kWh
    naturalGas: 0.2, // kg CO2 per kWh
    heating: 0.3 // kg CO2 per kWh
  },
  food: {
    meat: 5.0, // kg CO2 per kg
    dairy: 2.5,
    vegetables: 0.5,
    fruits: 0.7
  },
  lifestyle: {
    clothing: 10, // kg CO2 per item
    electronics: 100, // kg CO2 per item
    furniture: 50 // kg CO2 per item
  }
};

const CarbonFootprintCalculator = ({ onCalculationComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Transportation
    carKm: 0,
    busKm: 0,
    trainKm: 0,
    planeKm: 0,
    
    // Energy
    electricityKwh: 0,
    naturalGasKwh: 0,
    heatingKwh: 0,
    
    // Food
    meatKg: 0,
    dairyKg: 0,
    vegetablesKg: 0,
    fruitsKg: 0,
    
    // Lifestyle
    clothingItems: 0,
    electronicsItems: 0,
    furnitureItems: 0
  });
  
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value) || 0
    });
  };
  
  const nextStep = () => {
    setStep(step + 1);
  };
  
  const prevStep = () => {
    setStep(step - 1);
  };
  
  const calculateFootprint = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Calculate transportation emissions
      const transportationEmissions = 
        (formData.carKm * EMISSION_FACTORS.transportation.car) +
        (formData.busKm * EMISSION_FACTORS.transportation.bus) +
        (formData.trainKm * EMISSION_FACTORS.transportation.train) +
        (formData.planeKm * EMISSION_FACTORS.transportation.plane);
      
      // Calculate energy emissions
      const energyEmissions = 
        (formData.electricityKwh * EMISSION_FACTORS.energy.electricity) +
        (formData.naturalGasKwh * EMISSION_FACTORS.energy.naturalGas) +
        (formData.heatingKwh * EMISSION_FACTORS.energy.heating);
      
      // Calculate food emissions
      const foodEmissions = 
        (formData.meatKg * EMISSION_FACTORS.food.meat) +
        (formData.dairyKg * EMISSION_FACTORS.food.dairy) +
        (formData.vegetablesKg * EMISSION_FACTORS.food.vegetables) +
        (formData.fruitsKg * EMISSION_FACTORS.food.fruits);
      
      // Calculate lifestyle emissions
      const lifestyleEmissions = 
        (formData.clothingItems * EMISSION_FACTORS.lifestyle.clothing) +
        (formData.electronicsItems * EMISSION_FACTORS.lifestyle.electronics) +
        (formData.furnitureItems * EMISSION_FACTORS.lifestyle.furniture);
      
      // Calculate total emissions (convert to tons)
      const totalEmissions = (transportationEmissions + energyEmissions + foodEmissions + lifestyleEmissions) / 1000;
      
      // Calculate breakdown percentages
      const transportationPercentage = (transportationEmissions / (transportationEmissions + energyEmissions + foodEmissions + lifestyleEmissions)) * 100;
      const energyPercentage = (energyEmissions / (transportationEmissions + energyEmissions + foodEmissions + lifestyleEmissions)) * 100;
      const foodPercentage = (foodEmissions / (transportationEmissions + energyEmissions + foodEmissions + lifestyleEmissions)) * 100;
      const lifestylePercentage = (lifestyleEmissions / (transportationEmissions + energyEmissions + foodEmissions + lifestyleEmissions)) * 100;
      
      const calculationResults = {
        totalEmissions,
        breakdown: {
          transportation: {
            emissions: transportationEmissions / 1000,
            percentage: transportationPercentage
          },
          energy: {
            emissions: energyEmissions / 1000,
            percentage: energyPercentage
          },
          food: {
            emissions: foodEmissions / 1000,
            percentage: foodPercentage
          },
          lifestyle: {
            emissions: lifestyleEmissions / 1000,
            percentage: lifestylePercentage
          }
        }
      };
      
      setResults(calculationResults);
      setLoading(false);
      
      // If callback is provided, pass the results
      if (onCalculationComplete) {
        onCalculationComplete(calculationResults);
      }
      
      // Move to results step
      setStep(5);
    }, 1500);
  };
  
  const resetCalculator = () => {
    setFormData({
      carKm: 0,
      busKm: 0,
      trainKm: 0,
      planeKm: 0,
      electricityKwh: 0,
      naturalGasKwh: 0,
      heatingKwh: 0,
      meatKg: 0,
      dairyKg: 0,
      vegetablesKg: 0,
      fruitsKg: 0,
      clothingItems: 0,
      electronicsItems: 0,
      furnitureItems: 0
    });
    setResults(null);
    setStep(1);
  };
  
  // Render form based on current step
  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <div className="calculator-step">
            <h3>Transportation</h3>
            <p className="step-description">
              Enter your average monthly transportation usage.
            </p>
            
            <div className="form-group">
              <label htmlFor="carKm">Car (kilometers per month)</label>
              <input
                type="number"
                id="carKm"
                name="carKm"
                value={formData.carKm}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="busKm">Bus (kilometers per month)</label>
              <input
                type="number"
                id="busKm"
                name="busKm"
                value={formData.busKm}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="trainKm">Train (kilometers per month)</label>
              <input
                type="number"
                id="trainKm"
                name="trainKm"
                value={formData.trainKm}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="planeKm">Plane (kilometers per year)</label>
              <input
                type="number"
                id="planeKm"
                name="planeKm"
                value={formData.planeKm}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            
            <div className="form-actions">
              <button className="cta-button primary" onClick={nextStep}>
                Next <FontAwesomeIcon icon="arrow-right" />
              </button>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="calculator-step">
            <h3>Energy Usage</h3>
            <p className="step-description">
              Enter your average monthly energy consumption.
            </p>
            
            <div className="form-group">
              <label htmlFor="electricityKwh">Electricity (kWh per month)</label>
              <input
                type="number"
                id="electricityKwh"
                name="electricityKwh"
                value={formData.electricityKwh}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="naturalGasKwh">Natural Gas (kWh per month)</label>
              <input
                type="number"
                id="naturalGasKwh"
                name="naturalGasKwh"
                value={formData.naturalGasKwh}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="heatingKwh">Heating (kWh per month)</label>
              <input
                type="number"
                id="heatingKwh"
                name="heatingKwh"
                value={formData.heatingKwh}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            
            <div className="form-actions">
              <button className="cta-button secondary" onClick={prevStep}>
                <FontAwesomeIcon icon="arrow-left" /> Back
              </button>
              <button className="cta-button primary" onClick={nextStep}>
                Next <FontAwesomeIcon icon="arrow-right" />
              </button>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="calculator-step">
            <h3>Food Consumption</h3>
            <p className="step-description">
              Enter your average monthly food consumption.
            </p>
            
            <div className="form-group">
              <label htmlFor="meatKg">Meat (kg per month)</label>
              <input
                type="number"
                id="meatKg"
                name="meatKg"
                value={formData.meatKg}
                onChange={handleInputChange}
                min="0"
                step="0.1"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="dairyKg">Dairy (kg per month)</label>
              <input
                type="number"
                id="dairyKg"
                name="dairyKg"
                value={formData.dairyKg}
                onChange={handleInputChange}
                min="0"
                step="0.1"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="vegetablesKg">Vegetables (kg per month)</label>
              <input
                type="number"
                id="vegetablesKg"
                name="vegetablesKg"
                value={formData.vegetablesKg}
                onChange={handleInputChange}
                min="0"
                step="0.1"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="fruitsKg">Fruits (kg per month)</label>
              <input
                type="number"
                id="fruitsKg"
                name="fruitsKg"
                value={formData.fruitsKg}
                onChange={handleInputChange}
                min="0"
                step="0.1"
              />
            </div>
            
            <div className="form-actions">
              <button className="cta-button secondary" onClick={prevStep}>
                <FontAwesomeIcon icon="arrow-left" /> Back
              </button>
              <button className="cta-button primary" onClick={nextStep}>
                Next <FontAwesomeIcon icon="arrow-right" />
              </button>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="calculator-step">
            <h3>Lifestyle & Purchases</h3>
            <p className="step-description">
              Enter your average yearly purchases.
            </p>
            
            <div className="form-group">
              <label htmlFor="clothingItems">Clothing (items per year)</label>
              <input
                type="number"
                id="clothingItems"
                name="clothingItems"
                value={formData.clothingItems}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="electronicsItems">Electronics (items per year)</label>
              <input
                type="number"
                id="electronicsItems"
                name="electronicsItems"
                value={formData.electronicsItems}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="furnitureItems">Furniture (items per year)</label>
              <input
                type="number"
                id="furnitureItems"
                name="furnitureItems"
                value={formData.furnitureItems}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            
            <div className="form-actions">
              <button className="cta-button secondary" onClick={prevStep}>
                <FontAwesomeIcon icon="arrow-left" /> Back
              </button>
              <button 
                className="cta-button primary" 
                onClick={calculateFootprint}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FontAwesomeIcon icon="spinner" spin /> Calculating...
                  </>
                ) : (
                  <>
                    Calculate <FontAwesomeIcon icon="calculator" />
                  </>
                )}
              </button>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="calculator-step results-step">
            <h3>Your Carbon Footprint Results</h3>
            
            {results && (
              <>
                <div className="results-total">
                  <div className="results-icon">
                    <FontAwesomeIcon icon="leaf" />
                  </div>
                  <div className="results-content">
                    <h4>Total Carbon Footprint</h4>
                    <div className="total-emissions">
                      {formatCarbonAmount(results.totalEmissions)}
                    </div>
                    <p className="results-note">
                      The average person emits about 4 tCO₂e per year. Your footprint is 
                      {results.totalEmissions < 4 ? ' below ' : ' above '} 
                      average.
                    </p>
                  </div>
                </div>
                
                <div className="results-breakdown">
                  <h4>Breakdown by Category</h4>
                  
                  <div className="breakdown-item">
                    <div className="breakdown-label">
                      <FontAwesomeIcon icon="car" /> Transportation
                    </div>
                    <div className="breakdown-bar">
                      <div 
                        className="breakdown-fill transportation" 
                        style={{ width: `${results.breakdown.transportation.percentage}%` }}
                      ></div>
                    </div>
                    <div className="breakdown-value">
                      {formatCarbonAmount(results.breakdown.transportation.emissions)}
                      <span className="breakdown-percentage">
                        ({Math.round(results.breakdown.transportation.percentage)}%)
                      </span>
                    </div>
                  </div>
                  
                  <div className="breakdown-item">
                    <div className="breakdown-label">
                      <FontAwesomeIcon icon="bolt" /> Energy
                    </div>
                    <div className="breakdown-bar">
                      <div 
                        className="breakdown-fill energy" 
                        style={{ width: `${results.breakdown.energy.percentage}%` }}
                      ></div>
                    </div>
                    <div className="breakdown-value">
                      {formatCarbonAmount(results.breakdown.energy.emissions)}
                      <span className="breakdown-percentage">
                        ({Math.round(results.breakdown.energy.percentage)}%)
                      </span>
                    </div>
                  </div>
                  
                  <div className="breakdown-item">
                    <div className="breakdown-label">
                      <FontAwesomeIcon icon="utensils" /> Food
                    </div>
                    <div className="breakdown-bar">
                      <div 
                        className="breakdown-fill food" 
                        style={{ width: `${results.breakdown.food.percentage}%` }}
                      ></div>
                    </div>
                    <div className="breakdown-value">
                      {formatCarbonAmount(results.breakdown.food.emissions)}
                      <span className="breakdown-percentage">
                        ({Math.round(results.breakdown.food.percentage)}%)
                      </span>
                    </div>
                  </div>
                  
                  <div className="breakdown-item">
                    <div className="breakdown-label">
                      <FontAwesomeIcon icon="shopping-bag" /> Lifestyle
                    </div>
                    <div className="breakdown-bar">
                      <div 
                        className="breakdown-fill lifestyle" 
                        style={{ width: `${results.breakdown.lifestyle.percentage}%` }}
                      ></div>
                    </div>
                    <div className="breakdown-value">
                      {formatCarbonAmount(results.breakdown.lifestyle.emissions)}
                      <span className="breakdown-percentage">
                        ({Math.round(results.breakdown.lifestyle.percentage)}%)
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="results-actions">
                  <button className="cta-button secondary" onClick={resetCalculator}>
                    <FontAwesomeIcon icon="redo" /> Recalculate
                  </button>
                  <button className="cta-button primary">
                    <FontAwesomeIcon icon="leaf" /> Offset Your Footprint
                  </button>
                </div>
              </>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="carbon-calculator">
      <div className="calculator-header">
        <h2>Carbon Footprint Calculator</h2>
        <p>
          Calculate your carbon footprint by answering a few questions about your lifestyle.
        </p>
      </div>
      
      {step < 5 && (
        <div className="calculator-progress">
          <div className="progress-steps">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div 
                key={stepNumber}
                className={`progress-step ${step >= stepNumber ? 'active' : ''}`}
              >
                {stepNumber}
              </div>
            ))}
          </div>
          <div className="progress-labels">
            <div className="progress-label">Transportation</div>
            <div className="progress-label">Energy</div>
            <div className="progress-label">Food</div>
            <div className="progress-label">Lifestyle</div>
          </div>
        </div>
      )}
      
      <div className="calculator-form">
        {renderForm()}
      </div>
    </div>
  );
};

export default CarbonFootprintCalculator; 