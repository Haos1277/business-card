document.addEventListener('DOMContentLoaded', () => {
    // --- Custom Cursor Logic ---
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    
    let mouseX = 0, mouseY = 0, outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    const animateCursor = () => {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        outline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover state
    const target = document.querySelectorAll('a, button, .avatar-box');
    target.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // --- Staggered Animations ---
    const items = document.querySelectorAll('.glass-card, .profile-header');
    items.forEach((item, i) => {
        item.style.opacity = '0';
        item.style.animation = `slideUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards ${i * 0.1 + 0.5}s`;
    });

    // --- 3D Tilt ---
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            const x = e.clientX - r.left, y = e.clientY - r.top;
            const rx = ((y - r.height/2) / (r.height/2)) * -5;
            const ry = ((x - r.width/2) / (r.width/2)) * 5;
            card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    console.log("Modern Card v3.0 Loaded");
});
