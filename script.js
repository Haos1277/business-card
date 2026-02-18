/* 
   Authentic Matrix Digital Rain Engine v7.0
   Design: Cinema Edition
   Developer: Antigravity Art
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const preloader = document.getElementById('preloader');
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    const appContainer = document.querySelector('.app-container');
    const dot = document.querySelector('.cursor-dot');
    const blob = document.querySelector('.cursor-blob');
    
    // --- Resize Canvas ---
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = Math.floor(width / fontSize);
        drops = Array(columns).fill(1).map(() => Math.random() * -100);
    });

    // --- Matrix Rain Logic ---
    const characters = "01アァカサタナハマヤャラワガザダバパイィキシチニヒミリギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
    const fontSize = 16;
    let columns = Math.floor(width / fontSize);
    let drops = Array(columns).fill(1).map(() => Math.random() * -100);
    
    // Name Formation Logic
    const targetName = "ВАСИЛИЙ КУЗНЕЦОВ";
    let isRevealingName = false;
    let startRevealTime = 0;
    const revealDuration = 3000; // 3 seconds to form name

    // Position of name (centered)
    const nameFontSize = 40;
    const nameY = height / 2;
    const nameXStart = (width - (targetName.length * nameFontSize * 0.7)) / 2;

    const draw = () => {
        // Subtle tail trail
        ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
        ctx.fillRect(0, 0, width, height);

        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            
            // Bright lead character
            ctx.fillStyle = "#fff";
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Fading trail
            ctx.fillStyle = "#0f0";
            ctx.shadowBlur = 4;
            ctx.shadowColor = "#0f0";
            ctx.fillText(text, i * fontSize, (drops[i] - 1) * fontSize);
            ctx.shadowBlur = 0;

            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }

        if (isRevealingName) {
            drawNameCoalescence();
        }
        
        requestAnimationFrame(draw);
    };

    const drawNameCoalescence = () => {
        const now = Date.now();
        const progress = Math.min((now - startRevealTime) / revealDuration, 1);
        
        ctx.font = `900 ${nameFontSize}px var(--font-head)`;
        ctx.textAlign = "left";

        for (let i = 0; i < targetName.length; i++) {
            const char = targetName[i];
            const x = nameXStart + (i * nameFontSize * 0.75);
            
            // Glow intensity increases with progress
            const alpha = progress * 1.0;
            const glow = progress * 20;

            if (progress > 0.1) {
                // Background shadow for readability
                ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
                ctx.fillText(char, x, nameY);

                // Flickering Matrix GLow
                ctx.shadowBlur = glow;
                ctx.shadowColor = "#00ff41";
                ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`;
                
                // Random characters before locking
                const displayChar = (progress < 0.9 && Math.random() > progress) 
                    ? characters.charAt(Math.floor(Math.random() * characters.length)) 
                    : char;
                
                ctx.fillText(displayChar, x, nameY);
                ctx.shadowBlur = 0;
            }
        }

        if (progress === 1) {
            setTimeout(revealSite, 1000);
        }
    };

    const revealSite = () => {
        preloader.classList.add('loaded');
        setTimeout(() => {
            appContainer.classList.add('ready');
            preloader.style.pointerEvents = 'none';
        }, 800);
    };

    // Start Sequence
    setTimeout(() => {
        draw();
        // Start name reveal after some initial rain
        setTimeout(() => {
            isRevealingName = true;
            startRevealTime = Date.now();
        }, 2000);
    }, 100);

    // --- Cursor & Interactions (Restored) ---
    let mouse = { x: 0, y: 0 };
    let dotPos = { x: 0, y: 0 };
    let blobPos = { x: 0, y: 0 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    const animateCursor = () => {
        dotPos.x += (mouse.x - dotPos.x) * 0.35;
        dotPos.y += (mouse.y - dotPos.y) * 0.35;
        dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`;

        blobPos.x += (mouse.x - blobPos.x) * 0.12;
        blobPos.y += (mouse.y - blobPos.y) * 0.12;
        blob.style.transform = `translate3d(${blobPos.x}px, ${blobPos.y}px, 0)`;
        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    const interactiveElements = document.querySelectorAll('.glass-card, .avatar-frame, .school-logo-box');
    interactiveElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            const strength = 12;
            el.style.transform = `translate3d(${distanceX / strength}px, ${distanceY / strength}px, 0) scale(1.02)`;
        });
        el.addEventListener('mouseleave', () => { el.style.transform = `translate3d(0, 0, 0) scale(1)`; });
        el.addEventListener('mouseenter', () => { document.body.classList.add('cursor-hover'); });
        el.addEventListener('mouseleave', () => { document.body.classList.remove('cursor-hover'); });
    });

    console.log("Matrix Rain Core V7.0 - Active");
});
