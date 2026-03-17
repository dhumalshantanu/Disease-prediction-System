import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Brain, Activity, AlertTriangle, CheckCircle, ArrowLeft, RefreshCw, Pill, Home } from 'lucide-react';

const TreatmentSection = ({ treatment }) => {
  if (!treatment) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="result-card mt-6"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <Pill className="w-6 h-6 mr-3 text-secondary-500" />
        Recommended Treatment
        {!treatment.available && (
          <span className="ml-3 text-sm text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
            General Advice
          </span>
        )}
      </h3>

      <div className="space-y-6">
        {/* Medicines */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-blue-500 p-3 rounded-xl mr-4">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-blue-900 text-lg">Medicines</h4>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {treatment.medicines.map((medicine, index) => (
              <div key={index} className="flex items-center bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-4 flex-shrink-0"></div>
                <span className="text-blue-800 font-medium">{medicine}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Home Remedies */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-green-500 p-3 rounded-xl mr-4">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-green-900 text-lg">Home Remedies</h4>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {treatment.home_remedies.map((remedy, index) => (
              <div key={index} className="flex items-center bg-white p-4 rounded-lg border border-green-100 shadow-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-4 flex-shrink-0"></div>
                <span className="text-green-800 font-medium">{remedy}</span>
              </div>
            ))}
          </div>
        </div>

        {/* First Aid */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 border border-red-200 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-red-500 p-3 rounded-xl mr-4">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-red-900 text-lg">First Aid</h4>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {treatment.first_aid.map((aid, index) => (
              <div key={index} className="flex items-center bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-4 flex-shrink-0"></div>
                <span className="text-red-800 font-medium">{aid}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Treatment Disclaimer */}
      <div className="mt-6 p-5 bg-yellow-50 border border-yellow-200 rounded-xl">
        <div className="flex items-start">
          <AlertTriangle className="w-6 h-6 text-yellow-600 mr-4 mt-1" />
          <div>
            <h5 className="font-bold text-yellow-900 mb-3 text-lg">Important Medical Disclaimer</h5>
            <p className="text-yellow-800 leading-relaxed text-base">
              These treatment recommendations are for informational purposes only. Always consult with a qualified healthcare professional before starting any medication or treatment. Follow proper medical guidance and dosage instructions.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PredictionResults = ({ prediction, selectedSymptoms, onReset, onNewPrediction }) => {
  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-50';
    if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getConfidenceLabel = (confidence) => {
    if (confidence >= 0.8) return 'High';
    if (confidence >= 0.6) return 'Medium';
    return 'Low';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-4"
        >
          <Brain className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Prediction Results</h2>
        <p className="text-gray-600">Based on your selected symptoms</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Prediction */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="result-card"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Primary Prediction</h3>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(prediction.confidence)}`}>
                {getConfidenceLabel(prediction.confidence)} Confidence
              </div>
            </div>

            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-100 rounded-full mb-4">
                <Heart className="w-12 h-12 text-primary-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-2">
                {prediction.predicted_disease}
              </h4>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="text-gray-600">Confidence:</span>
                <span className="text-2xl font-bold text-primary-600">
                  {(prediction.confidence * 100).toFixed(1)}%
                </span>
              </div>
              
              {/* Confidence Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${prediction.confidence * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full ${
                    prediction.confidence >= 0.8 ? 'bg-green-500' :
                    prediction.confidence >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                />
              </div>
            </div>

            {/* Model Info */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Model Used:</span>
                <span className="font-medium text-gray-800">{prediction.model_used}</span>
              </div>
            </div>
          </motion.div>

          {/* Top 3 Predictions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="result-card mt-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Top 3 Predictions</h3>
            <div className="space-y-3">
              {prediction.top_3_predictions.map((pred, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    index === 0 ? 'bg-primary-50 border-2 border-primary-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-primary-500 text-white' : 'bg-gray-300 text-gray-700'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{pred.disease}</p>
                      <p className="text-sm text-gray-600">
                        {(pred.probability * 100).toFixed(1)}% confidence
                      </p>
                    </div>
                  </div>
                  <div className="w-24 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-primary-500"
                      style={{ width: `${pred.probability * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Treatment Recommendations */}
        <TreatmentSection treatment={prediction.treatment} />

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Selected Symptoms */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="result-card"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-primary-500" />
              Selected Symptoms
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {selectedSymptoms.map((symptom, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg"
                >
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{symptom.displayName}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-yellow-50 border border-yellow-200 rounded-xl p-4"
          >
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-900 mb-1">Medical Disclaimer</h4>
                <p className="text-sm text-yellow-800">
                  This AI prediction is for educational purposes only and should not replace professional medical advice. Always consult a qualified healthcare provider for diagnosis and treatment.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-3"
          >
            <button
              onClick={onNewPrediction}
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
            >
              <RefreshCw className="w-5 h-5" />
              <span>New Prediction</span>
            </button>
            
            <button
              onClick={onReset}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Start Over</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResults;
