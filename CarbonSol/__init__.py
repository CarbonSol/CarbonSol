"""
CarbonSol - A blockchain-based carbon credit trading platform with AI integration

This package provides the core functionality for the CarbonSol platform,
including smart contract interactions, AI models for price prediction,
and frontend integration utilities.
"""

__version__ = '0.1.0'
__author__ = 'CarbonSol Team'

from . import ai_models
from . import contracts
from . import frontend
from . import scripts

__all__ = ['ai_models', 'contracts', 'frontend', 'scripts'] 