var loggedIn = false;
var temperatureData = [];

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  
  // For simplicity, hardcoded username and password
  if (username === "admin" && password === "password") {
    loggedIn = true;
    document.getElementById('loginForm').reset(); // Reset login form
    document.querySelector('.container').classList.add('logged-in');
    document.getElementById('loginCard').classList.add('hidden'); // Hide login card
    document.getElementById('data-entry').classList.remove('hidden');
    document.getElementById('visualization').classList.remove('hidden');
    initChart();
  } else {
    alert("Invalid username or password");
  }
});

document.getElementById('dataEntryForm').addEventListener('submit', function(event) {
  event.preventDefault();
  var temperature = parseFloat(document.getElementById('temperature').value);
  if (!isNaN(temperature)) {
    temperatureData.push(temperature);
    updateChart();
    // Clear temperature input box after data entry
    document.getElementById('temperature').value = '';
  } else {
    alert("Please enter a valid temperature");
  }
});

function initChart() {
  var ctx = document.getElementById('chart').getContext('2d');
  window.myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Temperature Data',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 2,
        fill: false
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function updateChart() {
  var chart = window.myChart;
  chart.data.labels = Array.from(Array(temperatureData.length).keys());
  chart.data.datasets[0].data = temperatureData;
  chart.update();
}
