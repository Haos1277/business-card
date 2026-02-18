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
    
    // --- 1. Cinematic Preloader Logic ---
    let count = 0;
    const countEl = document.querySelector('.loader-counter .count');
    const barEl = document.querySelector('.loader-bar');

    const updateLoader = () => {
        // Human-like staggered progress
        const increment = count < 60 ? Math.random() * 8 : (count < 90 ? Math.random() * 3 : Math.random() * 0.5);
        count += increment;

        if (count >= 100) {
            count = 100;
            countEl.textContent = "100";
            barEl.style.width = "100%";
            setTimeout(revealSite, 400);
            return;
        }

        countEl.textContent = Math.floor(count).toString().padStart(2, '0');
        barEl.style.width = `${count}%`;
        requestAnimationFrame(updateLoader);
    };

    const revealSite = () => {
        preloader.classList.add('loaded');
        setTimeout(() => {
            appContainer.classList.add('ready');
            preloader.style.pointerEvents = 'none';
        }, 600);
    };

    // Kick off loader
    setTimeout(updateLoader, 200);

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
