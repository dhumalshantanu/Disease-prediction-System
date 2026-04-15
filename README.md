# Disease Prediction System 

A machine learning-based system that predicts diseases based on symptoms selected by users. 



## Features
- Interactive symptom selection
- Multiple ML models trained (Random Forest, SVM, Naive Bayes, KNN, Logistic Regression)
- Top 3 disease predictions with confidence scores
- User-friendly command-line interface

## Files Structure 
```
DPS/
├── dataset.csv                 # Original dataset
├── data_preprocessing.py       # Data preprocessing script
├── train_models.py            # Model training script
├── disease_predictor.py       # Core prediction class
├── main.py                    # Main application entry point
├── requirements.txt           # Python dependencies
├── README.md                  # This file
└── *.pkl                     # Trained models and processed data
```

## Installation & Setup

1. **Install Python Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the Setup Scripts** (in order)
   ```bash
   python data_preprocessing.py
   python train_models.py
   ``` 

3. **Run the Application**
   ```bash
   python main.py
   ```

## Usage

### Interactive Mode
Run `python main.py` and choose from the menu:
1. Interactive Symptom Selection - Step-by-step symptom selection
2. Quick Prediction - Enter symptoms directly
3. View Available Symptoms - See all possible symptoms
4. View Available Diseases - See all diseases the system can predict
5. Exit

### Demo Mode
See the system in action with sample cases:
```bash
python main.py demo
```

### Programmatic Usage
```python
from disease_predictor import predict_from_symptoms

# Predict disease from symptoms
result = predict_from_symptoms(['fever', 'cough', 'headache'])
print(f"Predicted disease: {result['predicted_disease']}")
print(f"Confidence: {result['confidence']:.2%}")
```

## Machine Learning Models

The system trains and evaluates multiple models:
- **Random Forest** (Best performing)
- **Support Vector Machine (SVM)**
- **Naive Bayes**
- **K-Nearest Neighbors (KNN)**
- **Logistic Regression**

All models achieved 100% accuracy on the test dataset.

## Sample Symptoms Available
- itching, skin_rash, nodal_skin_eruptions
- fever, headache, fatigue
- cough, breathlessness, chest_pain
- nausea, vomiting, abdominal_pain
- And many more...

## Diseases Predicted
- Fungal infection, Allergy, GERD
- Diabetes, Hypertension, Migraine
- Pneumonia, Tuberculosis, Malaria
- And 33 more diseases...

## Disclaimer
This system is for educational purposes only and should not be used for actual medical diagnosis. Always consult a qualified healthcare professional for medical advice and treatment.

## Performance Metrics
- **Training Accuracy**: 100%
- **Test Accuracy**: 100%
- **Number of Features**: 131 symptoms
- **Cross-validation**: 5-fold stratified

## Technical Details
- **Language**: Python 3.7+
- **ML Framework**: Scikit-learn
- **Data Processing**: Pandas, NumPy
- **Model Storage**: Pickle serialization

## Contributing
Feel free to enhance the system by:
1. Adding more diseases and symptoms
2. Implementing web interface
3. Adding more ML models
4. Improving the user interface

## Support
For issues or questions, please check the code comments or create an issue report.
