document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('data-section');

    // Masquer toutes les sections
    document.querySelectorAll('main section').forEach(sec => sec.classList.remove('active'));

    // Afficher la section ciblée
    document.getElementById(targetId).classList.add('active');
  });
});
