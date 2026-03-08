// =============================================
// Announcement Banner — js/banner.js
// Add <script src="js/banner.js"></script>
// to any page you want the banner on.
// =============================================

(function () {

    // Inject banner HTML into top of body
    var banner = document.createElement('div');
    banner.id = 'announcement-banner';
    banner.innerHTML = [
        '<div class="banner-inner">',
        '    <span class="banner-text">',
        '        📝 Notes are being uploaded gradually — new files added daily.',
        '        <a href="https://www.linkedin.com/in/biswajit-pradhan-ab66971b9/" target="_blank" class="banner-link">Follow on LinkedIn</a>',
        '        to get notified.',
        '    </span>',
        '    <button class="banner-close" id="bannerClose" aria-label="Close banner">✕</button>',
        '</div>'
    ].join('');

    document.body.insertBefore(banner, document.body.firstChild);

    // Trigger slide-in after a short delay
    setTimeout(function () {
        banner.classList.add('banner-visible');
    }, 100);

    // Close button
    document.getElementById('bannerClose').addEventListener('click', function () {
        banner.classList.remove('banner-visible');
        banner.classList.add('banner-hidden');
        // Remove from DOM after transition
        setTimeout(function () {
            banner.parentNode && banner.parentNode.removeChild(banner);
        }, 400);
    });

})();