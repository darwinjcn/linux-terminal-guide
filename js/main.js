/* ============================================
   LINUX TERMINAL MASTERY - INTERACTIVIDAD
   Autor: Darwin Colmenares - Ingeniero en Informática
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // 1. EFECTO TYPING EN EL HERO
    // ============================================
    const typingText = document.getElementById('typing-text');
    const textToType = 'cat guia_comandos_linux.md';
    let charIndex = 0;

    function typeText() {
        if (charIndex < textToType.length) {
            typingText.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 100);
        } else {
            setTimeout(() => showOutput('output-1'), 500);
            setTimeout(() => showOutput('output-2'), 1000);
            setTimeout(() => showOutput('output-3'), 1500);
            setTimeout(() => showOutput('output-4'), 2000);
        }
    }

    function showOutput(id) {
        const element = document.getElementById(id);
        if (element) {
            element.classList.add('visible');
        }
    }

    setTimeout(typeText, 1000);

    // ============================================
    // 2. NAVEGACIÓN POR SCROLL (sin href="#")
    // ============================================
    const scrollLinks = document.querySelectorAll('[data-scroll]');
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    // Click en enlaces de navegación → scroll suave a la sección
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-scroll');
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Cerrar menú móvil si está abierto
            const navLinksContainer = document.getElementById('navLinks');
            const menuToggle = document.getElementById('menuToggle');
            if (navLinksContainer && navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                if (menuToggle) menuToggle.textContent = '☰';
            }
        });
    });

    // Actualizar link activo al hacer scroll
    function updateActiveNav() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-scroll') === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ============================================
    // 3. BOTÓN MENÚ MÓVIL
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinksContainer = document.getElementById('navLinks');

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinksContainer.classList.toggle('active');
            this.textContent = navLinksContainer.classList.contains('active') ? '✕' : '☰';
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!navLinksContainer.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinksContainer.classList.remove('active');
                menuToggle.textContent = '☰';
            }
        });
    }

    // ============================================
    // 4. BOTÓN COPIAR AL PORTAPAPELES
    // ============================================
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', async function(e) {
            e.stopPropagation();
            const textToCopy = this.getAttribute('data-copy');

            try {
                await navigator.clipboard.writeText(textToCopy);

                const originalText = this.textContent;
                this.textContent = '✅ Copiado';
                this.classList.add('copied');

                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('copied');
                }, 2000);

            } catch (err) {
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                textArea.style.position = 'fixed';
                textArea.style.left = '-9999px';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);

                const originalText = this.textContent;
                this.textContent = '✅ Copiado';
                this.classList.add('copied');

                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('copied');
                }, 2000);
            }
        });
    });

    // ============================================
    // 5. BOTÓN VOLVER ARRIBA
    // ============================================
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // 6. ANIMACIÓN DE ENTRADA AL SCROLL
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.tip-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });

    // ============================================
    // 7. KONAMI CODE EASTER EGG
    // ============================================
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                           'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                           'b', 'a'];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            document.documentElement.style.setProperty('--accent-green', '#ff6b6b');
            document.documentElement.style.setProperty('--accent-blue', '#4ecdc4');
            document.documentElement.style.setProperty('--accent-yellow', '#ffe66d');

            const msg = document.createElement('div');
            msg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--bg-card);
                border: 2px solid var(--accent-green);
                padding: 32px;
                border-radius: 16px;
                font-family: var(--font-mono);
                font-size: 18px;
                color: var(--accent-green);
                z-index: 10000;
                text-align: center;
                box-shadow: 0 0 50px rgba(46, 160, 67, 0.3);
            `;
            msg.innerHTML = `
                <div style="font-size: 48px; margin-bottom: 16px;">🎮</div>
                <div>¡Modo Hacker Activado!</div>
                <div style="font-size: 14px; color: var(--text-muted); margin-top: 8px;">
                    Konami Code detectado
                </div>
            `;
            document.body.appendChild(msg);

            setTimeout(() => {
                msg.remove();
                document.documentElement.style.setProperty('--accent-green', '#2ea043');
                document.documentElement.style.setProperty('--accent-blue', '#58a6ff');
                document.documentElement.style.setProperty('--accent-yellow', '#d29922');
            }, 3000);
        }
    });

    // ============================================
    // 8. CONSOLA EASTER EGG
    // ============================================
    console.log('%c🐧 Linux Terminal Mastery', 'font-size: 24px; font-weight: bold; color: #2ea043;');
    console.log('%cCreado por Darwin Colmenares - Ingeniero en Informática', 'font-size: 14px; color: #58a6ff;');
    console.log('%c¿Buscando algo? Prueba el Konami Code ↑↑↓↓←→←→BA', 'font-size: 12px; color: #8b949e; font-style: italic;');

});