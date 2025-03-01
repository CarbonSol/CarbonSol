import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { api } from '../utils';
import { useLocalStorage } from './index';
import { STORAGE_KEYS } from '../utils/constants';

/**
 * Custom hook for managing carbon data (footprint and projects)
 * @returns {Object} - Carbon data and functions
 */
const useCarbonData = () => {
  const { connected, publicKey } = useWallet();
  const [footprintData, setFootprintData] = useLocalStorage(STORAGE_KEYS.FOOTPRINT_DATA, null);
  const [recentProjects, setRecentProjects] = useLocalStorage(STORAGE_KEYS.RECENT_PROJECTS, []);
  const [carbonProjects, setCarbonProjects] = useState([]);
  const [isLoadingFootprint, setIsLoadingFootprint] = useState(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [footprintError, setFootprintError] = useState(null);
  const [projectsError, setProjectsError] = useState(null);

  // Fetch carbon footprint data
  const fetchFootprintData = useCallback(async () => {
    if (!connected || !publicKey) return;
    
    setIsLoadingFootprint(true);
    setFootprintError(null);
    
    try {
      // In a real app, this would call the API
      // const data = await api.getCarbonFootprint(publicKey.toString());
      
      // For demo purposes, we'll use mock data
      const mockFootprintData = {
        totalEmissions: 12.5, // tons of CO2
        offsetAmount: 8.2, // tons of CO2
        categories: {
          energy: 4.2,
          transportation: 5.8,
          food: 1.5,
          goods: 0.7,
          home: 0.3
        },
        history: [
          { month: 'Jan', emissions: 1.2, offset: 0.8 },
          { month: 'Feb', emissions: 1.1, offset: 0.7 },
          { month: 'Mar', emissions: 1.3, offset: 0.9 },
          { month: 'Apr', emissions: 1.0, offset: 0.7 },
          { month: 'May', emissions: 1.2, offset: 0.8 },
          { month: 'Jun', emissions: 1.4, offset: 1.0 }
        ],
        lastUpdated: new Date().toISOString()
      };
      
      setFootprintData(mockFootprintData);
    } catch (error) {
      console.error('Error fetching carbon footprint data:', error);
      setFootprintError(error.message || 'Failed to fetch carbon footprint data');
    } finally {
      setIsLoadingFootprint(false);
    }
  }, [connected, publicKey, setFootprintData]);

  // Fetch carbon projects
  const fetchCarbonProjects = useCallback(async (filters = {}) => {
    setIsLoadingProjects(true);
    setProjectsError(null);
    
    try {
      // In a real app, this would call the API
      // const projects = await api.getCarbonProjects(filters);
      
      // For demo purposes, we'll use mock data
      const mockProjects = [
        {
          id: 'proj-001',
          title: 'Amazon Rainforest Conservation',
          category: 'forest',
          location: 'Brazil',
          area: 5000, // hectares
          carbonCapture: 25000, // tons of CO2 per year
          pricePerTon: 15, // USD
          rating: 4.8,
          verified: true,
          description: 'Protecting the Amazon rainforest from deforestation and promoting sustainable practices.',
          imageUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5',
          fundingProgress: 72, // percentage
          totalFunding: 500000, // USD
          currentFunding: 360000 // USD
        },
        {
          id: 'proj-002',
          title: 'Solar Farm Development',
          category: 'renewable',
          location: 'India',
          area: 200, // hectares
          carbonCapture: 15000, // tons of CO2 per year
          pricePerTon: 12, // USD
          rating: 4.5,
          verified: true,
          description: 'Building solar farms to replace coal power plants and reduce carbon emissions.',
          imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276',
          fundingProgress: 45, // percentage
          totalFunding: 300000, // USD
          currentFunding: 135000 // USD
        },
        {
          id: 'proj-003',
          title: 'Sustainable Agriculture Initiative',
          category: 'agriculture',
          location: 'Kenya',
          area: 1200, // hectares
          carbonCapture: 8000, // tons of CO2 per year
          pricePerTon: 10, // USD
          rating: 4.2,
          verified: true,
          description: 'Implementing sustainable farming practices to reduce emissions and improve soil health.',
          imageUrl: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad',
          fundingProgress: 60, // percentage
          totalFunding: 200000, // USD
          currentFunding: 120000 // USD
        },
        {
          id: 'proj-004',
          title: 'Ocean Cleanup Project',
          category: 'ocean',
          location: 'Pacific Ocean',
          area: 10000, // square kilometers
          carbonCapture: 5000, // tons of CO2 per year
          pricePerTon: 18, // USD
          rating: 4.7,
          verified: true,
          description: 'Removing plastic waste from oceans and protecting marine ecosystems.',
          imageUrl: 'https://images.unsplash.com/photo-1484291470158-b8f8d608850d',
          fundingProgress: 30, // percentage
          totalFunding: 400000, // USD
          currentFunding: 120000 // USD
        }
      ];
      
      // Apply filters if provided
      let filteredProjects = [...mockProjects];
      
      if (filters.category && filters.category !== 'all') {
        filteredProjects = filteredProjects.filter(
          project => project.category === filters.category
        );
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredProjects = filteredProjects.filter(
          project => 
            project.title.toLowerCase().includes(searchLower) ||
            project.description.toLowerCase().includes(searchLower) ||
            project.location.toLowerCase().includes(searchLower)
        );
      }
      
      setCarbonProjects(filteredProjects);
    } catch (error) {
      console.error('Error fetching carbon projects:', error);
      setProjectsError(error.message || 'Failed to fetch carbon projects');
    } finally {
      setIsLoadingProjects(false);
    }
  }, []);

  // Get project by ID
  const getProjectById = useCallback((projectId) => {
    return carbonProjects.find(project => project.id === projectId) || null;
  }, [carbonProjects]);

  // Add project to recent projects
  const addToRecentProjects = useCallback((project) => {
    setRecentProjects(prev => {
      // Remove if already exists
      const filtered = prev.filter(p => p.id !== project.id);
      // Add to beginning of array
      return [project, ...filtered].slice(0, 5); // Keep only 5 most recent
    });
  }, [setRecentProjects]);

  // Save footprint data
  const saveFootprintData = useCallback(async (data) => {
    setIsLoadingFootprint(true);
    
    try {
      // In a real app, this would call the API
      // if (connected && publicKey) {
      //   await api.saveCarbonFootprint(publicKey.toString(), data);
      // }
      
      // Update local storage
      setFootprintData({
        ...data,
        lastUpdated: new Date().toISOString()
      });
      
      return true;
    } catch (error) {
      console.error('Error saving carbon footprint data:', error);
      setFootprintError(error.message || 'Failed to save carbon footprint data');
      return false;
    } finally {
      setIsLoadingFootprint(false);
    }
  }, [connected, publicKey, setFootprintData]);

  // Load initial data
  useEffect(() => {
    fetchCarbonProjects();
    
    if (connected && publicKey) {
      fetchFootprintData();
    }
  }, [connected, publicKey, fetchFootprintData, fetchCarbonProjects]);

  return {
    footprintData,
    carbonProjects,
    recentProjects,
    isLoadingFootprint,
    isLoadingProjects,
    footprintError,
    projectsError,
    fetchFootprintData,
    fetchCarbonProjects,
    getProjectById,
    addToRecentProjects,
    saveFootprintData
  };
};

export default useCarbonData; 