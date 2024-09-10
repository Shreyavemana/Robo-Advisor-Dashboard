document.addEventListener('DOMContentLoaded', function() {
    // Initialize the chart
    const ctx = document.getElementById('performanceChart').getContext('2d');
    const performanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Portfolio Value ($)',
                data: [48000, 48500, 49000, 50000, 50500, 51000, 51500, 52000, 53000, 52500, 53500, 54000],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });

    // Prediction logic
    const predictionButton = document.getElementById('getPrediction');
    const predictionResult = document.getElementById('predictionResult');

    predictionButton.addEventListener('click', function() {
        const months = document.getElementById('monthsInput').value;

        // Validate input
        if (months <= 0 || isNaN(months)) {
            predictionResult.textContent = 'Please enter a valid number of months.';
            return;
        }

        // Make API request to Flask backend
        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ months: parseInt(months) })
        })
        .then(response => response.json())
        .then(data => {
            // Display the prediction
            predictionResult.textContent = `Predicted Portfolio Value: $${data.predicted_value.toFixed(2)}`;
        })
        .catch(error => {
            console.error('Error:', error);
            predictionResult.textContent = 'An error occurred while fetching the prediction.';
        });
    });
});
