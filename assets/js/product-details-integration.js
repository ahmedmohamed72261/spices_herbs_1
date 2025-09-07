/**
 * Integration script for product-details.html
 */

/**
 * Shows skeleton loading for product details
 * @param {HTMLElement} container - Container element
 */
function showProductDetailsSkeletonLoading(container) {
    if (!container) return;
    
    // Clear existing content
    container.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="skeleton-item">
                        <div class="skeleton-image"></div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="skeleton-item">
                        <div class="skeleton-title"></div>
                        <div class="skeleton-text"></div>
                        <div class="skeleton-text"></div>
                        <div class="skeleton-text"></div>
                        <div class="mt-4">
                            <div class="skeleton-text" style="width: 60%;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', async function() {
    // Get the container where product details will be displayed
    const productDetailsContainer = document.querySelector('.case-single-area');
    
    if (!productDetailsContainer) {
        console.error('Product details container not found');
        return;
    }
    
    // Show skeleton loading for product details
    showProductDetailsSkeletonLoading(productDetailsContainer);
    
    try {
        // Get product ID from URL query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        if (!productId) {
            console.error('No product ID provided');
            productDetailsContainer.innerHTML = `
                <div class="container">
                    <div class="row">
                        <div class="col-12 text-center">
                            <h3>Product not found</h3>
                            <a href="products.html" class="theme-btn mt-4">Back to Products</a>
                        </div>
                    </div>
                </div>
            `;
            return;
        }
        
        // Fetch product details
        const product = await ApiService.getProductById(productId);
        
        if (!product) {
            productDetailsContainer.innerHTML = `
                <div class="container">
                    <div class="row">
                        <div class="col-12 text-center">
                            <h3>Product not found</h3>
                            <p>The requested product could not be found.</p>
                            <a href="products.html" class="theme-btn mt-4">Back to Products</a>
                        </div>
                    </div>
                </div>
            `;
            return;
        }
        
        // Render product details
        ProductUtils.renderProductDetails(product);
        
    } catch (error) {
        console.error('Error initializing product details page:', error);
        productDetailsContainer.innerHTML = `
            <div class="container">
                <div class="row">
                    <div class="col-12 text-center">
                        <h3>Failed to load product details</h3>
                        <p>Please try again later</p>
                        <a href="products.html" class="theme-btn mt-4">Back to Products</a>
                    </div>
                </div>
            </div>
        `;
    }
});