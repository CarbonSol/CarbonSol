"""
Project Analyzer for Carbon Reduction Projects

This module provides functionality to analyze and evaluate carbon reduction
projects using machine learning models.
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier, GradientBoostingRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

class ProjectAnalyzer:
    """
    A class for analyzing and evaluating carbon reduction projects.
    """
    
    # Project type categories
    PROJECT_TYPES = {
        'renewable_energy': ['solar', 'wind', 'hydro', 'geothermal', 'biomass'],
        'energy_efficiency': ['industrial', 'buildings', 'transportation'],
        'forestry': ['afforestation', 'reforestation', 'avoided_deforestation'],
        'agriculture': ['soil_carbon', 'methane_reduction', 'fertilizer_management'],
        'waste_management': ['landfill_gas', 'waste_to_energy', 'composting'],
        'transportation': ['electric_vehicles', 'public_transit', 'fuel_efficiency'],
        'industrial': ['process_improvements', 'fuel_switching', 'carbon_capture']
    }
    
    # Risk factors and their weights
    RISK_FACTORS = {
        'permanence': 0.25,        # Risk of reversal of carbon benefits
        'leakage': 0.20,           # Risk of emissions moving elsewhere
        'additionality': 0.25,     # Whether project would have happened anyway
        'measurement': 0.15,       # Accuracy of measurement methods
        'social_impact': 0.15      # Potential negative social consequences
    }
    
    def __init__(self, model_path=None):
        """
        Initialize the project analyzer.
        
        Args:
            model_path (str, optional): Path to pre-trained models.
        """
        self.classification_model = None
        self.regression_model = None
        self.scaler = StandardScaler()
        
        if model_path:
            self._load_models(model_path)
        else:
            self.classification_model = RandomForestClassifier(
                n_estimators=100,
                max_depth=10,
                random_state=42
            )
            self.regression_model = GradientBoostingRegressor(
                n_estimators=100,
                max_depth=5,
                learning_rate=0.1,
                random_state=42
            )
    
    def _load_models(self, model_path):
        """
        Load pre-trained models from files.
        
        Args:
            model_path (str): Path to the model files.
        """
        try:
            import joblib
            self.classification_model = joblib.load(f"{model_path}/classification_model.pkl")
            self.regression_model = joblib.load(f"{model_path}/regression_model.pkl")
            print(f"Models loaded from {model_path}")
        except Exception as e:
            print(f"Error loading models: {e}")
            self.classification_model = RandomForestClassifier(
                n_estimators=100,
                max_depth=10,
                random_state=42
            )
            self.regression_model = GradientBoostingRegressor(
                n_estimators=100,
                max_depth=5,
                learning_rate=0.1,
                random_state=42
            )
    
    def _prepare_features(self, project_data):
        """
        Prepare features for the models.
        
        Args:
            project_data (pd.DataFrame): Project data.
            
        Returns:
            np.ndarray: Prepared feature matrix.
        """
        # Extract numerical features
        numerical_features = []
        
        # Project size and duration
        if 'size_hectares' in project_data.columns:
            numerical_features.append(project_data['size_hectares'].values)
        if 'duration_years' in project_data.columns:
            numerical_features.append(project_data['duration_years'].values)
        
        # Financial metrics
        if 'cost_per_ton' in project_data.columns:
            numerical_features.append(project_data['cost_per_ton'].values)
        if 'total_investment' in project_data.columns:
            numerical_features.append(project_data['total_investment'].values)
        if 'expected_roi' in project_data.columns:
            numerical_features.append(project_data['expected_roi'].values)
        
        # Environmental metrics
        if 'annual_reduction_tons' in project_data.columns:
            numerical_features.append(project_data['annual_reduction_tons'].values)
        if 'total_reduction_tons' in project_data.columns:
            numerical_features.append(project_data['total_reduction_tons'].values)
        if 'biodiversity_score' in project_data.columns:
            numerical_features.append(project_data['biodiversity_score'].values)
        
        # Social metrics
        if 'community_benefit_score' in project_data.columns:
            numerical_features.append(project_data['community_benefit_score'].values)
        if 'jobs_created' in project_data.columns:
            numerical_features.append(project_data['jobs_created'].values)
        
        # Risk metrics
        for risk_factor in self.RISK_FACTORS.keys():
            if risk_factor in project_data.columns:
                numerical_features.append(project_data[risk_factor].values)
        
        # One-hot encode categorical features
        categorical_features = []
        
        # Project type
        if 'project_type' in project_data.columns:
            for project_category, project_types in self.PROJECT_TYPES.items():
                for project_type in project_types:
                    categorical_features.append(
                        (project_data['project_type'] == project_type).astype(int).values
                    )
        
        # Location features
        if 'region' in project_data.columns:
            regions = project_data['region'].unique()
            for region in regions:
                categorical_features.append(
                    (project_data['region'] == region).astype(int).values
                )
        
        # Verification standard
        if 'verification_standard' in project_data.columns:
            standards = project_data['verification_standard'].unique()
            for standard in standards:
                categorical_features.append(
                    (project_data['verification_standard'] == standard).astype(int).values
                )
        
        # Combine all features
        all_features = numerical_features + categorical_features
        
        if not all_features:
            raise ValueError("No valid features found in project data")
        
        # Convert to numpy array
        feature_matrix = np.column_stack(all_features)
        
        # Scale numerical features
        feature_matrix = self.scaler.fit_transform(feature_matrix)
        
        return feature_matrix
    
    def train(self, training_data):
        """
        Train the project analysis models.
        
        Args:
            training_data (pd.DataFrame): Training data with project features and outcomes.
                Must include 'success' column (1 for success, 0 for failure) and
                'actual_reduction_tons' column for regression.
                
        Returns:
            dict: Training results with model performance metrics.
        """
        try:
            # Prepare features
            X = self._prepare_features(training_data)
            
            # Classification target (success/failure)
            if 'success' not in training_data.columns:
                raise ValueError("Training data must include 'success' column")
            y_class = training_data['success'].values
            
            # Regression target (actual carbon reduction)
            if 'actual_reduction_tons' not in training_data.columns:
                raise ValueError("Training data must include 'actual_reduction_tons' column")
            y_reg = training_data['actual_reduction_tons'].values
            
            # Split data
            X_train, X_test, y_class_train, y_class_test, y_reg_train, y_reg_test = train_test_split(
                X, y_class, y_reg, test_size=0.2, random_state=42
            )
            
            # Train classification model
            self.classification_model.fit(X_train, y_class_train)
            class_accuracy = self.classification_model.score(X_test, y_class_test)
            
            # Train regression model
            self.regression_model.fit(X_train, y_reg_train)
            reg_predictions = self.regression_model.predict(X_test)
            reg_mse = np.mean((reg_predictions - y_reg_test) ** 2)
            reg_mae = np.mean(np.abs(reg_predictions - y_reg_test))
            
            return {
                'classification_accuracy': class_accuracy,
                'regression_mse': reg_mse,
                'regression_mae': reg_mae
            }
            
        except Exception as e:
            print(f"Error training models: {e}")
            return {
                'error': str(e),
                'classification_accuracy': 0,
                'regression_mse': float('inf'),
                'regression_mae': float('inf')
            }
    
    def analyze_project(self, project_data):
        """
        Analyze a carbon reduction project.
        
        Args:
            project_data (pd.DataFrame): Project data with features.
            
        Returns:
            dict: Analysis results including success probability and expected carbon reduction.
        """
        if self.classification_model is None or self.regression_model is None:
            raise ValueError("Models not trained. Call train() first.")
        
        try:
            # Prepare features
            X = self._prepare_features(project_data)
            
            # Predict success probability
            success_prob = self.classification_model.predict_proba(X)[:, 1]
            
            # Predict carbon reduction
            expected_reduction = self.regression_model.predict(X)
            
            # Calculate risk score
            risk_scores = {}
            for risk_factor, weight in self.RISK_FACTORS.items():
                if risk_factor in project_data.columns:
                    risk_scores[risk_factor] = project_data[risk_factor].values[0] * weight
                else:
                    risk_scores[risk_factor] = 0.5 * weight  # Default to medium risk
            
            total_risk_score = sum(risk_scores.values())
            
            # Calculate adjusted carbon reduction based on risk
            risk_adjustment_factor = 1 - (total_risk_score / 2)  # Higher risk means lower adjustment
            adjusted_reduction = expected_reduction * risk_adjustment_factor
            
            # Calculate cost-effectiveness
            cost_per_ton = project_data['cost_per_ton'].values[0] if 'cost_per_ton' in project_data.columns else None
            if cost_per_ton is not None:
                cost_effectiveness = 1 / cost_per_ton  # Higher value means more cost-effective
            else:
                cost_effectiveness = None
            
            return {
                'success_probability': success_prob[0],
                'expected_reduction_tons': expected_reduction[0],
                'adjusted_reduction_tons': adjusted_reduction[0],
                'risk_score': total_risk_score,
                'risk_breakdown': risk_scores,
                'cost_effectiveness': cost_effectiveness
            }
            
        except Exception as e:
            print(f"Error analyzing project: {e}")
            return {
                'error': str(e),
                'success_probability': None,
                'expected_reduction_tons': None
            }
    
    def compare_projects(self, projects_data):
        """
        Compare multiple carbon reduction projects.
        
        Args:
            projects_data (pd.DataFrame): Data for multiple projects with features.
            
        Returns:
            pd.DataFrame: Comparison results for all projects.
        """
        if self.classification_model is None or self.regression_model is None:
            raise ValueError("Models not trained. Call train() first.")
        
        try:
            results = []
            
            for i, project in projects_data.iterrows():
                # Create a DataFrame for the single project
                project_df = pd.DataFrame([project])
                
                # Analyze the project
                analysis = self.analyze_project(project_df)
                
                # Add project identifier
                if 'project_id' in project:
                    analysis['project_id'] = project['project_id']
                else:
                    analysis['project_id'] = f"Project_{i}"
                
                if 'project_name' in project:
                    analysis['project_name'] = project['project_name']
                
                if 'project_type' in project:
                    analysis['project_type'] = project['project_type']
                
                results.append(analysis)
            
            # Convert to DataFrame
            results_df = pd.DataFrame(results)
            
            # Sort by adjusted reduction (most effective first)
            if 'adjusted_reduction_tons' in results_df.columns:
                results_df = results_df.sort_values('adjusted_reduction_tons', ascending=False)
            
            return results_df
            
        except Exception as e:
            print(f"Error comparing projects: {e}")
            return pd.DataFrame({
                'error': [str(e)]
            })
    
    def get_improvement_recommendations(self, project_data):
        """
        Get recommendations for improving a carbon reduction project.
        
        Args:
            project_data (pd.DataFrame): Project data with features.
            
        Returns:
            dict: Recommendations for project improvement.
        """
        try:
            # Analyze the project first
            analysis = self.analyze_project(project_data)
            
            # Identify the highest risk factors
            risk_breakdown = analysis['risk_breakdown']
            sorted_risks = sorted(risk_breakdown.items(), key=lambda x: x[1], reverse=True)
            top_risks = sorted_risks[:2]  # Top 2 risk factors
            
            # Generate recommendations based on risk factors
            recommendations = []
            
            for risk_factor, risk_score in top_risks:
                if risk_factor == 'permanence':
                    recommendations.append(
                        "Improve permanence by implementing longer-term monitoring and verification systems."
                    )
                    recommendations.append(
                        "Consider buffer pools or insurance mechanisms to address reversal risks."
                    )
                
                elif risk_factor == 'leakage':
                    recommendations.append(
                        "Expand project boundaries to capture potential leakage sources."
                    )
                    recommendations.append(
                        "Implement monitoring systems for activities outside the project area."
                    )
                
                elif risk_factor == 'additionality':
                    recommendations.append(
                        "Strengthen the additionality case with better financial analysis."
                    )
                    recommendations.append(
                        "Document barriers to implementation more thoroughly."
                    )
                
                elif risk_factor == 'measurement':
                    recommendations.append(
                        "Adopt more rigorous measurement methodologies with lower uncertainty."
                    )
                    recommendations.append(
                        "Increase sampling frequency and density for more accurate measurements."
                    )
                
                elif risk_factor == 'social_impact':
                    recommendations.append(
                        "Enhance community engagement and benefit-sharing mechanisms."
                    )
                    recommendations.append(
                        "Implement a grievance mechanism and regular stakeholder consultations."
                    )
            
            # Cost-effectiveness recommendations
            if 'cost_per_ton' in project_data.columns:
                cost_per_ton = project_data['cost_per_ton'].values[0]
                if cost_per_ton > 15:  # Arbitrary threshold for high cost
                    recommendations.append(
                        "Explore ways to reduce implementation costs or increase efficiency."
                    )
                    recommendations.append(
                        "Consider scaling up the project to achieve economies of scale."
                    )
            
            # Project type specific recommendations
            if 'project_type' in project_data.columns:
                project_type = project_data['project_type'].values[0]
                
                if project_type in self.PROJECT_TYPES['renewable_energy']:
                    recommendations.append(
                        "Consider hybrid systems to improve reliability and efficiency."
                    )
                
                elif project_type in self.PROJECT_TYPES['forestry']:
                    recommendations.append(
                        "Diversify tree species to improve resilience to disease and climate change."
                    )
                    recommendations.append(
                        "Integrate agroforestry components to provide additional income streams."
                    )
                
                elif project_type in self.PROJECT_TYPES['agriculture']:
                    recommendations.append(
                        "Implement precision agriculture techniques to optimize resource use."
                    )
                
                elif project_type in self.PROJECT_TYPES['waste_management']:
                    recommendations.append(
                        "Explore energy recovery options to improve project economics."
                    )
            
            return {
                'analysis': analysis,
                'top_risk_factors': top_risks,
                'recommendations': recommendations
            }
            
        except Exception as e:
            print(f"Error generating recommendations: {e}")
            return {
                'error': str(e),
                'recommendations': []
            }
    
    def save_models(self, model_path):
        """
        Save trained models to files.
        
        Args:
            model_path (str): Path to save the models.
            
        Returns:
            bool: True if saving was successful, False otherwise.
        """
        if self.classification_model is None or self.regression_model is None:
            raise ValueError("Models not trained. Call train() first.")
        
        try:
            import joblib
            import os
            
            # Create directory if it doesn't exist
            os.makedirs(model_path, exist_ok=True)
            
            # Save models
            joblib.dump(self.classification_model, f"{model_path}/classification_model.pkl")
            joblib.dump(self.regression_model, f"{model_path}/regression_model.pkl")
            
            print(f"Models saved to {model_path}")
            return True
        except Exception as e:
            print(f"Error saving models: {e}")
            return False 