"""
Tests for the carbon footprint calculator.
"""

import unittest
import json

# Import the model to test
from carbon_footprint import CarbonFootprintCalculator

class TestCarbonFootprintCalculator(unittest.TestCase):
    """Test cases for the CarbonFootprintCalculator class."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.calculator = CarbonFootprintCalculator()
        
        # Sample data for an individual
        self.individual_data = {
            'electricity_kwh': 300,
            'natural_gas_kwh': 500,
            'car_petrol_km': 1000,
            'flight_short_km': 2000,
            'beef_kg': 5,
            'dairy_kg': 10,
            'vegetables_kg': 20
        }
        
        # Sample data for a business
        self.business_data = {
            'electricity_kwh': 10000,
            'natural_gas_kwh': 5000,
            'company_vehicles_km': 20000,
            'employee_commute_km': 50000,
            'business_travel_km': 100000,
            'paper_kg': 500,
            'waste_kg': 1000
        }
    
    def test_initialization(self):
        """Test that the calculator initializes correctly."""
        self.assertIsNotNone(self.calculator)
        self.assertIsNotNone(self.calculator.EMISSION_FACTORS)
    
    def test_individual_calculation(self):
        """Test carbon footprint calculation for an individual."""
        result = self.calculator.calculate(self.individual_data)
        
        # Check that the result has the expected structure
        self.assertIn('total_emissions', result)
        self.assertIn('breakdown', result)
        self.assertIn('recommendations', result)
        
        # Check that the total emissions is a positive number
        self.assertGreater(result['total_emissions'], 0)
        
        # Check that the breakdown includes all categories
        self.assertIn('energy', result['breakdown'])
        self.assertIn('transportation', result['breakdown'])
        self.assertIn('food', result['breakdown'])
    
    def test_business_calculation(self):
        """Test carbon footprint calculation for a business."""
        result = self.calculator.calculate(self.business_data)
        
        # Check that the result has the expected structure
        self.assertIn('total_emissions', result)
        self.assertIn('breakdown', result)
        self.assertIn('recommendations', result)
        
        # Check that the total emissions is a positive number
        self.assertGreater(result['total_emissions'], 0)
        
        # Check that the breakdown includes all categories
        self.assertIn('energy', result['breakdown'])
        self.assertIn('transportation', result['breakdown'])
        self.assertIn('waste', result['breakdown'])
    
    def test_empty_data(self):
        """Test calculation with empty data."""
        result = self.calculator.calculate({})
        
        # Should return zero emissions but still have the structure
        self.assertEqual(result['total_emissions'], 0)
        self.assertIn('breakdown', result)
        self.assertIn('recommendations', result)
    
    def test_recommendations(self):
        """Test that recommendations are generated."""
        result = self.calculator.calculate(self.individual_data)
        
        # Should have at least one recommendation
        self.assertGreater(len(result['recommendations']), 0)
        
        # Each recommendation should have a description and potential savings
        for rec in result['recommendations']:
            self.assertIn('description', rec)
            self.assertIn('potential_savings', rec)

if __name__ == '__main__':
    unittest.main() 