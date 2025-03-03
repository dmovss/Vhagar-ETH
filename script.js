// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
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
    let taps = 0;
    let farmedTokens = 0;

    // Show name modal on load
    nameModal.style.display = 'flex';

    // Handle name form submission
    nameForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const userName = userNameInput.value.trim();
        if (userName) {
            greeting.textContent = `Hello, ${userName}!`;
            nameModal.style.display = 'none';
            appContainer.style.display = 'block';
        } else {
            alert('Please enter your name to start farming!');
        }
    });

    // Farming logic: 10 taps = 1 #VHG token
    farmBtn.addEventListener('click', () => {
        taps++;
        counterDisplay.textContent = taps;

        // Trigger cracking animation
        tokenCircle.classList.remove('crack');
        void tokenCircle.offsetWidth; // Reset animation
        tokenCircle.classList.add('crack');

        // Update progress bar (0-100% over 10 taps)
        const progressPercentage = (taps % 10) * 10;
        progressBar.style.width = `${progressPercentage}%`;

        // Award tokens every 10 taps
        if (taps % 10 === 0) {
            farmedTokens++;
            farmedCount.textContent = farmedTokens;
            progressBar.style.width = '0%'; // Reset progress after farming a token
        }
    });
});