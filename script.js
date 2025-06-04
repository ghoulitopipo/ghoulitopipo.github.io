// Données des avis
const avis = {
  "elden-ring": {
    titre: "Elden Ring",
    texte: "J'ai passé l'été 2023 à jouer à Elden Ring, et bon dieu que je ne regrette pas. Même si le jeu est tout sauf compréhensible au début, il devient naturellement addictif au fil du temps. Même si certains points sont a revoir (certains boss sur-utilisés, la difficulté parfois trop simple et parfois juste ??, ... ), le jeu reste quand même incroyable et est le meilleur moyen de se lancer dans les jeux FromSoftware. Bref banger prends ton 9 et au dodo (le dlc est un banger aussi je recommande également)",
    note: 9.0
  },
  "hades": {
    titre: "Hades",
    texte: "Bon rogue-like, persos attachants, gameplay qui pète sa mère, builds variés que dire de plus sérieusement ? Mon seul point négatif c'est la grosse tête de Hermès la nn sérieusement, ses boons servent a rien et juste pour ça il mérite le 8.9",
    note: 8.9
  },
  "zeldatotk": {
    titre: "Zelda: Tears of the Kingdom",
    texte: "j'ai pas fini le jeu dsl de la confession </3 il me fallait juste un 3ème pour tester l'affichage des avis",
    note: 5.0
  }
};

// Navigation entre les sections
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('data-section');
    document.querySelectorAll('main section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(targetId).classList.add('active');
  });
});

// Affichage des avis de jeux
document.querySelectorAll('#liste-jeux li').forEach(item => {
  item.addEventListener('click', () => {
    const jeu = avis[item.dataset.jeu];
    document.getElementById('titre-jeu').textContent = jeu.titre;
    document.getElementById('texte-avis').textContent = jeu.texte;
    document.getElementById('note-jeu').textContent = jeu.note;
    document.getElementById('liste-jeux').style.display = 'none';
    document.getElementById('avis-jeu').style.display = 'block';
  });
});

// Retour à la liste des jeux
document.getElementById('retour-jeux').addEventListener('click', () => {
  document.getElementById('avis-jeu').style.display = 'none';
  document.getElementById('liste-jeux').style.display = 'flex'; 
});
