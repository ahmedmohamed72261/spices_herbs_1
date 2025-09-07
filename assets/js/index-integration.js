/**
 * Integration script for index.html
 */

document.addEventListener('DOMContentLoaded', async function() {
    // Get the container where featured products will be displayed
    const featuredProductsContainer = document.querySelector('.case-slider');
    
    if (!featuredProductsContainer) {
        console.error('Featured products container not found');
        return;
    }
    
    // Show skeleton loading for featured products
    const caseArea = document.querySelector('.case-area .container');
    if (caseArea) {
        // Create a temporary row for skeleton loading
        const tempRow = document.createElement('div');
        tempRow.className = 'row skeleton-loading-row';
        caseArea.prepend(tempRow);
        
        // Show skeleton loading
        ProductUtils.showProductsSkeletonLoading(tempRow, 3);
    }
    
    try {
        // Fetch all products
        const products = await ApiService.getProducts();
        
        // Remove skeleton loading
        const skeletonRow = document.querySelector('.skeleton-loading-row');
        if (skeletonRow) {
            skeletonRow.remove();
        }
        
        // Render featured products in the "Portfolio Our Featured Projects" section
        ProductUtils.renderFeaturedProducts(products, 6);
        
        // Add "View All Products" button
        ProductUtils.addViewAllProductsButton();
        
    } catch (error) {
        console.error('Error initializing index page:', error);
        
        // Show error message
        const skeletonRow = document.querySelector('.skeleton-loading-row');
        if (skeletonRow) {
            skeletonRow.innerHTML = `
                <div class="col-12 text-center">
                    <h3>Failed to load featured products</h3>
                    <p>Please try again later</p>
                </div>
            `;
        }
    }
});