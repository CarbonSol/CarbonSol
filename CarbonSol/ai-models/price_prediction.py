"""
Price Prediction Model for Carbon Credits

This module provides functionality to predict carbon credit prices
using machine learning models based on historical data and market trends.
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from datetime import datetime, timedelta

class PricePredictor:
    """
    A class for predicting carbon credit prices using machine learning.
    """
    
    def __init__(self, model_path=None):
        """
        Initialize the price predictor.
        
        Args:
            model_path (str, optional): Path to a pre-trained model file.
        """
        self.model = None
        self.scaler = StandardScaler()
        
        if model_path:
            self._load_model(model_path)
        else:
            self.model = RandomForestRegressor(
                n_estimators=100,
                max_depth=10,
                random_state=42
            )
    
    def _load_model(self, model_path):
        """
        Load a pre-trained model from a file.
        
        Args:
            model_path (str): Path to the model file.
        """
        try:
            import joblib
            self.model = joblib.load(model_path)
            print(f"Model loaded from {model_path}")
        except Exception as e:
            print(f"Error loading model: {e}")
            self.model = RandomForestRegressor(
                n_estimators=100,
                max_depth=10,
                random_state=42
            )
    
    def _prepare_features(self, historical_data):
        """
        Prepare features for the prediction model.
        
        Args:
            historical_data (pd.DataFrame): Historical price data.
            
        Returns:
            np.ndarray: Prepared feature matrix.
        """
        # Extract features from historical data
        features = []
        
        # Price-based features
        features.append(historical_data['price'].values)
        features.append(historical_data['price'].rolling(7).mean().values)
        features.append(historical_data['price'].rolling(30).mean().values)
        features.append(historical_data['price'].rolling(7).std().values)
        
        # Volume-based features
        if 'volume' in historical_data.columns:
            features.append(historical_data['volume'].values)
            features.append(historical_data['volume'].rolling(7).mean().values)
        
        # Market sentiment features
        if 'sentiment' in historical_data.columns:
            features.append(historical_data['sentiment'].values)
        
        # Combine features and handle NaN values
        feature_matrix = np.column_stack(features)
        feature_matrix = np.nan_to_num(feature_matrix)
        
        # Scale features
        feature_matrix = self.scaler.fit_transform(feature_matrix)
        
        return feature_matrix
    
    def train(self, historical_data):
        """
        Train the price prediction model.
        
        Args:
            historical_data (pd.DataFrame): Historical price data with columns:
                - date: Date of the price data
                - price: Price value
                - volume (optional): Trading volume
                - sentiment (optional): Market sentiment score
                
        Returns:
            bool: True if training was successful, False otherwise.
        """
        try:
            # Prepare features and target
            X = self._prepare_features(historical_data)
            y = historical_data['price'].shift(-1).values[:-1]  # Predict next day's price
            X = X[:-1]  # Remove last row as we don't have target for it
            
            # Remove NaN values
            mask = ~np.isnan(y)
            X = X[mask]
            y = y[mask]
            
            # Train the model
            self.model.fit(X, y)
            return True
        except Exception as e:
            print(f"Error training model: {e}")
            return False
    
    def predict(self, historical_data, days_ahead=30):
        """
        Predict future carbon credit prices.
        
        Args:
            historical_data (pd.DataFrame): Historical price data.
            days_ahead (int): Number of days to predict ahead.
            
        Returns:
            pd.DataFrame: DataFrame with dates and predicted prices.
        """
        if self.model is None:
            raise ValueError("Model not trained. Call train() first.")
        
        # Make a copy of the data to avoid modifying the original
        data = historical_data.copy()
        
        # Prepare initial features
        X = self._prepare_features(data)
        
        # Get the last date in the historical data
        last_date = data['date'].iloc[-1]
        
        # Initialize results
        future_dates = [last_date + timedelta(days=i+1) for i in range(days_ahead)]
        predictions = []
        
        # Predict each day iteratively
        for _ in range(days_ahead):
            # Predict the next day's price
            next_price = self.model.predict([X[-1]])[0]
            predictions.append(next_price)
            
            # Update the data with the prediction
            new_row = pd.DataFrame({
                'date': [future_dates[_]],
                'price': [next_price],
                'volume': [data['volume'].mean()] if 'volume' in data.columns else [0],
                'sentiment': [data['sentiment'].mean()] if 'sentiment' in data.columns else [0]
            })
            
            data = pd.concat([data, new_row], ignore_index=True)
            
            # Update features
            X = self._prepare_features(data)
        
        # Create result DataFrame
        result = pd.DataFrame({
            'date': future_dates,
            'predicted_price': predictions
        })
        
        return result
    
    def evaluate(self, test_data):
        """
        Evaluate the model on test data.
        
        Args:
            test_data (pd.DataFrame): Test data with actual prices.
            
        Returns:
            dict: Evaluation metrics.
        """
        if self.model is None:
            raise ValueError("Model not trained. Call train() first.")
        
        # Prepare features
        X = self._prepare_features(test_data)
        y_true = test_data['price'].values
        
        # Make predictions
        y_pred = self.model.predict(X)
        
        # Calculate metrics
        mse = np.mean((y_pred - y_true) ** 2)
        mae = np.mean(np.abs(y_pred - y_true))
        mape = np.mean(np.abs((y_true - y_pred) / y_true)) * 100
        
        return {
            'mse': mse,
            'mae': mae,
            'mape': mape
        }
    
    def save_model(self, model_path):
        """
        Save the trained model to a file.
        
        Args:
            model_path (str): Path to save the model.
            
        Returns:
            bool: True if saving was successful, False otherwise.
        """
        if self.model is None:
            raise ValueError("Model not trained. Call train() first.")
        
        try:
            import joblib
            joblib.dump(self.model, model_path)
            print(f"Model saved to {model_path}")
            return True
        except Exception as e:
            print(f"Error saving model: {e}")
            return False 