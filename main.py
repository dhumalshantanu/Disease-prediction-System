#!/usr/bin/env python3
"""
Disease Prediction System
Main entry point for the disease prediction application

This system uses machine learning to predict diseases based on symptoms
selected by the user. It has been trained on a dataset of 41 diseases
and 131 different symptoms.

Usage:
    python main.py

Author: AI Assistant
"""

from disease_predictor import DiseasePredictor, predict_from_symptoms
import sys

def main():
    """Main function to run the disease prediction system"""
    
    print("🏥 DISEASE PREDICTION SYSTEM 🏥")
    print("=" * 50)
    
    try:
        # Initialize the predictor
        predictor = DiseasePredictor()
        
        print("✅ System loaded successfully!")
        print(f"📊 Model: {predictor.model_info['best_model_name']}")
        print(f"🎯 Accuracy: {predictor.model_info['best_accuracy']:.2%}")
        print(f"🔬 Diseases: {len(predictor.label_encoder.classes_)}")
        print(f"💊 Symptoms: {len(predictor.symptoms_list)}")
        
        while True:
            print("\n" + "=" * 50)
            print("MENU OPTIONS:")
            print("1. Interactive Symptom Selection")
            print("2. Quick Prediction (enter symptoms directly)")
            print("3. View Available Symptoms")
            print("4. View Available Diseases")
            print("5. Exit")
            print("=" * 50)
            
            choice = input("\nEnter your choice (1-5): ").strip()
            
            if choice == '1':
                # Interactive symptom selection
                predictor.interactive_prediction()
                
            elif choice == '2':
                # Quick prediction
                print("\nEnter symptoms separated by commas:")
                print("Example: fever, cough, headache, fatigue")
                symptoms_input = input("Symptoms: ").strip()
                
                if symptoms_input:
                    symptoms = [s.strip().lower() for s in symptoms_input.split(',')]
                    result = predict_from_symptoms(symptoms)
                    
                    if 'error' in result:
                        print(f"❌ Error: {result['error']}")
                    else:
                        print(f"\n🏥 Predicted Disease: {result['predicted_disease']}")
                        print(f"📊 Confidence: {result['confidence']:.2%}")
                        print(f"\n🔍 Top 3 Predictions:")
                        for i, pred in enumerate(result['top_3_predictions'], 1):
                            print(f"  {i}. {pred['disease']} - {pred['probability']:.2%}")
                else:
                    print("❌ Please enter at least one symptom.")
                    
            elif choice == '3':
                # View available symptoms
                symptoms = predictor.get_available_symptoms()
                print(f"\n💊 Available Symptoms ({len(symptoms)}):")
                print("-" * 40)
                for i, symptom in enumerate(symptoms[:20], 1):
                    clean_symptom = symptom.replace('_', ' ').title()
                    print(f"{i:2d}. {clean_symptom}")
                
                if len(symptoms) > 20:
                    print(f"... and {len(symptoms) - 20} more symptoms")
                    print("Enter 'all' in the interactive mode to see all symptoms.")
                    
            elif choice == '4':
                # View available diseases
                diseases = predictor.label_encoder.classes_
                print(f"\n🏥 Available Diseases ({len(diseases)}):")
                print("-" * 40)
                for i, disease in enumerate(diseases, 1):
                    print(f"{i:2d}. {disease}")
                    
            elif choice == '5':
                print("\n👋 Thank you for using the Disease Prediction System!")
                print("⚠️  Remember: This is for educational purposes only.")
                print("    Always consult a healthcare professional for medical advice.")
                break
                
            else:
                print("❌ Invalid choice. Please enter a number between 1-5.")
                
    except FileNotFoundError as e:
        print(f"❌ Error: Required files not found.")
        print("Please ensure you have run the training scripts first:")
        print("  1. python data_preprocessing.py")
        print("  2. python train_models.py")
        print(f"Missing file: {e}")
        
    except Exception as e:
        print(f"❌ An unexpected error occurred: {e}")
        print("Please check your setup and try again.")

def demo():
    """Run a demo of the system with sample symptoms"""
    print("🎭 RUNNING DEMO...")
    print("=" * 50)
    
    # Sample symptoms for different diseases
    demo_cases = [
        {
            'symptoms': ['fever', 'headache', 'skin_rash'],
            'description': 'Common symptoms that might indicate multiple conditions'
        },
        {
            'symptoms': ['cough', 'fatigue', 'breathlessness'],
            'description': 'Respiratory-related symptoms'
        },
        {
            'symptoms': ['itching', 'skin_rash', 'nodal_skin_eruptions'],
            'description': 'Skin-related symptoms'
        }
    ]
    
    for i, case in enumerate(demo_cases, 1):
        print(f"\n📋 Demo Case {i}: {case['description']}")
        print(f"Symptoms: {', '.join(case['symptoms'])}")
        
        result = predict_from_symptoms(case['symptoms'])
        
        if 'error' not in result:
            print(f"🏥 Predicted: {result['predicted_disease']}")
            print(f"📊 Confidence: {result['confidence']:.2%}")
        else:
            print(f"❌ Error: {result['error']}")
        
        print("-" * 30)

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == 'demo':
        demo()
    else:
        main()
