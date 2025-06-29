const apiKey = "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"; // 🔑 Replace with your OpenWeatherMap API key

function getWeather(cityName) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      if (data.cod === 200) {
        displayWeather(data);
      } else {
        document.getElementById("result").innerText = "City not found!";
      }
    })
    .catch(() => {
      document.getElementById("result").innerText = "Failed to fetch weather data.";
    });
}

function displayWeather(data) {
  const { name, main, weather, wind } = data;
  document.getElementById("result").innerHTML = `
    <h2>📍 ${name}</h2>
    <p><strong>🌡️ Temperature:</strong> ${main.temp}°C</p>
    <p><strong>💧 Humidity:</strong> ${main.humidity}%</p>
    <p><strong>☁️ Condition:</strong> ${weather[0].description}</p>
    <p><strong>🌬️ Wind Speed:</strong> ${wind.speed} m/s</p>
  `;
}

function getWeatherFromInput() {
  const city = document.getElementById("city").value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name!");
  }
}

// Hook for "Get Weather" button
function getWeather() {
  getWeatherFromInput();
}

// 🔍 GPS Detection
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => displayWeather(data))
        .catch(() => {
          document.getElementById("result").innerText = "Failed to detect location.";
        });
    }, () => {
      document.getElementById("result").innerText = "Location access denied.";
    });
  } else {
    document.getElementById("result").innerText = "Geolocation not supported.";
  }
}

// 🎤 Voice Recognition
function startVoice() {
  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const city = event.results[0][0].transcript;
      document.getElementById("city").value = city;
      getWeather(city);
    };

    recognition.onerror = () => {
      document.getElementById("result").innerText = "Voice recognition failed.";
    };
  } else {
    alert("Speech Recognition not supported in this browser.");
  }
}
