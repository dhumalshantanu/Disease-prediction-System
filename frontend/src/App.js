import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Activity, Brain, Stethoscope, ChevronRight, Search, Filter, Info } from 'lucide-react';
import SymptomSelector from './components/SymptomSelector';
import PredictionResults from './components/PredictionResults';
import LoadingSpinner from './components/LoadingSpinner';
import { predictDisease, getSymptoms, getDiseases } from './services/api';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [availableSymptoms, setAvailableSymptoms] = useState([]);
  const [availableDiseases, setAvailableDiseases] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState('selector');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [symptomsData, diseasesData] = await Promise.all([
        getSymptoms(),
        getDiseases()
      ]);
      setAvailableSymptoms(symptomsData);
      setAvailableDiseases(diseasesData);
    } catch (error) {
      toast.error('Failed to load initial data');
      console.error('Error loading data:', error);
    }
  };

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms(prev => {
      if (prev.find(s => s.id === symptom.id)) {
        return prev.filter(s => s.id !== symptom.id);
      } else {
        return [...prev, symptom];
      }
    });
  };

  const handlePredict = async () => {
    if (selectedSymptoms.length === 0) {
      toast.error('Please select at least one symptom');
      return;
    }

    setLoading(true);
    setCurrentView('loading');

    try {
      const result = await predictDisease(selectedSymptoms.map(s => s.name));
      setPrediction(result);
      setCurrentView('results');
      toast.success('Prediction completed successfully!');
    } catch (error) {
      toast.error('Failed to get prediction');
      console.error('Prediction error:', error);
      setCurrentView('selector');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setPrediction(null);
    setCurrentView('selector');
    setSearchTerm('');
    setFilterCategory('all');
  };

  const filteredSymptoms = availableSymptoms.filter(symptom => {
    const matchesSearch = symptom.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || symptom.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="glass-effect shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-3 rounded-xl shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">Disease Prediction System</h1>
                <p className="text-gray-600 mt-1">AI-powered health assessment tool</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Powered by</p>
                <p className="text-sm font-semibold text-primary-600">Machine Learning</p>
              </div>
              <Brain className="w-8 h-8 text-primary-500" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {currentView === 'selector' && (
            <motion.div
              key="selector"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Panel - Symptom Selection */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                        <Stethoscope className="w-6 h-6 mr-2 text-primary-500" />
                        Select Your Symptoms
                      </h2>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Activity className="w-4 h-4" />
                        <span>{selectedSymptoms.length} selected</span>
                      </div>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search symptoms..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="all">All Categories</option>
                        <option value="general">General</option>
                        <option value="skin">Skin</option>
                        <option value="respiratory">Respiratory</option>
                        <option value="digestive">Digestive</option>
                        <option value="neurological">Neurological</option>
                      </select>
                    </div>

                    <SymptomSelector
                      symptoms={filteredSymptoms}
                      selectedSymptoms={selectedSymptoms}
                      onSymptomToggle={handleSymptomToggle}
                    />
                  </div>
                </div>

                {/* Right Panel - Selected Symptoms & Actions */}
                <div className="space-y-6">
                  {/* Selected Symptoms */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Selected Symptoms</h3>
                    {selectedSymptoms.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No symptoms selected yet</p>
                    ) : (
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {selectedSymptoms.map((symptom) => (
                          <div
                            key={symptom.id}
                            className="flex items-center justify-between p-3 bg-primary-50 rounded-lg"
                          >
                            <span className="text-sm font-medium text-primary-800">
                              {symptom.displayName}
                            </span>
                            <button
                              onClick={() => handleSymptomToggle(symptom)}
                              className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handlePredict}
                      disabled={selectedSymptoms.length === 0}
                      className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
                    >
                      <span>Predict Disease</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={handleReset}
                      className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Info Card */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900">How it works</h4>
                        <p className="text-sm text-blue-800 mt-1">
                          Select symptoms you're experiencing and our AI model will predict the most likely conditions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <LoadingSpinner />
              <p className="mt-4 text-lg text-gray-600">Analyzing your symptoms...</p>
            </motion.div>
          )}

          {currentView === 'results' && prediction && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PredictionResults
                prediction={prediction}
                selectedSymptoms={selectedSymptoms}
                onReset={handleReset}
                onNewPrediction={() => setCurrentView('selector')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="glass-effect border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              ⚠️ This system is for educational purposes only. Always consult a healthcare professional for medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
