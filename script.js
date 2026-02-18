/* 
   Authentic Matrix Digital Rain Engine v8.0
   Design: Cinema Hyper-Premium Edition
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
    const fontSize = 11; // Smaller and denser rain

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
    
    // Name Formation Settings
    const targetName = "ВАСИЛИЙ КУЗНЕЦОВ";
    let isRevealingName = false;
    let startRevealTime = 0;
    const revealDuration = 4000; // 4 seconds to form name

    const draw = () => {
        // Blur only the rain layer
        ctx.filter = 'blur(1.2px)';
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, width, height);

        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            
            // Neon Green Trail
            ctx.fillStyle = "rgba(0, 255, 65, 0.35)";
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Bright lead character (no blur for lead if possible, but canvas filter applies to all previous)
            if (Math.random() > 0.9) {
                ctx.fillStyle = "#fff";
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            }

            if (drops[i] * fontSize > height && Math.random() > 0.985) {
                drops[i] = 0;
            }
            drops[i] += 0.8; // Slightly slower, more cinematic flow
        }

        // Reset blur for the name
        ctx.filter = 'none';
        if (isRevealingName) {
            drawVolumetricName();
        }
        
        requestAnimationFrame(draw);
    };

    const drawVolumetricName = () => {
        const now = Date.now();
        const progress = Math.min((now - startRevealTime) / revealDuration, 1);
        
        const isMobile = width < 768;
        const baseSize = isMobile ? Math.min(width / 10, 45) : Math.min(width / 15, 75);
        ctx.font = `900 ${baseSize}px var(--font-head)`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const lines = isMobile ? ["ВАСИЛИЙ", "КУЗНЕЦОВ"] : ["ВАСИЛИЙ КУЗНЕЦОВ"];
        const lineHeight = baseSize * 1.2;

        lines.forEach((line, index) => {
            const y = (height / 2) - ((lines.length - 1) * lineHeight / 2) + (index * lineHeight);
            
            if (progress > 0.1) {
                // 1. Deep Shadow (Volumetric Depth)
                ctx.shadowBlur = 0;
                ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
                ctx.fillText(line, width/2 + 4, y + 4);

                // 2. Core Glow
                ctx.shadowBlur = 15 * progress;
                ctx.shadowColor = "#00ff41";
                
                // 3. Multi-layered Volumetric Fill
                // Draw multiple times with slight offsets for "bulkiness"
                const layers = 3;
                for(let l = 0; l < layers; l++) {
                    ctx.fillStyle = `rgba(0, 255, 65, ${0.4 + (progress * 0.6)})`;
                    ctx.fillText(line, width/2 - (l*0.5), y - (l*0.5));
                }

                // 4. Highlight Layer (Sharp White Edge)
                if (progress > 0.8) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${(progress - 0.8) * 5})`;
                    ctx.fillText(line, width/2, y);
                }

                // 5. Glitch Overlay (Random chars before lock)
                if (progress < 0.95) {
                    ctx.fillStyle = "#fff";
                    const glitchLine = line.split('').map(c => (Math.random() > progress ? characters[Math.floor(Math.random()*characters.length)] : c)).join('');
                    ctx.fillText(glitchLine, width/2, y);
                }

                ctx.shadowBlur = 0;
            }
        });

        if (progress === 1) {
            setTimeout(revealSite, 1200);
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
        }, 1500);
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

    console.log("Matrix Rain Core V8.0 - Hyper-Cinematic Active");
});
