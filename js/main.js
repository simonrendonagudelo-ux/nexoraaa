/**
 * NEXORA - Digital Content Agency (Anserma, Caldas)
 * High-Tech Interactive Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Sticky & Blur Controller
  const navbar = document.querySelector('.site-navbar');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');

  const handleScrollNavbar = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScrollNavbar, { passive: true });
  handleScrollNavbar();

  // 2. Mobile Menu Toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (isOpen) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close drawer when clicking a link
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 3. Active Link Highlight on Scroll (ScrollSpy)
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // 4. Reveal Animations on Scroll
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // 5. Contact Form WhatsApp Dispatcher
  const contactForm = document.getElementById('nexora-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('client-name');
      const phoneInput = document.getElementById('client-phone');
      const serviceInput = document.getElementById('client-service');
      const messageInput = document.getElementById('client-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const service = serviceInput ? serviceInput.value : 'Consulta General';
      const userMessage = messageInput ? messageInput.value.trim() : '';

      if (!name) {
        alert('Por favor ingrese su nombre.');
        nameInput.focus();
        return;
      }

      // Format WhatsApp Message
      const targetPhone = '573235407807';
      const formattedMessage = 
        `⚡ *SOLICITUD DE PROYECTO - NEXORA*\n\n` +
        `👤 *Nombre:* ${name}\n` +
        `📱 *Contacto:* ${phone || 'No especificado'}\n` +
        `🛠️ *Servicio de Interés:* ${service}\n` +
        `📝 *Detalles del Proyecto:* ${userMessage || 'Deseo más información sobre sus servicios.'}\n\n` +
        `_Enviado desde el portal web NEXORA (Anserma, Caldas)_`;

      const encodedMessage = encodeURIComponent(formattedMessage);
      const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedMessage}`;

      // Show temporary confirmation
      const submitBtn = contactForm.querySelector('.form-submit-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>✓ Conectando con WhatsApp...</span>`;
      submitBtn.style.background = '#25D366';
      submitBtn.style.color = '#ffffff';

      setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.style.color = '';
        contactForm.reset();
      }, 700);
    });
  }

  // 6. Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 7. Ambient Cyber Canvas Effect (Lightweight, High Performance)
  const canvas = document.getElementById('cyber-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 35), 45);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.6;
        this.alpha = Math.random() * 0.4 + 0.15;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${this.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00E5FF';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    }

    // Only run animated canvas if not on reduced motion preference
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      animate();
    }
  }
});
