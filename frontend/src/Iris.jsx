// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [sepalLength, setSepalLength] = useState('');
  const [sepalWidth, setSepalWidth] = useState('');
  const [petalLength, setPetalLength] = useState('');
  const [prediction, setPrediction] = useState('');

  const handlePredict = async () => {
    // Validate user input
    if (!sepalLength || !sepalWidth || !petalLength || isNaN(sepalLength) || isNaN(sepalWidth) || isNaN(petalLength)) {
      alert('Please enter valid input for all three features.');
      return;
    }

    try {
      // Send a POST request to the server
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        sepalLength,
        sepalWidth,
        petalLength
      });

      // Update the state with the prediction
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Prediction error:', error);
      alert('Error occurred during prediction. Please try again.');
    }
  };

  return (
    <div>
      <h1>Iris Prediction App</h1>
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
      <button onClick={handlePredict}>Predict</button>
      <p>Prediction: {prediction}</p>
    </div>
  );
}

export default App;
