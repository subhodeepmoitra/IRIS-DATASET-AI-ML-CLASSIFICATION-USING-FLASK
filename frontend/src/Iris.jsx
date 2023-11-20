import React, { useState } from 'react';
import './App.css'; // Import the CSS file for styling

function App() {
  const [sepalLength, setSepalLength] = useState('');
  const [sepalWidth, setSepalWidth] = useState('');
  const [petalLength, setPetalLength] = useState('');
  const [petalWidth, setPetalWidth] = useState('');
  const [prediction, setPrediction] = useState('');

  const handlePredict = async () => {
    // Validate user input
    if (
      !sepalLength ||
      !sepalWidth ||
      !petalLength ||
      !petalWidth ||
      isNaN(sepalLength) ||
      isNaN(sepalWidth) ||
      isNaN(petalLength) ||
      isNaN(petalWidth)
    ) {
      alert('Please enter valid input for all features.');
      return;
    }

    try {
      // Send a POST request to the server with JSON data
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sepal_length: sepalLength,
          sepal_width: sepalWidth,
          petal_length: petalLength,
          petal_width: petalWidth
        })
      });

      // Parse the response as JSON
      const data = await response.json();

      // Update the state with the prediction
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Prediction error:', error);
      alert('Error occurred during prediction. Please try again.');
    }
  };

  return (
    <div className="container">
       <h1>
        Iris Prediction App
        <span className="model-info">
          Using Neural Network
        </span>
      </h1>
      <p>This app predicts the category of iris based on the provided features.</p>
      <span className="model-info">
         Hidden Layers: 2
        </span>
        <span className="model-info">
        Activation Functions used: ReLU, Softmax <br/>
        &nbsp;
        </span>
      {/* ... (your existing input fields, button, and prediction display) */}
      <label>
        Enter Sepal Length:
        <input
          type="text"
          value={sepalLength}
          onChange={(e) => setSepalLength(e.target.value)}
        />
      </label>
      <label>
        Enter Sepal Width:
        <input
          type="text"
          value={sepalWidth}
          onChange={(e) => setSepalWidth(e.target.value)}
        />
      </label>
      <label>
        Enter Petal Length:
        <input
          type="text"
          value={petalLength}
          onChange={(e) => setPetalLength(e.target.value)}
        />
      </label>
      <label>
        Enter Petal Width:
        <input
          type="text"
          value={petalWidth}
          onChange={(e) => setPetalWidth(e.target.value)}
        />
      </label>
      <button onClick={handlePredict}>Predict</button>
      <p>Prediction: {prediction}</p>
    </div>
  );
}

export default App;
