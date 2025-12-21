import React, { useState, useEffect } from "react";

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiKey = "80938bf295f651c8f8b6d3315de680c7";
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

                try {
                    const res = await fetch(url);
                    const data = await res.json();

                    if (!data.list) throw new Error("No weather data");

                    // Current Weather (first item)
                    const current = data.list[0];
                    const now = new Date(); // Or use forecast date, but user code used 'now' for "Today"

                    const currentData = {
                        city: data.city.name,
                        day: `Today: ${days[now.getDay()]}`,
                        temp: Math.round(current.main.temp),
                        condition: current.weather[0].main,
                        humidity: current.main.humidity,
                    };

                    // Forecast: Every 8th item (approx 24h intervals)
                    const start = 8; // Start from next day roughly
                    const limit = 48; // Up to 5 days roughly in 3-hour steps
                    const dailyForecast = [];

                    for (
                        let i = start;
                        i < data.list.length && i <= limit;
                        i += 8
                    ) {
                        const d = new Date(data.list[i].dt * 1000);
                        dailyForecast.push({
                            dayName: days[d.getDay()],
                            temp: Math.round(data.list[i].main.temp),
                        });
                    }

                    setWeatherData(currentData);
                    setForecast(dailyForecast);
                    setLoading(false);
                } catch (err) {
                    console.error(err);
                    setError("Weather unavailable");
                    setLoading(false);
                }
            },
            (err) => {
                console.error(err);
                setError("Location permission denied");
                setLoading(false);
            }
        );
    }, []);

    if (loading)
        return (
            <div className="card weather-card loading">
                Getting Location & Weather...
            </div>
        );
    if (error) return <div className="card weather-card error">{error}</div>;

    return (
        <div
            className="card weather-card"
            style={{
                background: "linear-gradient(to right, #6dd5fa, #2980b9)",
                color: "white",
                marginBottom: "30px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <div>
                    <h2
                        style={{
                            margin: 0,
                            fontSize: "2rem",
                            fontWeight: "bold",
                        }}
                    >
                        {weatherData.temp}°C
                    </h2>
                    <p
                        style={{
                            fontSize: "1.1rem",
                            margin: "5px 0",
                            fontWeight: "bold",
                        }}
                    >
                        Current Condition:  {weatherData.condition}
                    </p>
                    <p style={{ margin: 0, fontWeight: "bold" }}>
                        Current City:  {weatherData.city}
                    </p>
                </div>
                <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                        {weatherData.day}
                    </p>
                    <p>Humidity:  {weatherData.humidity}%</p>
                </div>
            </div>

            <div
                className="forecast-container"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(255,255,255,0.3)",
                    paddingTop: "15px",
                }}
            >
                {forecast.map((f, index) => (
                    <div
                        key={index}
                        className="day-card"
                        style={{ textAlign: "center" }}
                    >
                        <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                            {f.dayName}
                        </p>
                        <span>{f.temp}°C</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Weather;
