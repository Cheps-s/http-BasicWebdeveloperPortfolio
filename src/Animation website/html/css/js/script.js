// Smooth scrolling for nav links, reveal-on-scroll for sections, and enhanced interactions
(function () {
    // Initialize particles
    initParticles();
    
    // Game initialization
    initGame();
    
    // Smooth scroll for internal links
    document.querySelectorAll('nav a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile menu if open
                document.querySelector('.animation-navbar').classList.remove('active');
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.animation-navbar');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Build reveal targets
    const revealTargets = [];
    document.querySelectorAll('.parents > div, .stat-card, .hero-card, .gallery-item, .testimonial-card, .game-section').forEach(e => revealTargets.push(e));
    document.querySelectorAll('.section-1, .wrapper, .stats-section, .gallery-section, .testimonials').forEach(e => revealTargets.push(e));

    revealTargets.forEach(el => el.classList.add('fade-in'));

    // IntersectionObserver for reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Animate stats if it's a stat card
                if (entry.target.classList.contains('stat-card')) {
                    animateStat(entry.target);
                }
            }
        });
    }, { threshold: 0.12 });
    
    revealTargets.forEach(el => observer.observe(el));

    // Highlight active nav link based on scroll position
    const sections = Array.from(document.querySelectorAll('section[id], main[id]'));

    function updateActiveNav() {
        const y = window.scrollY + 200;
        let current = null;
        for (const s of sections) {
            if (s.offsetTop <= y) current = s;
        }
        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
        if (current && current.id) {
            const link = document.querySelector(`nav a[href="#${current.id}"]`);
            if (link) link.classList.add('active');
        }
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    window.addEventListener('resize', updateActiveNav);
    updateActiveNav();

    // Stats counter animation
    function animateStat(card) {
        const numberEl = card.querySelector('.stat-number');
        if (!numberEl || numberEl.classList.contains('counted')) return;
        
        const target = parseInt(numberEl.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                numberEl.classList.add('counted');
            }
            numberEl.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    // Gallery filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    // Testimonial carousel
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    function rotateTestimonials() {
        testimonials.forEach((t, i) => {
            t.classList.remove('active');
            if (i === currentTestimonial) {
                t.classList.add('active');
            }
        });
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    }
    
    setInterval(rotateTestimonials, 5000);

    // Character modal data
    const characterData = {
        warrior: { name: "Pixel Warrior", desc: "A brave fighter from the 8-bit realm. Specializes in combat sprites and battle animations.", stats: "STR: 95 | AGI: 70 | INT: 40" },
        mage: { name: "Code Mage", desc: "Master of digital sorcery. Casts spells through clean code and magical algorithms.", stats: "STR: 30 | AGI: 60 | INT: 100" },
        rogue: { name: "Shadow Rogue", desc: "Silent and swift. Expert in stealth mechanics and shadow animations.", stats: "STR: 60 | AGI: 95 | INT: 50" },
        paladin: { name: "Light Paladin", desc: "Guardian of the pixel realm. Shines bright with righteous animations.", stats: "STR: 85 | AGI: 50 | INT: 70" },
        archer: { name: "Pixel Archer", desc: "Never misses a target. Precision in every frame and movement.", stats: "STR: 55 | AGI: 90 | INT: 60" },
        necromancer: { name: "Dark Coder", desc: "Raises dead projects back to life. Master of dark mode interfaces.", stats: "STR: 40 | AGI: 50 | INT: 95" },
        bard: { name: "Digital Bard", desc: "Sings songs of the digital age. Creates harmonic user experiences.", stats: "STR: 45 | AGI: 70 | INT: 80" },
        druid: { name: "Pixel Druid", desc: "One with nature pixels. Specializes in organic growth animations.", stats: "STR: 60 | AGI: 65 | INT: 75" },
        monk: { name: "Byte Monk", desc: "Disciplined in the art of minimal code. Finds enlightenment in simplicity.", stats: "STR: 80 | AGI: 85 | INT: 60" },
        alchemist: { name: "CSS Alchemist", desc: "Transmutes base styles into gold. Master of transformations and transitions.", stats: "STR: 35 | AGI: 75 | INT: 90" }
    };

    // Hero card click handlers
    const heroCards = document.querySelectorAll('.hero-card');
    
    heroCards.forEach(card => {
        card.addEventListener('click', () => {
            const charType = card.getAttribute('data-character');
            const data = characterData[charType];
            const img = card.querySelector('img').src;
            
            if (data) {
                openModal(img, data.name, data.desc, data.stats);
            }
        });
    });

    // Modal functions
    let modalOverlay = null;
    
    function createModal() {
        modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.innerHTML = `
            <div class="modal" role="dialog" aria-modal="true">
                <button class="modal-close" aria-label="Close">✕</button>
                <div class="modal-content">
                    <img class="modal-img" src="" alt="">
                    <div class="modal-caption">
                        <h3></h3>
                        <p></p>
                        <div class="character-stats" style="margin-top: 15px; padding-top: 15px; border-top: 2px solid rgba(255,255,255,0.1); font-size: 10px; color: #FDB955;"></div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modalOverlay);
        
        modalOverlay.querySelector('.modal-close').addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    window.openModal = function(src, title, desc, stats) {
        if (!modalOverlay) createModal();
        
        const img = modalOverlay.querySelector('.modal-img');
        const caption = modalOverlay.querySelector('.modal-caption h3');
        const text = modalOverlay.querySelector('.modal-caption p');
        const statsEl = modalOverlay.querySelector('.character-stats');
        
        img.src = src;
        caption.textContent = title;
        text.textContent = desc;
        if (stats) statsEl.textContent = stats;
        else statsEl.style.display = 'none';
        
        modalOverlay.classList.add('open');
        document.documentElement.style.overflow = 'hidden';
    };

    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('open');
        document.documentElement.style.overflow = '';
    }

    // Back-to-top button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        function checkBackToTop() {
            if (window.scrollY > 400) backToTop.classList.add('show');
            else backToTop.classList.remove('show');
        }
        window.addEventListener('scroll', checkBackToTop, { passive: true });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        checkBackToTop();
    }

    // Toast notification
    window.showToast = function(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    };

    // Form handlers
    window.handleSubmit = function(e) {
        e.preventDefault();
        showToast('Message sent! We\'ll get back to you soon. 👾');
        e.target.reset();
    };

    window.handleNewsletter = function(e) {
        e.preventDefault();
        showToast('Welcome to the pixel family! 🎮');
        e.target.reset();
    };

    window.showWelcome = function() {
        showToast('Welcome to PixelHub! Let\'s create something amazing! ✨');
    };

    window.scrollToSection = function(id) {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    };

    // Particle system
    function initParticles() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;
        
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        window.addEventListener('resize', resize);
        resize();
        
        class Particle {
            constructor() {
                this.reset();
            }
            
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.color = Math.random() > 0.5 ? '#26a0da' : '#FDB955';
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fillRect(this.x, this.y, this.size, this.size);
                ctx.globalAlpha = 1;
            }
        }
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
        
        let frameCount = 0;
        function animate() {
            frameCount++;
            // Render every 2nd frame for performance
            if (frameCount % 2 === 0) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach(p => {
                    p.update();
                    p.draw();
                });
                
                // Draw connections
                particles.forEach((p1, i) => {
                    particles.slice(i + 1).forEach(p2 => {
                        const dx = p1.x - p2.x;
                        const dy = p1.y - p2.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        
                        if (dist < 100) {
                            ctx.beginPath();
                            ctx.strokeStyle = 'rgba(38,160,218,0.1)';
                            ctx.lineWidth = 1;
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.stroke();
                        }
                    });
                });
            }
            
            animationId = requestAnimationFrame(animate);
        }
        
        animate();
        
        // Cleanup on page hide
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cancelAnimationFrame(animationId);
            } else {
                animate();
            }
        });
    }

    // GAME LOGIC
    function initGame() {
        const canvas = document.getElementById('gameCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const resetBtn = document.getElementById('resetBtn');
        const scoreEl = document.getElementById('scoreValue');
        const levelEl = document.getElementById('levelValue');
        const livesEl = document.getElementById('livesValue');
        const gameOverModal = document.getElementById('gameOverModal');
        
        // Game state
        let gameRunning = false;
        let gamePaused = false;
        let score = 0;
        let level = 1;
        let lives = 3;
        let animationId;
        let lastTime = 0;
        let spawnTimer = 0;
        let spawnInterval = 1000;
        
        // Player (basket)
        const player = {
            x: canvas.width / 2 - 40,
            y: canvas.height - 60,
            width: 80,
            height: 20,
            speed: 8,
            color: '#26a0da',
            dx: 0
        };
        
        // Arrays for game objects
        let pixels = [];
        let particles = [];
        let powerUps = [];
        
        // Power-up states
        let activePowerUps = {
            shield: false,
            magnet: false,
            multiplier: false
        };
        let powerUpTimers = {
            shield: 0,
            magnet: 0,
            multiplier: 0
        };
        
        // Input handling
        const keys = {};
        
        document.addEventListener('keydown', (e) => {
            keys[e.key] = true;
        });
        
        document.addEventListener('keyup', (e) => {
            keys[e.key] = false;
        });
        
        // Touch/Mouse controls
        let isDragging = false;
        let touchStartX = 0;
        let playerStartX = 0;
        
        canvas.addEventListener('mousedown', (e) => {
            isDragging = true;
            touchStartX = e.clientX;
            playerStartX = player.x;
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            player.x = x - player.width / 2;
            constrainPlayer();
        });
        
        canvas.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        canvas.addEventListener('touchstart', (e) => {
            isDragging = true;
            touchStartX = e.touches[0].clientX;
            playerStartX = player.x;
            e.preventDefault();
        }, { passive: false });
        
        canvas.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            player.x = x - player.width / 2;
            constrainPlayer();
            e.preventDefault();
        }, { passive: false });
        
        canvas.addEventListener('touchend', () => {
            isDragging = false;
        });
        
        function constrainPlayer() {
            if (player.x < 0) player.x = 0;
            if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
        }
        
        // Pixel types
        const pixelTypes = [
            { color: '#26a0da', points: 10, speed: 2, type: 'normal' },
            { color: '#FDB955', points: 20, speed: 3, type: 'gold' },
            { color: '#e74c3c', points: -50, speed: 4, type: 'bomb' },
            { color: '#9b59b6', points: 50, speed: 5, type: 'rare' },
            { color: '#2ecc71', points: 0, speed: 3, type: 'powerup', powerUp: 'shield' },
            { color: '#3498db', points: 0, speed: 3, type: 'powerup', powerUp: 'magnet' },
            { color: '#f39c12', points: 0, speed: 3, type: 'powerup', powerUp: 'multiplier' }
        ];
        
        function spawnPixel() {
            const type = pixelTypes[Math.floor(Math.random() * pixelTypes.length)];
            const size = Math.random() * 10 + 15;
            
            pixels.push({
                x: Math.random() * (canvas.width - size),
                y: -size,
                width: size,
                height: size,
                ...type,
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 0.1
            });
        }
        
        function createExplosion(x, y, color) {
            for (let i = 0; i < 8; i++) {
                particles.push({
                    x: x,
                    y: y,
                    vx: (Math.random() - 0.5) * 8,
                    vy: (Math.random() - 0.5) * 8,
                    life: 30,
                    color: color,
                    size: Math.random() * 4 + 2
                });
            }
        }
        
        function update(deltaTime) {
            // Player movement
            if (keys['ArrowLeft'] || keys['a']) player.x -= player.speed;
            if (keys['ArrowRight'] || keys['d']) player.x += player.speed;
            constrainPlayer();
            
            // Spawn pixels
            spawnTimer += deltaTime;
            if (spawnTimer > spawnInterval) {
                spawnPixel();
                spawnTimer = 0;
                // Decrease spawn interval as level increases
                spawnInterval = Math.max(400, 1000 - (level - 1) * 100);
            }
            
            // Update pixels
            for (let i = pixels.length - 1; i >= 0; i--) {
                const p = pixels[i];
                p.y += p.speed;
                p.rotation += p.rotationSpeed;
                
                // Magnet power-up effect
                if (activePowerUps.magnet && p.type !== 'bomb') {
                    const dx = (player.x + player.width / 2) - (p.x + p.width / 2);
                    const dy = (player.y + player.height / 2) - (p.y + p.height / 2);
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        p.x += dx * 0.05;
                        p.y += dy * 0.05;
                    }
                }
                
                // Collision with player
                if (
                    p.x < player.x + player.width &&
                    p.x + p.width > player.x &&
                    p.y < player.y + player.height &&
                    p.y + p.height > player.y
                ) {
                    if (p.type === 'bomb') {
                        if (!activePowerUps.shield) {
                            lives--;
                            createExplosion(p.x, p.y, '#e74c3c');
                            showToast('💥 Ouch! You hit a bomb!');
                        } else {
                            createExplosion(p.x, p.y, '#2ecc71');
                            showToast('🛡️ Shield protected you!');
                        }
                    } else if (p.type === 'powerup') {
                        activatePowerUp(p.powerUp);
                        createExplosion(p.x, p.y, '#2ecc71');
                    } else {
                        let points = p.points;
                        if (activePowerUps.multiplier) points *= 2;
                        score += points;
                        createExplosion(p.x, p.y, p.color);
                        
                        // Level up every 100 points
                        if (score > level * 100) {
                            level++;
                            showToast(`🎉 Level Up! Welcome to Level ${level}`);
                        }
                    }
                    
                    pixels.splice(i, 1);
                    continue;
                }
                
                // Remove if off screen
                if (p.y > canvas.height) {
                    if (p.type !== 'bomb' && p.type !== 'powerup') {
                        // Missed a good pixel
                        score = Math.max(0, score - 5);
                    }
                    pixels.splice(i, 1);
                }
            }
            
            // Update particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life--;
                if (p.life <= 0) particles.splice(i, 1);
            }
            
            // Update power-up timers
            Object.keys(powerUpTimers).forEach(key => {
                if (powerUpTimers[key] > 0) {
                    powerUpTimers[key] -= deltaTime;
                    if (powerUpTimers[key] <= 0) {
                        activePowerUps[key] = false;
                        updatePowerUpUI(key, false);
                    }
                }
            });
            
            // Check game over
            if (lives <= 0) {
                gameOver();
            }
            
            // Update UI
            scoreEl.textContent = score;
            levelEl.textContent = level;
            livesEl.textContent = '❤️'.repeat(lives) + '🖤'.repeat(3 - lives);
        }
        
        function activatePowerUp(type) {
            activePowerUps[type] = true;
            powerUpTimers[type] = 5000; // 5 seconds
            updatePowerUpUI(type, true);
            
            const messages = {
                shield: '🛡️ Shield Activated!',
                magnet: '🧲 Magnet Activated!',
                multiplier: '⚡ 2x Score Multiplier!'
            };
            showToast(messages[type]);
        }
        
        function updatePowerUpUI(type, active) {
            const statusEl = document.getElementById(type + 'Status');
            if (statusEl) {
                statusEl.textContent = active ? 'ON' : 'OFF';
                statusEl.classList.toggle('active', active);
            }
        }
        
        function draw() {
            // Clear canvas with trail effect
            ctx.fillStyle = 'rgba(26, 26, 46, 0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw grid
            ctx.strokeStyle = 'rgba(38,160,218,0.1)';
            ctx.lineWidth = 1;
            for (let x = 0; x < canvas.width; x += 50) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += 50) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
            
            // Draw player (basket)
            ctx.save();
            ctx.fillStyle = player.color;
            ctx.shadowBlur = 20;
            ctx.shadowColor = player.color;
            
            // Draw basket shape
            ctx.beginPath();
            ctx.moveTo(player.x, player.y);
            ctx.lineTo(player.x + player.width, player.y);
            ctx.lineTo(player.x + player.width - 10, player.y + player.height);
            ctx.lineTo(player.x + 10, player.y + player.height);
            ctx.closePath();
            ctx.fill();
            
            // Draw basket detail
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.fillRect(player.x + 10, player.y + 5, player.width - 20, 3);
            ctx.fillRect(player.x + 10, player.y + 12, player.width - 20, 3);
            ctx.restore();
            
            // Draw pixels
            pixels.forEach(p => {
                ctx.save();
                ctx.translate(p.x + p.width / 2, p.y + p.height / 2);
                ctx.rotate(p.rotation);
                
                ctx.fillStyle = p.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = p.color;
                
                if (p.type === 'bomb') {
                    // Draw bomb
                    ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
                    ctx.fillStyle = '#000';
                    ctx.fillRect(-p.width / 4, -p.height / 4, p.width / 2, p.height / 2);
                } else if (p.type === 'powerup') {
                    // Draw power-up (circle)
                    ctx.beginPath();
                    ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Draw icon
                    ctx.fillStyle = '#fff';
                    ctx.font = '12px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    const icons = { shield: '🛡️', magnet: '🧲', multiplier: '⚡' };
                    ctx.fillText(icons[p.powerUp] || '⭐', 0, 0);
                } else {
                    // Draw regular pixel
                    ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
                    
                    // Inner highlight
                    ctx.fillStyle = 'rgba(255,255,255,0.3)';
                    ctx.fillRect(-p.width / 2 + 2, -p.height / 2 + 2, p.width - 4, p.height / 3);
                }
                
                ctx.restore();
            });
            
            // Draw particles
            particles.forEach(p => {
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life / 30;
                ctx.fillRect(p.x, p.y, p.size, p.size);
            });
            ctx.globalAlpha = 1;
            
            // Draw active power-up indicators on player
            if (activePowerUps.shield) {
                ctx.strokeStyle = '#2ecc71';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(player.x + player.width / 2, player.y + player.height / 2, 40, 0, Math.PI * 2);
                ctx.stroke();
            }
        }
        
        function gameLoop(timestamp) {
            if (!gameRunning || gamePaused) return;
            
            const deltaTime = timestamp - lastTime;
            lastTime = timestamp;
            
            update(deltaTime);
            draw();
            
            animationId = requestAnimationFrame(gameLoop);
        }
        
        function startGame() {
            if (gameRunning) return;
            
            gameRunning = true;
            gamePaused = false;
            score = 0;
            level = 1;
            lives = 3;
            pixels = [];
            particles = [];
            activePowerUps = { shield: false, magnet: false, multiplier: false };
            powerUpTimers = { shield: 0, magnet: 0, multiplier: 0 };
            
            // Reset power-up UI
            ['shield', 'magnet', 'multiplier'].forEach(type => updatePowerUpUI(type, false));
            
            startBtn.style.display = 'none';
            pauseBtn.style.display = 'block';
            gameOverModal.classList.remove('show');
            
            lastTime = performance.now();
            gameLoop(lastTime);
            
            showToast('🎮 Game Started! Good luck!');
        }
        
        function pauseGame() {
            gamePaused = !gamePaused;
            pauseBtn.textContent = gamePaused ? 'RESUME' : 'PAUSE';
            
            if (!gamePaused) {
                lastTime = performance.now();
                gameLoop(lastTime);
            }
        }
        
        function resetGame() {
            gameRunning = false;
            gamePaused = false;
            cancelAnimationFrame(animationId);
            
            score = 0;
            level = 1;
            lives = 3;
            pixels = [];
            particles = [];
            
            scoreEl.textContent = '0';
            levelEl.textContent = '1';
            livesEl.textContent = '❤️❤️❤️';
            
            startBtn.style.display = 'block';
            pauseBtn.style.display = 'none';
            pauseBtn.textContent = 'PAUSE';
            
            // Clear canvas
            ctx.fillStyle = '#1a1a2e';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            showToast('Game Reset!');
        }
        
        function gameOver() {
            gameRunning = false;
            cancelAnimationFrame(animationId);
            
            document.getElementById('finalScoreValue').textContent = score;
            
            // Check for high score
            const highScores = JSON.parse(localStorage.getItem('pixelHubHighScores') || '[]');
            const isHighScore = highScores.length < 3 || score > highScores[highScores.length - 1].score;
            
            if (isHighScore && score > 0) {
                document.getElementById('newHighScore').style.display = 'block';
                // Add to high scores
                highScores.push({ name: 'YOU', score: score });
                highScores.sort((a, b) => b.score - a.score);
                highScores.splice(3);
                localStorage.setItem('pixelHubHighScores', JSON.stringify(highScores));
                updateLeaderboard(highScores);
            } else {
                document.getElementById('newHighScore').style.display = 'none';
            }
            
            gameOverModal.classList.add('show');
            startBtn.style.display = 'block';
            pauseBtn.style.display = 'none';
        }
        
        function updateLeaderboard(scores) {
            const list = document.getElementById('highScoresList');
            list.innerHTML = scores.map((s, i) => `
                <li>
                    <span class="rank">${i + 1}</span>
                    <span class="name">${s.name}</span>
                    <span class="score">${s.score}</span>
                </li>
            `).join('');
        }
        
        // Load high scores
        const savedScores = JSON.parse(localStorage.getItem('pixelHubHighScores') || '[]');
        if (savedScores.length > 0) {
            updateLeaderboard(savedScores);
        }
        
        // Button event listeners
        startBtn.addEventListener('click', startGame);
        pauseBtn.addEventListener('click', pauseGame);
        resetBtn.addEventListener('click', resetGame);
        
        // Global restart function
        window.restartGame = function() {
            gameOverModal.classList.remove('show');
            startGame();
        };
        
        // Initial draw
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw start text
        ctx.fillStyle = '#26a0da';
        ctx.font = '20px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText('CLICK START TO PLAY', canvas.width / 2, canvas.height / 2);
    }

    // Add CSS for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in.in-view {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

})();