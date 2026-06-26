// ===== LOADER =====
const loaderText = document.getElementById('loaderText');
const letters = 'SHAHNAZ D PRINCESS'.split('');
letters.forEach((l, i) => {
    const span = document.createElement('span');
    span.textContent = l === ' ' ? '\u00A0' : l;
    span.style.animationDelay = `${i * 0.05}s`;
    loaderText.appendChild(span);
});

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 2800);
});

// ===== CUSTOM CURSOR =====
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX - 4 + 'px';
    dot.style.top = mouseY - 4 + 'px';
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .service-list-item, .service-spread-item, .hz-item, .te-card, .menu-link').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
});

// ===== NAV SCROLL =====
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('compact', window.scrollY > 100);
});

// ===== PAGE NAVIGATION =====
function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + page).classList.add('active');
    document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
        a.classList.toggle('active', a.dataset.page === page);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(initReveals, 200);
}

// ===== FULLSCREEN MENU =====
let menuOpen = false;
function toggleMenu() {
    menuOpen = !menuOpen;
    document.getElementById('fullscreenMenu').classList.toggle('active', menuOpen);
    document.getElementById('menuBtn').textContent = menuOpen ? 'Close' : 'Menu';
    document.body.style.overflow = menuOpen ? 'hidden' : '';
}

function showMenuImg(index) {
    document.querySelectorAll('.menu-image').forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

// ===== SCROLL REVEAL =====
function initReveals() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        el.classList.remove('visible');
        observer.observe(el);
    });
}
initReveals();

// ===== HORIZONTAL SCROLL GALLERY =====
const hzGallery = document.getElementById('hzGallery');
const hzTrack = document.getElementById('hzTrack');

if (hzGallery && hzTrack) {
    window.addEventListener('scroll', () => {
        // Only run horizontal scroll math on desktop to prevent mobile layout breaking
        if (window.innerWidth > 1024) {
            const rect = hzGallery.getBoundingClientRect();
            const windowH = window.innerHeight;

            if (rect.top < windowH && rect.bottom > 0) {
                const progress = (windowH - rect.top) / (windowH + rect.height);
                const totalScroll = hzTrack.scrollWidth - window.innerWidth;
                const translateX = -progress * totalScroll * 0.6;
                hzTrack.style.transform = `translateX(${Math.max(translateX, -totalScroll)}px)`;
            }
        } else {
            hzTrack.style.transform = 'none';
        }
    });
}

// ===== PARALLAX EFFECT ON SPLIT SECTIONS =====
window.addEventListener('scroll', () => {
    if (window.innerWidth > 1024) {
        document.querySelectorAll('.split-right img').forEach(img => {
            const rect = img.parentElement.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const offset = (rect.top / window.innerHeight) * 30;
                img.style.transform = `scale(1.05) translateY(${offset}px)`;
            }
        });
    }
});

// ===== PREVENT # LINKS =====
document.querySelectorAll('a[href="#"]').forEach(a => {
    a.addEventListener('click', e => e.preventDefault());
});