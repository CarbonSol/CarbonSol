"""
Tests for the project analyzer.
"""

import unittest
import json

# Import the model to test
from project_analyzer import ProjectAnalyzer

class TestProjectAnalyzer(unittest.TestCase):
    """Test cases for the ProjectAnalyzer class."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.analyzer = ProjectAnalyzer()
        
        # Sample data for a reforestation project
        self.reforestation_project = {
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
            'planting_density': 1000,  # trees per hectare
            'estimated_carbon_sequestration': 300,  # tons CO2 per hectare
            'project_duration_years': 30,
            'monitoring_plan': 'Satellite imagery and ground surveys',
            'community_benefits': 'Local employment and sustainable forestry training',
            'biodiversity_impact': 'Habitat restoration for endangered species'
        }
        
        # Sample data for a renewable energy project
        self.renewable_project = {
            'project_type': 'renewable_energy',
            'location': {
                'country': 'India',
                'region': 'Tamil Nadu',
                'coordinates': {
                    'latitude': 11.1271,
                    'longitude': 78.6569
                }
            },
            'technology': 'solar_pv',
            'capacity_mw': 100,
            'baseline_emissions': 'coal_power_plant',
            'estimated_emission_reduction': 150000,  # tons CO2 per year
            'project_duration_years': 25,
            'monitoring_plan': 'Continuous energy output monitoring',
            'community_benefits': 'Local employment and energy access',
            'grid_connection': True
        }
    
    def test_initialization(self):
        """Test that the analyzer initializes correctly."""
        self.assertIsNotNone(self.analyzer)
    
    def test_reforestation_analysis(self):
        """Test analysis of a reforestation project."""
        result = self.analyzer.analyze(self.reforestation_project)
        
        # Check that the result has the expected structure
        self.assertIn('project_score', result)
        self.assertIn('risk_assessment', result)
        self.assertIn('verification_status', result)
        self.assertIn('estimated_credits', result)
        self.assertIn('recommendations', result)
        
        # Check that the project score is between 0 and 100
        self.assertTrue(0 <= result['project_score'] <= 100)
        
        # Check that estimated credits is calculated correctly
        expected_credits = (
            self.reforestation_project['area_hectares'] * 
            self.reforestation_project['estimated_carbon_sequestration'] * 
            self.reforestation_project['project_duration_years']
        )
        self.assertAlmostEqual(result['estimated_credits'], expected_credits, delta=expected_credits*0.1)
    
    def test_renewable_analysis(self):
        """Test analysis of a renewable energy project."""
        result = self.analyzer.analyze(self.renewable_project)
        
        # Check that the result has the expected structure
        self.assertIn('project_score', result)
        self.assertIn('risk_assessment', result)
        self.assertIn('verification_status', result)
        self.assertIn('estimated_credits', result)
        self.assertIn('recommendations', result)
        
        # Check that the project score is between 0 and 100
        self.assertTrue(0 <= result['project_score'] <= 100)
        
        # Check that estimated credits is calculated correctly
        expected_credits = (
            self.renewable_project['estimated_emission_reduction'] * 
            self.renewable_project['project_duration_years']
        )
        self.assertAlmostEqual(result['estimated_credits'], expected_credits, delta=expected_credits*0.1)
    
    def test_invalid_project_type(self):
        """Test analysis with an invalid project type."""
        invalid_project = self.reforestation_project.copy()
        invalid_project['project_type'] = 'invalid_type'
        
        # Should raise a ValueError
        with self.assertRaises(ValueError):
            self.analyzer.analyze(invalid_project)
    
    def test_missing_required_fields(self):
        """Test analysis with missing required fields."""
        incomplete_project = {
            'project_type': 'reforestation',
            'location': {
                'country': 'Brazil'
            }
        }
        
        # Should raise a ValueError
        with self.assertRaises(ValueError):
            self.analyzer.analyze(incomplete_project)

if __name__ == '__main__':
    unittest.main() 