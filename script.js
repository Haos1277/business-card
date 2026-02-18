/* 
   Cinematic Motion Engine v5.0 
   Logic: Hyper-Premium Interaction 
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const preloader = document.getElementById('preloader');
    const dot = document.querySelector('.cursor-dot');
    const blob = document.querySelector('.cursor-blob');
    const appContainer = document.querySelector('.app-container');
    
    let mouse = { x: 0, y: 0 };
    let dotPos = { x: 0, y: 0 };
    let blobPos = { x: 0, y: 0 };
    
    // --- Cinematic Matrix Preloader Logic ---
    const terminalBody = document.getElementById('terminal-body');
    const barEl = document.querySelector('.loader-bar');
    
    const messages = [
        "> CONNECTING TO NEURAL_NET...",
        "> LOADING MATRIX_RELOADED_V6.0...",
        "> DECODING VISUAL_STORYTELLING_PROTOCOLS...",
        "> INITIALIZING CINEMATIC_ENGINE...",
        "> BYPASSING REALITY_LIMITS...",
        "> SYNCHRONIZING WITH MULTIVERSE...",
        "> STATUS: AWAKENING... [OK]",
        "> WELCOME, VASILIY."
    ];

    let currentLine = 0;
    
    const typeLine = () => {
        if (currentLine >= messages.length) {
            setTimeout(revealSite, 600);
            return;
        }

        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.textContent = messages[currentLine];
        terminalBody.appendChild(line);
        
        // Scroll to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;

        // Progress bar sync
        const progress = ((currentLine + 1) / messages.length) * 100;
        barEl.style.width = `${progress}%`;

        currentLine++;
        
        // Randomized typing speed for realism
        const nextDelay = currentLine === messages.length ? 800 : Math.random() * 400 + 200;
        setTimeout(typeLine, nextDelay);
    };

    const revealSite = () => {
        preloader.classList.add('loaded');
        setTimeout(() => {
            appContainer.classList.add('ready');
            preloader.style.pointerEvents = 'none';
        }, 800);
    };

    // Kick off loader with small delay
    setTimeout(typeLine, 500);

    // --- 2. Advanced Cursor Engine ---
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    const animateCursor = () => {
        // Point: Instant but slightly smoothed
        dotPos.x += (mouse.x - dotPos.x) * 0.35;
        dotPos.y += (mouse.y - dotPos.y) * 0.35;
        dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`;

        // Blob: Cinematic delay
        blobPos.x += (mouse.x - blobPos.x) * 0.12;
        blobPos.y += (mouse.y - blobPos.y) * 0.12;
        blob.style.transform = `translate3d(${blobPos.x}px, ${blobPos.y}px, 0)`;

        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // --- 3. Magnetic & Hover Interaction ---
    const interactiveElements = document.querySelectorAll('.glass-card, .avatar-frame, .school-logo-box');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            
            // Magnetic effect (subtle move towards cursor)
            const strength = 12;
            el.style.transform = `translate3d(${distanceX / strength}px, ${distanceY / strength}px, 0) scale(1.02)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate3d(0, 0, 0) scale(1)`;
        });

        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });

    // --- 4. School Logo Recovery ---
    const schoolImg = document.querySelector('.school-img');
    if (schoolImg) {
        schoolImg.onerror = () => {
            schoolImg.parentElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32" style="color:var(--accent)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2z"/></svg>`;
        };
    }

    console.log("Cinematic Engine 5.0 - Status: Operational");
});
