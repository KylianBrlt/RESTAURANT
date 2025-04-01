document.addEventListener('DOMContentLoaded', function() {
    // Animation des éléments lors du défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            
            if (elementPosition < screenHeight - 100) {
                element.classList.add('visible');
            }
        });
    };
    
    // Animation du menu collant
    const handleNavbarScroll = function() {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    };
    
    // Initialisation des animations
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Appliquer les classes d'animation
    document.querySelectorAll('section h2').forEach(el => {
        el.classList.add('fade-in');
    });
    
    document.querySelectorAll('.card').forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Déclencher l'animation au chargement
    animateOnScroll();
    handleNavbarScroll();
});