// Static content updater for Kingdom Spices Herbs - Services Page
document.addEventListener('DOMContentLoaded', function() {
    const serviceItems = document.querySelectorAll('.service-item');
    const serviceContent = [
        {
            title: 'End-to-End Export Management',
            description: 'Vendor qualification, sampling, contracting, and post-shipment support.'
        },
        {
            title: 'Precision Cutting & Milling',
            description: 'Herbal tea cuts, flakes, granules, and fine powders for capsules or blends.'
        },
        {
            title: 'Blending Services',
            description: 'Create bespoke herbal or spice blends with consistent ratios and batch records.'
        },
        {
            title: 'Sensory & Color Standardization',
            description: 'Maintain flavor/aroma profiles and color consistency across seasons.'
        },
        {
            title: 'Micro & Residue Compliance',
            description: 'Pathogen screens, TPC, yeast/mold, and residue checks with CoA.'
        },
        {
            title: 'Packaging Engineering',
            description: 'Barrier selection, oxygen/moisture control, and stability considerations.'
        },
        {
            title: 'Label & Artwork Support',
            description: 'Print-ready dielines, batch coding, and localization.'
        },
        {
            title: 'Freight Optimization',
            description: 'Cube utilization, temperature considerations, and Incoterms guidance.'
        },
        {
            title: 'After-Sales Quality Support',
            description: 'Deviation handling, corrective actions, and continuous improvement loops.'
        }
    ];
    
    serviceItems.forEach((item, index) => {
        if (index < serviceContent.length) {
            const title = item.querySelector('.service-title');
            const description = item.querySelector('.service-text');
            
            if (title) title.textContent = serviceContent[index].title;
            if (description) description.textContent = serviceContent[index].description;
        }
    });
});