import pickle
import numpy as np
import pandas as pd

class DiseasePredictor: 
    def __init__(self):
        # Load the trained model and necessary components
        self.model = pickle.load(open('best_model.pkl', 'rb')) 
        self.label_encoder = pickle.load(open('label_encoder.pkl', 'rb'))
        self.symptoms_list = pickle.load(open('symptoms_list.pkl', 'rb'))
        self.model_info = pickle.load(open('model_info.pkl', 'rb'))
        
    def get_available_symptoms(self):
        """Return list of all available symptoms"""
        return sorted(self.symptoms_list)
    
    def predict_disease(self, selected_symptoms):
        """
        Predict disease based on selected symptoms
        
        Args:
            selected_symptoms: List of symptoms selected by user
            
        Returns:
            Dictionary with prediction results
        """
        # Create input vector
        input_vector = np.zeros(len(self.symptoms_list))
        
        # Set 1 for selected symptoms
        for symptom in selected_symptoms:
            if symptom in self.symptoms_list:
                index = self.symptoms_list.index(symptom)
                input_vector[index] = 1
        
        # Reshape for prediction
        input_vector = input_vector.reshape(1, -1)
        
        # Make prediction
        prediction = self.model.predict(input_vector)[0]
        probabilities = self.model.predict_proba(input_vector)[0]
        
        # Decode the prediction
        predicted_disease = self.label_encoder.inverse_transform([prediction])[0]
        
        # Get top 3 predictions with probabilities
        top_3_indices = np.argsort(probabilities)[-3:][::-1]
        top_3_predictions = []
        
        for idx in top_3_indices:
            disease = self.label_encoder.inverse_transform([idx])[0]
            probability = probabilities[idx]
            top_3_predictions.append({
                'disease': disease,
                'probability': float(probability)
            })
        
        return {
            'predicted_disease': predicted_disease,
            'confidence': float(probabilities[prediction]),
            'top_3_predictions': top_3_predictions,
            'model_used': self.model_info['best_model_name']
        }
    
    def get_symptom_questions(self, max_questions=10):
        """
        Generate a list of symptoms for user to select from
        Returns symptoms in a user-friendly format
        """
        symptoms = self.get_available_symptoms()
        
        # Clean up symptom names for better display
        clean_symptoms = []
        for symptom in symptoms:
            clean_symptom = symptom.replace('_', ' ').strip()
            clean_symptoms.append(clean_symptom)
        
        return clean_symptoms[:max_questions]
    
    def interactive_prediction(self):
        """
        Interactive method for symptom selection and prediction
        """
        print("=" * 60)
        print("DISEASE PREDICTION SYSTEM")
        print("=" * 60)
        print(f"Model: {self.model_info['best_model_name']}")
        print(f"Accuracy: {self.model_info['best_accuracy']:.2%}")
        print(f"Available Diseases: {len(self.label_encoder.classes_)}")
        print(f"Available Symptoms: {len(self.symptoms_list)}")
        print("=" * 60)
        
        # Display available symptoms
        symptoms = self.get_symptom_questions()
        print("\nAvailable Symptoms:")
        for i, symptom in enumerate(symptoms, 1):
            print(f"{i:2d}. {symptom}")
        
        print("\n" + "=" * 60)
        print("Enter the numbers of symptoms you're experiencing")
        print("Separate multiple numbers with commas (e.g., 1,5,12)")
        print("Enter 'all' to see all symptoms")
        print("Enter 'done' when finished")
        print("=" * 60)
        
        selected_symptoms = []
        
        while True:
            user_input = input("\nYour choice: ").strip().lower()
            
            if user_input == 'done':
                if not selected_symptoms:
                    print("Please select at least one symptom.")
                    continue
                break
            elif user_input == 'all':
                all_symptoms = self.get_available_symptoms()
                print("\nAll Available Symptoms:")
                for i, symptom in enumerate(all_symptoms, 1):
                    clean_symptom = symptom.replace('_', ' ').strip()
                    print(f"{i:3d}. {clean_symptom}")
                continue
            else:
                try:
                    # Parse the input
                    numbers = [int(x.strip()) for x in user_input.split(',')]
                    
                    for num in numbers:
                        if 1 <= num <= len(symptoms):
                            symptom_key = symptoms[num - 1].replace(' ', '_')
                            if symptom_key not in selected_symptoms:
                                selected_symptoms.append(symptom_key)
                                print(f"Added: {symptoms[num - 1]}")
                            else:
                                print(f"Already selected: {symptoms[num - 1]}")
                        else:
                            print(f"Invalid number: {num}. Please enter numbers between 1 and {len(symptoms)}")
                
                except ValueError:
                    print("Invalid input. Please enter numbers separated by commas.")
        
        # Make prediction
        print("\n" + "=" * 60)
        print("ANALYZING SYMPTOMS...")
        print("=" * 60)
        
        result = self.predict_disease(selected_symptoms)
        
        # Display results
        print(f"\nSelected Symptoms: {len(selected_symptoms)}")
        for symptom in selected_symptoms:
            print(f"  • {symptom.replace('_', ' ').title()}")
        
        print(f"\n{'='*60}")
        print("PREDICTION RESULTS")
        print(f"{'='*60}")
        
        print(f"\n🏥 Most Likely Disease: {result['predicted_disease']}")
        print(f"📊 Confidence: {result['confidence']:.2%}")
        print(f"🤖 Model Used: {result['model_used']}")
        
        print(f"\n🔍 Top 3 Possible Diseases:")
        for i, pred in enumerate(result['top_3_predictions'], 1):
            print(f"  {i}. {pred['disease']} - {pred['probability']:.2%}")
        
        print(f"\n{'='*60}")
        print("⚠️  DISCLAIMER: This is for educational purposes only.")
        print("    Please consult a healthcare professional for medical advice.")
        print(f"{'='*60}")

# Example usage function
def predict_from_symptoms(symptoms_list):
    """
    Function to predict disease from a list of symptoms
    
    Args:
        symptoms_list: List of symptom strings (e.g., ['fever', 'cough', 'headache'])
    
    Returns:
        Prediction results dictionary
    """
    predictor = DiseasePredictor()
    
    # Convert symptoms to the format used in training
    formatted_symptoms = []
    for symptom in symptoms_list:
        formatted_symptom = symptom.lower().replace(' ', '_')
        if formatted_symptom in predictor.symptoms_list:
            formatted_symptoms.append(formatted_symptom)
    
    if not formatted_symptoms:
        return {"error": "No valid symptoms found"}
    
    return predictor.predict_disease(formatted_symptoms)

if __name__ == "__main__":
    # Create predictor instance
    predictor = DiseasePredictor()
    
    # Run interactive prediction
    predictor.interactive_prediction()
