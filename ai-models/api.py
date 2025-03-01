#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
CarbonSol AI API

This script provides a simple API to interact with the AI models for the CarbonSol platform.
It allows the frontend to request price predictions and other AI-powered features.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from price_prediction import CarbonPricePredictor
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("api.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Model paths
MODEL_DIR = 'models'
PRICE_MODEL_PATH = os.path.join(MODEL_DIR, 'carbon_price_model.h5')

# Ensure model directory exists
os.makedirs(MODEL_DIR, exist_ok=True)

# Initialize price predictor
price_predictor = None

def load_price_predictor():
    """
    Load the price prediction model.
    """
    global price_predictor
    
    try:
        price_predictor = CarbonPricePredictor(model_path=PRICE_MODEL_PATH)
        price_predictor.load_data()
        
        # Check if model exists, if not, train a new one
        if not os.path.exists(PRICE_MODEL_PATH):
            logger.info("No price prediction model found. Training a new model...")
            price_predictor.build_model()
            price_predictor.train(epochs=20)  # Reduced epochs for faster startup
            metrics = price_predictor.evaluate()
            logger.info(f"Model trained with metrics: {metrics}")
        else:
            # Load existing model
            from tensorflow.keras.models import load_model
            price_predictor.build_model()
            price_predictor.model = load_model(PRICE_MODEL_PATH)
            logger.info(f"Loaded price prediction model from {PRICE_MODEL_PATH}")
            
        return True
    except Exception as e:
        logger.error(f"Error loading price predictor: {str(e)}")
        return False

@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Health check endpoint.
    """
    return jsonify({
        'status': 'ok',
        'message': 'CarbonSol AI API is running'
    })

@app.route('/api/predict/price', methods=['GET'])
def predict_price():
    """
    Predict carbon credit prices.
    
    Query parameters:
    - days: Number of days to predict (default: 30)
    - token: Token type to predict (default: 'CST')
    """
    try:
        # Get query parameters
        days = int(request.args.get('days', 30))
        token = request.args.get('token', 'CST')
        
        # Validate parameters
        if days <= 0 or days > 365:
            return jsonify({
                'status': 'error',
                'message': 'Days parameter must be between 1 and 365'
            }), 400
            
        if token not in ['CST', 'VCU']:
            return jsonify({
                'status': 'error',
                'message': 'Token parameter must be either CST or VCU'
            }), 400
        
        # Ensure price predictor is loaded
        if price_predictor is None:
            success = load_price_predictor()
            if not success:
                return jsonify({
                    'status': 'error',
                    'message': 'Failed to load price prediction model'
                }), 500
        
        # Get predictions
        predictions = price_predictor.predict_future(days=days)
        
        # Add token information
        predictions['token'] = token
        
        return jsonify({
            'status': 'success',
            'data': predictions
        })
        
    except Exception as e:
        logger.error(f"Error in price prediction: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/api/analyze/project', methods=['POST'])
def analyze_project():
    """
    Analyze a carbon project using AI.
    
    Expected JSON payload:
    {
        "project_type": "forestry",
        "location": "BR",
        "area_hectares": 1000,
        "start_date": "2023-01-01",
        "end_date": "2033-01-01"
    }
    """
    try:
        # Get request data
        data = request.json
        
        if not data:
            return jsonify({
                'status': 'error',
                'message': 'No data provided'
            }), 400
        
        # Validate required fields
        required_fields = ['project_type', 'location', 'area_hectares', 'start_date', 'end_date']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'status': 'error',
                    'message': f'Missing required field: {field}'
                }), 400
        
        # In a real implementation, we would use an AI model to analyze the project
        # For now, we'll return a mock analysis based on the project type and area
        
        project_type = data['project_type']
        area_hectares = float(data['area_hectares'])
        
        # Mock carbon capture rates by project type (tons CO2 per hectare per year)
        capture_rates = {
            'forestry': 7.5,
            'mangrove': 12.3,
            'grassland': 3.2,
            'soil': 2.1,
            'renewable_energy': 0  # Calculated differently
        }
        
        # Default to forestry if project type not recognized
        capture_rate = capture_rates.get(project_type, capture_rates['forestry'])
        
        # Calculate total carbon capture potential
        years = 10  # Assume 10-year project
        total_capture = area_hectares * capture_rate * years
        
        # Calculate estimated VCU tokens
        vcu_tokens = int(total_capture)
        
        # Calculate confidence score (mock)
        confidence_score = min(0.95, 0.7 + (area_hectares / 10000))
        
        # Generate analysis result
        analysis = {
            'project_type': project_type,
            'location': data['location'],
            'area_hectares': area_hectares,
            'carbon_capture_rate': capture_rate,
            'total_carbon_capture': total_capture,
            'estimated_vcu_tokens': vcu_tokens,
            'confidence_score': confidence_score,
            'recommendations': [
                'Implement regular monitoring using satellite imagery',
                'Document baseline carbon stocks before project start',
                'Consider biodiversity co-benefits for higher valuation'
            ]
        }
        
        return jsonify({
            'status': 'success',
            'data': analysis
        })
        
    except Exception as e:
        logger.error(f"Error in project analysis: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/api/calculate/footprint', methods=['POST'])
def calculate_footprint():
    """
    Calculate carbon footprint using AI.
    
    Expected JSON payload:
    {
        "energy_kwh": 1000,
        "transportation_km": 5000,
        "flights": [
            {"from": "SFO", "to": "JFK", "round_trip": true}
        ],
        "diet_type": "omnivore",
        "country": "US"
    }
    """
    try:
        # Get request data
        data = request.json
        
        if not data:
            return jsonify({
                'status': 'error',
                'message': 'No data provided'
            }), 400
        
        # In a real implementation, we would use an AI model to calculate the footprint
        # For now, we'll return a mock calculation
        
        # Mock emission factors
        emission_factors = {
            'energy_kwh': 0.5,  # kg CO2 per kWh
            'transportation_km': 0.12,  # kg CO2 per km
            'flight_short': 150,  # kg CO2 per short flight
            'flight_medium': 400,  # kg CO2 per medium flight
            'flight_long': 1800,  # kg CO2 per long flight
            'diet_multipliers': {
                'vegan': 0.5,
                'vegetarian': 0.7,
                'pescatarian': 0.8,
                'omnivore': 1.0,
                'high_meat': 1.2
            }
        }
        
        # Calculate energy emissions
        energy_kwh = float(data.get('energy_kwh', 0))
        energy_emissions = energy_kwh * emission_factors['energy_kwh']
        
        # Calculate transportation emissions
        transportation_km = float(data.get('transportation_km', 0))
        transportation_emissions = transportation_km * emission_factors['transportation_km']
        
        # Calculate flight emissions
        flight_emissions = 0
        flights = data.get('flights', [])
        for flight in flights:
            # In a real implementation, we would calculate the distance between airports
            # For now, we'll use a simple approximation
            if 'from' in flight and 'to' in flight:
                # Mock flight distance calculation
                from_code = flight['from']
                to_code = flight['to']
                
                # Determine flight length (short, medium, long)
                if from_code[0] == to_code[0]:  # Same continent
                    flight_type = 'flight_short'
                else:
                    flight_type = 'flight_long'
                
                # Calculate emissions
                flight_emission = emission_factors[flight_type]
                
                # Double for round trip
                if flight.get('round_trip', False):
                    flight_emission *= 2
                    
                flight_emissions += flight_emission
        
        # Apply diet multiplier
        diet_type = data.get('diet_type', 'omnivore')
        diet_multiplier = emission_factors['diet_multipliers'].get(diet_type, 1.0)
        
        # Calculate total emissions
        total_emissions = (energy_emissions + transportation_emissions + flight_emissions) * diet_multiplier
        
        # Convert to tons
        total_emissions_tons = total_emissions / 1000
        
        # Generate footprint result
        footprint = {
            'total_emissions_kg': total_emissions,
            'total_emissions_tons': total_emissions_tons,
            'breakdown': {
                'energy': energy_emissions,
                'transportation': transportation_emissions,
                'flights': flight_emissions
            },
            'offset_recommendation': {
                'vcu_tokens_needed': round(total_emissions_tons),
                'estimated_cost_usd': round(total_emissions_tons * 15, 2)  # Assume $15 per VCU
            }
        }
        
        return jsonify({
            'status': 'success',
            'data': footprint
        })
        
    except Exception as e:
        logger.error(f"Error in footprint calculation: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    # Load price predictor on startup
    load_price_predictor()
    
    # Run the Flask app
    app.run(host='0.0.0.0', port=5000, debug=True) 