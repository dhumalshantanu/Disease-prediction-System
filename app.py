from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pickle
import numpy as np
import sys
import os
 
# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
 
from disease_predictor import DiseasePredictor

app = Flask(__name__)
CORS(app)

# Initialize the disease predictor
try:
    predictor = DiseasePredictor()
    print("✅ Disease predictor loaded successfully!")
except Exception as e:
    print(f"❌ Error loading disease predictor: {e}")
    predictor = None

@app.route('/')
def home():
    return jsonify({
        'message': 'Disease Prediction API',
        'version': '1.0.0',
        'status': 'running',
        'endpoints': [
            '/api/symptoms',
            '/api/diseases', 
            '/api/predict',
            '/api/health'
        ]
    })

@app.route('/api/health')
def health_check():
    return jsonify({
        'status': 'healthy',
        'predictor_loaded': predictor is not None,
        'model_info': predictor.model_info if predictor else None
    })

@app.route('/api/symptoms')
def get_symptoms():
    """Get all available symptoms"""
    if not predictor:
        return jsonify({'error': 'Predictor not available'}), 500
    
    try:
        symptoms = predictor.get_available_symptoms()
        
        # Format symptoms for frontend
        formatted_symptoms = []
        for i, symptom in enumerate(symptoms, 1):
            # Determine category based on symptom name
            category = 'general'
            symptom_lower = symptom.lower()
            
            if any(keyword in symptom_lower for keyword in ['skin', 'rash', 'itch', 'acne', 'psoriasis']):
                category = 'skin'
            elif any(keyword in symptom_lower for keyword in ['cough', 'breath', 'chest', 'sneez', 'throat']):
                category = 'respiratory'
            elif any(keyword in symptom_lower for keyword in ['nausea', 'vomit', 'abdominal', 'stomach', 'diarrhea']):
                category = 'digestive'
            elif any(keyword in symptom_lower for keyword in ['headache', 'dizziness', 'vertigo', 'balance']):
                category = 'neurological'
            
            formatted_symptoms.append({
                'id': i,
                'name': symptom,
                'displayName': symptom.replace('_', ' ').title(),
                'category': category
            })
        
        return jsonify(formatted_symptoms)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/diseases')
def get_diseases():
    """Get all available diseases"""
    if not predictor:
        return jsonify({'error': 'Predictor not available'}), 500
    
    try:
        diseases = list(predictor.label_encoder.classes_)
        return jsonify(diseases)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict', methods=['POST'])
def predict_disease():
    """Predict disease based on symptoms"""
    if not predictor:
        return jsonify({'error': 'Predictor not available'}), 500
    
    try:
        data = request.get_json()
        
        if not data or 'symptoms' not in data:
            return jsonify({'error': 'Symptoms not provided'}), 400
        
        symptoms = data['symptoms']
        
        if not symptoms or len(symptoms) == 0:
            return jsonify({'error': 'At least one symptom is required'}), 400
        
        # Make prediction
        result = predictor.predict_disease(symptoms)
        
        # Add selected symptoms to result
        result['selected_symptoms'] = symptoms
        
        return jsonify(result)
        
    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({'error': str(e)}), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    print("🚀 Starting Disease Prediction API Server...")
    print("📍 Server will be available at: http://localhost:5000")
    print("🔗 API Endpoints:")
    print("   GET  /api/symptoms  - Get all symptoms")
    print("   GET  /api/diseases  - Get all diseases")
    print("   POST /api/predict   - Predict disease")
    print("   GET  /api/health    - Health check")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
