#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
CarbonSol AI Price Prediction Model

This script implements a simple LSTM-based model for predicting carbon credit prices.
It uses historical price data to forecast future price movements.
"""

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM, Dropout
import json
import os
import argparse
from datetime import datetime, timedelta

# Set random seed for reproducibility
np.random.seed(42)

class CarbonPricePredictor:
    """
    A class for predicting carbon credit prices using LSTM neural networks.
    """
    
    def __init__(self, data_path=None, model_path=None):
        """
        Initialize the predictor with data and model paths.
        
        Args:
            data_path (str): Path to historical price data CSV file
            model_path (str): Path to save/load the trained model
        """
        self.data_path = data_path
        self.model_path = model_path
        self.model = None
        self.scaler = MinMaxScaler(feature_range=(0, 1))
        self.data = None
        self.scaled_data = None
        self.train_data = None
        self.test_data = None
        self.look_back = 60  # Number of previous days to use for prediction
        
    def load_data(self):
        """
        Load and preprocess historical price data.
        """
        if self.data_path and os.path.exists(self.data_path):
            # Load real data if available
            self.data = pd.read_csv(self.data_path)
        else:
            # Generate synthetic data for demonstration
            print("No data file found. Generating synthetic data...")
            days = 1000
            dates = [datetime.now() - timedelta(days=i) for i in range(days)]
            dates.reverse()
            
            # Generate a price series with trend, seasonality, and noise
            trend = np.linspace(5, 15, days)  # Upward trend from $5 to $15
            seasonality = 2 * np.sin(np.linspace(0, 12*np.pi, days))  # Seasonal pattern
            noise = np.random.normal(0, 0.5, days)  # Random noise
            
            prices = trend + seasonality + noise
            
            self.data = pd.DataFrame({
                'Date': dates,
                'Price': prices
            })
            
            # Save synthetic data
            if not os.path.exists('data'):
                os.makedirs('data')
            self.data.to_csv('data/synthetic_carbon_prices.csv', index=False)
            
        # Ensure data is sorted by date
        self.data['Date'] = pd.to_datetime(self.data['Date'])
        self.data = self.data.sort_values('Date')
        
        # Scale the data
        self.scaled_data = self.scaler.fit_transform(self.data['Price'].values.reshape(-1, 1))
        
        # Split into training and testing sets (80% train, 20% test)
        train_size = int(len(self.scaled_data) * 0.8)
        self.train_data = self.scaled_data[:train_size]
        self.test_data = self.scaled_data[train_size - self.look_back:]
        
        print(f"Data loaded: {len(self.data)} records")
        print(f"Training data: {len(self.train_data)} records")
        print(f"Testing data: {len(self.test_data)} records")
        
    def create_dataset(self, data, look_back=60):
        """
        Create a dataset with look_back time steps.
        
        Args:
            data (numpy.array): The scaled price data
            look_back (int): Number of previous time steps to use as input features
            
        Returns:
            tuple: (X, y) where X is the input features and y is the target values
        """
        X, y = [], []
        for i in range(len(data) - look_back):
            X.append(data[i:(i + look_back), 0])
            y.append(data[i + look_back, 0])
        return np.array(X), np.array(y)
    
    def build_model(self):
        """
        Build and compile the LSTM model.
        """
        # Create and compile the LSTM model
        model = Sequential()
        model.add(LSTM(units=50, return_sequences=True, input_shape=(self.look_back, 1)))
        model.add(Dropout(0.2))
        model.add(LSTM(units=50, return_sequences=False))
        model.add(Dropout(0.2))
        model.add(Dense(units=1))
        
        model.compile(optimizer='adam', loss='mean_squared_error')
        self.model = model
        
        print("LSTM model built and compiled")
        
    def train(self, epochs=50, batch_size=32):
        """
        Train the LSTM model.
        
        Args:
            epochs (int): Number of training epochs
            batch_size (int): Batch size for training
        """
        if self.model is None:
            self.build_model()
            
        # Prepare the training data
        X_train, y_train = self.create_dataset(self.train_data, self.look_back)
        X_train = np.reshape(X_train, (X_train.shape[0], X_train.shape[1], 1))
        
        # Train the model
        history = self.model.fit(
            X_train, y_train,
            epochs=epochs,
            batch_size=batch_size,
            validation_split=0.1,
            verbose=1
        )
        
        # Save the model
        if self.model_path:
            model_dir = os.path.dirname(self.model_path)
            if not os.path.exists(model_dir):
                os.makedirs(model_dir)
            self.model.save(self.model_path)
            print(f"Model saved to {self.model_path}")
            
        return history
    
    def evaluate(self):
        """
        Evaluate the model on the test data.
        
        Returns:
            dict: Evaluation metrics
        """
        # Prepare the test data
        X_test, y_test = self.create_dataset(self.test_data, self.look_back)
        X_test = np.reshape(X_test, (X_test.shape[0], X_test.shape[1], 1))
        
        # Make predictions
        predictions = self.model.predict(X_test)
        
        # Inverse transform the predictions and actual values
        predictions = self.scaler.inverse_transform(predictions)
        y_test_actual = self.scaler.inverse_transform(y_test.reshape(-1, 1))
        
        # Calculate metrics
        mse = mean_squared_error(y_test_actual, predictions)
        rmse = np.sqrt(mse)
        mae = mean_absolute_error(y_test_actual, predictions)
        
        metrics = {
            'MSE': float(mse),
            'RMSE': float(rmse),
            'MAE': float(mae)
        }
        
        print(f"Model Evaluation Metrics:")
        print(f"MSE: {mse:.4f}")
        print(f"RMSE: {rmse:.4f}")
        print(f"MAE: {mae:.4f}")
        
        return metrics
    
    def predict_future(self, days=30):
        """
        Predict future prices for the specified number of days.
        
        Args:
            days (int): Number of days to predict into the future
            
        Returns:
            dict: Predicted prices with dates
        """
        # Get the last sequence of known prices
        last_sequence = self.scaled_data[-self.look_back:].reshape(1, self.look_back, 1)
        
        # Initialize the list of predictions
        future_predictions = []
        current_sequence = last_sequence[0].tolist()
        
        # Predict prices for the next 'days'
        for _ in range(days):
            # Get the prediction for the next day
            next_pred = self.model.predict(np.array([current_sequence]))
            future_predictions.append(next_pred[0, 0])
            
            # Update the sequence by removing the first value and adding the new prediction
            current_sequence.pop(0)
            current_sequence.append([next_pred[0, 0]])
        
        # Inverse transform the predictions
        future_predictions = self.scaler.inverse_transform(np.array(future_predictions).reshape(-1, 1))
        
        # Generate future dates
        last_date = self.data['Date'].iloc[-1]
        future_dates = [last_date + timedelta(days=i+1) for i in range(days)]
        
        # Create a dictionary of predictions
        predictions = {
            'dates': [d.strftime('%Y-%m-%d') for d in future_dates],
            'prices': future_predictions.flatten().tolist()
        }
        
        return predictions
    
    def plot_predictions(self, future_days=30):
        """
        Plot historical prices and future predictions.
        
        Args:
            future_days (int): Number of days to predict into the future
        """
        # Get future predictions
        future_preds = self.predict_future(days=future_days)
        
        # Plot historical data
        plt.figure(figsize=(12, 6))
        plt.plot(self.data['Date'], self.data['Price'], label='Historical Prices')
        
        # Plot future predictions
        future_dates = [datetime.strptime(d, '%Y-%m-%d') for d in future_preds['dates']]
        plt.plot(future_dates, future_preds['prices'], label='Predicted Prices', color='red')
        
        plt.title('Carbon Credit Price Prediction')
        plt.xlabel('Date')
        plt.ylabel('Price (USD)')
        plt.legend()
        plt.grid(True)
        
        # Save the plot
        plt.savefig('price_prediction.png')
        plt.close()
        
        print("Price prediction plot saved as 'price_prediction.png'")


def main():
    """
    Main function to run the price prediction model.
    """
    parser = argparse.ArgumentParser(description='Carbon Credit Price Prediction')
    parser.add_argument('--data', type=str, help='Path to historical price data CSV')
    parser.add_argument('--model', type=str, default='models/carbon_price_model.h5', 
                        help='Path to save/load the model')
    parser.add_argument('--train', action='store_true', help='Train the model')
    parser.add_argument('--predict', action='store_true', help='Make predictions')
    parser.add_argument('--days', type=int, default=30, help='Number of days to predict')
    parser.add_argument('--epochs', type=int, default=50, help='Number of training epochs')
    
    args = parser.parse_args()
    
    # Initialize the predictor
    predictor = CarbonPricePredictor(data_path=args.data, model_path=args.model)
    
    # Load the data
    predictor.load_data()
    
    if args.train:
        # Build and train the model
        predictor.build_model()
        predictor.train(epochs=args.epochs)
        
        # Evaluate the model
        metrics = predictor.evaluate()
        
        # Save metrics to a JSON file
        with open('models/metrics.json', 'w') as f:
            json.dump(metrics, f, indent=4)
    
    if args.predict:
        # Build the model if not already built
        if predictor.model is None:
            predictor.build_model()
            
            # Load the trained model if it exists
            if os.path.exists(args.model):
                from tensorflow.keras.models import load_model
                predictor.model = load_model(args.model)
                print(f"Loaded model from {args.model}")
            else:
                print("No trained model found. Please train the model first.")
                return
        
        # Make predictions
        predictions = predictor.predict_future(days=args.days)
        
        # Save predictions to a JSON file
        with open('predictions.json', 'w') as f:
            json.dump(predictions, f, indent=4)
        
        # Plot the predictions
        predictor.plot_predictions(future_days=args.days)
        
        print(f"Predictions for the next {args.days} days saved to 'predictions.json'")


if __name__ == "__main__":
    main() 