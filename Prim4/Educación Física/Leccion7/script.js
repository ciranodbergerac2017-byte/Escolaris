document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const wrapper = document.getElementById('slides-wrapper');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentSlide = 0;

    // Navigation logic
    function updateSlide() {
        wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === slides.length - 1;
    }

    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlide();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateSlide();
        }
    });

    // --- INTERACTIVITY ---

    // Slide 6: Exploration Visual
    const explorerBtns = document.querySelectorAll('.explorer-btn');
    const explorerDisplay = document.getElementById('explorer-display');

    explorerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            explorerDisplay.textContent = btn.getAttribute('data-info');
            explorerDisplay.className = 'feedback-box info';
        });
    });

    // Slide 7: Quiz 1
    const quiz1Btns = document.querySelectorAll('#quiz-1 .option-btn');
    const quiz1Feedback = document.getElementById('quiz-1-feedback');

    quiz1Btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isCorrect = btn.getAttribute('data-correct') === 'true';
            if (isCorrect) {
                quiz1Feedback.textContent = "¡Muy bien! El ritmo es el alma de la Zumba. ✅";
                quiz1Feedback.className = "feedback-box correct";
            } else {
                quiz1Feedback.textContent = "¡Casi! En la Zumba nos movemos mucho. ¡Inténtalo de nuevo! 🔄";
                quiz1Feedback.className = "feedback-box incorrect";
            }
            quiz1Feedback.classList.remove('hidden');
        });
    });

    // Slide 8: Ordering Game
    const orderBtns = document.querySelectorAll('#game-order .order-btn');
    const orderFeedback = document.getElementById('order-feedback');
    const resetOrderBtn = document.getElementById('reset-order');
    let currentStep = 1;
    let orderSequence = [];

    orderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const step = parseInt(btn.getAttribute('data-step'));
            if (btn.classList.contains('selected')) return;

            if (step === currentStep) {
                btn.classList.add('selected');
                btn.textContent = `${currentStep}. ${btn.textContent}`;
                currentStep++;
                if (currentStep > 3) {
                    orderFeedback.textContent = "¡Excelente orden! Música -> Movimiento -> ¡Diversión! 🏆";
                    orderFeedback.className = "feedback-box correct";
                    orderFeedback.classList.remove('hidden');
                    resetOrderBtn.classList.remove('hidden');
                }
            } else {
                orderFeedback.textContent = "¡Oops! Ese no es el orden correcto. ¡Vuelve a intentarlo! 🔄";
                orderFeedback.className = "feedback-box incorrect";
                orderFeedback.classList.remove('hidden');
                resetOrderBtn.classList.remove('hidden');
            }
        });
    });

    resetOrderBtn.addEventListener('click', () => {
        currentStep = 1;
        orderBtns.forEach(btn => {
            btn.classList.remove('selected');
            btn.textContent = btn.textContent.replace(/^\d+\.\s/, '');
        });
        orderFeedback.classList.add('hidden');
        resetOrderBtn.classList.add('hidden');
    });

    // Slide 9: Practical Application
    const practiceBtns = document.querySelectorAll('#practice-quiz .option-btn');
    const practiceFeedback = document.getElementById('practice-feedback');

    practiceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isCorrect = btn.getAttribute('data-correct') === 'true';
            if (isCorrect) {
                practiceFeedback.textContent = "¡Exacto! El ejercicio libera energía positiva. ⚡";
                practiceFeedback.className = "feedback-box correct";
            } else {
                practiceFeedback.textContent = "¡Al revés! El movimiento te despierta. ¡Inténtalo de nuevo! 🔄";
                practiceFeedback.className = "feedback-box incorrect";
            }
            practiceFeedback.classList.remove('hidden');
        });
    });

    // Slide 10: Final Review (V/F)
    const vfBtns = document.querySelectorAll('.vf-btn');
    const repasoFeedback = document.getElementById('repaso-feedback');

    vfBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const ans = btn.getAttribute('data-ans');
            if (ans === 'v') {
                repasoFeedback.textContent = "¡Correcto! Bailar ayuda a que nuestro cerebro y cuerpo trabajen juntos. ✅";
                repasoFeedback.className = "feedback-box correct";
            } else {
                repasoFeedback.textContent = "¡Incorrecto! La coordinación es un gran beneficio de la Zumba. 🔄";
                repasoFeedback.className = "feedback-box incorrect";
            }
            repasoFeedback.classList.remove('hidden');
        });
    });

    // Initial call
    updateSlide();
});
