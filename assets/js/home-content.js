// Static content updater for Kingdom Spices Herbs - Home Page
document.addEventListener('DOMContentLoaded', function() {
    // Update hero section
    updateHeroSection();
    
    // Update feature section
    updateFeatureSection();
    
    // Update about section
    updateAboutSection();
});

function updateHeroSection() {
    const heroSubTitles = document.querySelectorAll('.hero-sub-title');
    const heroTitles = document.querySelectorAll('.hero-title');
    const heroParagraphs = document.querySelectorAll('.hero-content p');
    
    heroSubTitles.forEach(element => {
        element.textContent = 'Welcome To Kingdom Spices Herbs!';
    });
    
    heroTitles.forEach(element => {
        element.textContent = 'Premium Botanicals Crafted For Brands';
    });
    
    heroParagraphs.forEach(element => {
        element.textContent = 'Step into the world of Kingdom Spices Herbs—premium botanicals crafted for brands that demand more. We deliver freshness you can smell, color you can see, and performance you can measure.';
    });
}

function updateFeatureSection() {
    const featureItems = document.querySelectorAll('.feature-item .feature-content');
    if (featureItems.length >= 4) {
        // Feature 1
        if (featureItems[0]) {
            const heading = featureItems[0].querySelector('h4');
            const paragraph = featureItems[0].querySelector('p');
            if (heading) heading.textContent = 'Consistent Grade & Cut';
            if (paragraph) paragraph.textContent = 'From boutique batches to industrial runs, we scale quality without compromise, ensuring consistent grade and cut for all your botanical needs.';
        }
        
        // Feature 2
        if (featureItems[1]) {
            const heading = featureItems[1].querySelector('h4');
            const paragraph = featureItems[1].querySelector('p');
            if (heading) heading.textContent = 'Fast, Transparent Lead Times';
            if (paragraph) paragraph.textContent = 'We provide clear timelines and transparent processes, ensuring you always know when to expect your premium botanicals.';
        }
        
        // Feature 3
        if (featureItems[2]) {
            const heading = featureItems[2].querySelector('h4');
            const paragraph = featureItems[2].querySelector('p');
            if (heading) heading.textContent = 'Audit-Ready Documentation';
            if (paragraph) paragraph.textContent = 'Our comprehensive documentation ensures compliance and traceability, making audits straightforward and hassle-free.';
        }
        
        // Feature 4
        if (featureItems[3]) {
            const heading = featureItems[3].querySelector('h4');
            const paragraph = featureItems[3].querySelector('p');
            if (heading) heading.textContent = 'Sustainable Origin Stories';
            if (paragraph) paragraph.textContent = 'We prioritize sustainability in our supply chain, providing transparent origin stories for all our premium botanicals.';
        }
    }
}

function updateAboutSection() {
    const aboutSectionTitle = document.querySelector('.about-right .site-title');
    const aboutSectionText = document.querySelector('.about-right .about-text');
    
    if (aboutSectionTitle) {
        aboutSectionTitle.textContent = 'Farmers at Heart, Technologists by Design';
    }
    
    if (aboutSectionText) {
        aboutSectionText.textContent = 'We\'re farmers at heart and technologists by design. Kingdom Spices Herbs blends regenerative agriculture with validated processes to produce ingredients that meet global compliance and delight end consumers.';
    }
}