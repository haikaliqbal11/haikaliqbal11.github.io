document.addEventListener('DOMContentLoaded', function() {

    // ── Current year in footer ──
    var currentYear = new Date().getFullYear();
    var yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = currentYear;

    // ── Sticky navbar shadow on scroll ──
    var navbar = document.querySelector('.navbar-custom');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ── Mobile Menu Toggle ──
    var toggleBtn = document.querySelector('.mobile-nav-toggle');
    var navLinksWrap = document.querySelector('.nav-links-wrap');
    if (toggleBtn && navLinksWrap) {
        toggleBtn.addEventListener('click', function() {
            navLinksWrap.classList.toggle('show');
            var icon = toggleBtn.querySelector('i');
            if (icon) {
                if (navLinksWrap.classList.contains('show')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // ── Portfolio Filter ──
    var filterBtns = document.querySelectorAll('.filter-btn');
    var portfolioCards = document.querySelectorAll('.portfolio-card');

    if (filterBtns.length > 0 && portfolioCards.length > 0) {
        filterBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                filterBtns.forEach(function(b) { b.classList.remove('active'); });
                btn.classList.add('active');

                var filterValue = btn.getAttribute('data-filter');

                portfolioCards.forEach(function(card) {
                    var cardCategory = card.getAttribute('data-category');
                    if (filterValue === 'all' || cardCategory.includes(filterValue)) {
                        card.style.display = '';
                        setTimeout(function() {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(function() {
                            card.style.display = 'none';
                        }, 250);
                    }
                });
            });
        });
    }

    // ── Dynamic Carousel Indicators ──
    document.querySelectorAll('.carousel').forEach(function(carousel) {
        var indicators = carousel.querySelector('.carousel-indicators');
        var items       = carousel.querySelectorAll('.carousel-inner .carousel-item');
        if (!indicators || !items.length) return;
        if (indicators.children.length)    return; // already generated
        var id = carousel.getAttribute('id');
        if (!id) return;
        items.forEach(function(_, idx) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.setAttribute('data-bs-target',  '#' + id);
            btn.setAttribute('data-bs-slide-to', String(idx));
            btn.setAttribute('aria-label',       'Slide ' + (idx + 1));
            if (idx === 0) {
                btn.className = 'active';
                btn.setAttribute('aria-current', 'true');
            }
            indicators.appendChild(btn);
        });
    });

    // ── Lightbox for Carousel & Gallery Images ──
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox-modal';
    lightbox.innerHTML = `
        <div class="lightbox-close"><i class="fas fa-times"></i></div>
        <img class="lightbox-img" src="" alt="Fullscreen Preview">
    `;
    document.body.appendChild(lightbox);

    var lightboxImg = lightbox.querySelector('.lightbox-img');
    var lightboxClose = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('.carousel-item img, .gallery-zoomable').forEach(function(img) {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function() {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // ── Smooth In-page Navigation ──
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href && href !== '#') {
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                    if (navLinksWrap && navLinksWrap.classList.contains('show')) {
                        navLinksWrap.classList.remove('show');
                        if (toggleBtn) {
                            var icon = toggleBtn.querySelector('i');
                            if (icon) {
                                icon.classList.remove('fa-times');
                                icon.classList.add('fa-bars');
                            }
                        }
                    }
                }
            }
        });
    });

});