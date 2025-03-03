// Language data
const translations = {
    en: {
        modalTitle: "Enter Your Name",
        startBtn: "Start Farming",
        welcomeText: "Farm #VHG Tokens by Cracking!",
        farmBtn: "Crack to Farm",
        farmedText: "Farmed: ",
        notification: "Your #VHG has been sent to the cloud",
        footerText: "Developed and designed by DMOVSS"
    },
    ru: {
        modalTitle: "Введите ваше имя",
        startBtn: "Начать фарминг",
        welcomeText: "Фармите токены #VHG, разбивая!",
        farmBtn: "Разбить для фарминга",
        farmedText: "Собрано: ",
        notification: "Ваш #VHG отправлен в облако",
        footerText: "Разработано и спроектировано DMOVSS"
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
    let taps = 0;
    let farmedTokens = 0;
    let currentLang = 'en';

    // Show loading animation for 1.5 seconds, then modal
    setTimeout(() => {
        loading.style.display = 'none';
        nameModal.style.display = 'flex';
    }, 1500);

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

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    // Update language on load
    updateLanguage('en');

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
            // Update farmed text dynamically with current count
            farmedText.textContent = `${translations[currentLang].farmedText} ${farmedTokens} #VHG`;
        });
    });

    // Farming logic: 10 taps = 1 #VHG token
    farmBtn.addEventListener('click', () => {
        taps++;
        counterDisplay.textContent = taps;

        // Trigger cracking animation
        tokenCircle.classList.remove('crack', 'glow');
        void tokenCircle.offsetWidth; // Reset animations
        tokenCircle.classList.add('crack');

        // Update progress bar (0-100% over 10 taps)
        const progressPercentage = (taps % 10) * 10;
        progressBar.style.width = `${progressPercentage}%`;

        // Award tokens every 10 taps
        if (taps % 10 === 0) {
            farmedTokens++;
            farmedCount.textContent = farmedTokens;
            farmedText.textContent = `${translations[currentLang].farmedText} ${farmedTokens} #VHG`;
            progressBar.style.width = '0%'; // Reset progress after farming a token

            // Show notification and trigger glow animation
            notification.classList.add('show');
            tokenCircle.classList.add('glow');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 2000); // Hide notification after 2 seconds
        }
    });
});