// Form Validation
document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if (name === "" || !email.endsWith("@astanait.edu.kz")) {
        document.getElementById("formMessage").innerText = "Введите корректный email.";
        alert("Ошибка: валидация не пройдена.");
    } else {
        document.getElementById("formMessage").innerText = "Форма успешно отправлена!";
        alert("Форма успешно отправлена!");
    }
});

// To-Do List with Higher-Order Function
function addTask() {
    const task = document.getElementById("taskInput").value;
    if (task !== "") {
        const taskList = document.getElementById("taskList");
        const tasks = taskList.querySelectorAll("li");
        const newTask = document.createElement("li");
        newTask.textContent = task;

        Array.from(tasks).forEach(task => taskList.appendChild(task));
        taskList.appendChild(newTask);

        document.getElementById("taskInput").value = "";
    }
}

// Number Sorting Tool
function sortNumbers(ascending) {
    const input = document.getElementById("numbersInput").value;
    const numbers = input.split(",").map(Number).filter(n => !isNaN(n));

    if (ascending) {
        numbers.sort((a, b) => a - b);
    } else {
        numbers.sort((a, b) => b - a);
    }

    document.getElementById("sortedResult").innerText = "Отсортированные числа: " + numbers.join(", ");
}

// Change Background Color
function changeBackgroundColor() {
    const colors = ["#f0f8ff", "#faebd7", "#ff6347", "#e6e6fa"];
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
}

// Display Current Date and Time
function displayDateTime() {
    const now = new Date();
    const formattedDate = now.toLocaleString('ru-RU', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric'
    });
    document.getElementById("currentDateTime").innerText = formattedDate;
}
setInterval(displayDateTime, 1000);

let randomNumber = Math.floor(Math.random() * 100) + 1;

let attempts = JSON.parse(localStorage.getItem("attempts")) || [];

function checkGuess() {
    const guessInput = document.getElementById("guessInput");
    const guess = Number(guessInput.value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert("Пожалуйста, введите число от 1 до 100.");
        return;
    }

    let message = "";

    if (guess === randomNumber) {
        message = `Правильно! Вы угадали число ${randomNumber}. Игра окончена.`;
        randomNumber = Math.floor(Math.random() * 100) + 1; 
        attempts = []; 
    } else if (guess < randomNumber) {
        message = "Слишком мало! Попробуйте снова.";
    } else {
        message = "Слишком много! Попробуйте снова.";
    }

    
    attempts.push(guess);
    localStorage.setItem("attempts", JSON.stringify(attempts));

    displayAttempts();

    document.getElementById("guessMessage").innerText = message;

    guessInput.value = "";
}

function displayAttempts() {
    const attemptsList = document.getElementById("attemptsList");
    attemptsList.innerHTML = ""; 

    attempts.forEach((attempt, index) => {
        const listItem = document.createElement("li");
        listItem.innerText = `Попытка ${index + 1}: ${attempt}`;
        attemptsList.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    displayAttempts();
    
});


// рейтинг
const clickSound = new Audio('click-sound.wav');


function setRating(rating) {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star, index) => {
        star.style.color = index < rating ? "gold" : "gray"; 
    });
}

// localStorage при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    const savedRating = localStorage.getItem("userRating"); 
    if (savedRating) {
        setRating(savedRating); 
    }
});

// обработчики клика для звёз
const stars = document.querySelectorAll(".star");
stars.forEach((star, index) => {
    star.addEventListener("click", () => {
        const rating = index + 1; 
        setRating(rating);
        localStorage.setItem("userRating", rating); // Сохраняем
        clickSound.play(); 
    });
});



// Day/Night Theme Switch
function toggleTheme() {
    document.body.classList.toggle("night-theme");
}

// Display current time when the button is clicked
function showCurrentTime() {
    const time = new Date().toLocaleTimeString();
    document.getElementById("timeDisplay").innerText = "Текущее время: " + time;
}

// Reset form inputscl
function resetForm() {
    document.querySelectorAll('input').forEach(input => input.value = '');
    document.getElementById("formMessage").innerText = "";
}


function loadRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    
    quoteDisplay.innerText = "Загрузка...";
    
    setTimeout(() => {
        fetch('https://api.adviceslip.com/advice')
            .then(response => response.json())
            .then(data => {
                quoteDisplay.innerText = `"${data.content}" - ${data.author}`;
            })
            .catch(error => {
                console.error("Ошибка при загрузке цитаты:", error);
                quoteDisplay.innerText = "Не удалось загрузить цитату.";
            });
    }, 3000);  
}


// Массив всех страниц для переключения
// Function to switch pages
function switchPage(direction) {
    const pages = ['cataloge.html', 'extr.html', 'Support.html', 'Contacts.html']; // List of pages
    const currentPage = window.location.href.split('/').pop();
    const currentIndex = pages.indexOf(currentPage);

    if (direction === 'left' && currentIndex > 0) {
        window.location.href = pages[currentIndex - 1];
    } else if (direction === 'right' && currentIndex < pages.length - 1) {
        window.location.href = pages[currentIndex + 1];
    }
}

// Event listener for keydown to switch pages
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        switchPage('left');
    } else if (event.key === 'ArrowRight') {
        switchPage('right');
    }
});



