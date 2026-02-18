document.addEventListener('DOMContentLoaded', () => {
    // --- Custom Cursor Logic ---
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Immediate move for the dot
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
    });

    // Smooth follower for the outline
    const animateCursor = () => {
        const easing = 0.15; // Smoothness factor
        
        outlineX += (mouseX - outlineX) * easing;
        outlineY += (mouseY - outlineY) * easing;
        
        outline.style.left = `${outlineX}px`;
        outline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover state functionality
    const interactiveElements = document.querySelectorAll('a, button, .avatar-wrapper');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });

    // --- Staggered Entrance Animation ---
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `slideUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards ${index * 0.1 + 0.4}s`;
    });

    // --- Premium 3D Tilt Effect ---
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Subtle rotation
            const rotateX = ((y - centerY) / centerY) * -4; 
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    console.log("Modern Glassmorphism Design (V2 - Russian) Loaded");
});
