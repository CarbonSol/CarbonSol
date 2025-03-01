"""
Tests for the price prediction model.
"""

import unittest
import numpy as np
import pandas as pd
from datetime import datetime, timedelta

# Import the model to test
from price_prediction import PricePredictor

class TestPricePredictor(unittest.TestCase):
    """Test cases for the PricePredictor class."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.predictor = PricePredictor()
        
        # Create sample historical data for testing
        dates = [datetime.now() - timedelta(days=i) for i in range(100, 0, -1)]
        prices = [10 + i * 0.1 + np.sin(i/10) for i in range(100)]
        volumes = [1000 + i * 10 for i in range(100)]
        
        self.sample_data = pd.DataFrame({
            'date': dates,
            'price': prices,
            'volume': volumes
        })
    
    def test_initialization(self):
        """Test that the model initializes correctly."""
        self.assertIsNotNone(self.predictor)
        self.assertIsNotNone(self.predictor.model)
    
    def test_prediction_shape(self):
        """Test that predictions have the expected shape."""
        days_ahead = 30
        predictions = self.predictor.predict(
            historical_data=self.sample_data,
            days_ahead=days_ahead
        )
        
        self.assertEqual(len(predictions), days_ahead)
    
    def test_prediction_values(self):
        """Test that predictions have reasonable values."""
        predictions = self.predictor.predict(
            historical_data=self.sample_data,
            days_ahead=10
        )
        
        # Check that predictions are within a reasonable range
        # based on the historical data
        historical_mean = self.sample_data['price'].mean()
        historical_std = self.sample_data['price'].std()
        
        for pred in predictions:
            self.assertTrue(
                historical_mean - 3 * historical_std <= pred <= historical_mean + 3 * historical_std,
                f"Prediction {pred} is outside the expected range"
            )
    
    def test_different_credit_types(self):
        """Test predictions for different credit types."""
        vcu_predictions = self.predictor.predict(
            historical_data=self.sample_data,
            days_ahead=10,
            credit_type='VCU'
        )
        
        cst_predictions = self.predictor.predict(
            historical_data=self.sample_data,
            days_ahead=10,
            credit_type='CST'
        )
        
        # Different credit types should yield different predictions
        self.assertNotEqual(vcu_predictions, cst_predictions)

if __name__ == '__main__':
    unittest.main() 