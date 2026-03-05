// Création des particules
        function createParticles() {
            const container = document.getElementById('particles');
            for (let i = 0; i < 50; i++) {
                const p = document.createElement('div');
                p.className = 'particle';
                p.style.left = Math.random() * 100 + '%';
                p.style.top = Math.random() * 100 + '%';
                p.style.animationDelay = Math.random() * 20 + 's';
                p.style.animationDuration = (15 + Math.random() * 10) + 's';
                container.appendChild(p);
            }
        }

        // Toggle menu mobile
        function toggleMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('active');
            document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
        }

        // Scroll vers section
        function scrollToSection(sectionId) {
            const target = document.getElementById(sectionId);
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        }

        // Observer pour animations au scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Animation des compteurs
                    if (entry.target.classList.contains('stat-number-fusion')) {
                        animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Animation des compteurs
        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-target')) || 0;
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    element.textContent = target.toLocaleString() + '+';
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current).toLocaleString() + '+';
                }
            }, 16);
        }

        // Observer les éléments
        document.querySelectorAll('.feature-card-dark, .step, .testimonial-card').forEach(el => {
            observer.observe(el);
        });

        // Navigation scroll effect
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.dark-nav');
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Form handling
        document.addEventListener('DOMContentLoaded', function() {
            createParticles();
            
            const form = document.getElementById('contact-form');
            const submitBtn = document.getElementById('submit-btn');
            const btnText = document.getElementById('btn-text');
            const btnIcon = document.getElementById('btn-icon');
            const btnLoading = document.getElementById('btn-loading');
            const btnSuccess = document.getElementById('btn-success');
            const formStatus = document.getElementById('form-status');
            
            if (form) {
                form.addEventListener('submit', async function(e) {
                    e.preventDefault();
                    
                    setLoading(true);
                    
                    try {
                        const response = await fetch(form.action, {
                            method: 'POST',
                            body: new FormData(form),
                            headers: {
                                'Accept': 'application/json'
                            }
                        });
                        
                        if (response.ok) {
                            setSuccess();
                            form.reset();
                            setTimeout(() => {
                                window.location.reload();
                            }, 3000);
                        } else {
                            const data = await response.json();
                            if (data.errors) {
                                setError(data.errors.map(error => error.message).join(', '));
                            } else {
                                setError('Une erreur est survenue. Veuillez réessayer.');
                            }
                        }
                    } catch (error) {
                        console.error('Erreur:', error);
                        setError('Impossible d\'envoyer le message. Vérifiez votre connexion.');
                    } finally {
                        setTimeout(() => {
                            if (!submitBtn.classList.contains('btn-success')) {
                                setLoading(false);
                            }
                        }, 3000);
                    }
                });
            }
            
            function setLoading(loading) {
                if (loading) {
                    submitBtn.disabled = true;
                    btnText.textContent = 'Envoi en cours...';
                    btnIcon.style.display = 'none';
                    btnLoading.style.display = 'block';
                    btnSuccess.style.display = 'none';
                    submitBtn.style.cursor = 'wait';
                } else {
                    submitBtn.disabled = false;
                    btnText.textContent = 'Envoyer le message';
                    btnIcon.style.display = 'block';
                    btnLoading.style.display = 'none';
                    btnSuccess.style.display = 'none';
                    submitBtn.style.cursor = 'pointer';
                    submitBtn.classList.remove('btn-success', 'btn-error');
                }
            }
            
            function setSuccess() {
                btnText.textContent = 'Message envoyé !';
                btnIcon.style.display = 'none';
                btnLoading.style.display = 'none';
                btnSuccess.style.display = 'block';
                submitBtn.classList.add('btn-success');
                
                formStatus.textContent = '✓ Votre message a été envoyé avec succès. La page va se rafraîchir...';
                formStatus.className = 'form-status success';
                formStatus.style.display = 'block';
            }
            
            function setError(message) {
                btnText.textContent = 'Réessayer';
                btnIcon.style.display = 'block';
                btnLoading.style.display = 'none';
                btnSuccess.style.display = 'none';
                submitBtn.classList.add('btn-error');
                
                formStatus.textContent = '✗ ' + message;
                formStatus.className = 'form-status error';
                formStatus.style.display = 'block';
                
                setTimeout(() => {
                    submitBtn.classList.remove('btn-error');
                }, 3000);
            }
        });

        // Effet de parallaxe sur la souris
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            document.querySelectorAll('.orb-fusion').forEach((orb, index) => {
                const speed = (index + 1) * 20;
                orb.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
            });
            
            document.querySelectorAll('.floating-card-fusion').forEach((card, index) => {
                const speed = (index + 1) * 10;
                card.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
            });
        });

        // Effet de glitch aléatoire sur le titre
        setInterval(() => {
            const title = document.querySelector('.hero-title-fusion');
            if (title && Math.random() > 0.95) {
                title.style.animation = 'none';
                setTimeout(() => {
                    title.style.animation = '';
                }, 100);
            }
        }, 3000);

        // Animation des barres de son
        function createSoundBars() {
            const containers = document.querySelectorAll('.sound-wave');
            containers.forEach(container => {
                for (let i = 0; i < 9; i++) {
                    const bar = document.createElement('div');
                    bar.className = 'sound-bar';
                    container.appendChild(bar);
                }
            });
        }

        // Initialisation
        window.addEventListener('load', () => {
            createSoundBars();
            
            // Animation d'entrée
            document.body.style.opacity = '0';
            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s';
                document.body.style.opacity = '1';
            }, 100);
        });

        // Redimensionnement
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                document.getElementById('mobile-menu').classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Effet de clic sur les boutons
        document.querySelectorAll('.wave-effect').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Ajout de l'animation ripple
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);