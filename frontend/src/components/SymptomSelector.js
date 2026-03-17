import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SymptomSelector = ({ symptoms, selectedSymptoms, onSymptomToggle }) => {
  const [visibleCount, setVisibleCount] = useState(12);

  const isSelected = (symptom) => {
    return selectedSymptoms.find(s => s.id === symptom.id);
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  const visibleSymptoms = symptoms.slice(0, visibleCount);

  const getCategoryColor = (category) => {
    const colors = {
      general: 'bg-blue-100 text-blue-800',
      skin: 'bg-green-100 text-green-800',
      respiratory: 'bg-yellow-100 text-yellow-800',
      digestive: 'bg-purple-100 text-purple-800',
      neurological: 'bg-pink-100 text-pink-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      {/* Symptoms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {visibleSymptoms.map((symptom, index) => (
          <motion.div
            key={symptom.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            onClick={() => onSymptomToggle(symptom)}
            className={`symptom-card p-4 cursor-pointer transition-all duration-200 ${
              isSelected(symptom) ? 'selected' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 mb-1">
                  {symptom.displayName}
                </h4>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(symptom.category)}`}>
                  {symptom.category}
                </span>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                isSelected(symptom)
                  ? 'bg-primary-500 border-primary-500'
                  : 'border-gray-300'
              }`}>
                {isSelected(symptom) && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      {symptoms.length > visibleCount && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
          >
            Load More Symptoms ({symptoms.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* No Results */}
      {symptoms.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">No symptoms found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default SymptomSelector;
