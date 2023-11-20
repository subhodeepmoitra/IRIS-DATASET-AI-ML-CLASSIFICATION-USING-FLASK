from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model
model = load_model('iris_model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        print("Received data:", data)

        features = [float(data['sepal_length']), float(data['sepal_width']), float(data['petal_length']), float(data['petal_width'])]
        input_features = np.array([features])
        prediction = model.predict(input_features)
        predicted_class = np.argmax(prediction, axis=1)[0]

        # Convert the predicted class back to the original label
        class_labels = ['Iris-setosa', 'Iris-versicolor', 'Iris-virginica']
        predicted_label = class_labels[predicted_class]

        response = jsonify({'prediction': predicted_label})
        response.headers.add('Access-Control-Allow-Origin', '*')  # Allow all origins

        return response

    except Exception as e:
        print("Error:", e)
        return jsonify({'error': 'Something went wrong'}), 500  # Internal Server Error

if __name__ == '__main__':
    app.run(debug=True)
