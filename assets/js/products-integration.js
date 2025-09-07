/**
 * Integration script for products.html
 */

document.addEventListener('DOMContentLoaded', async function() {
    // Get the container where products will be displayed
    const productsContainer = document.querySelector('.case-area .container .row:not(.filter-row)');
    
    if (!productsContainer) {
        console.error('Products container not found');
        return;
    }
    
    // Show skeleton loading
    ProductUtils.showProductsSkeletonLoading(productsContainer, 6);
    
    try {
        // Fetch all products and categories
        const [products, categories] = await Promise.all([
            ApiService.getProducts(),
            ApiService.getCategories()
        ]);
        
        // Clear loading message
        productsContainer.innerHTML = '';
        
        // Render all products initially
        ProductUtils.renderProducts(products);
        
        // Render category filters
        ProductUtils.renderCategoryFilters(categories, filterProducts);
        
        /**
         * Filter products by category
         * @param {string} categoryId - Category ID or 'all' for all products
         */
        function filterProducts(categoryId) {
            // Show skeleton loading when filtering
            ProductUtils.showProductsSkeletonLoading(productsContainer, 6);
            
            setTimeout(() => {
                if (categoryId === 'all') {
                    ProductUtils.renderProducts(products);
                } else {
                    const filteredProducts = products.filter(product => product.category._id === categoryId);
                    ProductUtils.renderProducts(filteredProducts);
                }
            }, 300); // Small delay to show loading state
        }
        
    } catch (error) {
        console.error('Error initializing products page:', error);
        productsContainer.innerHTML = `
            <div class="col-12 text-center">
                <h3>Failed to load products</h3>
                <p>Please try again later</p>
            </div>
        `;
    }
});