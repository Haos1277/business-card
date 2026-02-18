document.addEventListener('DOMContentLoaded', () => {
    // --- Жидкий курсор (Advanced Liquid Cursor) ---
    const dot = document.querySelector('.cursor-dot');
    const blob = document.querySelector('.cursor-blob');
    
    let mouse = { x: 0, y: 0 };
    let blobPos = { x: 0, y: 0 };
    let speed = 0.15; // Плавность следования основного круга

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        
        // Маленькая точка двигается мгновенно
        dot.style.left = `${mouse.x}px`;
        dot.style.top = `${mouse.y}px`;
    });

    // Анимация "плавающего" круга
    const tick = () => {
        blobPos.x += (mouse.x - blobPos.x) * speed;
        blobPos.y += (mouse.y - blobPos.y) * speed;
        
        blob.style.left = `${blobPos.x}px`;
        blob.style.top = `${blobPos.y}px`;
        
        requestAnimationFrame(tick);
    };
    tick();

    // Состояния наведения
    const targets = document.querySelectorAll('a, .avatar-frame, .img-preview');
    targets.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // --- Интерактивные карточки (Parallax & Entrance) ---
    const cards = document.querySelectorAll('.glass-card');
    
    // Каскадное появление
    cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.animation = `slideIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards ${i * 0.12 + 0.3}s`;
    });

    // 3D Наклон
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            const x = e.clientX - r.left;
            const y = e.clientY - r.top;
            
            const rx = ((y - r.height/2) / (r.height/2)) * -6;
            const ry = ((x - r.width/2) / (r.width/2)) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });

    console.log("Visual Art Business Card v4.0 - Activated");
});
