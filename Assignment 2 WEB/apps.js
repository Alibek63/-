document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const speedControl = document.getElementById('speedControl');
    let currentIndex = 0;
    let speed = parseInt(speedControl.value);
    let interval;

    const updateCarousel = () => {
        const totalSlides = document.querySelectorAll('.carousel .video').length;
        currentIndex = (currentIndex + 1) % totalSlides;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    const startCarousel = () => {
        clearInterval(interval);
        interval = setInterval(updateCarousel, speed);
    };

    // Adjust speed dynamically
    speedControl.addEventListener('input', () => {
        speed = parseInt(speedControl.value);
        startCarousel();
    });

    // Start carousel on load
    startCarousel();
});


document.addEventListener('DOMContentLoaded', () => {
    const correctAnswers = {
        q1: 'c',
        q2: 'b',
        q3: 'b',
        q4: 'a',
        q5: 'a',
        q6: 'b',
        q7: 'c',
    };

    document.getElementById('submitQuiz').addEventListener('click', () => {
        let score = 0;
        const userAnswers = new FormData(document.getElementById('quizForm'));
        let totalQuestions = Object.keys(correctAnswers).length;

        // Clear previous feedback
        document.querySelectorAll('.question').forEach((question) => {
            question.classList.remove('correct', 'incorrect');
        });

        for (const [question, correctAnswer] of Object.entries(correctAnswers)) {
            const userAnswer = userAnswers.get(question);
            const questionElement = document.querySelector(`input[name="${question}"]`).closest('.question');

            if (userAnswer === correctAnswer) {
                score++;
                questionElement.classList.add('correct'); // Mark as correct
            } else {
                questionElement.classList.add('incorrect'); // Mark as incorrect
            }
        }

        // Display the result
        const resultDiv = document.getElementById('quizResult');
        resultDiv.innerHTML = `Вы набрали ${score} из ${totalQuestions}!`;

        if (score === totalQuestions) {
            resultDiv.innerHTML += `<br>Поздравляем! Вы эксперт в смарт-часах.`;
        } else if (score > totalQuestions / 2) {
            resultDiv.innerHTML += `<br>Хорошо! Но есть место для улучшения.`;
        } else {
            resultDiv.innerHTML += `<br>Попробуйте еще раз!`;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the map
    const map = L.map('map').setView([55.7558, 37.6173], 5); // Centered on Moscow, Russia

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Add markers for service centers
    const locations = [
        {
            name: 'Сервисный центр Jetix - Москва',
            coords: [55.7558, 37.6173],
            description: 'Основной центр обслуживания Jetix.',
        },
        {
            name: 'Сервисный центр Jetix - Санкт-Петербург',
            coords: [59.9343, 30.3351],
            description: 'Обслуживание и продажа.',
        },
        {
            name: 'Сервисный центр Jetix - Казань',
            coords: [55.7964, 49.1089],
            description: 'Поддержка клиентов и технические консультации.',
        },
    ];

    locations.forEach((location) => {
        L.marker(location.coords)
            .addTo(map)
            .bindPopup(`<b>${location.name}</b><br>${location.description}`);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Highcharts configuration
    Highcharts.chart('featuresChart', {
        chart: {
            type: 'pie',
        },
        title: {
            text: 'Популярные функции детских смарт-часов',
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        accessibility: {
            point: {
                valueSuffix: '%',
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                },
            },
        },
        series: [
            {
                name: 'Features',
                colorByPoint: true,
                data: [
                    { name: 'GPS навигация', y: 40 },
                    { name: 'Водостойкость', y: 30 },
                    { name: 'Wi-Fi подключение', y: 20 },
                    { name: '4G и видеозвонки', y: 10 },
                ],
            },
        ],
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const timelineEvents = document.querySelectorAll('.timeline-event');

    const handleScroll = () => {
        timelineEvents.forEach((event) => {
            const eventTop = event.getBoundingClientRect().top;
            if (eventTop < window.innerHeight - 50) {
                event.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger animation on page load
});

document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'ce7e38c733332d2a96085fb075c600af'; // Replace with your OpenWeatherMap API key
    const weatherForm = document.getElementById('weatherForm');
    const weatherResult = document.getElementById('weatherResult');

    weatherForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const city = document.getElementById('cityInput').value;

        try {
            // Fetch weather data
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
            if (!response.ok) throw new Error('Город не найден');
            const data = await response.json();

            // Display weather data
            const { main, weather } = data;
            weatherResult.innerHTML = `
                <p>Температура: <strong>${main.temp}°C</strong></p>
                <p>Состояние: <strong>${weather[0].description}</strong></p>
                <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather Icon">
            `;
        } catch (error) {
            weatherResult.innerHTML = `<p style="color: red;">Ошибка: ${error.message}</p>`;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const features = document.querySelectorAll('.feature');
    const dropZone = document.querySelector('.drop-zone');
    const selectedFeaturesList = document.querySelector('.selected-features');

    features.forEach((feature) => {
        feature.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', feature.dataset.feature);
            e.target.classList.add('dragging');
        });

        feature.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
        });
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('active');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('active');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('active');
        const featureName = e.dataTransfer.getData('text/plain');

        if (featureName) {
            const listItem = document.createElement('li');
            listItem.textContent = featureName;
            selectedFeaturesList.appendChild(listItem);
        }
    });
});


