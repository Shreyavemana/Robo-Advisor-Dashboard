from flask import Flask, request, jsonify
import numpy as np
from sklearn.linear_model import LinearRegression

app = Flask(__name__)

# Example ML Model: A simple linear regression to predict portfolio value
# Train a dummy model for demonstration purposes
X_train = np.array([[1], [2], [3], [4], [5], [6], [7], [8], [9], [10]])  # Time in months
y_train = np.array([10000, 12000, 15000, 18000, 21000, 24000, 27000, 30000, 32000, 35000])  # Portfolio value

model = LinearRegression()
model.fit(X_train, y_train)

@app.route('/predict', methods=['POST'])
def predict():
    # Get data from POST request
    data = request.get_json(force=True)
    months = np.array([[data['months']]])
    
    # Make prediction
    predicted_value = model.predict(months)[0]

    return jsonify({"predicted_value": predicted_value})

if __name__ == '__main__':
    app.run(debug=True)
