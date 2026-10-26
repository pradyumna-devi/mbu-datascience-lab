"""
Mohan Babu University (MBU) - Data Science Digital Laboratory
Experiment 10: Case Study: Text Emotion Detection
Task B [10B]: Text Emotion Detection with TF-IDF Vectorization, Logistic Regression, and Emoji Prediction

Aim:
To develop a Machine Learning model using TF-IDF and Logistic Regression that classifies
the emotional state expressed in a text message and displays the corresponding representative emoji.

Syntax / General Form:
model = Pipeline([
    ("tfidf", TfidfVectorizer(ngram_range=(1, 2))),
    ("classifier", LogisticRegression(max_iter=1000))
])
model.fit(X_train, y_train)
predictions = model.predict(X_test)
"""

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

# 1. Sample labeled dataset
data = {
    "text": [
        "I am very happy today",
        "This is a wonderful day",
        "I feel cheerful and excited",
        "I am sad and lonely",
        "I feel very disappointed",
        "I miss my family so much",
        "I am angry with you",
        "This makes me furious",
        "I hate this situation",
        "I am scared of the dark",
        "I am afraid of losing",
        "I feel nervous and frightened",
        "I love you so much",
        "You mean everything to me",
        "I adore spending time with you",
        "Wow this is unbelievable",
        "I did not expect this surprise",
        "What an amazing unexpected gift"
    ],
    "emotion": [
        "happy", "happy", "happy",
        "sadness", "sadness", "sadness",
        "anger", "anger", "anger",
        "fear", "fear", "fear",
        "love", "love", "love",
        "surprise", "surprise", "surprise"
    ]
}

df = pd.DataFrame(data)

# 2. Split dataset with stratification
X_train, X_test, y_train, y_test = train_test_split(
    df["text"],
    df["emotion"],
    test_size=0.33,
    random_state=42,
    stratify=df["emotion"]
)

# 3. Build Machine Learning Pipeline
model = Pipeline([
    ("tfidf", TfidfVectorizer(ngram_range=(1, 2))),
    ("classifier", LogisticRegression(max_iter=1000))
])

# 4. Train the model
model.fit(X_train, y_train)

# 5. Evaluate the model
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)
print("Test Accuracy:", round(accuracy * 100, 2), "%\n")

print("Classification Report:")
print(classification_report(y_test, predictions, zero_division=0))

# 6. Map emotions to expressive emojis
emoji_map = {
    "happy": "😊",
    "sadness": "😢",
    "anger": "😠",
    "fear": "😨",
    "love": "❤️",
    "surprise": "😲"
}

# 7. Real-time emotion and emoji inference function
def detect_emotion(text):
    emotion = model.predict([text])[0]
    emoji = emoji_map.get(emotion, "😐")
    print("Input Text:", text)
    print("Detected Emotion:", emotion.capitalize())
    print("Relevant Emoji:", emoji)
    print("-" * 35)
    return emotion, emoji

# 8. Test the application with diverse scenarios
print("\n--- Real-Time Test Inferences ---")
detect_emotion("I am happy to see you")
detect_emotion("I feel lonely today")
detect_emotion("I love my family")
detect_emotion("I am afraid of this darkness")
detect_emotion("You made me so angry")
detect_emotion("What a wonderful surprise")
