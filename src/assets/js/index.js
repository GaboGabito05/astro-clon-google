document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchIcon = document.getElementById('search-icon');
    const microIcon = document.getElementById('micro-icon');
    const timer = document.getElementById('timer');
    const secondsSpan = document.getElementById('seconds');

    console.log('DOM fully loaded and parsed');
    console.log('searchInput:', searchInput);
    console.log('searchButton:', searchButton);
    console.log('searchIcon:', searchIcon);
    console.log('microIcon:', microIcon);

    function performSearch() {
        const query = searchInput.value;
        console.log('Performing search for:', query);
        if (query) {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
    }

    searchButton.addEventListener('click', performSearch);
    searchIcon.addEventListener('click', performSearch);
    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'es-ES';

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            console.log('Voice input:', transcript);
            searchInput.value = transcript;
            performSearch();
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
        };

        microIcon.addEventListener('click', function() {
            let seconds = 0;
            timer.style.display = 'block';
            secondsSpan.textContent = seconds;

            const interval = setInterval(() => {
                seconds += 1;
                secondsSpan.textContent = seconds;
                if (seconds >= 5) {
                    clearInterval(interval);
                    timer.style.display = 'none';
                }
            }, 1000);

            recognition.start();
            setTimeout(() => {
                recognition.stop();
                clearInterval(interval);
                timer.style.display = 'none';
            }, 5000); // Stop listening after 5 seconds
        });
    } else {
        console.warn('Speech recognition not supported in this browser.');
    }
});