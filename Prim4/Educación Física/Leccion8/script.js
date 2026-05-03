let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev');
        if (i === index) {
            slide.classList.add('active');
        } else if (i < index) {
            slide.classList.add('prev');
        }
    });

    // Toggle navigation arrows
    prevBtn.style.display = index === 0 ? 'none' : 'flex';
    nextBtn.style.display = index === slides.length - 1 ? 'none' : 'flex';
}

function nextSlide() {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

// --- Slide 7: Exploración Visual ---
function showExplore(type) {
    const feedback = document.getElementById('explore-feedback');
    const text = document.getElementById('explore-text');
    feedback.style.display = 'block';
    
    const contents = {
        'Vista': 'Los ojos captan dónde está el objeto o hacia dónde debemos ir.',
        'Cerebro': 'Procesa la información y envía la orden a los músculos.',
        'Músculos': 'Se mueven con precisión para realizar la acción.',
        'Equilibrio': 'Nos ayuda a no caernos mientras nos movemos.'
    };
    
    text.innerText = contents[type];
}

// --- Slide 8: Actividad de Comprensión ---
function checkAct1(element, isCorrect) {
    const feedback = document.getElementById('act1-feedback');
    const retryBtn = document.getElementById('act1-retry');
    const options = document.querySelectorAll('#act1-options .option');

    options.forEach(opt => opt.style.pointerEvents = 'none');

    feedback.style.display = 'block';
    if (isCorrect) {
        element.classList.add('correct');
        feedback.innerHTML = '✨ ¡Correcto! Usas tus ojos para guiar tus manos con precisión.';
        feedback.style.color = '#155724';
        retryBtn.style.display = 'none';
    } else {
        element.classList.add('incorrect');
        feedback.innerHTML = '❌ ¡Ups! Eso no es coordinación ojo-mano. Recuerda: usamos las manos guiadas por la vista. ¡Inténtalo de nuevo!';
        feedback.style.color = '#721c24';
        retryBtn.style.display = 'block';
    }
}

function retryAct1() {
    const feedback = document.getElementById('act1-feedback');
    const retryBtn = document.getElementById('act1-retry');
    const options = document.querySelectorAll('#act1-options .option');

    options.forEach(opt => {
        opt.classList.remove('correct', 'incorrect');
        opt.style.pointerEvents = 'auto';
    });
    feedback.style.display = 'none';
    retryBtn.style.display = 'none';
}

// --- Slide 9: Juego de Ordenar ---
let currentStep = 1;
function selectStep(element, stepOrder) {
    const feedback = document.getElementById('order-feedback');
    const retryBtn = document.getElementById('order-retry');

    if (stepOrder === currentStep) {
        element.classList.add('correct');
        element.style.pointerEvents = 'none';
        currentStep++;
        
        if (currentStep > 3) {
            feedback.style.display = 'block';
            feedback.innerHTML = '🌟 ¡Increíble! Has ordenado los pasos perfectamente.';
            feedback.style.color = '#155724';
            retryBtn.style.display = 'none';
        }
    } else {
        element.classList.add('incorrect');
        feedback.style.display = 'block';
        feedback.innerHTML = '❌ Ese no es el orden correcto. ¡Reinicia y vuelve a intentar!';
        feedback.style.color = '#721c24';
        retryBtn.style.display = 'block';
        
        // Disable all steps on error
        document.querySelectorAll('#order-game .option').forEach(opt => opt.style.pointerEvents = 'none');
    }
}

function retryOrder() {
    currentStep = 1;
    const feedback = document.getElementById('order-feedback');
    const retryBtn = document.getElementById('order-retry');
    const options = document.querySelectorAll('#order-game .option');

    options.forEach(opt => {
        opt.classList.remove('correct', 'incorrect');
        opt.style.pointerEvents = 'auto';
    });
    feedback.style.display = 'none';
    retryBtn.style.display = 'none';
}

// --- Slide 10: Aplicación Práctica ---
function checkApp(element, isCorrect) {
    const feedback = document.getElementById('app-feedback');
    feedback.style.display = 'block';
    if (isCorrect) {
        element.classList.add('correct');
        feedback.innerHTML = '✅ ¡Exacto! Necesitas coordinar todo tu cuerpo para moverte rápido.';
    } else {
        element.classList.add('incorrect');
        feedback.innerHTML = 'Recuerda que la fuerza ayuda, pero sin coordinación no sabrías hacia dónde moverte.';
    }
}

// --- Slide 11: Repaso Final ---
let quizStep = 0;
const quizData = [
    {
        q: "1. ¿La coordinación se puede mejorar con práctica?",
        options: ["Sí, siempre", "No, se nace así"],
        correct: 0,
        feedback: "¡Muy bien! La práctica hace al maestro."
    },
    {
        q: "2. ¿Qué usamos para la coordinación ojo-pie?",
        options: ["Solo los pies", "Vista y pies"],
        correct: 1,
        feedback: "¡Correcto! Los ojos guían el movimiento."
    },
    {
        q: "3. ¿La coordinación ayuda a evitar accidentes?",
        options: ["Sí", "No"],
        correct: 0,
        feedback: "¡Exacto! Nos permite reaccionar mejor."
    }
];

function checkQuiz(answerIndex) {
    const feedback = document.getElementById('quiz-feedback');
    const currentQ = quizData[quizStep];
    const isCorrect = (answerIndex === true && currentQ.correct === 0) || (answerIndex === false && currentQ.correct === 1);
    // Note: This logic is simplified for the True/False UI, let's refine it

    // Using buttons as indices is easier:
}

// Let's rewrite checkQuiz to be more robust
function checkQuiz(choiceIdx) {
    const feedback = document.getElementById('quiz-feedback');
    const currentQ = quizData[quizStep];
    
    if (choiceIdx === currentQ.correct) {
        feedback.style.display = 'block';
        feedback.innerHTML = "✅ " + currentQ.feedback;
        feedback.style.color = '#155724';
        
        setTimeout(() => {
            quizStep++;
            if (quizStep < quizData.length) {
                updateQuiz();
            } else {
                feedback.innerHTML = "🎉 ¡Has terminado el repaso con éxito!";
            }
        }, 2000);
    } else {
        feedback.style.display = 'block';
        feedback.innerHTML = "❌ ¡Inténtalo de nuevo!";
        feedback.style.color = '#721c24';
    }
}

function updateQuiz() {
    const qText = document.getElementById('quiz-q');
    const feedback = document.getElementById('quiz-feedback');
    const currentQ = quizData[quizStep];
    
    qText.innerText = currentQ.q;
    feedback.style.display = 'none';
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    currentQ.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option';
        btn.innerText = opt;
        btn.onclick = () => checkQuiz(idx);
        optionsContainer.appendChild(btn);
    });
}

// Initialize Quiz
updateQuiz();
