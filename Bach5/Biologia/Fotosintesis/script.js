let currentSlide = 1;
const totalSlides = 12;

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const feedbackOverlay = document.getElementById('feedback-overlay');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackText = document.getElementById('feedback-text');

// Navigation
function updateSlides() {
    document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.remove('active');
    });
    document.getElementById(`slide-${currentSlide}`).classList.add('active');

    // Update button states
    prevBtn.disabled = currentSlide === 1;
    nextBtn.disabled = currentSlide === totalSlides;
}

prevBtn.addEventListener('click', () => {
    if (currentSlide > 1) {
        currentSlide--;
        updateSlides();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides) {
        currentSlide++;
        updateSlides();
    }
});

// Feedback System
window.showFeedback = function(isCorrect, message) {
    feedbackTitle.innerText = isCorrect ? '¡Excelente!' : '¡Sigue intentando!';
    feedbackTitle.style.color = isCorrect ? '#4caf50' : '#db6015';
    feedbackText.innerText = message;
    feedbackOverlay.style.display = 'flex';
};

window.hideFeedback = function() {
    feedbackOverlay.style.display = 'none';
    // Clear any temporary incorrect styles
    document.querySelectorAll('.option-btn.incorrect').forEach(btn => {
        btn.classList.remove('incorrect');
    });
};

window.checkAnswer = function(btn, isCorrect, message) {
    if (isCorrect) {
        btn.classList.add('correct');
        showFeedback(true, message);
    } else {
        btn.classList.add('incorrect');
        showFeedback(false, message);
        setTimeout(() => btn.classList.remove('incorrect'), 1000);
    }
};

// Sequence Game Logic
let expectedOrder = 1;
window.handleSequence = function(btn) {
    const order = parseInt(btn.getAttribute('data-order'));
    const msgDiv = document.getElementById('sequence-msg');

    if (order === expectedOrder) {
        btn.classList.add('correct');
        btn.disabled = true;
        expectedOrder++;
        
        if (expectedOrder > 3) {
            msgDiv.innerText = "¡Orden correcto completado!";
            msgDiv.style.color = "#4caf50";
            showFeedback(true, "Has ordenado los pasos perfectamente. La energía fluye de la luz a la glucosa.");
        }
    } else {
        btn.classList.add('incorrect');
        msgDiv.innerText = "Ese no es el siguiente paso. ¡Intenta de nuevo!";
        msgDiv.style.color = "#db6015";
        
        setTimeout(() => {
            btn.classList.remove('incorrect');
            // Reset if wrong? Or just allow retry?
            // Let's allow retry without reset for better UX on mobile
        }, 500);
    }
};

// Initialize
updateSlides();
