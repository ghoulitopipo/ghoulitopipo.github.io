document.getElementById('game-container').innerHTML = `
    <h2>Jeu Memory</h2>
    <div id="memory-board"></div>
    <p id="status"></p>
`;

const cardValues = ['🍎', '🍌', '🍇', '🍒', '🍍', '🍓', '🍉', '🥝']; // Paires d'émojis fruits
let cards = [...cardValues, ...cardValues]; // Duplique les cartes pour obtenir des paires
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

shuffleCards();
createBoard();

// Mélange les cartes
function shuffleCards() {
    cards = cards.sort(() => 0.5 - Math.random());
}

// Crée le plateau de jeu
function createBoard() {
    const memoryBoard = document.getElementById('memory-board');
    memoryBoard.innerHTML = '';

    cards.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.value = value;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        memoryBoard.appendChild(card);
    });
}

// Fonction pour retourner une carte
function flipCard(event) {
    if (lockBoard) return;
    const clickedCard = event.target;

    if (clickedCard === firstCard) return; // Empêche de cliquer deux fois sur la même carte

    clickedCard.textContent = clickedCard.dataset.value;
    clickedCard.classList.add('flipped');

    if (!firstCard) {
        firstCard = clickedCard;
        return;
    }

    secondCard = clickedCard;
    lockBoard = true;

    checkForMatch();
}

// Vérifie si les deux cartes retournées sont une paire
function checkForMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {
        disableCards();
        matches++;
        if (matches === cardValues.length) {
            document.getElementById('status').textContent = 'Félicitations, vous avez gagné !';
        }
    } else {
        unflipCards();
    }
}

// Désactive les cartes correspondantes
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Retourne les cartes si elles ne correspondent pas
function unflipCards() {
    setTimeout(() => {
        firstCard.textContent = '';
        secondCard.textContent = '';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Réinitialise les variables après une tentative
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
