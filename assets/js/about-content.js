// Static content updater for Kingdom Spices Herbs - About Page
document.addEventListener('DOMContentLoaded', function() {
    // Update about section content
    const aboutSectionTitle = document.querySelector('.about-content .site-title');
    const aboutSectionText = document.querySelector('.about-content .about-text');
    
    if (aboutSectionTitle) {
        aboutSectionTitle.textContent = 'Farmers at Heart, Technologists by Design';
    }
    
    if (aboutSectionText) {
        aboutSectionText.textContent = 'We\'re farmers at heart and technologists by design. Kingdom Spices Herbs blends regenerative agriculture with validated processes to produce ingredients that meet global compliance and delight end consumers.';
    }
    
    // Update vision and mission
    const aboutListItems = document.querySelectorAll('.about-list-wrapper .about-list li');
    if (aboutListItems.length >= 3) {
        // Vision
        if (aboutListItems[0]) {
            const heading = aboutListItems[0].querySelector('h4');
            const paragraph = aboutListItems[0].querySelector('p');
            if (heading) heading.textContent = 'Vision';
            if (paragraph) paragraph.textContent = 'Make sustainable botanicals the industry standard, not the exception.';
        }
        
        // Mission
        if (aboutListItems[1]) {
            const heading = aboutListItems[1].querySelector('h4');
            const paragraph = aboutListItems[1].querySelector('p');
            if (heading) heading.textContent = 'Mission';
            if (paragraph) paragraph.textContent = 'Build resilient supply chains with smallholder and large-scale farms. Validate quality using measurable, repeatable methods.';
        }
        
        // Values
        if (aboutListItems[2]) {
            const heading = aboutListItems[2].querySelector('h4');
            const paragraph = aboutListItems[2].querySelector('p');
            if (heading) heading.textContent = 'Values';
            if (paragraph) paragraph.textContent = 'Transparency • Stewardship • Craft • Reliability';
        }
    }
});