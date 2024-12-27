document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll('.card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show'); // Ajoute la classe pour déclencher l'animation
            }
        });
    });

    animatedElements.forEach(element => observer.observe(element));
});
