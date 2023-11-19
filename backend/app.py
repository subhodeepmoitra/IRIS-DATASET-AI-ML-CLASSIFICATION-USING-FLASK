from flask import Flask, render_template, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np

app = Flask(__name__)

# Load the trained model
model = load_model('iris_model.h5')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    features = [float(data['sepal_length']), float(data['sepal_width']), float(data['petal_length']), float(data['petal_width'])]
    input_features = np.array([features])
    prediction = model.predict(input_features)
    predicted_class = np.argmax(prediction, axis=1)[0]
    
    # Convert the predicted class back to the original label
    class_labels = ['Iris-setosa', 'Iris-versicolor', 'Iris-virginica']
    predicted_label = class_labels[predicted_class]
    
    return jsonify({'prediction': predicted_label})

if __name__ == '__main__':
    app.run(debug=True)

