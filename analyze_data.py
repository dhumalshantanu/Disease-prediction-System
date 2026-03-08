import pandas as pd
import numpy as np

# Load the dataset
df = pd.read_csv('dataset.csv')

print("Dataset shape:", df.shape)
print("\nDiseases:", df['Disease'].unique())
print("\nTotal diseases:", len(df['Disease'].unique()))

# Get all unique symptoms
symptoms = set()
for col in df.columns[1:]:
    symptoms.update(df[col].dropna().unique())

print("\nTotal unique symptoms:", len(symptoms))
print("\nSample symptoms:", list(symptoms)[:20])

# Check for missing values
print("\nMissing values per column:")
print(df.isnull().sum())

# Show disease distribution
print("\nDisease distribution:")
print(df['Disease'].value_counts())
