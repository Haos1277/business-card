document.addEventListener('DOMContentLoaded', () => {
    // --- Advanced Liquid Cursor Logic ---
    const dot = document.querySelector('.cursor-dot');
    const blob = document.querySelector('.cursor-blob');
    
    let mouseX = 0, mouseY = 0;
    let blobX = 0, blobY = 0;
    
    // Плавное следование шлейфа за курсором
    const dotSpeed = 1; // Точка следует мгновенно
    const blobSpeed = 0.15; // Шлейф тянется плавно
    
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Маленькая точка двигается сразу
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
    });

    const animate = () => {
        // Рассчитываем положение "жидкого" шлейфа через интерполяцию
        blobX += (mouseX - blobX) * blobSpeed;
        blobY += (mouseY - blobY) * blobSpeed;
        
        blob.style.left = `${blobX}px`;
        blob.style.top = `${blobY}px`;
        
        requestAnimationFrame(animate);
    };
    animate();

    // Эффекты наведения
    const targets = document.querySelectorAll('a, .avatar-frame, .school-logo-box');
    
    targets.forEach(link => {
        link.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        link.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });

    // --- 3D Card Tilt Effect ---
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (centerY - y) / 12; // Коэффициент наклона
            const rotateY = (x - centerX) / 12;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    // --- Entrance Animations Cascade ---
    const elements = document.querySelectorAll('.glass-card, .profile-header, .section-label');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 * index + 300);
    });

    console.log("Visual Storytelling Card Engine - Initialized");
});
