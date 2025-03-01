"""
Carbon Footprint Calculator

This module provides functionality to calculate carbon footprints
for individuals and organizations based on various activities.
"""

import numpy as np
import pandas as pd

class CarbonFootprintCalculator:
    """
    A class for calculating carbon footprints based on various activities.
    """
    
    # Emission factors (kg CO2e per unit)
    EMISSION_FACTORS = {
        # Energy
        'electricity': 0.233,  # kg CO2e per kWh (global average)
        'natural_gas': 0.185,  # kg CO2e per kWh
        'heating_oil': 0.249,  # kg CO2e per kWh
        
        # Transportation
        'car_petrol': 0.192,   # kg CO2e per km
        'car_diesel': 0.171,   # kg CO2e per km
        'car_electric': 0.053, # kg CO2e per km
        'bus': 0.103,          # kg CO2e per km
        'train': 0.041,        # kg CO2e per km
        'flight_short': 0.255, # kg CO2e per km (< 1500 km)
        'flight_medium': 0.156,# kg CO2e per km (1500-3700 km)
        'flight_long': 0.150,  # kg CO2e per km (> 3700 km)
        
        # Food
        'beef': 27.0,          # kg CO2e per kg
        'lamb': 39.2,          # kg CO2e per kg
        'pork': 12.1,          # kg CO2e per kg
        'chicken': 6.9,        # kg CO2e per kg
        'fish': 6.1,           # kg CO2e per kg
        'dairy': 1.9,          # kg CO2e per kg
        'vegetables': 0.4,     # kg CO2e per kg
        'fruits': 0.5,         # kg CO2e per kg
        'grains': 0.6,         # kg CO2e per kg
        
        # Goods and services
        'clothing': 15.0,      # kg CO2e per item
        'electronics': 125.0,  # kg CO2e per item
        'paper': 0.8,          # kg CO2e per kg
        'plastic': 6.0,        # kg CO2e per kg
        
        # Home
        'water': 0.344,        # kg CO2e per m3
        'waste': 0.5,          # kg CO2e per kg
    }
    
    def __init__(self, custom_factors=None):
        """
        Initialize the carbon footprint calculator.
        
        Args:
            custom_factors (dict, optional): Custom emission factors to override defaults.
        """
        self.emission_factors = self.EMISSION_FACTORS.copy()
        
        if custom_factors:
            self.emission_factors.update(custom_factors)
    
    def calculate_energy_emissions(self, electricity_kwh=0, natural_gas_kwh=0, heating_oil_kwh=0):
        """
        Calculate emissions from energy consumption.
        
        Args:
            electricity_kwh (float): Electricity consumption in kWh.
            natural_gas_kwh (float): Natural gas consumption in kWh.
            heating_oil_kwh (float): Heating oil consumption in kWh.
            
        Returns:
            dict: Emissions breakdown by energy type and total.
        """
        electricity_emissions = electricity_kwh * self.emission_factors['electricity']
        natural_gas_emissions = natural_gas_kwh * self.emission_factors['natural_gas']
        heating_oil_emissions = heating_oil_kwh * self.emission_factors['heating_oil']
        
        total_emissions = electricity_emissions + natural_gas_emissions + heating_oil_emissions
        
        return {
            'electricity': electricity_emissions,
            'natural_gas': natural_gas_emissions,
            'heating_oil': heating_oil_emissions,
            'total': total_emissions
        }
    
    def calculate_transportation_emissions(self, car_petrol_km=0, car_diesel_km=0, 
                                          car_electric_km=0, bus_km=0, train_km=0,
                                          flight_short_km=0, flight_medium_km=0, 
                                          flight_long_km=0):
        """
        Calculate emissions from transportation.
        
        Args:
            car_petrol_km (float): Distance traveled by petrol car in km.
            car_diesel_km (float): Distance traveled by diesel car in km.
            car_electric_km (float): Distance traveled by electric car in km.
            bus_km (float): Distance traveled by bus in km.
            train_km (float): Distance traveled by train in km.
            flight_short_km (float): Distance traveled by short flights in km.
            flight_medium_km (float): Distance traveled by medium flights in km.
            flight_long_km (float): Distance traveled by long flights in km.
            
        Returns:
            dict: Emissions breakdown by transportation type and total.
        """
        car_petrol_emissions = car_petrol_km * self.emission_factors['car_petrol']
        car_diesel_emissions = car_diesel_km * self.emission_factors['car_diesel']
        car_electric_emissions = car_electric_km * self.emission_factors['car_electric']
        bus_emissions = bus_km * self.emission_factors['bus']
        train_emissions = train_km * self.emission_factors['train']
        flight_short_emissions = flight_short_km * self.emission_factors['flight_short']
        flight_medium_emissions = flight_medium_km * self.emission_factors['flight_medium']
        flight_long_emissions = flight_long_km * self.emission_factors['flight_long']
        
        total_emissions = (car_petrol_emissions + car_diesel_emissions + 
                          car_electric_emissions + bus_emissions + 
                          train_emissions + flight_short_emissions + 
                          flight_medium_emissions + flight_long_emissions)
        
        return {
            'car_petrol': car_petrol_emissions,
            'car_diesel': car_diesel_emissions,
            'car_electric': car_electric_emissions,
            'bus': bus_emissions,
            'train': train_emissions,
            'flight_short': flight_short_emissions,
            'flight_medium': flight_medium_emissions,
            'flight_long': flight_long_emissions,
            'total': total_emissions
        }
    
    def calculate_food_emissions(self, beef_kg=0, lamb_kg=0, pork_kg=0, 
                               chicken_kg=0, fish_kg=0, dairy_kg=0,
                               vegetables_kg=0, fruits_kg=0, grains_kg=0):
        """
        Calculate emissions from food consumption.
        
        Args:
            beef_kg (float): Beef consumption in kg.
            lamb_kg (float): Lamb consumption in kg.
            pork_kg (float): Pork consumption in kg.
            chicken_kg (float): Chicken consumption in kg.
            fish_kg (float): Fish consumption in kg.
            dairy_kg (float): Dairy consumption in kg.
            vegetables_kg (float): Vegetables consumption in kg.
            fruits_kg (float): Fruits consumption in kg.
            grains_kg (float): Grains consumption in kg.
            
        Returns:
            dict: Emissions breakdown by food type and total.
        """
        beef_emissions = beef_kg * self.emission_factors['beef']
        lamb_emissions = lamb_kg * self.emission_factors['lamb']
        pork_emissions = pork_kg * self.emission_factors['pork']
        chicken_emissions = chicken_kg * self.emission_factors['chicken']
        fish_emissions = fish_kg * self.emission_factors['fish']
        dairy_emissions = dairy_kg * self.emission_factors['dairy']
        vegetables_emissions = vegetables_kg * self.emission_factors['vegetables']
        fruits_emissions = fruits_kg * self.emission_factors['fruits']
        grains_emissions = grains_kg * self.emission_factors['grains']
        
        total_emissions = (beef_emissions + lamb_emissions + pork_emissions + 
                          chicken_emissions + fish_emissions + dairy_emissions + 
                          vegetables_emissions + fruits_emissions + grains_emissions)
        
        return {
            'beef': beef_emissions,
            'lamb': lamb_emissions,
            'pork': pork_emissions,
            'chicken': chicken_emissions,
            'fish': fish_emissions,
            'dairy': dairy_emissions,
            'vegetables': vegetables_emissions,
            'fruits': fruits_emissions,
            'grains': grains_emissions,
            'total': total_emissions
        }
    
    def calculate_goods_emissions(self, clothing_items=0, electronics_items=0, 
                                paper_kg=0, plastic_kg=0):
        """
        Calculate emissions from goods and services.
        
        Args:
            clothing_items (float): Number of clothing items.
            electronics_items (float): Number of electronic items.
            paper_kg (float): Paper consumption in kg.
            plastic_kg (float): Plastic consumption in kg.
            
        Returns:
            dict: Emissions breakdown by goods type and total.
        """
        clothing_emissions = clothing_items * self.emission_factors['clothing']
        electronics_emissions = electronics_items * self.emission_factors['electronics']
        paper_emissions = paper_kg * self.emission_factors['paper']
        plastic_emissions = plastic_kg * self.emission_factors['plastic']
        
        total_emissions = (clothing_emissions + electronics_emissions + 
                          paper_emissions + plastic_emissions)
        
        return {
            'clothing': clothing_emissions,
            'electronics': electronics_emissions,
            'paper': paper_emissions,
            'plastic': plastic_emissions,
            'total': total_emissions
        }
    
    def calculate_home_emissions(self, water_m3=0, waste_kg=0):
        """
        Calculate emissions from home activities.
        
        Args:
            water_m3 (float): Water consumption in cubic meters.
            waste_kg (float): Waste production in kg.
            
        Returns:
            dict: Emissions breakdown by home activity and total.
        """
        water_emissions = water_m3 * self.emission_factors['water']
        waste_emissions = waste_kg * self.emission_factors['waste']
        
        total_emissions = water_emissions + waste_emissions
        
        return {
            'water': water_emissions,
            'waste': waste_emissions,
            'total': total_emissions
        }
    
    def calculate_total_footprint(self, **kwargs):
        """
        Calculate total carbon footprint from all activities.
        
        Args:
            **kwargs: Keyword arguments for all activity parameters.
            
        Returns:
            dict: Total emissions and breakdown by category.
        """
        energy_emissions = self.calculate_energy_emissions(
            electricity_kwh=kwargs.get('electricity_kwh', 0),
            natural_gas_kwh=kwargs.get('natural_gas_kwh', 0),
            heating_oil_kwh=kwargs.get('heating_oil_kwh', 0)
        )
        
        transportation_emissions = self.calculate_transportation_emissions(
            car_petrol_km=kwargs.get('car_petrol_km', 0),
            car_diesel_km=kwargs.get('car_diesel_km', 0),
            car_electric_km=kwargs.get('car_electric_km', 0),
            bus_km=kwargs.get('bus_km', 0),
            train_km=kwargs.get('train_km', 0),
            flight_short_km=kwargs.get('flight_short_km', 0),
            flight_medium_km=kwargs.get('flight_medium_km', 0),
            flight_long_km=kwargs.get('flight_long_km', 0)
        )
        
        food_emissions = self.calculate_food_emissions(
            beef_kg=kwargs.get('beef_kg', 0),
            lamb_kg=kwargs.get('lamb_kg', 0),
            pork_kg=kwargs.get('pork_kg', 0),
            chicken_kg=kwargs.get('chicken_kg', 0),
            fish_kg=kwargs.get('fish_kg', 0),
            dairy_kg=kwargs.get('dairy_kg', 0),
            vegetables_kg=kwargs.get('vegetables_kg', 0),
            fruits_kg=kwargs.get('fruits_kg', 0),
            grains_kg=kwargs.get('grains_kg', 0)
        )
        
        goods_emissions = self.calculate_goods_emissions(
            clothing_items=kwargs.get('clothing_items', 0),
            electronics_items=kwargs.get('electronics_items', 0),
            paper_kg=kwargs.get('paper_kg', 0),
            plastic_kg=kwargs.get('plastic_kg', 0)
        )
        
        home_emissions = self.calculate_home_emissions(
            water_m3=kwargs.get('water_m3', 0),
            waste_kg=kwargs.get('waste_kg', 0)
        )
        
        total_emissions = (energy_emissions['total'] + 
                          transportation_emissions['total'] + 
                          food_emissions['total'] + 
                          goods_emissions['total'] + 
                          home_emissions['total'])
        
        # Convert from kg to tons
        total_emissions_tons = total_emissions / 1000
        
        return {
            'total_kg': total_emissions,
            'total_tons': total_emissions_tons,
            'categories': {
                'energy': energy_emissions,
                'transportation': transportation_emissions,
                'food': food_emissions,
                'goods': goods_emissions,
                'home': home_emissions
            }
        }
    
    def get_offset_recommendations(self, total_emissions_tons):
        """
        Get recommendations for carbon offsets based on emissions.
        
        Args:
            total_emissions_tons (float): Total emissions in tons of CO2e.
            
        Returns:
            dict: Offset recommendations.
        """
        # Calculate offset costs based on average carbon credit prices
        vcu_price_per_ton = 15  # USD per ton
        cst_price_per_ton = 20  # USD per ton
        
        vcu_cost = total_emissions_tons * vcu_price_per_ton
        cst_cost = total_emissions_tons * cst_price_per_ton
        
        # Calculate impact equivalents
        trees_planted = total_emissions_tons * 50  # Approx. 50 trees per ton of CO2
        renewable_energy_kwh = total_emissions_tons * 2500  # Approx. 2500 kWh per ton
        
        return {
            'offset_tons': total_emissions_tons,
            'vcu_cost': vcu_cost,
            'cst_cost': cst_cost,
            'impact_equivalents': {
                'trees_planted': trees_planted,
                'renewable_energy_kwh': renewable_energy_kwh
            },
            'reduction_tips': [
                'Reduce meat consumption, especially beef and lamb',
                'Use public transportation or carpool when possible',
                'Switch to renewable energy sources for your home',
                'Reduce air travel or offset your flights',
                'Buy fewer new products and choose items with less packaging',
                'Improve home energy efficiency with better insulation',
                'Reduce water usage with efficient appliances and shorter showers'
            ]
        } 