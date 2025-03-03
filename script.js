// Language data
const translations = {
    en: {
        modalTitle: "Enter Your Name",
        startBtn: "Start Farming",
        welcomeText: "Farm #VHG Tokens by Cracking!",
        farmBtn: "Crack to Farm",
        farmedText: "Farmed: ",
        notification: "Your #VHG has been sent to the cloud",
        footerText: "Developed and designed by DMOVSS",
        bonusBtn: "Claim Daily Bonus",
        bonusTimer: "Next bonus: ",
        multiplierLabel: "Double Tap Rate",
        statsTaps: "Total Taps: ",
        statsStreak: "Streak: "
    },
    ru: {
        modalTitle: "Введите ваше имя",
        startBtn: "Начать фарминг",
        welcomeText: "Фармите токены #VHG, разбивая!",
        farmBtn: "Разбить для фарминга",
        farmedText: "Собрано: ",
        notification: "Ваш #VHG отправлен в облако",
        footerText: "Разработано и спроектировано DMOVSS",
        bonusBtn: "Получить дневной бонус",
        bonusTimer: "Следующий бонус: ",
        multiplierLabel: "Удвоить скорость тапов",
        statsTaps: "Всего тапов: ",
        statsStreak: "Серия: "
    }
};

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    const loading = document.getElementById('loading');
    const nameModal = document.getElementById('name-modal');
    const nameForm = document.getElementById('name-form');
    const userNameInput = document.getElementById('user-name');
    const appContainer = document.getElementById('app-container');
    const greeting = document.getElementById('greeting');
    const counterDisplay = document.getElementById('counter');
    const tokenCircle = document.getElementById('token-circle');
    const farmBtn = document.getElementById('farm-btn');
    const progressBar = document.getElementById('progress');
    const farmedCount = document.getElementById('farmed-count');
    const notification = document.getElementById('notification');
    const modalTitle = document.getElementById('modal-title');
    const startBtn = document.getElementById('start-btn');
    const welcomeText = document.getElementById('welcome-text');
    const farmedText = document.getElementById('farmed-text');
    const footerText = document.getElementById('footer-text');
    const bonusBtn = document.getElementById('bonus-btn');
    const bonusTimer = document.getElementById('bonus-timer');
    const multiplierToggle = document.getElementById('multiplier-toggle');
    const multiplierLabel = document.getElementById('multiplier-label');
    const totalTapsDisplay = document.getElementById('total-taps');
    const streakDisplay = document.getElementById('streak');
    let taps = 0;
    let farmedTokens = 0;
    let currentLang = 'en';
    let lastBonusDate = localStorage.getItem('lastBonusDate');
    let streak = parseInt(localStorage.getItem('streak')) || 0;
    let lastTapDate = localStorage.getItem('lastTapDate');

    // Function to update language
    function updateLanguage(lang) {
        currentLang = lang;
        modalTitle.textContent = translations[lang].modalTitle;
        startBtn.textContent = translations[lang].startBtn;
        welcomeText.textContent = translations[lang].welcomeText;
        farmBtn.textContent = translations[lang].farmBtn;
        farmedText.textContent = `${translations[lang].farmedText} ${farmedTokens} #VHG`;
        notification.textContent = translations[lang].notification;
        footerText.textContent = translations[lang].footerText;
        bonusBtn.textContent = translations[lang].bonusBtn;
        bonusTimer.textContent = `${translations[lang].bonusTimer} ${getNextBonusTime()}`;
        multiplierLabel.textContent = translations[lang].multiplierLabel;
        document.querySelector('.stats-section p:nth-child(1)').textContent = `${translations[lang].statsTaps} ${taps}`;
        document.querySelector('.stats-section p:nth-child(2)').textContent = `${translations[lang].statsStreak} ${streak} days`;

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    // Function to get next bonus time (midnight)
    function getNextBonusTime() {
        const now = new Date();
        const nextMidnight = new Date(now);
        nextMidnight.setHours(24, 0, 0, 0);
        const timeLeft = nextMidnight - now;
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Update bonus timer every second
    function updateBonusTimer() {
        bonusTimer.textContent = `${translations[currentLang].bonusTimer} ${getNextBonusTime()}`;
        if (lastBonusDate && new Date(lastBonusDate).toDateString() === new Date().toDateString()) {
            bonusBtn.disabled = true;
        } else {
            bonusBtn.disabled = false;
        }
    }

    // Check and update streak
    function updateStreak() {
        const today = new Date().toDateString();
        if (lastTapDate) {
            const lastDate = new Date(lastTapDate);
            const diffDays = Math.floor((new Date() - lastDate) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
                streak++;
            } else if (diffDays > 1) {
                streak = 1;
            }
        } else {
            streak = 1;
        }
        localStorage.setItem('streak', streak);
        localStorage.setItem('lastTapDate', today);
        document.querySelector('.stats-section p:nth-child(2)').textContent = `${translations[currentLang].statsStreak} ${streak} days`;
    }

    // Show loading animation for 2 seconds, then modal
    setTimeout(() => {
        loading.style.display = 'none';
        nameModal.style.display = 'flex';
    }, 2000);

    // Update language on load
    updateLanguage('en');
    setInterval(updateBonusTimer, 1000); // Update timer every second

    // Handle name form submission
    nameForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const userName = userNameInput.value.trim();
        if (userName) {
            greeting.textContent = `Hello, ${userName}!`;
            nameModal.style.display = 'none';
            appContainer.style.display = 'block';
        } else {
            alert(currentLang === 'en' ? 'Please enter your name to start farming!' : 'Пожалуйста, введите имя для начала фарминга!');
        }
    });

    // Language switcher
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            updateLanguage(btn.dataset.lang);
            farmedText.textContent = `${translations[currentLang].farmedText} ${farmedTokens} #VHG`;
        });
    });

    // Farming logic
    farmBtn.addEventListener('click', () => {
        taps++;
        counterDisplay.textContent = taps;
        totalTapsDisplay.textContent = taps;
        updateStreak();

        // Trigger cracking animation
        tokenCircle.classList.remove('crack', 'glow');
        void tokenCircle.offsetWidth; // Reset animations
        tokenCircle.classList.add('crack');

        // Update progress bar
        const tapsPerToken = multiplierToggle.checked ? 5 : 10;
        const progressPercentage = (taps % tapsPerToken) * (100 / tapsPerToken);
        progressBar.style.width = `${progressPercentage}%`;

        // Award tokens
        if (taps % tapsPerToken === 0) {
            farmedTokens++;
            farmedCount.textContent = farmedTokens;
            farmedText.textContent = `${translations[currentLang].farmedText} ${farmedTokens} #VHG`;
            progressBar.style.width = '0%';

            // Show notification and trigger glow animation
            notification.classList.add('show');
            tokenCircle.classList.add('glow');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 2000);
        }
    });

    // Daily bonus logic
    bonusBtn.addEventListener('click', () => {
        if (!bonusBtn.disabled) {
            farmedTokens++;
            farmedCount.textContent = farmedTokens;
            farmedText.textContent = `${translations[currentLang].farmedText} ${farmedTokens} #VHG`;
            lastBonusDate = new Date().toISOString();
            localStorage.setItem('lastBonusDate', lastBonusDate);
            bonusBtn.disabled = true;
            notification.textContent = currentLang === 'en' ? 'Bonus #VHG claimed!' : 'Бонус #VHG получен!';
            notification.classList.add('show');
            tokenCircle.classList.add('glow');
            setTimeout(() => {
                notification.classList.remove('show');
                notification.textContent = translations[currentLang].notification;
            }, 2000);
        }
    });

    // Multiplier toggle
    multiplierToggle.addEventListener('change', () => {
        const tapsPerToken = multiplierToggle.checked ? 5 : 10;
        const progressPercentage = (taps % tapsPerToken) * (100 / tapsPerToken);
        progressBar.style.width = `${progressPercentage}%`;
    });
});