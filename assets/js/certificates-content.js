// Static content updater for Kingdom Spices Herbs - Certificates
document.addEventListener('DOMContentLoaded', function() {
    // Find certificates section or create one if it doesn't exist
    let certificatesSection = document.querySelector('.certificates-section');
    
    if (!certificatesSection) {
        // Try to find a suitable container
        const possibleContainers = [
            document.querySelector('.about-content'),
            document.querySelector('.service-content'),
            document.querySelector('.main-content'),
            document.querySelector('main')
        ];
        
        // Use the first available container
        const container = possibleContainers.find(el => el !== null);
        
        if (container) {
            // Create certificates section
            certificatesSection = document.createElement('div');
            certificatesSection.className = 'certificates-section py-60';
            
            // Create section title
            const sectionTitle = document.createElement('div');
            sectionTitle.className = 'site-heading text-center mb-4';
            sectionTitle.innerHTML = '<h2 class="site-title">Certificates</h2>';
            
            certificatesSection.appendChild(sectionTitle);
            container.appendChild(certificatesSection);
        }
    }
    
    if (certificatesSection) {
        // Create or update certificates list
        let certificatesList = certificatesSection.querySelector('ul');
        
        if (!certificatesList) {
            certificatesList = document.createElement('ul');
            certificatesList.className = 'certificates-list text-center';
            certificatesSection.appendChild(certificatesList);
        }
        
        certificatesList.innerHTML = `
            <li>ISO 22000 • HACCP</li>
            <li>Organic program participation (product-dependent)</li>
            <li>Ethical sourcing commitments</li>
            <li>Optional Kosher/Halal where needed</li>
        `;
    }
});