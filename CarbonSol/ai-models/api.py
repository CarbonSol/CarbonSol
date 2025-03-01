#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
CarbonSol AI API

This script provides a simple API to interact with the AI models for the CarbonSol platform.
It allows the frontend to request price predictions, carbon footprint calculations, and project analysis.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import logging
from price_prediction import PricePredictor
from carbon_footprint import CarbonFootprintCalculator
from project_analyzer import ProjectAnalyzer

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

# Initialize AI models
price_predictor = PricePredictor()
carbon_calculator = CarbonFootprintCalculator()
project_analyzer = ProjectAnalyzer()

@app.route('/health', methods=['GET'])
def health_check():
    """Simple health check endpoint"""
    return jsonify({"status": "healthy", "message": "CarbonSol AI API is running"}), 200

@app.route('/predict/price', methods=['POST'])
def predict_price():
    """Endpoint for carbon credit price prediction"""
    try:
        data = request.json
        if not data or 'historical_data' not in data:
            return jsonify({"error": "Missing required parameter: historical_data"}), 400
        
        # Optional parameters
        days_ahead = data.get('days_ahead', 30)
        credit_type = data.get('credit_type', 'VCU')
        
        # Get prediction
        prediction = price_predictor.predict(
            historical_data=data['historical_data'],
            days_ahead=days_ahead,
            credit_type=credit_type
        )
        
        return jsonify({
            "prediction": prediction,
            "credit_type": credit_type,
            "days_ahead": days_ahead
        }), 200
    
    except Exception as e:
        logger.error(f"Error in price prediction: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/calculate/footprint', methods=['POST'])
def calculate_footprint():
    """Endpoint for carbon footprint calculation"""
    try:
        data = request.json
        if not data:
            return jsonify({"error": "Missing request data"}), 400
        
        # Get calculation
        result = carbon_calculator.calculate(data)
        
        return jsonify(result), 200
    
    except Exception as e:
        logger.error(f"Error in footprint calculation: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/analyze/project', methods=['POST'])
def analyze_project():
    """Endpoint for carbon project analysis"""
    try:
        data = request.json
        if not data or 'project_data' not in data:
            return jsonify({"error": "Missing required parameter: project_data"}), 400
        
        # Get analysis
        analysis = project_analyzer.analyze(data['project_data'])
        
        return jsonify(analysis), 200
    
    except Exception as e:
        logger.error(f"Error in project analysis: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False) 