import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import apiService from '../services/api';

const CarbonProjects = () => {
  const { connected } = useWallet();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  
  // Project categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'forest', name: 'Forest Protection' },
    { id: 'renewable', name: 'Renewable Energy' },
    { id: 'agriculture', name: 'Sustainable Agriculture' },
    { id: 'waste', name: 'Waste Management' },
    { id: 'ocean', name: 'Ocean Protection' },
  ];
  
  // Simulated project data
  const projects = [
    {
      id: 'p1',
      title: 'Amazon Rainforest Protection',
      category: 'forest',
      location: 'Brazil',
      area: 50000, // hectares
      carbonCapture: 250000, // tons CO2/year
      price: 12.5, // price per ton CO2 (USD)
      rating: 4.8,
      verified: true,
      description: 'This project is dedicated to protecting the biodiversity of the Amazon rainforest, preventing deforestation, and supporting sustainable development of local communities. By protecting the forest, the project prevents approximately 250,000 tons of carbon dioxide from being released into the atmosphere each year.',
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFpbmZvcmVzdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      progress: 65, // percentage
      totalFunding: 3125000, // USD
      currentFunding: 2031250, // USD
    },
    {
      id: 'p2',
      title: 'Solar Power Generation Project',
      category: 'renewable',
      location: 'India',
      area: 200, // hectares
      carbonCapture: 180000, // tons CO2/year
      price: 10.8, // price per ton CO2 (USD)
      rating: 4.5,
      verified: true,
      description: 'This solar power generation project is located in the desert regions of India, utilizing abundant solar resources to generate electricity, replacing traditional fossil fuel power generation. The project reduces approximately 180,000 tons of carbon dioxide emissions annually.',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c29sYXIlMjBwYW5lbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      progress: 78, // percentage
      totalFunding: 1944000, // USD
      currentFunding: 1516320, // USD
    },
    {
      id: 'p3',
      title: 'Organic Agriculture Transition Project',
      category: 'agriculture',
      location: 'Kenya',
      area: 5000, // hectares
      carbonCapture: 75000, // tons CO2/year
      price: 9.5, // price per ton CO2 (USD)
      rating: 4.2,
      verified: true,
      description: 'This project supports small farmers in Kenya in transitioning from traditional agriculture to organic farming practices. By improving soil health, reducing chemical inputs, and implementing agroforestry systems, the project reduces approximately 75,000 tons of carbon dioxide emissions annually.',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8b3JnYW5pYyUyMGZhcm1pbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      progress: 42, // percentage
      totalFunding: 712500, // USD
      currentFunding: 299250, // USD
    },
    {
      id: 'p4',
      title: 'Wind Farm Project',
      category: 'renewable',
      location: 'China',
      area: 300, // hectares
      carbonCapture: 220000, // tons CO2/year
      price: 11.2, // price per ton CO2 (USD)
      rating: 4.6,
      verified: true,
      description: 'This wind farm is located in the wind-rich northern regions of China, generating electricity through large wind turbines, replacing coal-fired power generation. The project reduces approximately 220,000 tons of carbon dioxide emissions annually.',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2luZCUyMHR1cmJpbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      progress: 85, // percentage
      totalFunding: 2464000, // USD
      currentFunding: 2094400, // USD
    },
    {
      id: 'p5',
      title: 'Landfill Gas Capture Project',
      category: 'waste',
      location: 'Mexico',
      area: 50, // hectares
      carbonCapture: 120000, // tons CO2/year
      price: 8.9, // price per ton CO2 (USD)
      rating: 4.3,
      verified: true,
      description: 'This project has installed gas capture systems at landfills in Mexico, collecting methane and converting it into energy. By preventing methane (a potent greenhouse gas) from being released into the atmosphere, the project reduces approximately 120,000 tons of carbon dioxide equivalent emissions annually.',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d2FzdGUlMjBtYW5hZ2VtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      progress: 60, // percentage
      totalFunding: 1068000, // USD
      currentFunding: 640800, // USD
    },
    {
      id: 'p6',
      title: 'Coral Reef Restoration Project',
      category: 'ocean',
      location: 'Australia',
      area: 100, // hectares
      carbonCapture: 45000, // tons CO2/year
      price: 15.5, // price per ton CO2 (USD)
      rating: 4.7,
      verified: true,
      description: 'This project is dedicated to restoring the coral ecosystem of the Great Barrier Reef. By planting corals and creating artificial reefs, the project not only protects marine biodiversity but also enhances carbon sequestration capacity. The project absorbs approximately 45,000 tons of carbon dioxide annually.',
      image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29yYWwlMjByZWVmfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      progress: 35, // percentage
      totalFunding: 697500, // USD
      currentFunding: 244125, // USD
    },
  ];
  
  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Analyze project
  const analyzeProject = async (project) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    try {
      const projectData = {
        id: project.id,
        title: project.title,
        category: project.category,
        location: project.location,
        area: project.area,
        carbonCapture: project.carbonCapture
      };
      
      const response = await apiService.analyzeProject(projectData);
      
      if (response.status === 'success') {
        setAnalysisResult(response.data);
      } else {
        console.error('Project analysis failed:', response.message);
      }
    } catch (error) {
      console.error('Error analyzing project:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // Invest in project
  const investInProject = (project) => {
    if (!connected) {
      alert('Please connect your wallet first');
      return;
    }
    
    // In a real application, this would call a smart contract for investment
    alert(`You are about to invest in ${project.title}. This feature is coming soon!`);
  };
  
  // Render project card
  const renderProjectCard = (project) => (
    <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/500x300?text=Project+Image';
          }}
        />
        <div className="absolute top-2 right-2">
          {project.verified && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Verified
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{project.title}</h3>
        <div className="flex items-center mb-2">
          <span className="text-yellow-500 mr-1">★</span>
          <span>{project.rating}</span>
          <span className="mx-2">•</span>
          <span className="text-gray-600">{project.location}</span>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {project.description}
        </p>
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span>Funding Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>${project.currentFunding.toLocaleString()}</span>
            <span>${project.totalFunding.toLocaleString()}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="bg-gray-100 p-2 rounded">
            <span className="block text-gray-500">Annual Reduction</span>
            <span className="font-bold">{project.carbonCapture.toLocaleString()} tons CO₂</span>
          </div>
          <div className="bg-gray-100 p-2 rounded">
            <span className="block text-gray-500">Carbon Credit Price</span>
            <span className="font-bold">${project.price}/ton</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={() => {
              setSelectedProject(project);
              analyzeProject(project);
            }}
          >
            Analyze
          </button>
          <button 
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            onClick={() => investInProject(project)}
            disabled={!connected}
          >
            Invest
          </button>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6">Carbon Reduction Projects</h1>
      
      {!connected && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-700">
            Connect your wallet to invest in carbon reduction projects and receive VCU tokens.
          </p>
          <div className="mt-2">
            <WalletMultiButton className="bg-green-500 hover:bg-green-600" />
          </div>
        </div>
      )}
      
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-3 py-1 rounded-full text-sm ${
                  activeCategory === category.id
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredProjects.map(renderProjectCard)}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <p className="text-gray-500">No matching projects found</p>
        </div>
      )}
      
      {/* Project Analysis Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    setSelectedProject(null);
                    setAnalysisResult(null);
                  }}
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-64 object-cover rounded-lg mb-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/500x300?text=Project+Image';
                    }}
                  />
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <span className="block text-gray-500 text-sm">Location</span>
                      <span className="font-bold">{selectedProject.location}</span>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <span className="block text-gray-500 text-sm">Area</span>
                      <span className="font-bold">{selectedProject.area.toLocaleString()} hectares</span>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <span className="block text-gray-500 text-sm">Annual Reduction</span>
                      <span className="font-bold">{selectedProject.carbonCapture.toLocaleString()} tons CO₂</span>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <span className="block text-gray-500 text-sm">Carbon Credit Price</span>
                      <span className="font-bold">${selectedProject.price}/ton</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-2">Project Description</h3>
                  <p className="text-gray-600 mb-4">{selectedProject.description}</p>
                  
                  <h3 className="text-lg font-bold mb-2">Funding Progress</h3>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Raised: ${selectedProject.currentFunding.toLocaleString()}</span>
                      <span>{selectedProject.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${selectedProject.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-sm text-gray-500 mt-1">
                      Goal: ${selectedProject.totalFunding.toLocaleString()}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2">AI Analysis</h3>
                  {isAnalyzing ? (
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                      <p className="text-gray-600">Analyzing, please wait...</p>
                    </div>
                  ) : analysisResult ? (
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="mb-3">
                        <span className="font-bold">Credibility Score:</span>
                        <span className="ml-2 text-green-600 font-bold">{analysisResult.credibility_score}/10</span>
                      </div>
                      <div className="mb-3">
                        <span className="font-bold">Estimated Annual Reduction:</span>
                        <span className="ml-2">{analysisResult.estimated_carbon_capture.toLocaleString()} tons CO₂</span>
                        {analysisResult.estimated_carbon_capture < selectedProject.carbonCapture ? (
                          <span className="ml-2 text-yellow-600">
                            (Lower than claimed by {((selectedProject.carbonCapture - analysisResult.estimated_carbon_capture) / selectedProject.carbonCapture * 100).toFixed(1)}%)
                          </span>
                        ) : (
                          <span className="ml-2 text-green-600">
                            (Matches claimed value)
                          </span>
                        )}
                      </div>
                      <div className="mb-3">
                        <span className="font-bold">Risk Assessment:</span>
                        <span className="ml-2">{analysisResult.risk_level}</span>
                      </div>
                      <div>
                        <span className="font-bold">AI Recommendation:</span>
                        <p className="mt-1 text-gray-600">{analysisResult.recommendation}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                      <p className="text-gray-600">Click the "Analyze" button to get AI analysis results</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button 
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                  onClick={() => analyzeProject(selectedProject)}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                </button>
                <button 
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                  onClick={() => investInProject(selectedProject)}
                  disabled={!connected}
                >
                  Invest
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarbonProjects; 