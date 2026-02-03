document.addEventListener('DOMContentLoaded', function() {

    // ── Current year in footer ──
    var currentYear = new Date().getFullYear();
    var yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = currentYear;

    // ── Smooth scroll for in-page anchors ──
    document.querySelectorAll('.navbar-brand').forEach(function(link) {
        var href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                var target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
                else window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    });

    // ── Generate carousel indicators ──
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

    // ── Mark active nav link based on current page ──
    var currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(function(link) {
        var href = link.getAttribute('href').split('/').pop();
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

});