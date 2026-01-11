// Smooth scroll for in-page anchors; allow normal navigation for external links
document.addEventListener('DOMContentLoaded', function() {

    var currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;

    const brandLinks = document.querySelectorAll('.navbar-brand');
    brandLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Only intercept in-page anchors (href starting with '#')
        if (href && href.startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
                else window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    });

    // Generate carousel indicators for any carousel on the page
    document.querySelectorAll('.carousel').forEach(function(carousel){
        var indicators = carousel.querySelector('.carousel-indicators');
        var items = carousel.querySelectorAll('.carousel-inner .carousel-item');
        if(!indicators || !items || !items.length) return;
        // If indicators already have children, skip (prevents duplicate generation)
        if(indicators.children.length) return;
        var id = carousel.getAttribute('id');
        if(!id) return; // need an id to target
        items.forEach(function(_, idx){
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.setAttribute('data-bs-target', '#' + id);
            btn.setAttribute('data-bs-slide-to', String(idx));
            btn.setAttribute('aria-label', 'Slide ' + (idx + 1));
            if(idx === 0) {
                btn.className = 'active';
                btn.setAttribute('aria-current', 'true');
            }
            indicators.appendChild(btn);
        });
    });
    
});