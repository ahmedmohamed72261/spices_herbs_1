// Kingdom Spices Herbs - Content Updater
document.addEventListener('DOMContentLoaded', function() {
    // Determine which page we're on
    const currentPath = window.location.pathname;
    
    // Load appropriate content based on page
    if (currentPath.includes('index.html') || currentPath.endsWith('/')) {
        // Home page
        loadScript('assets/js/home-content.js');
    } else if (currentPath.includes('about.html')) {
        // About page
        loadScript('assets/js/about-content.js');
    } else if (currentPath.includes('service.html')) {
        // Services page
        loadScript('assets/js/service-content.js');
    } else if (currentPath.includes('team.html')) {
        // Team page
        loadScript('assets/js/team-content.js');
    } else if (currentPath.includes('faq.html')) {
        // FAQ page
        loadScript('assets/js/faq-content.js');
    }
    
    // Load certificates content on all pages
    loadScript('assets/js/certificates-content.js');
});

// Helper function to dynamically load scripts
function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
}