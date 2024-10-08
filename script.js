let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

document.getElementById('submitGuess').addEventListener('click', function() {
    const guess = Number(document.getElementById('guess').value);
    attempts++;

    let message = '';
    if (guess < randomNumber) {
        message = 'Trop bas !';
    } else if (guess > randomNumber) {
        message = 'Trop haut !';
    } else {
        message = `Bravo ! Vous avez deviné le nombre ${randomNumber} en ${attempts} tentatives.`;
        document.getElementById('restart').style.display = 'block';
        document.getElementById('submitGuess').disabled = true;
    }

    document.getElementById('message').textContent = message;
});

document.getElementById('restart').addEventListener('click', function() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('guess').value = '';
    document.getElementById('message').textContent = '';
    document.getElementById('restart').style.display = 'none';
    document.getElementById('submitGuess').disabled = false;
});
