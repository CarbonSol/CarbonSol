"""
Tests for the API endpoints.
"""

import unittest
import json
from flask import Flask
import sys
import os

# Add parent directory to path to import the API
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from api import app

class TestAPI(unittest.TestCase):
    """Test cases for the API endpoints."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.app = app.test_client()
        self.app.testing = True
        
        # Sample data for price prediction
        self.price_prediction_data = {
            'historical_data': [
                {'date': '2023-01-01', 'price': 10.5, 'volume': 1000},
                {'date': '2023-01-02', 'price': 10.7, 'volume': 1200},
                {'date': '2023-01-03', 'price': 10.8, 'volume': 1100},
                {'date': '2023-01-04', 'price': 10.6, 'volume': 900},
                {'date': '2023-01-05', 'price': 10.9, 'volume': 1300}
            ],
            'days_ahead': 10,
            'credit_type': 'VCU'
        }
        
        # Sample data for carbon footprint calculation
        self.carbon_footprint_data = {
            'electricity_kwh': 300,
            'natural_gas_kwh': 500,
            'car_petrol_km': 1000,
            'flight_short_km': 2000,
            'beef_kg': 5,
            'dairy_kg': 10,
            'vegetables_kg': 20
        }
        
        # Sample data for project analysis
        self.project_data = {
            'project_data': {
                'project_type': 'reforestation',
                'location': {
                    'country': 'Brazil',
                    'region': 'Amazon',
                    'coordinates': {
                        'latitude': -3.4653,
                        'longitude': -62.2159
                    }
                },
                'area_hectares': 1000,
                'tree_species': ['Mahogany', 'Teak', 'Eucalyptus'],
                'planting_density': 1000,
                'estimated_carbon_sequestration': 300,
                'project_duration_years': 30,
                'monitoring_plan': 'Satellite imagery and ground surveys',
                'community_benefits': 'Local employment and sustainable forestry training',
                'biodiversity_impact': 'Habitat restoration for endangered species'
            }
        }
    
    def test_health_check(self):
        """Test the health check endpoint."""
        response = self.app.get('/health')
        data = json.loads(response.data)
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['status'], 'healthy')
        self.assertIn('CarbonSol AI API is running', data['message'])
    
    def test_predict_price(self):
        """Test the price prediction endpoint."""
        response = self.app.post(
            '/predict/price',
            data=json.dumps(self.price_prediction_data),
            content_type='application/json'
        )
        data = json.loads(response.data)
        
        self.assertEqual(response.status_code, 200)
        self.assertIn('prediction', data)
        self.assertEqual(data['credit_type'], 'VCU')
        self.assertEqual(data['days_ahead'], 10)
        self.assertEqual(len(data['prediction']), 10)
    
    def test_predict_price_missing_data(self):
        """Test the price prediction endpoint with missing data."""
        response = self.app.post(
            '/predict/price',
            data=json.dumps({}),
            content_type='application/json'
        )
        data = json.loads(response.data)
        
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', data)
        self.assertIn('Missing required parameter', data['error'])
    
    def test_calculate_footprint(self):
        """Test the carbon footprint calculation endpoint."""
        response = self.app.post(
            '/calculate/footprint',
            data=json.dumps(self.carbon_footprint_data),
            content_type='application/json'
        )
        data = json.loads(response.data)
        
        self.assertEqual(response.status_code, 200)
        self.assertIn('total_emissions', data)
        self.assertIn('breakdown', data)
        self.assertIn('recommendations', data)
    
    def test_calculate_footprint_missing_data(self):
        """Test the carbon footprint calculation endpoint with missing data."""
        response = self.app.post(
            '/calculate/footprint',
            data=json.dumps({}),
            content_type='application/json'
        )
        data = json.loads(response.data)
        
        # Should still return a result with zero emissions
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['total_emissions'], 0)
    
    def test_analyze_project(self):
        """Test the project analysis endpoint."""
        response = self.app.post(
            '/analyze/project',
            data=json.dumps(self.project_data),
            content_type='application/json'
        )
        data = json.loads(response.data)
        
        self.assertEqual(response.status_code, 200)
        self.assertIn('project_score', data)
        self.assertIn('risk_assessment', data)
        self.assertIn('verification_status', data)
        self.assertIn('estimated_credits', data)
        self.assertIn('recommendations', data)
    
    def test_analyze_project_missing_data(self):
        """Test the project analysis endpoint with missing data."""
        response = self.app.post(
            '/analyze/project',
            data=json.dumps({}),
            content_type='application/json'
        )
        data = json.loads(response.data)
        
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', data)
        self.assertIn('Missing required parameter', data['error'])

if __name__ == '__main__':
    unittest.main() 