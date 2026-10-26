"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 10: Case Study: Text Emotion Detection
Task A [10A]: Text vectorization and Multinomial Naive Bayes classification pipeline

Aim:
To build an NLP classification pipeline using CountVectorizer and Multinomial Naive Bayes,
train it on emotion-labeled text messages, and predict emotion categories for test inputs.

Syntax / General Form:
vec = CountVectorizer()
X = vec.fit_transform(texts)
model = MultinomialNB()
model.fit(X, labels)
model.predict(vec.transform(test_texts))
"""

import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline

# 1. Sample emotion-labeled dataset
texts = [
    'I am very happy today',
    'This is a wonderful day',
    'I feel cheerful and excited',
    'I am sad and lonely',
    'I feel very disappointed',
    'I miss my family so much',
    'I am angry with you',
    'This makes me furious',
    'I hate this situation',
    'I am scared of the dark',
    'I am afraid of losing',
    'I feel nervous and frightened',
    'I love you so much',
    'You mean everything to me',
    'I adore spending time with you',
    'Wow this is unbelievable',
    'I did not expect this surprise',
    'What an amazing unexpected gift'
]

labels = [
    'happy', 'happy', 'happy',
    'sadness', 'sadness', 'sadness',
    'anger', 'anger', 'anger',
    'fear', 'fear', 'fear',
    'love', 'love', 'love',
    'surprise', 'surprise', 'surprise'
]

df = pd.DataFrame({'text': texts, 'emotion': labels})

print("Training Dataset Summary:")
print(df.head(10))
print("\nClass Distribution:")
print(df['emotion'].value_counts())

# 2. Vectorization & Pipeline Architecture
pipeline = Pipeline([
    ('vectorizer', CountVectorizer(ngram_range=(1, 2))),
    ('classifier', MultinomialNB())
])

# 3. Train model
pipeline.fit(texts, labels)
vocab_size = len(pipeline.named_steps['vectorizer'].vocabulary_)
print(f"\nModel trained successfully. Vocabulary feature count: {vocab_size}")

# 4. Test predictions
test_samples = [
    'I am so sad today',
    'I love spending time here with you',
    'This makes me furious and annoyed',
    'What an unbelievable wonderful surprise'
]

print("\n--- Test Predictions ---")
for sample in test_samples:
    pred = pipeline.predict([sample])[0]
    probs = pipeline.predict_proba([sample])[0]
    confidence = max(probs) * 100
    print(f"Input: \"{sample}\"")
    print(f"Predicted Emotion: {pred} (Confidence: {confidence:.2f}%)\n")
