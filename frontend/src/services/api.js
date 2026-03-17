import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.config?.url);
    return Promise.reject(error);
  }
);

// Mock data for development when backend is not available
const mockSymptoms = [
  { id: 1, name: 'itching', displayName: 'Itching', category: 'skin' },
  { id: 2, name: 'skin_rash', displayName: 'Skin Rash', category: 'skin' },
  { id: 3, name: 'nodal_skin_eruptions', displayName: 'Nodal Skin Eruptions', category: 'skin' },
  { id: 4, name: 'continuous_sneezing', displayName: 'Continuous Sneezing', category: 'respiratory' },
  { id: 5, name: 'shivering', displayName: 'Shivering', category: 'general' },
  { id: 6, name: 'chills', displayName: 'Chills', category: 'general' },
  { id: 7, name: 'watering_from_eyes', displayName: 'Watering from Eyes', category: 'general' },
  { id: 8, name: 'fever', displayName: 'Fever', category: 'general' },
  { id: 9, name: 'headache', displayName: 'Headache', category: 'neurological' },
  { id: 10, name: 'fatigue', displayName: 'Fatigue', category: 'general' },
  { id: 11, name: 'cough', displayName: 'Cough', category: 'respiratory' },
  { id: 12, name: 'breathlessness', displayName: 'Breathlessness', category: 'respiratory' },
  { id: 13, name: 'chest_pain', displayName: 'Chest Pain', category: 'general' },
  { id: 14, name: 'nausea', displayName: 'Nausea', category: 'digestive' },
  { id: 15, name: 'vomiting', displayName: 'Vomiting', category: 'digestive' },
  { id: 16, name: 'abdominal_pain', displayName: 'Abdominal Pain', category: 'digestive' },
  { id: 17, name: 'diarrhea', displayName: 'Diarrhea', category: 'digestive' },
  { id: 18, name: 'constipation', displayName: 'Constipation', category: 'digestive' },
  { id: 19, name: 'dizziness', displayName: 'Dizziness', category: 'neurological' },
  { id: 20, name: 'loss_of_balance', displayName: 'Loss of Balance', category: 'neurological' },
];

const mockDiseases = [
  'Fungal infection', 'Allergy', 'GERD', 'Chronic cholestasis', 'Drug Reaction',
  'Peptic ulcer diseae', 'AIDS', 'Diabetes', 'Gastroenteritis', 'Bronchial Asthma',
  'Hypertension', 'Migraine', 'Cervical spondylosis', 'Paralysis (brain hemorrhage)',
  'Jaundice', 'Malaria', 'Chicken pox', 'Dengue', 'Typhoid', 'hepatitis A',
  'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E', 'Alcoholic hepatitis',
  'Tuberculosis', 'Common Cold', 'Pneumonia', 'Dimorphic hemmorhoids(piles)',
  'Heart attack', 'Varicose veins', 'Hypothyroidism', 'Hyperthyroidism',
  'Hypoglycemia', 'Osteoarthristis', 'Arthritis',
  '(vertigo) Paroymsal Positional Vertigo', 'Acne', 'Urinary tract infection',
  'Psoriasis', 'Impetigo'
];

// API Functions
export const getSymptoms = async () => {
  try {
    const response = await api.get('/api/symptoms');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using mock data for symptoms');
    return mockSymptoms;
  }
};

export const getDiseases = async () => {
  try {
    const response = await api.get('/api/diseases');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using mock data for diseases');
    return mockDiseases;
  }
};

export const predictDisease = async (symptoms) => {
  try {
    const response = await api.post('/api/predict', { symptoms });
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using mock prediction');
    // Mock prediction based on symptoms
    const mockPrediction = generateMockPrediction(symptoms);
    return mockPrediction;
  }
};

// Mock prediction generator
const generateMockPrediction = (symptoms) => {
  const symptomString = symptoms.join(' ').toLowerCase();
  
  let predictedDisease = 'Common Cold';
  let confidence = 0.75;
  
  if (symptomString.includes('itching') || symptomString.includes('rash')) {
    predictedDisease = 'Fungal infection';
    confidence = 0.85;
  } else if (symptomString.includes('cough') || symptomString.includes('breathlessness')) {
    predictedDisease = 'Bronchial Asthma';
    confidence = 0.80;
  } else if (symptomString.includes('fever') && symptomString.includes('headache')) {
    predictedDisease = 'Migraine';
    confidence = 0.70;
  } else if (symptomString.includes('nausea') || symptomString.includes('vomiting')) {
    predictedDisease = 'Gastroenteritis';
    confidence = 0.75;
  } else if (symptomString.includes('dizziness') || symptomString.includes('loss of balance')) {
    predictedDisease = '(vertigo) Paroymsal Positional Vertigo';
    confidence = 0.65;
  }
  
  // Generate top 3 predictions
  const allDiseases = [...mockDiseases];
  const top3Predictions = [
    { disease: predictedDisease, probability: confidence },
    { disease: allDiseases[Math.floor(Math.random() * allDiseases.length)], probability: Math.random() * 0.3 },
    { disease: allDiseases[Math.floor(Math.random() * allDiseases.length)], probability: Math.random() * 0.2 }
  ].sort((a, b) => b.probability - a.probability);
  
  return {
    predicted_disease: predictedDisease,
    confidence: confidence,
    top_3_predictions: top3Predictions,
    model_used: 'Random Forest (Mock)',
    selected_symptoms: symptoms
  };
};

export default api;
