"""
AI Models for the CarbonSol platform

This module contains AI models for price prediction, carbon footprint calculation,
and project analysis for the CarbonSol platform.
"""

from .price_prediction import PricePredictor
from .carbon_footprint import CarbonFootprintCalculator
from .project_analyzer import ProjectAnalyzer

__all__ = ['PricePredictor', 'CarbonFootprintCalculator', 'ProjectAnalyzer'] 