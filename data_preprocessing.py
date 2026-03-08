import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
import pickle

# Load the dataset
df = pd.read_csv('dataset.csv')

# Clean symptom names (remove leading/trailing spaces)
for col in df.columns[1:]:
    df[col] = df[col].str.strip()

# Get all unique symptoms
symptoms = set()
for col in df.columns[1:]:
    symptoms.update(df[col].dropna().unique())
symptoms = sorted(list(symptoms))

# Create binary features for each symptom
for symptom in symptoms:
    df[symptom] = 0

# Fill binary features
for i, row in df.iterrows():
    for col in df.columns[1:18]:  # Only original symptom columns
        symptom = row[col]
        if pd.notna(symptom):
            df.at[i, symptom] = 1

# Remove original symptom columns
df = df.drop(columns=[f'Symptom_{i}' for i in range(1, 18)])

# Prepare features and target
X = df.drop('Disease', axis=1)
y = df['Disease']

# Encode the target variable
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
)

# Save the processed data and encoders
pickle.dump(X_train, open('X_train.pkl', 'wb'))
pickle.dump(X_test, open('X_test.pkl', 'wb'))
pickle.dump(y_train, open('y_train.pkl', 'wb'))
pickle.dump(y_test, open('y_test.pkl', 'wb'))
pickle.dump(le, open('label_encoder.pkl', 'wb'))
pickle.dump(symptoms, open('symptoms_list.pkl', 'wb'))

print("Data preprocessing completed!")
print(f"Features shape: {X.shape}")
print(f"Number of diseases: {len(le.classes_)}")
print(f"Number of symptoms: {len(symptoms)}")
print(f"Training set size: {X_train.shape[0]}")
print(f"Test set size: {X_test.shape[0]}")
