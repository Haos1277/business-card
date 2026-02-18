/* 
   Authentic Matrix Digital Rain Engine v9.0
   Design: Cinema Ultra-Legible Edition
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
    
    // --- Resize & Setup ---
    let width, height, columns, drops;
    const fontSize = 10; 

    const setupCanvas = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = Math.floor(width / fontSize);
        drops = Array(columns).fill(1).map(() => Math.random() * -100);
    };
    setupCanvas();
    window.addEventListener('resize', setupCanvas);

    // --- Matrix Rain Logic ---
    const characters = "01アァカサタナハマヤャラワガザダバパイィキシチニヒミリギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
    
    const targetName = "ВАСИЛИЙ КУЗНЕЦОВ";
    let isRevealingName = false;
    let startRevealTime = 0;
    const revealDuration = 4500; 

    const draw = () => {
        // Dynamic background opacity (suppresses rain as name forms)
        let bgOpacity = 0.1;
        if (isRevealingName) {
            const progress = Math.min((Date.now() - startRevealTime) / revealDuration, 1);
            bgOpacity = 0.1 + (progress * 0.25); // Fade to 0.35 opacity to clear the stage
        }

        ctx.filter = 'blur(1.2px)';
        ctx.fillStyle = `rgba(0, 0, 0, ${bgOpacity})`;
        ctx.fillRect(0, 0, width, height);

        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillStyle = "rgba(0, 255, 65, 0.3)";
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (Math.random() > 0.95) {
                ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            }

            if (drops[i] * fontSize > height && Math.random() > 0.985) {
                drops[i] = 0;
            }
            drops[i] += 0.8; 
        }

        ctx.filter = 'none';
        if (isRevealingName) {
            drawCrystalClearName();
        }
        
        requestAnimationFrame(draw);
    };

    const drawCrystalClearName = () => {
        const now = Date.now();
        const progress = Math.min((now - startRevealTime) / revealDuration, 1);
        
        const isMobile = width < 768;
        // V15 Mobile Refinement (28px for mobile, 40px for desktop)
        const baseSize = isMobile ? Math.min(width * 0.1, 28) : 40;
        ctx.font = `900 ${baseSize}px 'Unbounded', 'Outfit', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const lines = isMobile ? ["ВАСИЛИЙ", "КУЗНЕЦОВ"] : ["ВАСИЛИЙ КУЗНЕЦОВ"];
        const lineHeight = baseSize * 1.1;

        lines.forEach((line, index) => {
            const y = (height / 2) - ((lines.length - 1) * lineHeight / 2) + (index * lineHeight);
            
            if (progress > 0.05) {
                // Background dark glow for total legibility
                ctx.shadowBlur = 40 * progress;
                ctx.shadowColor = "rgba(0, 0, 0, 1)";
                ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
                ctx.fillText(line, width/2, y);

                // Neon Aura
                ctx.shadowBlur = 20 * progress;
                ctx.shadowColor = "#00ff41";
                
                // Final Sharp Text
                ctx.fillStyle = `rgba(0, 255, 65, ${progress})`;
                
                // Rapid-lock glitch logic
                const glitchChance = Math.max(0, 0.9 - (progress * 1.5));
                const displayLine = line.split('').map(c => (Math.random() < glitchChance ? characters[Math.floor(Math.random()*characters.length)] : c)).join('');
                
                ctx.fillText(displayLine, width/2, y);

                // Highlight Shine at the end
                if (progress > 0.9) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${(progress - 0.9) * 10})`;
                    ctx.fillText(line, width/2, y);
                }

                ctx.shadowBlur = 0;
            }
        });

        if (progress === 1) {
            setTimeout(revealSite, 1500);
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
        setTimeout(() => {
            isRevealingName = true;
            startRevealTime = Date.now();
        }, 1200);
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

    console.log("MATRIX_CORE_VERSION: 15.0 - Mobile Refined");
});
